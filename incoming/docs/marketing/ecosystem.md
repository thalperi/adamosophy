# Ecosystem and Integrations

> Republet exists within a rich ecosystem of scientific infrastructure. This document describes each element and how Republet integrates with it.

---

## Identity Infrastructure

### ORCID

ORCID (Open Researcher and Contributor ID) is the de facto standard for researcher identification across the global academic system. It provides each researcher with a unique sixteen-digit identifier that persists throughout their career, regardless of institutional affiliation, name changes, or geographic moves. Before ORCID, the academic world struggled with disambiguation. A paper by "J. Smith" could belong to any of thousands of researchers. ORCID solved this by creating a registry where each researcher claims their identity once and uses it everywhere.

The ORCID registry is operated by a non-profit organization and is free for individual researchers. Institutions, publishers, and funders pay membership fees that sustain the organization. When a researcher logs into a journal submission system, grant application portal, or institutional repository, they often see a "Log in with ORCID" button. This creates a persistent link between the researcher and their work.

ORCID profiles display a researcher's publications, grants, affiliations, and peer review activities. This creates a comprehensive academic CV that stays current as the researcher adds new work. Publishers automatically push publication records to ORCID profiles, reducing the manual burden on researchers.

**Integration**

Republet integrates ORCID in two directions. When a researcher creates a Republet account, they can authenticate using ORCID credentials, which verifies their identity and pulls basic profile information into Republet. More importantly, Republet pushes experiment records back to the researcher's ORCID profile, creating a bidirectional link. This means that when someone views a researcher's ORCID profile, they see not only their traditional publications but also their Republet experiments, including null results and replications that never made it into journals.

The integration works through ORCID's OAuth API. The researcher authorizes Republet to read their profile and write works to their record. Republet stores the ORCID identifier and uses it as a verified link to the researcher's academic identity. This is especially valuable for the did:peer authentication that Republet uses as its primary identity method. The did:peer is decentralized and portable, but it carries no reputation information. By linking an ORCID, the researcher connects their decentralized Republet identity to their established academic reputation.

---

### did:peer

While ORCID provides identity verification and academic reputation linking, Republet's primary identity method is did:peer, a decentralized identifier method defined by the Decentralized Identity Foundation. Unlike ORCID, which relies on a central registry operated by an organization, did:peer identifiers are created locally on the researcher's device and require no central authority to validate or resolve them.

The did:peer method works by generating a cryptographic keypair. The public key becomes part of the identifier string, and the private key remains with the researcher, typically stored in their browser or a digital wallet. Anyone can verify that a message or data entry was signed by the holder of a particular did:peer identifier without contacting any central service. This makes the identity fully portable and resistant to any single point of failure.

The tradeoff is that did:peer identifiers carry no inherent reputation. A researcher can prove they control a particular identifier, but that identifier doesn't tell you anything about their credentials, publications, or institutional affiliations. This is why Republet combines did:peer with OAuth providers like ORCID. The decentralized identifier ensures the researcher always controls their identity and data. The OAuth links provide bridges to existing reputation systems.

**Integration**

Republet requires did:peer as the primary identity method for account provisioning. When a new user arrives, they can authenticate via OAuth providers for convenience, but the account is not fully functional until they either create a new did:peer identifier or provide an existing one. This ensures that every Republet account has a decentralized identity at its core.

Republet stores the did:peer identifier in the user's profile and uses it to sign experiment submissions, reviews, and other contributions. The signature travels with the data through the Earthstar/Willow synchronization system, providing cryptographic proof of authorship. Even if Republet's servers were to disappear entirely, the signed experiment records would remain verifiable on any device that holds a replica of the data.

---

## Publication Infrastructure

### DOI System

The Digital Object Identifier system provides persistent addresses for scholarly content. When a researcher wants to cite a paper, they use its DOI rather than a URL, because URLs can break when websites reorganize or institutions change hosting providers. A DOI, by contrast, is designed to resolve forever. Behind each DOI is a registry that maintains the mapping between the identifier and the current location of the content.

DOIs are issued by registration agencies. The two most relevant for academic work are Crossref, which handles journal articles and books, and DataCite, which handles datasets and other research outputs. These agencies charge fees per DOI issued, typically around one dollar per identifier, plus annual membership fees for organizations that issue large volumes. This creates a cost barrier for platforms that want to offer DOIs to users.

The DOI system is centralized in the sense that it relies on the International DOI Foundation and its registration agencies to maintain the resolution infrastructure. However, DOIs are also portable. If one registration agency were to fail, identifiers could be transferred to another. The content itself does not live in the DOI system; the DOI merely points to it. This means that a DOI can point to a Republet experiment just as easily as it points to a journal article.

**Integration**

Republet's approach to DOIs:

| Tier | DOI Provision |
|------|---------------|
| **Free** | No DOI creation; users can enter existing DOIs |
| **Paid** | 20 DOIs/year included, with rollover |

**Payment Model:** Passthrough—users pay directly to the registrar (Crossref/DataCite) through Republet's interface. Republet does not hold funds.

**Future Wallet System:** Republet may offer a credit-based system with 1 free DOI per monthly paid tier payment and institutional credit packs.

The DOI itself introduces no lock-in. The experiment lives in Republet's decentralized storage, signed by the author's did:peer. The DOI is metadata that points to the Republet page for that experiment.

---

### LOI (Letter Object Identifier)

Republet provides its own persistent identifier system: the **Letter Object Identifier (LOI)**. Unlike DOIs, LOIs are:

- **Always free** — No cost to create or resolve
- **Decentralized** — No central registration authority
- **Self-certifying** — Cryptographic proof of authenticity
- **Permanent** — Exists as long as the P2P network exists

**Format:** `LOI:republet.dp.8x7k2m.abc123xyz`

**Relationship to DOI:**

| Aspect | LOI | DOI |
|--------|-----|-----|
| **Cost** | Always free | ~$1 + membership |
| **Registration** | Automatic (decentralized) | Manual (via registrar) |
| **Authority** | Author (via did:peer) | Registration agency |

LOI is Republet's primary identifier; DOI is optional metadata for bridging to traditional academic infrastructure. Republet considers itself a peer service to the DOI system, providing systemic redundancy through decentralized identifiers.

---

### Preprint Servers

Preprint servers have transformed scholarly communication by allowing researchers to share their work before peer review. arXiv, founded in 1991, pioneered this model for physics and mathematics. Researchers upload their papers, which are immediately available to read and cite. There is no peer review in the traditional sense, though volunteer moderators check submissions for appropriateness to the subject area and filter out obvious spam or non-scientific content.

The preprint model spread to other disciplines over the following decades. bioRxiv serves biology, medRxiv serves medicine, chemRxiv serves chemistry, and numerous discipline-specific servers exist for fields from psychology to linguistics to engineering. These platforms share the core characteristic of immediate availability without gatekeeping based on novelty or significance.

Preprint servers are centralized infrastructure. arXiv is operated by Cornell University, bioRxiv and medRxiv by Cold Spring Harbor Laboratory, and chemRxiv by the American Chemical Society. They rely on institutional funding and sponsorships. They serve narrative papers in PDF format, not structured experiment data. Their identifiers are similar to DOIs but specific to each platform, and they do not have the same universal citation infrastructure.

**Integration**

Republet and preprint servers serve different purposes and can enhance each other. A researcher conducting a series of experiments might document each one in Republet as it completes, building a detailed record of hypotheses, methodologies, raw results, and interpretations. When they have enough material to write a narrative paper, they submit it to arXiv or bioRxiv. That paper summarizes the findings and cites the individual Republet experiments for full methodological detail.

Conversely, a researcher reading an arXiv paper might want to examine the underlying experimental data. If the author has linked their Republet experiments, the reader can dive into the complete structured record: the original hypothesis, the exact protocols used, the raw data files, the analysis code, and any null results or failed approaches that didn't make it into the paper.

Republet can also link from experiment records to related preprints. An experiment might be part of a larger project that has produced an arXiv paper, and Republet displays that connection. This creates a rich web of relationships between detailed experiment records and narrative syntheses, without either platform trying to replace the other.

---

## Discovery Infrastructure

### OpenAlex

OpenAlex is a free and open catalog of the global research system. It indexes hundreds of millions of works, authors, institutions, and concepts, and makes this data available through an API with no paywall and no rate limiting for most use cases. It was created as an open alternative to commercial databases like Web of Science and Scopus, which charge substantial subscription fees and restrict how their data can be used.

The OpenAlex team crawls the web for scholarly content, ingests Crossref and other DOI registration data, and builds a graph of citations, author affiliations, and conceptual relationships. When you search for a researcher on OpenAlex, you see their publications, who they've collaborated with, where they've worked, and what topics they research. When you search for a concept, you see the key papers, researchers, and institutions in that area.

OpenAlex does not host content. It indexes metadata and provides links to the original sources. It does not filter based on journal prestige, citation count, or any other metric. Its goal is comprehensive coverage of all scholarly output, regardless of where it was published or whether it was published in a traditional sense at all.

**Integration**

Republet benefits enormously from being indexed by OpenAlex. Once Republet experiments appear in OpenAlex's catalog, they become discoverable to anyone using tools built on OpenAlex data. This includes researchers using literature search tools, institutions tracking their researchers' output, and funders evaluating grant applicants' records.

The integration works through OpenAlex's web crawling and direct data submission. Republet can optimize its pages for crawling by including structured metadata in standard formats. It can also submit data directly to OpenAlex through their API, ensuring that Republet experiments are indexed promptly and with accurate metadata.

For Republet users, this means their experiments become part of the global scholarly graph. Their null results and replications appear alongside their traditional publications in OpenAlex searches. Someone evaluating a researcher's complete output can see not just what succeeded, but what they attempted and how they approached their work comprehensively.

---

### OpenRL (Republet's Decentralized Index)

Republet provides **OpenRL** (Open Republet Library) as a decentralized alternative to centralized academic indexes like OpenAlex.

**Why OpenRL?**

| Centralized Index Risk | OpenRL Solution |
|-----------------------|-----------------|
| Content can be removed by platform owner | No central authority can remove content |
| Service shutdown loses all index data | Index distributed across network |
| Censorship possible | Censorship resistant by design |

**Two-Tier Model:**

| Tier | Search Method | Coverage |
|------|---------------|----------|
| **Free** | P2P query broadcast | Depends on connected peers |
| **Paid** | Hosted full-text index | Complete Republet corpus |

**Free tier P2P search** broadcasts queries to connected peers who search locally and return results to a response inbox that fills gradually.

**Paid tier hosted index** provides instant, full-text search across all Republet content.

Republet considers OpenRL a peer service to OpenAlex—both are valuable, and Republet submits content to OpenAlex while providing OpenRL for decentralized, censorship-resistant indexing.

---

### Google Scholar and Semantic Scholar

Google Scholar is the most widely used academic search engine. It crawls the web for scholarly content and provides a familiar search interface with citation counts and related article recommendations. It is free to use but closed in the sense that Google does not share its full index or ranking algorithms. Researchers often check their Google Scholar profiles to see citation counts and h-index calculations.

Semantic Scholar, developed by the Allen Institute for AI, is a newer academic search engine that uses machine learning to extract structure from papers. It identifies key citations, extracts figures and tables, and generates summary insights. It provides an API that allows other tools to access its data and embeddings, making it popular among developers building research tools.

Both platforms are discovery tools rather than publishing platforms. They help researchers find relevant work but do not host or publish that work themselves. They index traditional journals, preprint servers, institutional repositories, and occasionally other sources that contain scholarly content.

**Integration**

Republet experiments become more discoverable when they appear in Google Scholar and Semantic Scholar search results. This happens through standard web indexing: Republet pages are structured as scholarly content with appropriate metadata, and the search engine crawlers discover and index them.

For Google Scholar, Republet needs to meet certain technical requirements: stable URLs, citation metadata in recognized formats, and content that appears to be scholarly work. Experiments with DOIs are more likely to be indexed because Google Scholar trusts the DOI registry as a source of scholarly content.

For Semantic Scholar, Republet can provide structured data that enhances the machine learning analysis. An experiment record with clear hypothesis, methodology, and results sections is easier for Semantic Scholar to parse and summarize than a traditional PDF paper. This could make Republet experiments particularly valuable in Semantic Scholar's knowledge graph.

---

## Data Infrastructure

### Zenodo and Figshare

Zenodo and Figshare are general-purpose research data repositories. They allow researchers to upload any type of research output—datasets, software, presentations, posters, figures—and receive a DOI for each upload. This makes the output citable and ensures long-term preservation through institutional backing. Zenodo is operated by CERN with support from the European Commission, while Figshare is a commercial company acquired by Digital Science.

These repositories serve a crucial function in the research ecosystem: they provide a home for research outputs that don't fit into traditional journals. A dataset too large to include in a paper, a software package used for analysis, or a negative result that didn't merit separate publication can all be deposited and cited. This supports reproducibility and ensures that research outputs don't disappear when a researcher moves institutions or a lab website goes offline.

Both platforms are centralized and rely on institutional infrastructure. They offer generous free storage quotas and make uploaded content immediately public with a DOI. For researchers who need private storage or larger quotas, both offer paid plans. They are widely recognized as legitimate venues for research outputs and are indexed by discovery platforms like OpenAlex and Google Scholar.

**Integration**

Republet and data repositories complement each other in a natural division of responsibilities. Republet stores structured experiment reports with rich metadata about hypotheses, methodologies, and interpretations. When an experiment generates large datasets—genomics data, microscopy images, simulation outputs—those can be deposited in Zenodo or Figshare, and the Republet experiment record links to the repository entry.

This integration allows Republet to focus on the experiment narrative while leveraging the specialized infrastructure of data repositories for large file storage and preservation. Republet's decentralized Earthstar storage works well for structured text and moderate-sized files but is not optimized for multi-terabyte datasets. The DOI from Zenodo or Figshare provides a stable reference that can be cited independently.

Republet can also serve as a source for Zenodo and Figshare deposits. A researcher who has documented a series of related experiments in Republet might export a complete project archive and deposit it in Zenodo for long-term preservation with a DOI. This creates a chain: the Republet experiments exist in decentralized storage, a snapshot is preserved in Zenodo with a DOI, and citations reference either the DOI version or the living Republet record.

---

## Citation Infrastructure

### Zotero and Reference Managers

Reference managers are the tools researchers use to organize the papers they read and generate citations in their own writing. Zotero, the most popular open-source option, integrates with web browsers to capture citation information from journal websites, preprint servers, and other sources. Researchers organize their libraries with tags and folders, attach notes and PDFs, and export citations in whatever format a journal requires.

For Republet to succeed, experiments published on the platform must be easily citeable in academic papers. If a researcher reads a Republet experiment and wants to cite it, their reference manager needs to capture the citation information automatically. If this doesn't work smoothly, the researcher will cite something else, and Republet experiments will be invisible in the citation ecosystem.

The standard that makes this work is embedded metadata in formats like COinS, embedded JSON-LD, or EPrints markup. When a reference manager visits a web page, it looks for this structured data and extracts the title, authors, date, and other citation information. If Republet pages include this metadata, Zotero and other reference managers will capture citations correctly.

**Integration**

Republet generates citation metadata in standard formats for every public experiment. When a Zotero user visits a Republet experiment page and clicks the Zotero browser extension, Zotero detects the metadata and saves a citation with all the correct information: authors, title, date, and DOI if available. The user can then cite the experiment in their paper using any citation style.

Republet also provides export options for users who prefer to add citations manually. Each experiment page offers BibTeX, RIS, and CSL-JSON exports that can be imported into any reference manager. This ensures compatibility with EndNote, Mendeley, Paperpile, JabRef, and the dozens of other tools researchers use.

For experiments with DOIs, the citation information is also registered with Crossref or DataCite, and reference managers can retrieve metadata through DOI lookup. This provides a fallback path: even if a researcher's reference manager doesn't recognize Republet's embedded metadata, it can look up the DOI and retrieve the citation information that way.

---

## Code Infrastructure

### GitHub and GitLab

Modern research increasingly involves code. Analysis scripts, simulation software, data processing pipelines, and visualization tools are essential components of many experiments. GitHub and GitLab are the dominant platforms for hosting and collaborating on code, with GitHub being the larger platform and GitLab offering a fully open-source option that can be self-hosted.

Researchers use these platforms to share the code underlying their papers, to collaborate on software projects, and to document their analysis workflows. A growing norm in computational research requires authors to provide their code alongside publications. Journals often require code availability statements, and reproducibility badges indicate that code has been verified by reviewers.

Both platforms provide APIs that allow external tools to interact with repositories. This enables integration with continuous integration systems, project management tools, and research platforms. Repositories can be linked from other platforms, and metadata like stars, forks, and commit activity can be displayed.

**Integration**

Republet experiments can link to GitHub or GitLab repositories containing analysis code. This link is stored in the experiment record and displayed on the experiment page. Visitors can click through to examine the code, verify the analysis, or fork it for their own use. Republet can fetch metadata from the repository to display information like the last commit date and number of stars.

For a deeper integration, Republet can verify that a specific repository commit corresponds to the analysis reported in an experiment. The researcher specifies the commit hash that produced the results in the experiment record. Republet links to that specific version, ensuring that anyone examining the experiment sees the exact code that was used, not a later modified version.

### Forgejo (Paid Tier Code Hosting)

Republet's paid tier includes hosted **Forgejo** for code and data.

**Why Forgejo?**

| Feature | Forgejo | Alternatives |
|---------|---------|-------------|
| **Open source** | ✓ (community-governed) | GitLab CE (open), GitHub (closed) |
| **Lightweight** | ~100MB RAM | GitLab CE: ~2GB RAM |
| **Federation** | Native support | Most others: none |
| **Decentralization-aligned** | ✓ | Varies |

Forgejo is a community fork of Gitea with emphasis on federation and decentralization, aligning with Republet's core values. Paid tier users receive a Forgejo instance for code hosting with:
- Full Git repository hosting
- Issue tracking
- Pull requests
- Federation with other Forgejo instances

Free tier users can link to external repositories (GitHub, GitLab, etc.).

---

## The Integration Philosophy

Republet's approach to integration is guided by several principles:

**1. Connect, don't replace.** Republet should connect to existing scholarly infrastructure rather than trying to replace it. Researchers have established workflows and existing records in ORCID, Google Scholar, and other platforms. Republet enhances these by adding experiment-level detail and null results, rather than asking researchers to abandon familiar systems.

**2. Open standards.** Republet should use open standards wherever possible. The citation metadata that makes Republet experiments citeable uses the same standards that journals and preprint servers use. The identity integration uses OAuth, a standard protocol supported by dozens of providers. This commitment to standards reduces lock-in and ensures that Republet experiments remain accessible regardless of Republet's own future.

**3. Optional integration.** Republet should remain optional in the integration. Researchers can use ORCID with Republet or not. They can link to Zenodo or not. They can get DOIs for their experiments or not. Republet's core functionality—publishing structured experiment records without outcome-based rejection—works independently of all integrations. The integrations add value but are not required for Republet to fulfill its mission.

**4. Good citizenship.** Republet should be a good citizen of the scholarly ecosystem. This means following conventions for metadata, respecting rate limits on APIs, providing proper attribution, and contributing back where possible. Republet's experiment records are available for OpenAlex to index, enriching the global scholarly graph. Republet's open approach to data allows other tools to build on top of Republet just as Republet builds on others.

**5. Redundancy as service.** Republet provides alternatives to centralized services—not to replace them, but to ensure the scholarly record survives any single point of failure. LOI supplements DOI. OpenRL supplements OpenAlex. did:peer supplements ORCID. Researchers benefit from both.

---

*Version: 0.2.0*  
*Last updated: 2025*
