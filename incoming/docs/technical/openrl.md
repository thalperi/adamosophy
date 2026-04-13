# OpenRL: Republet's Decentralized Academic Index

> Technical specification for OpenRL, Republet's decentralized alternative to centralized academic discovery services.

---

## Overview

**OpenRL** (Open Republet Library) is Republet's decentralized academic indexing and search system. Unlike centralized services like OpenAlex, Google Scholar, or Web of Science, OpenRL cannot be censored by any single authority because it operates on a distributed network.

### Why OpenRL?

| Centralized Index Risk | OpenRL Solution |
|-----------------------|-----------------|
| Content can be removed by platform owner | No central authority can remove content |
| Service shutdown loses all index data | Index distributed across network |
| Geographic restrictions block access | P2P network transcends borders |
| Algorithm changes hide content | Transparent, configurable ranking |
| Paywalls restrict access | Free and open by design |

---

## Two-Tier Indexing Model

OpenRL operates on two tiers with different capabilities:

### Tier Comparison

| Feature | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Index Type** | P2P query broadcast | Hosted centralized index |
| **Search Speed** | Gradual (async) | Instant |
| **Coverage** | Depends on connected peers | Full index |
| **Resource Use** | User's device + peer network | Republet infrastructure |
| **Guaranteed Results** | No (depends on peers) | Yes |
| **Full-Text Search** | Limited | Full support |
| **Metadata Search** | Supported | Full support |

---

## Free Tier: P2P Query Broadcast

### Concept

Free tier users search by broadcasting queries to the P2P network. Connected peers run the query locally against their own data and return results.

```
┌─────────────────────────────────────────────────────────────────┐
│                    P2P Query Broadcast Flow                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐                                                    │
│  │  User   │                                                    │
│  │  Query  │                                                    │
│  └────┬────┘                                                    │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Broadcast to Connected Peers                 │   │
│  │                                                          │   │
│  │    ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐       │   │
│  │    │ Peer A│   │ Peer B│   │ Peer C│   │ Peer D│       │   │
│  │    │ L1    │   │ L2    │   │ L1,L3 │   │ L2    │       │   │
│  │    └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘       │   │
│  │        │           │           │           │            │   │
│  │        ▼           ▼           ▼           ▼            │   │
│  │    Local       Local       Local       Local           │   │
│  │    Search      Search      Search      Search          │   │
│  │        │           │           │           │            │   │
│  │        └───────────┴───────────┴───────────┘            │   │
│  │                          │                              │   │
│  │                          ▼                              │   │
│  │                   ┌─────────────┐                       │   │
│  │                   │  Response   │                       │   │
│  │                   │  Inbox      │                       │   │
│  │                   └─────────────┘                       │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│         Optional: Cascade to deeper levels (L2, L3, etc.)       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Response Inbox

Results appear in a **response inbox** that fills gradually as peers respond:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Response Inbox                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Query: "protein folding machine learning"                      │
│  Status: Searching... (12 peers contacted, 3 responded)         │
│  Elapsed: 45 seconds                                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Results (7 found):                                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📄 Deep learning for protein structure prediction        │   │
│  │    LOI:republet.dp.8x7k2m.xyz789                         │   │
│  │    Peer: dp.3m9k2p | Received: 12 seconds ago           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📄 Transformer models in computational biology           │   │
│  │    LOI:republet.dp.4n1l5q.def456                         │   │
│  │    Peer: dp.7x2k9m | Received: 23 seconds ago           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📄 Null result: LSTM approach to folding prediction      │   │
│  │    LOI:republet.dp.2p8k3n.ghi789                         │   │
│  │    Peer: dp.1m4k7p | Received: 31 seconds ago           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Show 4 more results...]                                       │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [Keep Searching]  [Pause Search]  [Save Results]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Query Configuration

Users can configure P2P query behavior:

| Setting | Description | Default |
|---------|-------------|---------|
| **Max Duration** | How long to wait for results | 5 minutes |
| **Max Depth** | Levels of peer cascade | 2 levels |
| **Min Peers** | Minimum peers to contact | 10 |
| **Timeout per Peer** | Max wait per peer response | 30 seconds |
| **Deduplication** | Remove duplicate results | Enabled |

### Query Cascade

Queries can cascade through multiple levels of peer connections:

```
Level 0: User's direct peers (immediate connections)
    │
    ├── Level 1: Peers of peers (1 hop away)
    │       │
    │       └── Level 2: Peers of peers of peers (2 hops away)
    │               │
    │               └── ... (deeper if configured)
```

**Depth Control:**

- Depth 0: Only direct peers (fastest, limited coverage)
- Depth 1: Direct + 1 hop (balanced)
- Depth 2: Direct + 2 hops (slower, better coverage)
- Depth 3+: Exponential coverage, diminishing returns

### Query Protocol

```typescript
interface P2PQuery {
  id: string;                    // Unique query ID
  query: string;                 // Search query
  filters?: QueryFilters;        // Optional filters
  requester: string;             // Requester's did:peer
  ttl: number;                   // Time-to-live (seconds)
  maxDepth: number;              // Max cascade depth
  currentDepth: number;          // Current depth (increments as cascades)
  timestamp: number;             // Query creation time
}

interface P2PQueryResponse {
  queryId: string;               // Original query ID
  responder: string;             // Responder's did:peer
  results: SearchResult[];       // Matching results
  totalLocal: number;            // Total matches on responder's node
  searchTime: number;            // Time to search locally
  timestamp: number;             // Response time
}
```

### Peer Selection for Queries

Not all peers are equal. Republet prioritizes peers likely to have relevant data:

| Factor | Weight | Purpose |
|--------|--------|---------|
| **Topic overlap** | High | Peers with similar research interests |
| **Historical relevance** | Medium | Peers who returned relevant results before |
| **Response time** | Medium | Faster peers get priority |
| **Uptime** | Low | Reliable peers preferred |
| **Bandwidth** | Low | Higher capacity peers for large queries |

---

## Paid Tier: Hosted Index

### Concept

Paid tier users search against Republet's hosted, centralized index. This provides:

- Instant results
- Full-text search across all Republet content
- Guaranteed coverage
- Advanced filtering and sorting

### Index Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Hosted Index Architecture                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Index Cluster                          │  │
│  │                                                           │  │
│  │   ┌─────────┐   ┌─────────┐   ┌─────────┐               │  │
│  │   │ Shard 1 │   │ Shard 2 │   │ Shard 3 │   ...         │  │
│  │   │ (A-F)   │   │ (G-M)   │   │ (N-S)   │               │  │
│  │   └────┬────┘   └────┬────┘   └────┬────┘               │  │
│  │        │             │             │                     │  │
│  │        └─────────────┴─────────────┘                     │  │
│  │                      │                                   │  │
│  │                      ▼                                   │  │
│  │              ┌───────────────┐                          │  │
│  │              │ Query Router  │                          │  │
│  │              │ & Aggregator  │                          │  │
│  │              └───────┬───────┘                          │  │
│  │                      │                                   │  │
│  └──────────────────────┼──────────────────────────────────┘  │
│                         │                                      │
│                         ▼                                      │
│                  ┌─────────────┐                               │
│                  │ API Gateway │                               │
│                  └──────┬──────┘                               │
│                         │                                      │
│                         ▼                                      │
│                    User Query                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Index Contents

The hosted index includes:

| Data Type | Indexed Fields |
|-----------|---------------|
| **Experiments** | Title, abstract, methodology, results, keywords, authors |
| **Authors** | Name, ORCID, affiliation, did:peer |
| **LOIs** | Full LOI registry with metadata |
| **Citations** | Citation relationships between documents |
| **Full Text** | All text content for full-text search |

### Search Capabilities

| Feature | Description |
|---------|-------------|
| **Full-text search** | Search across all text content |
| **Fielded search** | Search specific fields (title:, author:, etc.) |
| **Faceted filtering** | Filter by date, discipline, author, etc. |
| **Semantic search** | ML-powered concept-based search |
| **Fuzzy matching** | Handle typos and variations |
| **Boolean operators** | AND, OR, NOT support |
| **Phrase search** | Exact phrase matching with quotes |

### Index Sync

The hosted index syncs from the Willow network:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Index Synchronization                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Willow Network                    Hosted Index                 │
│  ┌─────────────┐                   ┌─────────────┐             │
│  │ Replica 1   │                   │             │             │
│  ├─────────────┤  ──────────────▶  │  Index      │             │
│  │ Replica 2   │  Continuous sync  │  Cluster    │             │
│  ├─────────────┤  ──────────────▶  │             │             │
│  │ Replica N   │                   │             │             │
│  └─────────────┘                   └─────────────┘             │
│                                                                 │
│  Sync Method:                                                    │
│  - Subscribe to Willow change streams                           │
│  - Real-time index updates                                      │
│  - Periodic full reconciliation                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## OpenRL vs OpenAlex

### Feature Comparison

| Feature | OpenRL (Republet) | OpenAlex |
|---------|-------------------|----------|
| **Cost** | Free (both tiers) | Free |
| **Decentralization** | ✓ (core design) | ✗ (centralized) |
| **Censorship resistance** | ✓ | ✗ |
| **Full-text search** | ✓ (paid tier) | ✗ (metadata only) |
| **Null results** | ✓ (indexed) | — (indexed if published) |
| **Structured experiments** | ✓ (native) | ✗ (not supported) |
| **API** | ✓ | ✓ |
| **Open data** | ✓ | ✓ |
| **Real-time updates** | ✓ (P2P instant) | ✗ (crawl delay) |

### OpenRL Advantages

1. **Decentralization**: No single point of failure or control
2. **Null results visibility**: Null results are indexed and discoverable
3. **Structured data**: Experiments indexed with full metadata structure
4. **Real-time**: P2P network has no crawl delay
5. **Censorship resistant**: Content cannot be removed by platform decision

### OpenAlex Advantages

1. **Comprehensive coverage**: 250M+ works from all sources
2. **Established**: Integrated into many existing tools
3. **Citation graph**: Mature citation network analysis
4. **Institutional data**: Rich institution and funder data

### Integration Strategy

Republet's approach: **Both/And, not Either/Or**

- Republet submits content to OpenAlex for broader discovery
- OpenRL provides decentralized backup and native Republet search
- Users benefit from both systems

---

## Search API

### REST API (Paid Tier)

```http
GET /api/v1/search?q=protein+folding&limit=20&offset=0
```

Response:
```json
{
  "query": "protein folding",
  "total": 1523,
  "limit": 20,
  "offset": 0,
  "results": [
    {
      "loi": "LOI:republet.dp.8x7k2m.abc123",
      "title": "Deep learning for protein structure prediction",
      "authors": [
        {"name": "Jane Smith", "orcid": "0000-0000-0000-0000"}
      ],
      "abstract": "We present a novel approach...",
      "keywords": ["protein folding", "deep learning", "structure prediction"],
      "published": "2025-01-15",
      "result_type": "positive",
      "citations": 12,
      "score": 0.95
    }
  ]
}
```

### P2P Query API (Free Tier)

```http
POST /api/v1/search/p2p
Content-Type: application/json

{
  "query": "protein folding",
  "config": {
    "maxDuration": 300,
    "maxDepth": 2,
    "minPeers": 10
  }
}
```

Response (immediate):
```json
{
  "queryId": "q_abc123xyz",
  "status": "broadcasting",
  "message": "Query broadcast to 15 peers. Results will appear in your inbox."
}
```

Poll for results:
```http
GET /api/v1/search/p2p/q_abc123xyz/results
```

---

## Ranking Algorithm

OpenRL uses transparent, configurable ranking:

### Ranking Factors

| Factor | Weight | Description |
|--------|--------|-------------|
| **Text relevance** | 40% | Query match quality |
| **Recency** | 15% | Publication date |
| **Citation count** | 10% | Number of citations |
| **Author reputation** | 10% | Author's Republet credit |
| **Methodology score** | 10% | Completeness of methodology |
| **Peer validation** | 10% | Reviews and validations |
| **User preference** | 5% | Personalized relevance |

### Transparency

- Ranking algorithm is public and documented
- Users can adjust weights in settings
- No hidden "quality" scores or secret factors
- Explanation provided for each result's ranking

---

## Privacy Considerations

### Free Tier (P2P)

| Aspect | Privacy Level |
|--------|---------------|
| **Query content** | Visible to responding peers |
| **User identity** | did:peer visible to peers |
| **Results viewed** | Not tracked centrally |
| **Search history** | Stored locally only |

**Mitigations:**
- Users can use anonymous query mode (hides did:peer)
- Peers bound by Republet's P2P privacy terms
- No central logging of P2P queries

### Paid Tier (Hosted)

| Aspect | Privacy Level |
|--------|---------------|
| **Query content** | Logged for service improvement |
| **User identity** | Associated with account |
| **Results viewed** | Tracked for personalization |
| **Search history** | Stored in account |

**Mitigations:**
- Users can disable personalization
- Search history can be deleted
- Data never sold or shared externally
- GDPR-compliant data handling

---

## Future Development

### Planned Features

| Feature | Description | Tier |
|---------|-------------|------|
| **Semantic search** | ML-powered concept matching | Both |
| **Recommendations** | "You might also be interested in..." | Both |
| **Saved searches** | Alerts for new matches | Paid |
| **Citation alerts** | Notify when cited | Both |
| **Author alerts** | Notify on new publications | Both |
| **API access** | Programmatic search | Both |

### Index Expansion

OpenRL may expand to index:
- arXiv (via API)
- bioRxiv/medRxiv (via API)
- PubMed Central (open subset)
- Crossref DOI metadata
- User-submitted external content

---

## Summary

| Aspect | Free Tier | Paid Tier |
|--------|-----------|-----------|
| **Search method** | P2P broadcast | Hosted index |
| **Speed** | Gradual (async) | Instant |
| **Coverage** | Peer-dependent | Complete |
| **Full-text** | Limited | Full |
| **Privacy** | Higher (no central log) | Standard (account-linked) |
| **Cost** | Free | Included in $10/month |

---

*Version: 0.1.0*
*Last updated: 2025*
