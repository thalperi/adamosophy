# Republet Relationship Matrix

> A comprehensive analysis of Republet's relationship with related platforms and services in the scientific ecosystem.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✓ | Yes, supported/allowed |
| ✗ | No, not supported or actively rejected |
| ~ | Partial, ambiguous, or depends on context |
| — | Not applicable |

---

## The Matrix

### Preprint Servers

| Platform | Scope | Accepts Null Results | Structured Data | Decentralized | Relationship to Republet |
|----------|-------|---------------------|-----------------|---------------|-------------------------|
| **arXiv** | Physics, Math, CS, Quant Bio, Quant Finance, Statistics, Electrical Engineering, Systems Science, Economics | ~ (No policy against, but culturally discouraged) | ✗ (PDF only) | ✗ | **Complementary** — Republet experiments can inform arXiv papers; arXiv papers can cite Republet experiments |
| **bioRxiv** | Biology | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **medRxiv** | Medicine, Health Sciences | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **chemRxiv** | Chemistry | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **PsyArXiv** | Psychology | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **SocArXiv** | Social Sciences | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **EarthArXiv** | Earth Science | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **engrXiv** | Engineering | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |
| **LawArXiv** | Law | ~ (Similar to arXiv) | ✗ (PDF only) | ✗ | **Complementary** — Same relationship as arXiv |

**Summary:** Preprint servers focus on narrative papers (PDFs). Republet focuses on structured experiment records. They serve different purposes. A researcher runs experiments documented in Republet, then writes a paper summarizing findings for arXiv. The paper links to Republet experiments for full methodological detail.

---

### Data Repositories

| Platform | Scope | Accepts Null Results | Structured Metadata | Decentralized | Relationship to Republet |
|----------|-------|---------------------|---------------------|---------------|-------------------------|
| **Zenodo** | All disciplines (CERN-backed) | ✓ (Data is data) | ✓ (Rich metadata) | ✗ | **Complementary** — Republet experiments can link to Zenodo datasets; Zenodo can archive Republet exports |
| **Figshare** | All disciplines | ✓ (Data is data) | ✓ (Rich metadata) | ✗ | **Complementary** — Same as Zenodo |
| **Dryad** | Life Sciences | ✓ (Data is data) | ✓ (Rich metadata) | ✗ | **Complementary** — Same as Zenodo |
| **OSF (Open Science Framework)** | All disciplines | ✓ | ✓ (Project structure) | ✗ | **Overlapping** — OSF has preregistration and project management; Republet focuses on experiment reporting |
| **Dataverse** | All disciplines (Harvard) | ✓ (Data is data) | ✓ (Rich metadata) | ✗ | **Complementary** — Same as Zenodo |

**Summary:** Data repositories store datasets. Republet stores experiment reports (which may contain or link to datasets). Data repositories don't have the experiment context — the hypothesis, methodology, and interpretation. Republet provides the narrative and structure around the data.

---

### Academic Discovery & Indexing

| Platform | Scope | Accepts Null Results | Structured Data | Decentralized | Relationship to Republet |
|----------|-------|---------------------|-----------------|---------------|-------------------------|
| **OpenAlex** | All disciplines (index) | — (Indexes what exists) | ~ (Metadata only) | ✗ | **Integrative** — Republet feeds experiments to OpenAlex for discovery; OpenAlex increases Republet visibility |
| **OpenRL (Republet)** | Republet corpus | ✓ (Native) | ✓ (Full structure) | ✓ | **Primary** — Republet's decentralized index; cannot be centrally censored |
| **Google Scholar** | All disciplines (index) | — (Indexes what exists) | ✗ (Crawls web) | ✗ | **Integrative** — Republet pages indexed by Google Scholar increase discoverability |
| **Semantic Scholar** | All disciplines (AI-powered) | — (Indexes what exists) | ~ (Extracts some structure) | ✗ | **Integrative** — Same as OpenAlex |
| **Web of Science** | All disciplines (Clarivate, paid) | — (Indexes what exists) | ~ (Metadata) | ✗ | **Integrative** — Republet DOIs would be indexed |
| **Scopus** | All disciplines (Elsevier, paid) | — (Indexes what exists) | ~ (Metadata) | ✗ | **Integrative** — Same as Web of Science |
| **PubMed** | Biomedical | — (Indexes what exists) | ✓ (Structured abstracts) | ✗ | **Integrative** — Medical experiments on Republet could be indexed |

**Summary:** Discovery platforms don't publish — they index. Republet benefits from being indexed. None of these platforms solve the null result problem; they just reflect existing publishing bias. Republet feeds new content into this ecosystem.

**Republet as Peer Service to OpenAlex:**

Republet provides **OpenRL** (Open Republet Library) as a decentralized alternative:

| Feature | OpenRL | OpenAlex |
|---------|--------|----------|
| **Decentralized** | ✓ | ✗ |
| **Censorship resistant** | ✓ | ✗ |
| **Null results indexed** | ✓ (native) | — (only if published) |
| **Structured experiments** | ✓ (native) | ✗ |
| **Search method** | P2P broadcast (free) / Hosted index (paid) | Centralized index |

Republet submits content to OpenAlex for broader discovery while providing OpenRL for decentralized, censorship-resistant indexing. If someone removed content from OpenAlex, it would disappear from that index. OpenRL makes this almost impossible.

---

### Researcher Identity

| Platform | Scope | Decentralized | Relationship to Republet |
|----------|-------|---------------|-------------------------|
| **ORCID** | Universal researcher ID | ✗ | **Integrative** — Republet uses ORCID for identity verification and profile enrichment; ORCID displays Republet experiments on researcher profiles |
| **ResearcherID** | Web of Science ecosystem | ✗ | **Integrative** — Optional linking for users in WoS ecosystem |
| **Scopus Author ID** | Scopus ecosystem | ✗ | **Integrative** — Optional linking for users in Scopus ecosystem |

**Summary:** Identity platforms are infrastructure. Republet integrates with them to connect researchers to their existing academic profiles. Republet's primary identity (did:peer) is decentralized; these are convenient bridges.

**Republet as Peer Service to ORCID:**

Republet considers itself a peer service to ORCID, not a replacement:
- Republet backs up ORCID data—if ORCID shuts down, researcher identity data is preserved
- Both serve researcher identity purposes from different philosophical approaches
- Researchers benefit from using both: ORCID for traditional academic recognition, Republet for decentralized control

---

### Persistent Identifiers

| System | Scope | Decentralized | Cost | Relationship to Republet |
|--------|-------|---------------|------|-------------------------|
| **DOI (Crossref/DataCite)** | Universal scholarly identifier | ✗ | ~$1 per DOI | **Integrative** — Republet supports DOI as optional metadata; paid tier includes 20 DOIs/year |
| **Handle** | General persistent identifier | ✗ | Varies | **Integrative** — Can be entered as external identifier |
| **arXiv ID** | arXiv-specific identifier | ✗ | Free | **Integrative** — Links to arXiv preprints |
| **LOI (Republet)** | Republet native identifier | ✓ | Free | **Primary** — Native decentralized identifier for all Republet content |

**Summary:** The DOI system is the academic standard for persistent identifiers. Republet integrates with it while providing **LOI (Letter Object Identifier)** as a decentralized, always-free alternative.

**Republet as Peer Service to DOI:**

| Aspect | LOI | DOI |
|--------|-----|-----|
| **Cost** | Always free | ~$1 + membership |
| **Registration** | Automatic (decentralized) | Manual (via registrar) |
| **Permanence** | P2P network persistence | Registrar obligation |
| **Resolution** | P2P or HTTP gateway | DOI resolution infrastructure |

Republet's Willow implementation provides permanent addresses, making Republet a first-class citizen peer to the DOI system. LOI supplements DOI with systemic redundancy.

---

### Reference Managers

| Platform | Scope | Decentralized | Relationship to Republet |
|----------|-------|---------------|-------------------------|
| **Zotero** | Cross-platform, open source | ✗ | **Integrative** — Republet exports citation metadata in standard formats (BibTeX, RIS, CSL-JSON); Zotero imports Republet experiments |
| **Mendeley** | Elsevier-owned | ✗ | **Integrative** — Same as Zotero |
| **EndNote** | Clarivate-owned | ✗ | **Integrative** — Same as Zotero |
| **Paperpile** | Google-integrated | ✗ | **Integrative** — Same as Zotero |
| **JabRef** | Open source, BibTeX-focused | ✗ | **Integrative** — Same as Zotero |
| **Citavi** | Popular in DACH region | ✗ | **Integrative** — Same as Zotero |

**Summary:** Reference managers are tools researchers use to cite work. Republet must produce standards-compliant citation metadata so that experiments are citable. This is critical for adoption — if researchers can't cite Republet experiments in their papers, they won't use Republet.

---

### Peer Review & Commentary

| Platform | Scope | Post-Publication Review | Decentralized | Relationship to Republet |
|----------|-------|------------------------|---------------|-------------------------|
| **PubPeer** | All disciplines | ✓ | ✗ | **Complementary** — PubPeer allows anonymous comments on published work; Republet experiments could be discussed on PubPeer |
| **PeerCommunityIn** | Biology, ecology, some others | ✓ (Community peer review) | ✗ | **Complementary** — PCI provides peer review for preprints; Republet experiments could be submitted for PCI review |
| **F1000Research** | Biology, medicine | ✓ (Open peer review) | ✗ | **Overlapping** — Publishes data notes, null results; but centralized and journal-like |
| **Publons** | Reviewer credit (Web of Science) | — (Tracks reviews) | ✗ | **Integrative** — Republet reviewers could get credit on Publons |

**Summary:** Republet's review process (quality validation, not gatekeeping) differs from traditional peer review. We could integrate with post-publication commentary platforms and offer reviewer credit through existing systems.

---

### Lab Notebooks & Research Tools

| Platform | Scope | Accepts Null Results | Decentralized | Relationship to Republet |
|----------|-------|---------------------|---------------|-------------------------|
| **Benchling** | Life sciences (cloud ELN) | ✓ (Internal use) | ✗ | **Complementary** — Researchers use Benchling day-to-day; publish to Republet when ready |
| **LabArchives** | Cross-discipline ELN | ✓ (Internal use) | ✗ | **Complementary** — Same as Benchling |
| **Jupyter Notebooks** | Computational research | ✓ | ~ (Files can be anywhere) | **Complementary** — Jupyter notebooks can be attached to Republet experiments |
| **R Markdown / Quarto** | Statistical reporting | ✓ | ~ | **Complementary** — Same as Jupyter |
| **OSF Projects** | Project management | ✓ | ✗ | **Overlapping** — OSF has similar goals but different structure; some researchers may prefer one or the other |

**Summary:** Lab notebooks capture daily work. Republet captures final experiment reports. They're different stages of the research workflow. Republet could import from or link to ELN platforms.

---

### Academic Social Networks

| Platform | Scope | Accepts Null Results | Decentralized | Relationship to Republet |
|----------|-------|---------------------|---------------|-------------------------|
| **ResearchGate** | All disciplines | ~ (Users can upload anything, but focus on papers) | ✗ | **Competitive** — For-profit, centralized, data harvesting concerns; Republet offers a decentralized alternative |
| **Academia.edu** | All disciplines | ~ (Similar to ResearchGate) | ✗ | **Competitive** — Same as ResearchGate |
| **Mastodon (Science instances)** | Social media | ✓ | ✓ (Federated) | **Complementary** — Researchers can share Republet links on science Mastodon instances |

**Summary:** Academic social networks are for networking and sharing. Republet is for structured experiment reporting. ResearchGate and Academia.edu extract value from researchers' work; Republet is researcher-owned.

---

### Journals with Open Results Policies

| Platform | Scope | Publishes Null Results | Open Access | Relationship to Republet |
|----------|-------|------------------------|-------------|-------------------------|
| **PLOS One** | All sciences | ✓ (Explicit policy) | ✓ (Paid) | **Complementary** — Republet experiments can become PLOS One papers; they're more selective than Republet |
| **eLife** | Life sciences | ✓ | ✓ (Paid) | **Complementary** — Same as PLOS One |
| **Scientific Reports** | All sciences | ✓ | ✓ (Paid) | **Complementary** — Same as PLOS One |
| **Journal of Negative Results** | Various | ✓ (Dedicated to negative results) | Varies | **Overlapping** — Similar mission, but traditional journal model (centralized, selective) |
| **The All Results Journals** | Various | ✓ (Dedicated to all results) | Varies | **Overlapping** — Same as Journal of Negative Results |

**Summary:** Some journals accept null results, but they still operate on the traditional journal model (submission → review → accept/reject). Republet accepts everything that meets methodological standards. No rejection based on outcome. Journals are complementary — researchers can publish in both.

---

## Relationship Categories Summary

| Category | Description | Republet's Role |
|----------|-------------|-----------------|
| **Complementary** | Different purpose, can work together | Republet adds value; users benefit from both |
| **Integrative** | Republet connects via APIs, standards | Republet bridges to existing ecosystems |
| **Overlapping** | Similar goals, different approaches | Users may choose one or use both |
| **Competitive** | Similar goals, opposing values | Republet offers decentralized alternative |

---

## Key Insights

### Republet Does NOT Compete With

- **Preprint servers** — Different content type (structured experiments vs. narrative papers)
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

---

## Integration Priority

Based on the matrix, recommended integration priority:

1. **ORCID** — Identity foundation
2. **Zotero/Mendeley** — Citability (critical for adoption)
3. **OpenAlex** — Discovery
4. **GitHub/GitLab** — Code linking
5. **Zenodo/Figshare** — Large data attachment
6. **arXiv/bioRxiv** — Preprint linking
7. **PLOS One/eLife** — Journal linking for users who also publish traditionally

---

*Version: 0.1.0*  
*Last updated: 2025*
