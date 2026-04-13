# gRPC Architecture

> Technical specification for gRPC usage in Republet's service architecture.

---

## Overview

Republet uses **gRPC** for internal microservice communication while using **REST/GraphQL** for public APIs and web UI. This split approach optimizes for different use cases:

| Protocol | Use Case | Rationale |
|----------|----------|-----------|
| **gRPC** | Internal microservices | High performance, type-safe, streaming support |
| **REST** | Public API, web UI | Web-native, wide tooling support, caching |
| **GraphQL** | Complex queries (optional) | Flexible data fetching for clients |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Republet Architecture                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  External Clients                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                    │
│  │ Web UI      │  │ Mobile App  │  │ API Clients │                    │
│  │ (Browser)   │  │ (Future)    │  │ (External)  │                    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                    │
│         │                │                │                            │
│         ▼                ▼                ▼                            │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                    API Gateway (REST)                            │  │
│  │  - Authentication                                                 │  │
│  │  - Rate limiting                                                  │  │
│  │  - Request routing                                                │  │
│  │  - Response caching                                               │  │
│  └──────────────────────────┬──────────────────────────────────────┘  │
│                             │                                           │
│                             │ HTTP/REST                                 │
│                             │                                           │
│  ┌──────────────────────────┴──────────────────────────────────────┐  │
│  │                    Service Layer (gRPC)                          │  │
│  │                                                                  │  │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │  │
│  │   │ Willow      │   │ Identity    │   │ Search      │          │  │
│  │   │ Service     │   │ Service     │   │ Service     │          │  │
│  │   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘          │  │
│  │          │                 │                 │                  │  │
│  │          │                 │                 │                  │  │
│  │   ┌──────┴─────────────────┴─────────────────┴──────┐          │  │
│  │   │              gRPC Internal Network              │          │  │
│  │   └─────────────────────────────────────────────────┘          │  │
│  │                                                                  │  │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │  │
│  │   │ LOI         │   │ Notification│   │ Storage     │          │  │
│  │   │ Service     │   │ Service     │   │ Service     │          │  │
│  │   └─────────────┘   └─────────────┘   └─────────────┘          │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Data Layer                                     │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │  │
│  │  │ Willow      │  │ PostgreSQL  │  │ Redis       │              │  │
│  │  │ Network     │  │ (Metadata)  │  │ (Cache)     │              │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Why gRPC for Internal Services

### Performance

| Metric | gRPC | REST (JSON) |
|--------|------|-------------|
| **Payload size** | Binary (Protocol Buffers) | Text (JSON) |
| **Serialization** | ~3-10x faster | Slower |
| **Network usage** | ~60-80% smaller | Larger |
| **Connection** | HTTP/2 (multiplexed) | HTTP/1.1 (typically) |

### Type Safety

Protocol Buffers provide compile-time type checking:

```protobuf
// experiment.proto
service ExperimentService {
  rpc GetExperiment(GetExperimentRequest) returns (Experiment);
  rpc CreateExperiment(CreateExperimentRequest) returns (Experiment);
  rpc StreamExperiments(StreamExperimentsRequest) returns (stream Experiment);
}

message Experiment {
  string loi = 1;
  string title = 2;
  repeated Author authors = 3;
  int64 created_at = 4;
  ExperimentStatus status = 5;
}

enum ExperimentStatus {
  DRAFT = 0;
  PUBLISHED = 1;
  WITHDRAWN = 2;
}
```

### Streaming Support

gRPC natively supports bidirectional streaming:

| Stream Type | Use Case |
|-------------|----------|
| **Unary** | Standard request/response |
| **Server streaming** | Real-time updates, search results |
| **Client streaming** | File upload, batch operations |
| **Bidirectional** | Chat, collaboration |

---

## Service Definitions

### Willow Service

Handles all Willow/Earthstar operations:

```protobuf
syntax = "proto3";

package republet.willow;

service WillowService {
  // Namespace operations
  rpc CreateNamespace(CreateNamespaceRequest) returns (Namespace);
  rpc GetNamespace(GetNamespaceRequest) returns (Namespace);

  // Entry operations
  rpc WriteEntry(WriteEntryRequest) returns (Entry);
  rpc ReadEntry(ReadEntryRequest) returns (Entry);
  rpc DeleteEntry(DeleteEntryRequest) returns (DeleteEntryResponse);

  // Sync operations
  rpc SyncWithPeer(SyncWithPeerRequest) returns (stream SyncEvent);
  rpc GetSyncStatus(GetSyncStatusRequest) returns (SyncStatus);

  // Query operations
  rpc QueryEntries(QueryEntriesRequest) returns (stream Entry);
}

message Namespace {
  string id = 1;
  string owner_did_peer = 2;
  int64 created_at = 3;
  map<string, string> metadata = 4;
}

message Entry {
  string namespace_id = 1;
  string path = 2;
  bytes payload = 3;
  int64 timestamp = 4;
  string author_signature = 5;
}
```

### Identity Service

Handles did:peer and OAuth operations:

```protobuf
syntax = "proto3";

package republet.identity;

service IdentityService {
  // did:peer operations
  rpc CreateDidPeer(CreateDidPeerRequest) returns (DidPeerIdentity);
  rpc ResolveDidPeer(ResolveDidPeerRequest) returns (DidPeerDocument);
  rpc VerifySignature(VerifySignatureRequest) returns (VerifySignatureResponse);

  // OAuth operations
  rpc LinkOAuth(LinkOAuthRequest) returns (OAuthLink);
  rpc UnlinkOAuth(UnlinkOAuthRequest) returns (UnlinkOAuthResponse);
  rpc GetOAuthLinks(GetOAuthLinksRequest) returns (OAuthLinks);

  // Delegate operations
  rpc AddDelegate(AddDelegateRequest) returns (Delegate);
  rpc RemoveDelegate(RemoveDelegateRequest) returns (RemoveDelegateResponse);
  rpc RequestRecovery(RequestRecoveryRequest) returns (RecoveryRequest);
  rpc ApproveRecovery(ApproveRecoveryRequest) returns (ApproveRecoveryResponse);
}

message DidPeerIdentity {
  string did = 1;
  bytes public_key = 2;
  int64 created_at = 3;
  repeated OAuthLink oauth_links = 4;
  repeated Delegate delegates = 5;
}

message OAuthLink {
  string provider = 1;
  string provider_user_id = 2;
  int64 linked_at = 3;
}

message Delegate {
  string did_peer = 1;
  repeated string capabilities = 2;
  int64 appointed_at = 3;
}
```

### Search Service (OpenRL)

Handles indexing and search operations:

```protobuf
syntax = "proto3";

package republet.search;

service SearchService {
  // Indexing (internal)
  rpc IndexDocument(IndexDocumentRequest) returns (IndexDocumentResponse);
  rpc RemoveFromIndex(RemoveFromIndexRequest) returns (RemoveFromIndexResponse);

  // Search (both tiers)
  rpc Search(SearchRequest) returns (SearchResponse);  // Paid tier: hosted
  rpc P2PSearch(P2PSearchRequest) returns (P2PSearchResponse);  // Free tier

  // Streaming results
  rpc StreamSearchResults(StreamSearchResultsRequest) returns (stream SearchResult);
}

message SearchRequest {
  string query = 1;
  SearchFilters filters = 2;
  int32 limit = 3;
  int32 offset = 4;
  string user_did = 5;  // For personalization
}

message SearchFilters {
  repeated string authors = 1;
  int64 date_from = 2;
  int64 date_to = 3;
  repeated string keywords = 4;
  repeated string disciplines = 5;
  ResultType result_type = 6;  // POSITIVE, NULL, ALL
}

message SearchResult {
  string loi = 1;
  string title = 2;
  repeated string authors = 3;
  string abstract = 4;
  float score = 5;
  map<string, string> highlights = 6;
}
```

### LOI Service

Handles LOI generation and resolution:

```protobuf
syntax = "proto3";

package republet.loi;

service LoiService {
  // LOI operations
  rpc GenerateLoi(GenerateLoiRequest) returns (Loi);
  rpc ResolveLoi(ResolveLoiRequest) returns (LoiResolution);
  rpc VerifyLoi(VerifyLoiRequest) returns (VerifyLoiResponse);

  // Citation metadata
  rpc GetCitationMetadata(GetCitationMetadataRequest) returns (CitationMetadata);
  rpc ExportCitation(ExportCitationRequest) returns (ExportCitationResponse);

  // DOI bridging
  rpc LinkDoi(LinkDoiRequest) returns (DoiLink);
  rpc GetDoiForLoi(GetDoiForLoiRequest) returns (DoiLink);
}

message Loi {
  string loi = 1;  // LOI:republet.dp.8x7k2m.abc123xyz
  string did_peer = 2;
  string willow_path = 3;
  int64 created_at = 4;
  string doi = 5;  // Optional linked DOI
}

message CitationMetadata {
  string loi = 1;
  string doi = 2;
  string title = 3;
  repeated Author authors = 4;
  int64 year = 5;
  string url = 6;
}

message ExportCitationResponse {
  string format = 1;  // bibtex, ris, csl-json
  string content = 2;
}
```

### Notification Service

Handles all user notifications:

```protobuf
syntax = "proto3";

package republet.notification;

service NotificationService {
  // Notification management
  rpc CreateNotification(CreateNotificationRequest) returns (Notification);
  rpc GetNotifications(GetNotificationsRequest) returns (NotificationsResponse);
  rpc MarkAsRead(MarkAsReadRequest) returns (MarkAsReadResponse);

  // Real-time streaming
  rpc SubscribeToNotifications(SubscribeRequest) returns (stream Notification);

  // Preferences
  rpc GetNotificationPreferences(GetNotificationPreferencesRequest) returns (NotificationPreferences);
  rpc UpdateNotificationPreferences(UpdateNotificationPreferencesRequest) returns (NotificationPreferences);
}

message Notification {
  string id = 1;
  string user_did = 2;
  NotificationType type = 3;
  string title = 4;
  string body = 5;
  map<string, string> data = 6;
  int64 created_at = 7;
  bool read = 8;
}

enum NotificationType {
  CITATION = 0;
  MENTION = 1;
  REVIEW = 2;
  FOLLOWER_ACTIVITY = 3;
  SYSTEM = 4;
  RECOVERY_REQUEST = 5;
}
```

### Storage Service

Handles file storage operations:

```protobuf
syntax = "proto3";

package republet.storage;

service StorageService {
  // File operations
  rpc UploadFile(stream UploadFileRequest) returns (FileInfo);
  rpc DownloadFile(DownloadFileRequest) returns (stream FileChunk);
  rpc DeleteFile(DeleteFileRequest) returns (DeleteFileResponse);

  // Metadata
  rpc GetFileInfo(GetFileInfoRequest) returns (FileInfo);
  rpc ListFiles(ListFilesRequest) returns (ListFilesResponse);

  // Quota
  rpc GetQuota(GetQuotaRequest) returns (Quota);
  rpc GetUsage(GetUsageRequest) returns (Usage);
}

message FileInfo {
  string id = 1;
  string user_did = 2;
  string filename = 3;
  string content_type = 4;
  int64 size_bytes = 5;
  int64 uploaded_at = 6;
  string loi = 7;  // Linked experiment
}

message Quota {
  int64 total_bytes = 1;
  int64 used_bytes = 2;
  int64 available_bytes = 3;
}
```

---

## API Gateway (REST)

The API Gateway exposes REST endpoints that translate to gRPC calls:

### REST → gRPC Translation

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    REST to gRPC Translation                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  REST Request                       gRPC Call                           │
│  ────────────                       ─────────                           │
│                                                                         │
│  GET /experiments/{loi}        →    GetExperiment(loi)                 │
│                                                                         │
│  POST /experiments             →    CreateExperiment(data)             │
│                                                                         │
│  GET /search?q=...             →    Search(query, filters)             │
│                                                                         │
│  GET /users/me                 →    GetCurrentUser(did)                │
│                                                                         │
│  POST /files                   →    UploadFile(stream)                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### REST API Example

```typescript
// API Gateway implementation
import { ExperimentServiceClient } from './generated/experiment';

const experimentClient = new ExperimentServiceClient('localhost:50051');

// REST endpoint
app.get('/experiments/:loi', async (req, res) => {
  const grpcRequest = {
    loi: req.params.loi
  };

  const experiment = await experimentClient.getExperiment(grpcRequest);
  res.json(experiment);
});
```

---

## Service Discovery

### Internal Service Registry

Services register themselves with a service registry:

```yaml
# Service configuration
services:
  willow-service:
    host: willow-service
    port: 50051
    health_check: /health

  identity-service:
    host: identity-service
    port: 50052
    health_check: /health

  search-service:
    host: search-service
    port: 50053
    health_check: /health

  loi-service:
    host: loi-service
    port: 50054
    health_check: /health

  notification-service:
    host: notification-service
    port: 50055
    health_check: /health

  storage-service:
    host: storage-service
    port: 50056
    health_check: /health
```

### Kubernetes Deployment

In Kubernetes, services are discovered via DNS:

```
willow-service.republet.svc.cluster.local:50051
identity-service.republet.svc.cluster.local:50052
...
```

---

## Error Handling

### gRPC Error Codes

Republet maps errors to standard gRPC codes:

| gRPC Code | HTTP Status | Meaning |
|-----------|-------------|---------|
| `OK` | 200 | Success |
| `INVALID_ARGUMENT` | 400 | Client error |
| `UNAUTHENTICATED` | 401 | Authentication required |
| `PERMISSION_DENIED` | 403 | Not authorized |
| `NOT_FOUND` | 404 | Resource not found |
| `ALREADY_EXISTS` | 409 | Conflict |
| `RESOURCE_EXHAUSTED` | 429 | Rate limited |
| `INTERNAL` | 500 | Server error |
| `UNAVAILABLE` | 503 | Service unavailable |

### Error Response Pattern

```protobuf
message ErrorDetail {
  string code = 1;
  string message = 2;
  map<string, string> details = 3;
}
```

---

## Security

### Inter-Service Authentication

Services authenticate to each other using mTLS:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Service-to-Service mTLS                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Service A                      Service B                               │
│  ┌─────────┐                    ┌─────────┐                            │
│  │ Client  │───────mTLS────────▶│ Server  │                            │
│  │ Cert    │                    │ Cert    │                            │
│  └─────────┘                    └─────────┘                            │
│                                                                         │
│  Both sides verify:                                                     │
│  - Certificate is valid                                                 │
│  - Certificate is from trusted CA                                      │
│  - Certificate is not expired                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### User Context Propagation

User identity is propagated through services via metadata:

```typescript
// Metadata propagation
const metadata = new Metadata();
metadata.set('x-user-did', userDid);
metadata.set('x-request-id', requestId);

const response = await client.someMethod(request, metadata);
```

---

## Monitoring & Observability

### Distributed Tracing

All gRPC calls are traced:

```
Request → API Gateway → Service A → Service B → Service C
   │           │            │           │           │
   └───────────┴────────────┴───────────┴───────────┘
                         │
                    Trace ID
                    (propagated)
```

### Metrics

Each service exposes metrics:

| Metric | Type | Purpose |
|--------|------|---------|
| `grpc_requests_total` | Counter | Total requests |
| `grpc_request_duration` | Histogram | Request latency |
| `grpc_requests_in_flight` | Gauge | Active requests |
| `grpc_errors_total` | Counter | Error count |

### Health Checks

Each service implements gRPC health checking:

```protobuf
// Health check (standard gRPC)
service Health {
  rpc Check(HealthCheckRequest) returns (HealthCheckResponse);
}
```

---

## Development Workflow

### Protocol Buffer Generation

1. Define `.proto` files in `proto/` directory
2. Generate TypeScript/Node.js code:

```bash
# Generate from proto files
protoc --ts_out=./src/generated \
  --proto_path=./proto \
  ./proto/**/*.proto
```

### Local Development

```yaml
# docker-compose.yml for local development
services:
  willow-service:
    build: ./services/willow
    ports:
      - "50051:50051"

  identity-service:
    build: ./services/identity
    ports:
      - "50052:50052"

  api-gateway:
    build: ./services/gateway
    ports:
      - "3000:3000"
    environment:
      - WILLOW_SERVICE=willow-service:50051
      - IDENTITY_SERVICE=identity-service:50052
```

---

## Summary

| Aspect | Decision |
|--------|----------|
| **gRPC usage** | Internal microservices only |
| **Public API** | REST (with optional GraphQL) |
| **Protocol** | HTTP/2 + Protocol Buffers |
| **Streaming** | Server streaming for real-time features |
| **Authentication** | mTLS for inter-service, JWT for user context |
| **Discovery** | Kubernetes DNS or service registry |
| **Monitoring** | Distributed tracing, Prometheus metrics |

---

*Version: 0.1.0*
*Last updated: 2025*
