# Republet: Vision & Philosophy

## Name Origin

**Republet** is named after Leibniz's *Republic of Letters* — his vision of a community of scholars sharing knowledge freely across borders.

The name also evokes "let us republish," echoing Leibniz's famous plea "let us calculate." We are asking the industry to let researchers publish all experiments, not just successful ones.

---

## Platform Focus

### Primary Platforms
- Desktop workstations
- Notebook/laptop computers
- Larger tablets

These platforms support full content creation and rich interaction. The UI is designed for these dimensions as the majority use case.

### Secondary Platform
- Mobile phones

Mobile prioritizes **lookup and research** over content creation. Simplified UI optimized for:
- Searching experiments
- Viewing experiment details
- Saving/bookmarking
- Quick reference

---

## Authentication

### Primary Identity: did:peer

**did:peer** is the only authentication method that fully provisions a Republet account. This ensures decentralization as the nature of every user's primary ID.

**What is did:peer?** A decentralized identifier method that requires no central registry. The identifier is created locally and can be verified cryptographically without any intermediary.

### OAuth Support (Convenience Layer)

Republet supports OAuth login from multiple providers:
- ORCID
- Google
- Microsoft
- GitHub

**Bundling:** All OAuth logins are bundled together so we recognize the same person regardless of which provider they use.

**Provisioning rule:** Even after OAuth login, the user must create or supply a did:peer ID before the account is fully provisioned and usable.

### Why This Approach

| Layer | Purpose | Centralization |
|-------|---------|----------------|
| OAuth | Convenience, account recovery, platform linking | Centralized but optional |
| did:peer | True identity, cryptographic verification, portability | Fully decentralized |

The user's core identity exists independently of any platform. If Google, Microsoft, and GitHub all disappeared, the user still owns their did:peer and all their Republet data.

### Identity Recovery

Republet provides multiple key storage options:
- **Browser localStorage** — Quick access, browser-dependent
- **Downloadable keystore file** — Portable, user-controlled
- **Both with backup options** — Recommended

**Delegate System:** Users can appoint other Republet users as delegates who can safely store private keys and OAuth tokens for recovery. Shamir's Secret Sharing enables threshold-based recovery (e.g., 3 of 5 delegates required).

See [Identity & Recovery](../technical/identity-recovery.md) for full details.

---

## Profile Integration

Republet profiles attach relevant information from users' accounts on integrated platforms via those platforms' APIs. This allows Republet users to interact with their other accounts from within Republet.

Example: A researcher links their ORCID, GitHub, and arXiv accounts. Their Republet profile shows publications, code repositories, and preprints, with interaction capabilities via APIs.

---

## Decentralization: Earthstar on Willow

### What is Willow?

Willow is a data structure and protocol for decentralized, synchronized data storage. It provides:

- **Fine-grained permissions** — Control who can read/write specific data
- **Efficient sync** — Only changes are transmitted
- **Conflict resolution** — Deterministic merging without central authority
- **Namespace isolation** — Different data types stay organized

### What is Earthstar?

Earthstar is a library that implements Willow and adds:
- User identity (keys, signatures)
- Data schema conventions
- Sync protocols
- Storage adapters (browser, Node.js, etc.)

### Why This Combination

| Feature | Benefit for Republet |
|---------|---------------------|
| No central server | Experiments live on researcher devices |
| Offline-first | Work without internet, sync later |
| User-controlled keys | Researchers own their data |
| Efficient sync | Large experiment datasets sync reasonably |
| Permission control | Private drafts, public experiments, shared projects |

### Relationship to Alternatives

**vs. Hypercore:**
- Willow allows fine-grained permissions per entry; Hypercore is all-or-nothing per "core"
- Willow supports multiple writers to the same namespace; Hypercore is single-writer per core
- Earthstar on Willow is designed for collaborative applications like Republet

---

## Letter Object Identifier (LOI)

### What is an LOI?

The **Letter Object Identifier (LOI)** is Republet's native, decentralized, always-free persistent identifier for scholarly content.

**Format:** `LOI:republet.<namespace>.<path-hash>`

Example: `LOI:republet.dp.8x7k2m.abc123xyz`

### LOI vs DOI

| Aspect | LOI | DOI |
|--------|-----|-----|
| **Cost** | Always free | ~$1 per DOI + membership |
| **Registration** | Automatic (decentralized) | Manual (via registrar) |
| **Authority** | Author (via did:peer) | Registration agency |
| **Permanence** | P2P network persistence | Registrar obligation |

### Implementation

LOIs are implemented as a layer on top of Willow's addressing system. The identifier is derived from:
- Author's did:peer (namespace component)
- Content path hash (path component)

No central registration required—the act of publishing creates the LOI.

See [LOI System](../technical/loi-system.md) for full technical specification.

---

## DOI Strategy

### Free Tier
- No DOI creation provided
- Users can enter their own existing DOIs for their experiments
- LOI provided automatically (always free)

### Paid Tier
- **20 DOIs per year** included with rollover
- Users can create new DOIs for their Republet experiments
- Additional DOIs available as add-on packs

### Payment Model

**Passthrough model:** Users pay directly to the DOI registrar (Crossref/DataCite) through Republet's interface. Republet does not hold funds.

**Future wallet system:** Republet may offer a credit-based system where:
- Users can pre-purchase DOI credits
- 1 free DOI included with each monthly paid tier payment
- Institutional credit packs available

### DOI and Centralization

**The question:** Does DOI integration introduce centralization?

**The reality:** DOIs are metadata that resolve through centralized infrastructure (the DOI Foundation, Crossref/DataCite). However:

- The DOI is a pointer, not the data itself
- If DOI infrastructure fails, Republet experiments still exist and are accessible via Republet's own identifiers (LOIs)
- DOIs provide academic legitimacy and citability but are not required for Republet to function

**Conclusion:** DOIs are an optional convenience layer that bridges Republet to traditional academic infrastructure. They introduce dependency but not lock-in.

---

## Preprint Strategy

### Unified Preprint Server

Republet explicitly positions itself as a **unified preprint server for all disciplines**. This is a significant competitive differentiator from discipline-specific services (arXiv, bioRxiv, medRxiv, chemRxiv, etc.).

### Benefits of Unification

| Benefit | Description |
|---------|-------------|
| **Universal citation infrastructure** | Same identifier system across all disciplines |
| **Cross-disciplinary discovery** | Researchers find related work in other fields |
| **Single account** | No need for multiple preprint server accounts |
| **Simplified workflow** | One platform for all publication types |

### Hypersupport for External Services

Republet does not seek to replace existing preprint servers. Instead:
- Republet experiments **link out** to arXiv, bioRxiv, etc.
- External preprints can cite Republet experiments
- Republet can serve as the preprint server of record OR link to external servers

**Philosophy:** "Hypersupport the spirit of the Republic of Letters" — provide maximum options for sharing knowledge.

### Format Support

Republet supports more than just PDF narrative format:
- **Structured experiment data** — Primary format
- **Narrative PDFs** — Traditional preprint format
- **Multi-format support** — Markdown, Jupyter notebooks, etc.
- **Auto-generation** — PDFs can be auto-generated from structured data

### Null Results

Republet actively **encourages and categorizes** null results and negative findings:
- Dedicated categories for null results
- Community encouragement through credit system
- Equal discoverability with positive results

Unlike traditional preprint servers where null results are culturally discouraged, Republet welcomes them as valuable contributions to scientific knowledge.

---

## Reference Manager Integration

### Republet as Reference Manager

Republet includes an **integrated reference manager** that allows researchers to:
- Organize papers and experiments
- Capture citation information from external sources
- Generate citations in any format (APA, MLA, Chicago, etc.)
- Manage bibliographies for papers

### Browser Integration

Republet provides browser extension capabilities for capturing citation information from:
- Journal websites
- Preprint servers
- Other academic sources

### Compatibility

Republet maintains full compatibility with existing reference managers:
- Export in BibTeX, RIS, CSL-JSON formats
- Import from Zotero, Mendeley, EndNote, etc.
- Embedded metadata for automatic capture

---

## Code Hosting

### Paid Tier: Forgejo

Republet hosts its own **Forgejo** instance for paid tier users:
- Full Git repository hosting
- Issue tracking
- Pull requests
- Federation support (can federate with other Forgejo instances)

**Why Forgejo?**
- Open source, community-governed
- Lightweight and resource-efficient
- Native federation capabilities
- Aligned with Republet's decentralization values

### Free Tier: External Links

Free tier users can link to external code repositories:
- GitHub
- GitLab
- Any Git hosting service

### Commit Verification

For deeper integration, Republet can verify that a specific repository commit corresponds to the analysis reported in an experiment. Researchers specify the commit hash that produced the results, ensuring reproducibility.

---

## Version Control Integration

### External Platforms
- Full GitHub API integration
- Full GitLab API integration
- Modular architecture for future platforms

### Self-Hosted Options (for paid tier)

Open source version control solutions Republet hosts:

| Solution | Description | Notes |
|----------|-------------|-------|
| **Forgejo** | Community fork of Gitea | **Selected** — Federation focus, decentralization-aligned |
| **Gitea** | Lightweight, written in Go | Very resource-efficient |
| **GitLab CE** | Full-featured, self-hosted GitLab | More resource-intensive |

---

## Data Storage

### Free Tier

| Storage Type | Provision |
|--------------|-----------|
| Structured experiment data | Unlimited via Willow P2P |
| Auxiliary files | Not hosted by Republet |
| External storage URLs | Supported—users configure their own S3-compatible storage |

Republet provides a **wizard tool** to help users configure external storage (e.g., Wasabi, Min.io, Cloudflare R2).

### Paid Tier ($10/month or $100/year)

| Storage Type | Provision |
|--------------|-----------|
| Structured experiment data | Unlimited via Willow P2P |
| Auxiliary files | Up to 1TB included |
| Overage | $0.02/GB/month |

See [Storage Architecture](../technical/storage.md) for full details.

---

## Discovery: OpenRL

### What is OpenRL?

**OpenRL** (Open Republet Library) is Republet's decentralized academic indexing and search system.

### Two-Tier Model

| Tier | Search Method | Coverage |
|------|---------------|----------|
| **Free** | P2P query broadcast | Depends on connected peers |
| **Paid** | Hosted full-text index | Complete Republet corpus |

### Free Tier: P2P Search

- Queries broadcast to connected peers
- Peers search locally and return results
- Results appear in a **response inbox** that fills gradually
- User-configurable: max duration, recursion depth, peer count

### Paid Tier: Hosted Index

- Instant search results
- Full-text search across all content
- Advanced filtering and sorting

### Relationship to OpenAlex

Republet submits content to OpenAlex for broader discovery while providing OpenRL as a decentralized alternative that cannot be centrally censored.

See [OpenRL Specification](../technical/openrl.md) for full details.

---

## Credit System (Principles)

### Basic Model

Republet mints credits like a central bank prints money — to introduce a representation of value into circulation.

**Value sources:**
- Content creation (publishing experiments)
- Services performed on behalf of content (reviews, curation, replication)

### Accrual

Users accrue credits for contributions. Credits represent reputation and influence within the Republet ecosystem.

### Uses for Credits

- Visibility boosts for experiments
- Voting weight in governance decisions
- Access to premium features
- Recognition display options
- Reduced fees in paid tiers

---

## Academic CV & Activity Monitoring

### Comprehensive CV

Republet provides a comprehensive, self-updating academic CV that includes:
- All experiments (including null results)
- Citations to your work
- Reviews conducted
- Code repositories
- Collaborations

### Activity Monitoring

| Tier | Method | Coverage |
|------|--------|----------|
| **Free** | Passive (webhooks + polling) | ORCID, CrossRef, Republet |
| **Paid** | Active + Passive | + Google Scholar, Semantic Scholar, social media |

### Notification System

- Event-driven webhooks from integrated platforms
- Periodic polling for platforms without webhooks
- User-configurable frequency (real-time, daily, weekly)

See [CV & Notifications](../users/cv-notifications.md) for full details.

---

## Push to Indexers

Republet actively pushes content to external indexing services:

| Service | Method |
|---------|--------|
| **OpenAlex** | Direct API submission |
| **Semantic Scholar** | Direct API submission |
| **Google Scholar** | Crawlability optimization + partnership exploration |

### Onboarding Import

During account creation, Republet offers to import existing publications (like importing contacts in chat software):
- Import from ORCID
- Import from Google Scholar
- Import from Semantic Scholar

---

## Modular Architecture Principle

All integrations are designed modularly:

- Citation management tools can be added/removed
- Version control platforms can be added/removed
- Reporting platforms can be added/removed
- Geographic expansions can incorporate regional tools

This ensures Republet can adapt as the landscape changes without fundamental architecture changes.

---

## Pricing Summary

| Feature | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Cost** | $0 | $10/month or $100/year |
| **Identity** | did:peer + OAuth | did:peer + OAuth |
| **LOI** | Unlimited, free | Unlimited, free |
| **DOI** | None (user provides) | 20/year + rollover |
| **Storage** | External URLs | 1TB hosted |
| **Code hosting** | External links | Forgejo included |
| **Search** | P2P broadcast | Hosted index |
| **Monitoring** | Passive | Active + Passive |

---

*Version: 0.3.0*
*Last updated: 2025*
