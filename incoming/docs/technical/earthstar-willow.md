# Earthstar on Willow: Technical Introduction

## Overview

Republet uses **Earthstar** built on **Willow** for decentralized data synchronization. This document explains what these technologies are and why they were chosen.

---

## What is Willow?

Willow is a **data structure and protocol** for decentralized data storage and synchronization. It is not an application itself, but a foundation that applications like Republet build upon.

### Core Concepts

#### Entries
The basic unit of data in Willow is an **entry**. Each entry contains:
- A namespace (grouping)
- A path (like a file path)
- A payload (the actual data)
- A timestamp
- An author signature

#### Namespaces
Namespaces organize data into logical groups. For Republet:
- One namespace per user profile
- Shared namespaces for collaborative projects
- Public namespaces for published experiments

#### Paths
Paths provide hierarchical structure within namespaces:
```
/experiments/2025/001/data
/experiments/2025/001/protocols
/profile/orcid
/profile/affiliations
```

### Key Properties

| Property | What It Means |
|----------|---------------|
| **Multi-writer** | Multiple people can write to the same namespace |
| **Fine-grained permissions** | Control access per-entry, not per-namespace |
| **Efficient sync** | Only changes are transmitted, not entire datasets |
| **Conflict resolution** | Deterministic merging using timestamps |
| **Offline-first** | Work without network, sync when available |

---

## What is Earthstar?

Earthstar is a **library and application framework** that implements Willow and provides additional features needed for real applications.

### What Earthstar Adds to Willow

| Feature | Description |
|---------|-------------|
| **Identity** | Cryptographic keypairs for users, signed entries |
| **Storage adapters** | Browser storage, Node.js filesystem, SQLite |
| **Sync protocols** | How devices find and update each other |
| **Schema conventions** | Standard patterns for different data types |
| **Replicas** | Local copies of data that sync with others |

### Earthstar Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Republet App                        │
├─────────────────────────────────────────────────────────┤
│                     Earthstar                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Identity   │  │   Storage   │  │    Sync     │     │
│  │   (Keys)    │  │  Adapters   │  │  Protocols  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
├─────────────────────────────────────────────────────────┤
│                       Willow                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Entries   │  │  Namespaces │  │   Paths     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## How Republet Uses Earthstar/Willow

### User Identity

Each Republet user has:
- A **did:peer** identifier (their primary ID)
- An Earthstar **keypair** for signing data
- Their own **namespace** for their experiments

### Experiment Storage

Experiments are stored as structured entries:

```
Namespace: did:peer:user123
Path: /experiments/2025-001
Payload: { title, hypothesis, methodology, results, ... }

Namespace: did:peer:user123
Path: /experiments/2025-001/data/raw
Payload: [link to large data file or inline data]
```

### Collaboration

Shared namespaces allow:
- Multiple researchers on one project
- Peer reviewers with write access for annotations
- Public read access for published experiments

### Sync

When researchers collaborate:
1. Each has their own replica (local copy)
2. Changes are signed by the author
3. When connected, replicas sync
4. Conflicts resolved by timestamp (latest wins)

---

## LOI: Willow as Persistent Identifier

### Concept

The **Letter Object Identifier (LOI)** is Republet's native persistent identifier system, implemented as a layer on top of Willow's addressing. Unlike traditional identifiers (DOI, Handle) that require central registration, LOIs emerge naturally from Willow's structure.

### LOI Structure

```
LOI:republet.<namespace>.<path-hash>
```

| Component | Source | Example |
|-----------|--------|---------|
| `LOI:` | Protocol identifier | `LOI:` |
| `republet` | Network identifier | `republet` |
| `<namespace>` | Derived from author's did:peer | `dp.8x7k2m` |
| `<path-hash>` | Hash of Willow path | `abc123xyz` |

### How LOI Relates to Willow

```
┌─────────────────────────────────────────────────────────────────┐
│                      LOI Layer                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  LOI:republet.dp.8x7k2m.abc123xyz                         │  │
│  │                                                           │  │
│  │  - Human-friendly format                                  │  │
│  │  - Citation metadata                                      │  │
│  │  - Resolution services                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                      Willow Layer                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Namespace: did:peer:z6Mk...                              │  │
│  │  Path: /experiments/2025-001                              │  │
│  │  Payload: { title, methodology, results, ... }            │  │
│  │  Signature: <author-signature>                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### LOI Derivation

```typescript
// Namespace component: truncated hash of did:peer
function deriveNamespace(didPeer: string): string {
  const hash = sha256(didPeer).slice(0, 6);
  return `dp.${hash}`;
}

// Path component: hash of the Willow path
function derivePath(namespace: string, path: string): string {
  const fullPath = `${namespace}:${path}`;
  return base58Encode(sha256(fullPath)).slice(0, 9);
}

// Full LOI
function generateLOI(didPeer: string, willowPath: string): string {
  const namespace = deriveNamespace(didPeer);
  const pathHash = derivePath(namespace, willowPath);
  return `LOI:republet.${namespace}.${pathHash}`;
}
```

### Why This Works

| LOI Property | Willow Foundation |
|--------------|-------------------|
| **Permanent** | Willow addresses are content-addressed and namespace-bound |
| **Decentralized** | No central registration; LOI exists because the data exists |
| **Self-certifying** | Author's did:peer signature validates authenticity |
| **Resolvable** | Willow network provides P2P resolution |
| **Versionable** | Willow timestamps enable version addressing |

### LOI Resolution

```
LOI:republet.dp.8x7k2m.abc123xyz
           │
           ▼
┌─────────────────────────────────┐
│ Parse LOI components            │
│ - namespace: dp.8x7k2m          │
│ - path-hash: abc123xyz          │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│ Query Willow network            │
│ - Find namespace owner          │
│ - Resolve path from hash        │
│ - Retrieve entry                │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│ Verify signature                │
│ - Author's did:peer             │
│ - Entry integrity               │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│ Return content                  │
│ - Experiment data               │
│ - Citation metadata             │
└─────────────────────────────────┘
```

### LOI vs DOI on Willow

| Aspect | LOI | DOI |
|--------|-----|-----|
| **Storage** | Native to Willow | External metadata |
| **Resolution** | P2P via Willow | Centralized infrastructure |
| **Cost** | Free (automatic) | ~$1 per identifier |
| **Registration** | None required | Via Crossref/DataCite |
| **Relationship** | Primary identifier | Optional metadata |

### Version Addressing

LOIs support version specifiers:

```
LOI:republet.dp.8x7k2m.abc123xyz         # Latest version
LOI:republet.dp.8x7k2m.abc123xyz@v1      # Specific version
LOI:republet.dp.8x7k2m.abc123xyz@2025-03 # Version at date
```

This maps to Willow's timestamp-based conflict resolution.

---

## Willow vs. Alternatives

### vs. Hypercore

| Feature | Willow | Hypercore |
|---------|--------|-----------|
| Writers per namespace | Multiple | Single |
| Permission granularity | Per-entry | Per-core |
| Use case fit | Collaborative apps | Streaming data, feeds |
| Governance | Community (Earthstar team) | Holepunch |

**Why Willow for Republet:** Experiments are collaborative. Multiple researchers contribute to one experiment. Willow's multi-writer design fits naturally.

### vs. IPFS

| Feature | Willow | IPFS |
|---------|--------|------|
| Data model | Structured entries | Content-addressed files |
| Mutability | Native updates | Requires layering (IPNS) |
| Sync model | Sync what changed | Fetch what needed |
| Best for | Databases, apps | Files, static content |

**Why Willow for Republet:** Experiments are structured data that gets updated (drafts, revisions, annotations). IPFS excels at static files; Willow excels at mutable data.

### vs. Blockchain

| Feature | Willow | Blockchain |
|---------|--------|------------|
| Cost per write | Zero | Gas fees |
| Speed | Instant | Block times |
| Scale | Unbounded | Limited |
| Consensus | Eventually consistent | Global consensus |

**Why Willow for Republet:** Scientific experiments don't require global consensus. A researcher publishes; others discover. No need for blockchain's overhead.

---

## References

- Willow specification: To be linked
- Earthstar documentation: To be linked
- did:peer method: To be linked

---

*Version: 0.1.0*  
*Last updated: 2025*
