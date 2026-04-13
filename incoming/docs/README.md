# Republet Documentation Library

> A decentralized scientific laboratory experimentation reporting system that doesn't reject failed experiments.

---

## Documentation Structure

```
docs/
├── README.md                    # This file
├── philosophy.md                # Integration & platform philosophy
│
├── design/                      # Design documentation
│   ├── vision.md                # Project vision and philosophy
│   └── ui-design-guide.md       # UI design guide (future)
│
├── technical/                   # Technical specifications
│   ├── earthstar-willow.md      # Willow/Earthstar data layer
│   ├── loi-system.md            # Letter Object Identifier system
│   ├── openrl.md                # Decentralized academic index
│   ├── identity-recovery.md     # Identity & account recovery
│   ├── storage.md               # Storage architecture & options
│   ├── grpc-architecture.md     # gRPC service architecture
│   └── data-schema.md           # (future)
│
├── users/                       # User documentation
│   ├── cv-notifications.md      # CV & activity monitoring
│   ├── getting-started.md       # (future)
│   └── submitting-experiments.md # (future)
│
└── marketing/                   # Marketing documentation
    ├── matrix.md                # Platform relationship matrix
    ├── ecosystem.md             # Ecosystem integrations
    └── integration-options.md   # Integration options overview
```

---

## Core Principles

1. **Knowledge over Success** — All experiments are equally valuable regardless of outcome
2. **Decentralization First** — No central authority controls scientific knowledge
3. **Open by Default** — Everything is open source and accessible
4. **Modular Specialization** — General foundation with domain-specific modules
5. **No Lock-in** — Open standards, no paid dependencies
6. **Redundancy as Service** — Provide alternatives, not replacements

---

## Key Concepts

### Identity

- **Primary**: did:peer (decentralized, user-controlled)
- **Convenience**: OAuth (ORCID, Google, GitHub, Microsoft)
- **Recovery**: Delegate system with Shamir's Secret Sharing

### Identifiers

- **LOI (Letter Object Identifier)**: Always free, decentralized, permanent
- **DOI**: Optional, for bridging to traditional academic infrastructure
- **Relationship**: LOI is primary; DOI is metadata

### Storage

- **Free Tier**: External S3-compatible storage (user-configured)
- **Paid Tier**: 1TB hosted storage + Forgejo code hosting
- **P2P**: Willow/Earthstar for structured experiment data

### Discovery

- **OpenRL**: Republet's decentralized academic index
- **Free Tier**: P2P query broadcast
- **Paid Tier**: Hosted full-text index

---

## Quick Links

### Getting Started
- [Vision & Philosophy](./design/vision.md)
- [Platform Philosophy](./philosophy.md)

### Technical Architecture
- [Earthstar on Willow](./technical/earthstar-willow.md)
- [LOI System](./technical/loi-system.md)
- [OpenRL Index](./technical/openrl.md)
- [Identity & Recovery](./technical/identity-recovery.md)
- [Storage Architecture](./technical/storage.md)
- [gRPC Architecture](./technical/grpc-architecture.md)

### Integrations
- [Ecosystem Overview](./marketing/ecosystem.md)
- [Relationship Matrix](./marketing/matrix.md)
- [Integration Options](./marketing/integration-options.md)

### User Guides
- [CV & Notifications](./users/cv-notifications.md)

---

## Pricing Tiers

| Feature | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Cost** | $0 | $10/month or $100/year |
| **Identity** | did:peer + OAuth | did:peer + OAuth |
| **LOI (identifiers)** | Unlimited, always free | Unlimited, always free |
| **DOI allowance** | None (user can provide own) | 20/year with rollover |
| **Storage** | External URLs only | Up to 1TB hosted |
| **Code hosting** | External links only | Forgejo instance included |
| **Search (OpenRL)** | P2P broadcast | Hosted full-text index |
| **Activity monitoring** | Passive | Active + Passive |

---

## What Makes Republet Unique

| Feature | Republet | Others |
|---------|----------|--------|
| Structured experiment reports | ✓ | Rare |
| Never rejects based on outcome | ✓ | Very rare |
| Decentralized | ✓ | Almost none |
| Free persistent identifiers (LOI) | ✓ | None |
| Multi-disciplinary by design | ✓ | Some |
| Offline-first | ✓ | None |
| Reference manager integrated | ✓ | None |
| Unified preprint server | ✓ | None |

---

## Relationship to Existing Systems

Republet is a **peer service** to existing scholarly infrastructure, not a replacement:

| System | Republet's Role |
|--------|-----------------|
| **ORCID** | Backup and peer service; preserves identity data |
| **DOI (Crossref/DataCite)** | LOI provides decentralized alternative; DOI supported as optional |
| **OpenAlex** | OpenRL provides decentralized index; Republet also submits to OpenAlex |
| **arXiv/bioRxiv** | Unified preprint server; links to and supports discipline-specific servers |
| **Zotero/Mendeley** | Integrated reference manager; compatible with existing tools |
| **GitHub/GitLab** | Forgejo hosting (paid); external linking (free) |

---

*Last updated: 2025*
