# Storage Architecture

> Comprehensive analysis of storage options for Republet's data hosting, external storage integration, and tier structure.

---

## Overview

Republet's storage architecture serves multiple purposes:

1. **Structured experiment data** — Text, metadata, citations (stored via Willow/Earthstar)
2. **Auxiliary files** — Datasets, images, supplementary materials (varies by tier)
3. **Code repositories** — Git hosting via Forgejo (paid tier)
4. **Search index** — OpenRL indexing service (paid tier)
5. **External storage integration** — User-provided S3-compatible storage (free tier)

---

## Storage Tiers

### Free Tier

| Storage Type | Provision |
|--------------|-----------|
| Structured experiment data | Unlimited via Willow P2P |
| Auxiliary files | Not hosted by Republet |
| External storage URLs | Supported—users configure their own S3-compatible storage |
| Code hosting | External links only (GitHub, GitLab, etc.) |
| OpenRL indexing | P2P query broadcast (no centralized index) |

**External Storage Integration:**

Free tier users can specify URLs to their own cloud storage for large files. Republet provides a wizard to help configure:

- S3-compatible storage (any provider)
- Bucket creation and access configuration
- URL generation for linking to Republet experiments

### Paid Tier ($10/month or $100/year)

| Storage Type | Provision |
|--------------|-----------|
| Structured experiment data | Unlimited via Willow P2P |
| Auxiliary files | Up to 1TB included |
| External storage URLs | Supported in addition to hosted storage |
| Code hosting | Forgejo instance included |
| OpenRL indexing | Full centralized indexing service |

**Overage Pricing:**

| Usage | Pricing |
|-------|---------|
| 1TB - 10TB | $0.02/GB/month |
| 10TB - 100TB | $0.015/GB/month (volume discount) |
| 100TB+ | Custom pricing available |

---

## S3-Compatible Storage Options

Republet recommends S3-compatible object storage for external file hosting. This section analyzes options for users configuring their own storage.

### Comparison Matrix

| Provider | Type | Price (Standard) | Price (Archive) | Egress Fees | Notes |
|----------|------|------------------|-----------------|-------------|-------|
| **Min.io** | Self-hosted | Free (open source) | N/A | None | Best for full control |
| **Wasabi** | Cloud | $6.99/TB/month | N/A | Free | No egress fees |
| **AWS S3** | Cloud | $23/TB/month | $1/TB/month (Glacier) | $90/TB | Industry standard, complex pricing |
| **Cloudflare R2** | Cloud | $15/TB/month | N/A | Free | Zero egress fees |
| **Backblaze B2** | Cloud | $6/TB/month | $1.5/TB/month | $10/TB | Simple pricing, good for backup |
| **Google Cloud Storage** | Cloud | $23/TB/month | $1.2/TB/month (Coldline) | $120/TB | Integrated with GCP ecosystem |
| **Azure Blob Storage** | Cloud | $18/TB/month | $0.99/TB/month (Archive) | $87/TB | Integrated with Azure ecosystem |

---

## Detailed Provider Analysis

### Min.io (Self-Hosted)

**Overview:** Min.io is an open-source, high-performance object storage server compatible with the Amazon S3 API. It can be self-hosted on any infrastructure.

| Aspect | Details |
|--------|---------|
| **License** | AGPLv3 (free) or Enterprise license |
| **Deployment** | Docker, Kubernetes, bare metal, any OS |
| **Performance** | Extremely high throughput (183 GB/sec on 32 nodes) |
| **Features** | Versioning, replication, encryption, IAM, lifecycle policies |
| **Scale** | Single node to distributed multi-site clusters |

**Advantages for Republet Users:**
- **Zero egress fees** — You own the infrastructure
- **Full control** — Data never leaves your servers
- **Privacy** — No third-party access to data
- **Integration** — Native S3 API compatibility

**Considerations:**
- Requires technical knowledge to deploy and maintain
- User responsible for backups and redundancy
- Infrastructure costs (hardware or cloud VM) are user's responsibility

**Recommended For:**
- Tech-savvy researchers with existing infrastructure
- Institutions with data sovereignty requirements
- Privacy-conscious users who want full control

**Deployment Options:**

```bash
# Quick start (Docker)
docker run -p 9000:9000 -p 9001:9001 \
  -v /data:/data \
  minio/minio server /data --console-address ":9001"

# Kubernetes (via operator)
kubectl apply -f https://raw.githubusercontent.com/minio/operator/master/resources/crd.yaml
```

---

### Wasabi

**Overview:** Wasabi is a cloud object storage provider known for simple, predictable pricing with no egress fees.

| Aspect | Details |
|--------|---------|
| **Pricing** | $6.99/TB/month (no tiers) |
| **Minimum storage duration** | 90 days (early deletion fees apply) |
| **Egress** | Free |
| **Regions** | US, EU, APAC |
| **Durability** | 11 nines (99.999999999%) |

**Advantages for Republet Users:**
- **Predictable costs** — One price, no surprises
- **No egress fees** — Download as much as you need
- **Simple** — No complex tier decisions
- **Compliance** — SOC 2, ISO 27001, GDPR compliant

**Considerations:**
- 90-day minimum storage duration
- No archive tier for rarely-accessed data
- Fewer regions than AWS

**Recommended For:**
- Researchers who need simple, predictable costs
- Heavy download patterns (no egress penalty)
- Small to medium datasets

---

### AWS S3

**Overview:** Amazon S3 is the industry-standard object storage service with the most features and global reach.

| Aspect | Details |
|--------|---------|
| **Standard** | ~$23/TB/month |
| **Glacier Instant** | ~$4/TB/month |
| **Glacier Deep Archive** | ~$1/TB/month |
| **Egress** | ~$90/TB (first 100GB/month free) |
| **Regions** | Global (25+ regions) |

**Advantages for Republet Users:**
- **Industry standard** — Most tools integrate with S3
- **Archive tiers** — Extremely cheap for long-term storage
- **Global reach** — Regions worldwide
- **Ecosystem** — Integrated with AWS services

**Considerations:**
- **Egress fees** — Expensive for frequent downloads
- **Complex pricing** — Storage, requests, egress, tiers
- **Minimum storage** — Some tiers have minimums

**Recommended For:**
- Users already in AWS ecosystem
- Archival storage (Glacier tiers)
- Global teams needing regional storage

---

### Cloudflare R2

**Overview:** Cloudflare R2 is a relatively new object storage service with zero egress fees, built on Cloudflare's global network.

| Aspect | Details |
|--------|---------|
| **Storage** | $15/TB/month |
| **Class A operations** | $4.50/million |
| **Class B operations** | $0.36/million |
| **Egress** | Free |
| **Regions** | Automatic global distribution |

**Advantages for Republet Users:**
- **Zero egress fees** — Download anywhere, anytime
- **Global CDN** — Automatic distribution for fast access
- **S3-compatible** — Drop-in replacement for S3
- **Simple pricing** — Storage + operations only

**Considerations:**
- Fewer regions than AWS (but automatic distribution)
- Newer service, fewer features than S3
- Operation costs can add up for high-frequency access

**Recommended For:**
- Public datasets with heavy download traffic
- Global teams needing fast access everywhere
- Users wanting S3 simplicity without egress fees

---

### Backblaze B2

**Overview:** Backblaze B2 offers simple, low-cost cloud storage with transparent pricing.

| Aspect | Details |
|--------|---------|
| **Storage** | $6/TB/month |
| **Archive** | $1.5/TB/month (B2 Archive) |
| **Egress** | ~$10/TB (first 3GB/day free) |
| **Regions** | US, EU |

**Advantages for Republet Users:**
- **Low storage cost** — Cheaper than most alternatives
- **Simple pricing** — Easy to predict costs
- **Archive tier** — For rarely-accessed data
- **Integration** — S3-compatible API

**Considerations:**
- Egress fees exist but are lower than AWS
- Fewer regions than major clouds
- Smaller company (less enterprise features)

**Recommended For:**
- Budget-conscious researchers
- Backup and archival use cases
- Simple storage needs

---

## Republet Storage Wizard

Republet provides a guided wizard for users to configure external storage.

### Wizard Flow

```
1. Choose Storage Provider
   ├── Min.io (Self-Hosted)
   ├── Wasabi
   ├── AWS S3
   ├── Cloudflare R2
   ├── Backblaze B2
   └── Other S3-Compatible

2. Configure Credentials
   ├── Enter Access Key ID
   ├── Enter Secret Access Key
   ├── (Optional) Region Selection
   └── (Optional) Endpoint URL

3. Create/Select Bucket
   ├── Create New Bucket (recommended name: republet-{username})
   ├── Select Existing Bucket
   └── Configure Permissions

4. Test Connection
   ├── Upload test file
   ├── Verify access
   └── Confirm success

5. Configure Integration
   ├── Auto-generate URLs for uploaded files
   ├── Set default visibility (public/private)
   └── Enable/disable versioning

6. Complete
   ├── Storage configured successfully
   ├── Upload files via Republet interface
   └── Files linked to experiments automatically
```

### Security Considerations

| Practice | Implementation |
|----------|----------------|
| **Credential storage** | Encrypted at rest, never logged |
| **Least privilege** | Recommend read/write scope only |
| **Bucket policies** | Wizard suggests secure defaults |
| **Public access** | User controls per-bucket |
| **Rotation** | Remind users to rotate keys periodically |

---

## Republet-Hosted Storage (Paid Tier)

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Republet Paid Tier                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   Min.io      │  │   Forgejo     │  │   OpenRL      │   │
│  │   Cluster     │  │   Instance    │  │   Index       │   │
│  │   (Files)     │  │   (Git)       │  │   (Search)    │   │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘   │
│          │                  │                  │           │
│          └──────────────────┴──────────────────┘           │
│                            │                               │
│                   ┌────────┴────────┐                      │
│                   │   Shared        │                      │
│                   │   Storage       │                      │
│                   │   Backend       │                      │
│                   └─────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

Republet's hosted storage uses **Min.io** as the backend:

- **Why Min.io:** S3-compatible, open source, high performance, multi-tenant support
- **Deployment:** Kubernetes cluster with persistent volumes
- **Multi-tenancy:** Each user gets isolated namespace
- **Backup:** Cross-region replication for durability

### Quota Management

| Metric | Tracking |
|--------|----------|
| Storage used | Real-time per-user metering |
| Bandwidth | Ingress/egress tracking |
| Objects | Count and size distribution |
| Alerts | 80%, 90%, 100% quota warnings |

---

## File Size Limits

| Tier | Max Single File | Max Per Upload |
|------|-----------------|----------------|
| Free (external) | Determined by user's provider | Determined by user's provider |
| Paid (hosted) | 5TB (S3 limit) | 5TB via multipart upload |

**Recommendations for large datasets:**
- Files >100GB: Use multipart upload
- Files >1TB: Consider splitting into chunks
- Datasets >10TB: Contact support for optimization

---

## Data Persistence & Backup

### Willow/Earthstar Data

- **Decentralized storage** — Data lives on user devices
- **Replication** — Multiple copies across network
- **User responsibility** — Users should maintain their own replicas

### Republet-Hosted Data (Paid Tier)

| Protection | Implementation |
|------------|----------------|
| **Replication** | 3x replication within cluster |
| **Backup** | Daily snapshots, 30-day retention |
| **Disaster recovery** | Cross-region backup capability |
| **User export** | Full export available anytime |

### External Storage

- **User responsibility** — Republet does not control external storage
- **Recommendations provided** — Wizard suggests backup strategies
- **Integration** — Can link multiple storage providers

---

## Future Considerations

### Planned Features

| Feature | Description | Priority |
|---------|-------------|----------|
| **Storage analytics** | Dashboard showing usage by file type, size, access patterns | Medium |
| **Auto-tiering** | Move rarely-accessed files to cheaper storage | Low |
| **Federation** | Share storage quotas across team/lab accounts | Medium |
| **IPFS integration** | Option to pin files to IPFS for additional redundancy | Low |

### Scalability

| Phase | Capacity | Infrastructure |
|-------|----------|----------------|
| **Launch** | Up to 100TB total | Single Kubernetes cluster |
| **Growth** | 100TB - 1PB | Multi-cluster, single region |
| **Scale** | 1PB+ | Multi-region distributed storage |

---

## Summary Recommendations

### For Free Tier Users

| User Type | Recommended Provider | Reasoning |
|-----------|---------------------|-----------|
| Tech-savvy, privacy-focused | **Min.io (self-hosted)** | Full control, no fees |
| Budget-conscious | **Backblaze B2** | Lowest storage cost |
| Heavy downloads | **Cloudflare R2** or **Wasabi** | No egress fees |
| Simple needs | **Wasabi** | Simple pricing, no surprises |

### For Paid Tier Users

- Republet-hosted storage included up to 1TB
- No configuration needed
- Can still link external storage for overflow or specialized needs

---

*Version: 0.1.0*
*Last updated: 2025*
