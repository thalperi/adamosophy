# Republet Philosophy

> Principles guiding Republet's design, development, and relationship with the scholarly ecosystem.

---

## Core Philosophy

### Knowledge Over Success

The fundamental premise of Republet is that **all experiments are equally valuable regardless of outcome**. The scientific enterprise loses tremendous knowledge when null results, negative findings, and failed experiments go unpublished. Republet exists to ensure that every methodologically sound experiment contributes to the collective understanding.

This is not merely about fairness or researcher credit—though both matter. It is about the integrity of the scientific record. When only successful experiments are published, the literature becomes biased. Meta-analyses draw incorrect conclusions. Researchers repeat failed approaches that others have already tried. Resources are wasted. Republet addresses this at the infrastructure level by making failure publishable.

---

### Decentralization First

Republet is built on the principle that **no central authority should control scientific knowledge**. This is not ideological purity; it is practical risk management:

| Centralization Risk | Republet Mitigation |
|---------------------|---------------------|
| Platform shutdown | Data lives on researcher devices; network persists without Republet |
| Censorship | No central point where content can be removed |
| Access control | Researchers own their data; no one can lock them out |
| Geographic restriction | P2P network transcends borders |
| Single point of failure | Distributed architecture has no single failure point |

Decentralization also aligns with the ethos of science itself. Knowledge should be free, accessible, and owned by its creators. Republet provides the infrastructure for this vision.

---

### Redundancy as Service

Republet's relationship with existing scholarly infrastructure is **cooperative, not competitive**. We provide redundancy and options, not replacement.

| Existing System | Republet's Role |
|-----------------|-----------------|
| **ORCID** | Backup and peer service; Republet preserves identity data even if ORCID ceases to exist |
| **DOI System** | LOI (Letter Object Identifier) provides decentralized, free alternative; DOI supported as optional metadata |
| **OpenAlex** | OpenRL provides decentralized indexing; cannot be centrally censored |
| **arXiv/bioRxiv/etc.** | Unified preprint server; links to and supports all discipline-specific servers |
| **Zotero/Mendeley** | Integrated reference manager; compatible with existing tools |

**We do not seek to kill existing services.** We provide alternatives that ensure the scholarly record survives any single point of failure. Researchers can use Republet alongside ORCID, Crossref, and OpenAlex—or use Republet alone. The choice is theirs.

This positioning is intentionally non-adversarial. Republet should be a good citizen of the scholarly ecosystem, contributing value rather than extracting it.

---

### Open by Default

Everything Republet builds is open source and accessible:

- **Code**: All Republet code is publicly available under permissive licenses
- **Data**: User-owned, exportable, portable—researchers can leave anytime with their complete record
- **Standards**: We use and contribute to open standards (did:peer, Willow, OAuth, etc.)
- **No lock-in**: No proprietary formats, no paid dependencies in the free tier, no obstacles to leaving

The goal is not to capture users but to earn their trust through transparency and portability.

---

### Options Over Opinions

Republet does not believe in forcing researchers into specific workflows. We provide options:

| Feature Area | Republet Approach |
|--------------|-------------------|
| **Identity** | did:peer primary, OAuth for convenience—use what you prefer |
| **Publishing** | Structured experiments, narrative PDFs, or both—your choice |
| **Indexing** | Push to OpenAlex, OpenRL, Google Scholar, or all three |
| **Code hosting** | Forgejo (hosted), external GitLab/GitHub, or link to your own |
| **Storage** | Republet-hosted (paid) or your own S3-compatible storage (free) |
| **Preprint linking** | Republet as record, arXiv links, or both |

We overload the system with options because different researchers work differently. Republet adapts to the researcher, not the reverse.

---

## Relationship with the Scholarly Ecosystem

### Not Replacement, Supplementation

Republet explicitly does **not** aim to replace:

- **ORCID** — We integrate with ORCID and serve as a backup; we don't discourage ORCID use
- **DOI registrars** — We offer LOI as a free alternative and support DOI for those who need it
- **Preprint servers** — We link to and support arXiv, bioRxiv, and all discipline-specific servers
- **Reference managers** — We integrate with Zotero, Mendeley, and others
- **Discovery platforms** — We push to OpenAlex, Google Scholar, Semantic Scholar

Our goal is to make the scholarly ecosystem more robust by adding redundancy and options. A researcher who uses ORCID, publishes on arXiv, and cites using Zotero gains additional value from Republet—not conflict.

### When Republet Serves as Alternative

Republet becomes the preferred option when:

- **Centralization is a concern** — Researchers who want decentralized identity and data
- **Null results are involved** — Where traditional venues discourage publication
- **Cost is prohibitive** — LOIs are always free; DOIs available for those who need them
- **Interdisciplinary work** — Unified platform for all disciplines, no silos
- **Reproducibility focus** — Structured experiment records with full methodology

We compete on values, not on extracting users from existing workflows.

---

## The Republic of Letters

Republet is named after Leibniz's *Republic of Letters*—his vision of a community of scholars sharing knowledge freely across borders. The name also evokes "let us republish," echoing Leibniz's famous plea "let us calculate."

We ask the industry to let researchers publish all experiments, not just successful ones. We provide the infrastructure to make this practical, the philosophy to make it respected, and the community to make it sustainable.

### Hypersupport for the Scholarly Community

Republet practices "hypersupport" for the spirit of the Republic of Letters:

- **Link to everything** — Republet experiments can link to arXiv, ORCID, GitHub, Zenodo, and any other scholarly resource
- **Import from anywhere** — Bring your existing publications, citations, and profile data
- **Export to anywhere** — Your data is always portable in standard formats
- **Push everywhere** — We'll help your work appear in OpenAlex, Google Scholar, and beyond
- **Never reject** — Methodologically sound work is never rejected based on outcome

The goal is to make Republet a net positive for the scholarly ecosystem, adding value without extracting it.

---

## Design Principles

### User Ownership

- Researchers own their data, identity, and reputation
- No platform can revoke access to a researcher's own work
- Export and portability are fundamental rights, not features

### Transparency

- All policies are documented and public
- No hidden algorithms affecting visibility or discovery
- Clear communication about what Republet does and does not do

### Modularity

- Integrations can be added or removed independently
- Domain-specific features are modules, not core requirements
- The platform evolves without fundamental architecture changes

### Sustainability

- Free tier is genuinely free, not a limited trial
- Paid tier offers real value for money
- No advertising, no data sales, no hidden revenue extraction

---

## Competitive Positioning

### Republet Does NOT Compete With

- **Preprint servers** — Different content types (structured experiments vs. narrative papers)
- **Data repositories** — Different scope (experiment reports vs. raw data)
- **Discovery platforms** — Republet benefits from being indexed
- **Reference managers** — Republet produces citations they consume
- **Lab notebooks** — Different stage of workflow (daily work vs. final report)
- **Open journals** — Republet doesn't reject; journals add curation layer

### Republet IS an Alternative To

- **Academic social networks** (ResearchGate, Academia.edu) — For researchers who want decentralized, non-exploitative sharing
- **Traditional journals for null results** — Republet provides immediate publication without outcome-based rejection

### Republet's Unique Position

| Feature | Republet | Others |
|---------|----------|--------|
| Structured experiment reports | ✓ | Rare |
| Never rejects based on outcome | ✓ | Very rare |
| Decentralized | ✓ | Almost none |
| Credit for all contributions | ✓ | None |
| Multi-disciplinary by design | ✓ | Some |
| Offline-first | ✓ | None |
| Free persistent identifiers (LOI) | ✓ | None |

---

## Future Direction

Republet evolves guided by these principles:

1. **Decentralization deepens** — More functionality moves to P2P, fewer central dependencies
2. **Options expand** — More integrations, more formats, more workflows supported
3. **Community grows** — Governance becomes more distributed over time
4. **Standards contribute** — Republet gives back to open standards and protocols

The long-term vision is a scholarly ecosystem where knowledge is free, researchers are empowered, and no single entity controls the scientific record.

---

*Version: 0.2.0*
*Last updated: 2025*
