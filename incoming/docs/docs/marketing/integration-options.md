# Republet Integration Options

> Quick reference guide for Republet's integrations with external systems. For detailed technical explanations, see [Ecosystem and Integrations](./ecosystem.md).

---

## Overview

Republet integrates with the broader scholarly ecosystem while maintaining decentralization. This document provides a quick reference; see [ecosystem.md](./ecosystem.md) for detailed explanations of each service.

**Key Principle:** Republet provides redundancy and options, not replacement.

---

## Quick Reference Table

| System | Purpose | Integration | Cost | Republet Alternative |
|--------|---------|-------------|------|---------------------|
| **ORCID** | Researcher identity | OAuth, sync, backup | Free | did:peer (primary ID) |
| **DOI** | Persistent identifier | Passthrough payment | ~$1 per DOI | LOI (always free) |
| **arXiv/bioRxiv** | Preprint hosting | API linking | Free | Unified preprint server |
| **Zotero/Mendeley** | Citation management | Metadata standards | Free | Integrated reference manager |
| **OpenAlex** | Academic discovery | Data submission | Free | OpenRL (decentralized index) |
| **Google Scholar** | Academic search | Crawlability + partnerships | Free | — |
| **GitHub/GitLab** | Code hosting | Link repos, verify commits | Free | Forgejo (paid tier) |
| **Zenodo/Figshare** | Data repository | Link deposits | Free | Hosted storage (paid tier) |

---

## Identity Systems

### ORCID

**Purpose:** Universal researcher identifier

**Integration:**
- OAuth login convenience
- Profile sync (publications, affiliations)
- Bidirectional: Republet ↔ ORCID

**Republet as Peer Service:** Republet backs up ORCID data, preserving identity if ORCID ceases to exist.

*See [ecosystem.md: ORCID](./ecosystem.md#orcid) for detailed explanation.*

### did:peer (Primary Identity)

**Purpose:** Decentralized, user-controlled identity

**Integration:**
- Required for full account provisioning
- Signs all experiment submissions
- Portable across platforms

**Recovery:** Browser storage + keystore file + delegate system

*See [ecosystem.md: did:peer](./ecosystem.md#didpeer) and [Identity & Recovery](../technical/identity-recovery.md) for details.*

---

## Identifier Systems

### DOI (Digital Object Identifier)

**Purpose:** Persistent academic identifier

| Tier | DOI Provision |
|------|---------------|
| **Free** | No DOI creation; users enter existing DOIs |
| **Paid** | 20 DOIs/year included, with rollover |

**Payment:** Passthrough to registrar (Crossref/DataCite)

*See [ecosystem.md: DOI System](./ecosystem.md#doi-system) for detailed explanation.*

### LOI (Letter Object Identifier)

**Purpose:** Republet's free, decentralized identifier

**Format:** `LOI:republet.dp.8x7k2m.abc123xyz`

| Aspect | LOI | DOI |
|--------|-----|-----|
| Cost | Always free | ~$1 + membership |
| Registration | Automatic | Manual |
| Authority | Author | Registration agency |

**Relationship:** LOI is primary; DOI is optional metadata.

*See [LOI System](../technical/loi-system.md) for full specification.*

---

## Publication & Discovery

### Preprint Servers (arXiv, bioRxiv, etc.)

**Integration:**
- Link to external preprints
- Republet serves as unified preprint server for all disciplines
- Supports structured data + narrative PDFs

**Null Results:** Republet welcomes and categorizes null results (unlike traditional preprint servers).

*See [ecosystem.md: Preprint Servers](./ecosystem.md#preprint-servers) for details.*

### OpenAlex + OpenRL

**OpenAlex Integration:** Republet submits experiments for broader discovery.

**OpenRL (Republet's Alternative):**

| Tier | Search Method |
|------|---------------|
| **Free** | P2P query broadcast |
| **Paid** | Hosted full-text index |

**Why both?** OpenAlex is comprehensive; OpenRL is decentralized and censorship-resistant.

*See [ecosystem.md: OpenAlex](./ecosystem.md#openalex) and [OpenRL](../technical/openrl.md) for details.*

### Google Scholar & Semantic Scholar

**Integration:**
- Optimize pages for crawlability
- Direct API submission (Semantic Scholar)
- Explore official partnerships

---

## Research Tools

### Reference Managers (Zotero, Mendeley, EndNote)

**Integration:**
- Export BibTeX, RIS, CSL-JSON
- Embedded metadata for automatic capture
- Republet includes integrated reference manager

**Why it matters:** Citability is critical for adoption.

*See [ecosystem.md: Zotero and Reference Managers](./ecosystem.md#zotero-and-reference-managers) for details.*

### Code Repositories (GitHub, GitLab, Forgejo)

**Integration:**
- Link external repositories
- Verify specific commit hashes
- Display repository metadata

**Forgejo (Paid Tier):** Hosted Git instance with federation support.

*See [ecosystem.md: Code Infrastructure](./ecosystem.md#code-infrastructure) for details.*

### Data Repositories (Zenodo, Figshare)

**Integration:**
- Link to external data deposits
- Republet focuses on experiment reports; data repos handle large datasets

**Storage tiers:**

| Tier | Storage |
|------|---------|
| **Free** | External S3 URLs (user-configured) |
| **Paid** | 1TB hosted + external URLs |

*See [ecosystem.md: Data Infrastructure](./ecosystem.md#data-infrastructure) and [Storage](../technical/storage.md) for details.*

---

## Onboarding Integration

During account creation, Republet offers to import existing publications:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Import Your Publications                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Would you like to import your existing publications?           │
│                                                                 │
│  Import from:                                                   │
│  [✓] ORCID (found: 23 publications)                            │
│  [ ] Google Scholar                                             │
│  [ ] Semantic Scholar                                           │
│                                                                 │
│  [Import Selected]  [Skip for Now]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This is like importing contacts in chat software—optional but helpful for building a complete profile.

---

## Activity Monitoring

Republet monitors for activity related to users and their work:

| Tier | Method | Sources |
|------|--------|---------|
| **Free** | Passive (webhooks, polling) | ORCID, CrossRef, Republet |
| **Paid** | Active + Passive | + Google Scholar, Semantic Scholar, social media |

**Notification options:**
- Real-time, daily digest, or weekly digest
- In-app, email, browser push
- Per-type configuration

*See [CV & Notifications](../users/cv-notifications.md) for full details.*

---

## Integration Philosophy Summary

Republet's integration principles (detailed in [ecosystem.md](./ecosystem.md#the-integration-philosophy)):

1. **Connect, don't replace** — Integrate with existing infrastructure
2. **Open standards** — Use OAuth, BibTeX, RIS, etc.
3. **Optional integration** — Core functionality works independently
4. **Good citizenship** — Follow conventions, respect rate limits
5. **Redundancy as service** — Provide alternatives, not replacements

---

*Version: 0.3.0*
*Last updated: 2025*
