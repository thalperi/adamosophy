# Letter Object Identifier (LOI) System

> Technical specification for Republet's native, decentralized, always-free persistent identifier system.

---

## Overview

The **Letter Object Identifier (LOI)** is Republet's native persistent identifier system for scholarly content. Unlike the DOI system, which relies on centralized registration agencies, LOIs are:

- **Always free** — No cost to create or resolve
- **Decentralized** — No central authority controls registration
- **Permanent** — Identifier resolves as long as the P2P network exists
- **Self-certifying** — Cryptographic proof of authenticity
- **Human-friendly** — Designed for citability

---

## LOI Format

### Structure

```
LOI:republet.<namespace>.<path-hash>
```

| Component | Description | Example |
|-----------|-------------|---------|
| `LOI:` | Protocol identifier | `LOI:` |
| `republet` | Namespace prefix (identifies Republet network) | `republet` |
| `<namespace>` | Author's did:peer identifier (truncated) | `dp.8x7k2m` |
| `<path-hash>` | Hash of the content path | `abc123xyz` |

### Full Example

```
LOI:republet.dp.8x7k2m.abc123xyz
```

This identifier:
- Is human-readable and citable
- Contains enough information to resolve the content
- Provides cryptographic verification of authorship

### Canonical Resolution URL

Every LOI resolves to a URL on the Republet network:

```
https://republet.org/loi/republet.dp.8x7k2m.abc123xyz
```

Or via P2P resolution:
```
republet://dp.8x7k2m/experiments/abc123xyz
```

---

## Technical Implementation

### Relationship to Willow

LOIs are implemented as a layer on top of Willow's addressing system:

```
┌─────────────────────────────────────────────────────────────┐
│                      LOI Layer                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  LOI:republet.dp.8x7k2m.abc123xyz                   │    │
│  │  - Human-friendly format                            │    │
│  │  - Citation metadata                                │    │
│  │  - Resolution services                              │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                      Willow Layer                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Namespace: did:peer:user123...                     │    │
│  │  Path: /experiments/2025-001                        │    │
│  │  Payload: { title, methodology, results, ... }     │    │
│  │  Signature: <author-signature>                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### LOI Generation Process

```
1. Author creates experiment
   ├── Content is structured and signed with author's did:peer
   └── Content is stored in Willow namespace

2. Willow address is generated
   ├── Namespace: author's did:peer
   ├── Path: /experiments/{timestamp}-{slug}
   └── Entry is written to local replica

3. LOI is derived
   ├── Namespace component: truncated did:peer hash
   ├── Path component: hash of full path
   └── Combined: LOI:republet.{namespace}.{path}

4. LOI becomes permanent identifier
   ├── Embedded in citation metadata
   ├── Resolvable via Republet network
   └── Independent of any central authority
```

### Namespace Component

The namespace component is derived from the author's did:peer:

```typescript
function deriveNamespace(didPeer: string): string {
  // did:peer format: did:peer:z6Mk...
  // We take a short hash for human-friendliness
  const hash = sha256(didPeer).slice(0, 6);
  return `dp.${hash}`;
}
```

### Path Component

The path component is derived from the Willow path:

```typescript
function derivePath(namespace: string, path: string): string {
  // Full path includes namespace for uniqueness
  const fullPath = `${namespace}:${path}`;
  // Base58 encoding for URL-safe, human-friendly output
  return base58Encode(sha256(fullPath)).slice(0, 9);
}
```

---

## LOI vs DOI

### Conceptual Comparison

| Aspect | LOI | DOI |
|--------|-----|-----|
| **Cost** | Always free | ~$1 per DOI + membership |
| **Registration** | Automatic (decentralized) | Manual (via registrar) |
| **Authority** | Author (via did:peer) | Registration agency |
| **Permanence** | P2P network persistence | Registrar obligation |
| **Resolution** | P2P or HTTP gateway | DOI resolution infrastructure |
| **Metadata** | Embedded in content | Registered with agency |
| **Citation support** | Full | Full (industry standard) |

### Coexistence

Republet supports both LOI and DOI:

```
┌─────────────────────────────────────────────────────────────┐
│                    Republet Experiment                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Primary Identifier:                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  LOI:republet.dp.8x7k2m.abc123xyz                   │    │
│  │  (Always present, always free)                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Optional Identifier:                                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  DOI: 10.12345/republet.abc123xyz                   │    │
│  │  (If user has/wants a DOI)                          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Relationship:                                              │
│  - DOI is metadata that points to LOI                      │
│  - LOI is the persistent, decentralized identifier         │
│  - Both can be cited                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### When to Use Each

| Scenario | Recommended Identifier |
|----------|----------------------|
| General Republet publication | LOI (automatic) |
| Citation in academic paper | LOI or DOI (if available) |
| Grant application requiring DOI | DOI (paid tier or user-provided) |
| Maximum portability | LOI (no central dependency) |
| Traditional journal submission | DOI (expected by journals) |

---

## Resolution Mechanism

### HTTP Resolution

Republet provides an HTTP gateway for LOI resolution:

```
GET https://republet.org/loi/republet.dp.8x7k2m.abc123xyz
```

Response:
```json
{
  "loi": "LOI:republet.dp.8x7k2m.abc123xyz",
  "doi": "10.12345/republet.abc123xyz",
  "title": "Experiment Title",
  "authors": [
    {
      "name": "Dr. Jane Smith",
      "orcid": "0000-0000-0000-0000",
      "did_peer": "did:peer:z6Mk..."
    }
  ],
  "created": "2025-01-15T10:30:00Z",
  "modified": "2025-01-15T10:30:00Z",
  "content_url": "https://republet.org/experiments/dp.8x7k2m/abc123xyz",
  "willow_address": {
    "namespace": "did:peer:z6Mk...",
    "path": "/experiments/2025-001"
  }
}
```

### P2P Resolution

Users with Republet client can resolve LOIs directly via the P2P network:

```
republet-cli resolve LOI:republet.dp.8x7k2m.abc123xyz
```

This queries the Willow network directly, bypassing any HTTP infrastructure.

### Resolution Flow

```
┌──────────────────────────────────────────────────────────────┐
│                      LOI Resolution                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  User inputs LOI                                             │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐                                            │
│  │ Parse LOI   │                                            │
│  │ components  │                                            │
│  └─────┬───────┘                                            │
│        │                                                     │
│        ▼                                                     │
│  ┌─────────────┐     ┌─────────────┐                        │
│  │ HTTP Lookup │ OR  │ P2P Lookup  │                        │
│  │ (gateway)   │     │ (Willow)    │                        │
│  └─────┬───────┘     └─────┬───────┘                        │
│        │                   │                                 │
│        └─────────┬─────────┘                                │
│                  │                                          │
│                  ▼                                          │
│         ┌───────────────┐                                   │
│         │ Verify        │                                   │
│         │ signature     │                                   │
│         └───────┬───────┘                                   │
│                 │                                            │
│                 ▼                                            │
│         ┌───────────────┐                                   │
│         │ Return        │                                   │
│         │ content       │                                   │
│         └───────────────┘                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Citation Support

### Citation Metadata

Every LOI resolves to citation metadata in standard formats:

#### BibTeX

```bibtex
@experiment{republet_dp_8x7k2m_abc123xyz,
  author = {Smith, Jane and Jones, Bob},
  title = {Effect of Temperature on Chemical Reaction Rate},
  year = {2025},
  loi = {LOI:republet.dp.8x7k2m.abc123xyz},
  doi = {10.12345/republet.abc123xyz},
  url = {https://republet.org/loi/republet.dp.8x7k2m.abc123xyz}
}
```

#### RIS

```
TY  - DATA
AU  - Smith, Jane
AU  - Jones, Bob
T1  - Effect of Temperature on Chemical Reaction Rate
PY  - 2025
DO  - 10.12345/republet.abc123xyz
UR  - https://republet.org/loi/republet.dp.8x7k2m.abc123xyz
ID  - LOI:republet.dp.8x7k2m.abc123xyz
ER  -
```

#### CSL-JSON

```json
{
  "type": "dataset",
  "id": "LOI:republet.dp.8x7k2m.abc123xyz",
  "author": [
    {"family": "Smith", "given": "Jane"},
    {"family": "Jones", "given": "Bob"}
  ],
  "title": "Effect of Temperature on Chemical Reaction Rate",
  "issued": {"date-parts": [[2025, 1, 15]]},
  "DOI": "10.12345/republet.abc123xyz",
  "URL": "https://republet.org/loi/republet.dp.8x7k2m.abc123xyz"
}
```

### Reference Manager Integration

Republet experiments can be imported into reference managers:

| Manager | Method |
|---------|--------|
| **Zotero** | Embedded metadata + browser extension |
| **Mendeley** | Embedded metadata + web import |
| **EndNote** | RIS export |
| **Paperpile** | Embedded metadata |
| **JabRef** | BibTeX export |

---

## Versioning

### LOI Versioning Model

LOIs support versioning while maintaining permanence:

```
LOI:republet.dp.8x7k2m.abc123xyz         # Latest version
LOI:republet.dp.8x7k2m.abc123xyz@v1      # Specific version
LOI:republet.dp.8x7k2m.abc123xyz@2025-01 # Version at date
```

### Version Resolution

```
┌─────────────────────────────────────────────────────────────┐
│                     Version Resolution                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LOI without version:                                       │
│  LOI:republet.dp.8x7k2m.abc123xyz                          │
│  → Resolves to latest version                               │
│                                                             │
│  LOI with version:                                          │
│  LOI:republet.dp.8x7k2m.abc123xyz@v2                       │
│  → Resolves to version 2 specifically                       │
│                                                             │
│  LOI with timestamp:                                        │
│  LOI:republet.dp.8x7k2m.abc123xyz@2025-03-01               │
│  → Resolves to version as of March 1, 2025                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Citation Behavior

When citing an LOI:
- **Without version**: Citation links to current version (recommended for most cases)
- **With version**: Citation links to specific version (for reproducibility citations)

---

## Decentralized Registration

### No Central Registry

Unlike DOI, LOI registration requires no central authority:

```
┌─────────────────────────────────────────────────────────────┐
│                    DOI Registration                          │
│                                                             │
│  Author → Publisher → Crossref → DOI Registry → Resolution │
│          (fees)      (fees)    (centralized)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    LOI Registration                          │
│                                                             │
│  Author → Willow → P2P Network → Resolution                 │
│          (free)    (decentralized)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Self-Certification

LOIs are self-certifying:

```typescript
interface LOIRecord {
  loi: string;
  contentHash: string;
  authorSignature: string;
  authorDidPeer: string;
  timestamp: number;
}

function verifyLOI(record: LOIRecord): boolean {
  // 1. Verify content hash matches
  const computedHash = hashContent(record.content);
  if (computedHash !== record.contentHash) return false;

  // 2. Verify author signature
  const validSignature = verifySignature(
    record.contentHash,
    record.authorSignature,
    record.authorDidPeer
  );
  if (!validSignature) return false;

  // 3. Verify LOI derivation
  const expectedLOI = deriveLOI(record.authorDidPeer, record.path);
  if (expectedLOI !== record.loi) return false;

  return true;
}
```

This means:
- Anyone can verify an LOI without contacting any server
- LOIs cannot be forged
- Authorship is cryptographically proven

---

## LOI Registry Service (Optional)

While LOIs don't require central registration, Republet provides an optional registry service for enhanced discoverability.

### Purpose

- **Discovery**: Make LOIs searchable via OpenRL
- **Metadata enrichment**: Add citation counts, references
- **Bridging**: Connect LOIs to DOIs, ORCIDs, etc.

### Registration (Optional)

```typescript
// LOI is already valid without registration
const loi = createLOI(experiment);

// Optional: Register for enhanced discoverability
await registerLOI(loi, {
  title: experiment.title,
  authors: experiment.authors,
  keywords: experiment.keywords,
  abstract: experiment.abstract
});
```

### Registration is Non-Required

Key principle: **Registration enhances but is never required.**

- Unregistered LOIs are still valid and resolvable
- Registration adds metadata for search/indexing
- Users can opt out entirely

---

## Comparison to Other Identifier Systems

### LOI vs DOI vs arXiv ID vs Handle

| Feature | LOI | DOI | arXiv ID | Handle |
|---------|-----|-----|----------|--------|
| **Cost** | Free | ~$1 + membership | Free | Free (for some) |
| **Decentralized** | ✓ | ✗ | ✗ | ✗ |
| **Self-certifying** | ✓ | ✗ | ✗ | ✗ |
| **Version support** | ✓ | ✓ | ✓ | ✓ |
| **Citation standard** | Emerging | Industry | Field-specific | Variable |
| **Requires authority** | ✗ | ✓ | ✓ | ✓ |

### LOI vs IPFS CID

| Feature | LOI | IPFS CID |
|---------|-----|----------|
| **Human-friendly** | ✓ | ✗ (long hash) |
| **Author attribution** | ✓ (built-in) | ✗ (separate) |
| **Versioning** | ✓ | ✗ (each version = new CID) |
| **Metadata** | ✓ (embedded) | ✗ (separate) |
| **Primary use** | Scholarly content | General content |

---

## Future Development

### Planned Features

| Feature | Description | Status |
|---------|-------------|--------|
| **LOI shortcuts** | User-defined aliases for LOIs | Planned |
| **LOI collections** | Group related LOIs | Planned |
| **LOI relationships** | Citations, derivations, corrections | Planned |
| **LOI analytics** | View counts, citations (opt-in) | Planned |
| **Cross-registry** | Sync with DOI, Handle registries | Future |

### Governance

LOI specification is open and community-governable:

- Specification is open source
- Republet serves as reference implementation
- Community can propose extensions
- No single entity controls the standard

---

## Summary

| Characteristic | LOI Implementation |
|----------------|-------------------|
| **Format** | `LOI:republet.<namespace>.<path-hash>` |
| **Cost** | Always free |
| **Registration** | Automatic, decentralized |
| **Resolution** | HTTP gateway + P2P |
| **Verification** | Self-certifying via did:peer |
| **Citation support** | BibTeX, RIS, CSL-JSON |
| **Versioning** | Supported with optional version specifiers |
| **Relationship to DOI** | Complementary; DOI as optional metadata |

---

*Version: 0.1.0*
*Last updated: 2025*
