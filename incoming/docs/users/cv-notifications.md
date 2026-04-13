# CV & Activity Monitoring

> User documentation for Republet's comprehensive academic CV and activity notification system.

---

## Overview

Republet provides a **comprehensive, self-updating academic CV** that tracks your research contributions and a **notification system** that keeps you informed about activity related to your work.

### Key Features

- **Automatic CV updates** — Your CV reflects your latest work automatically
- **Activity monitoring** — Stay informed about citations, mentions, and more
- **External integration** — Import activity from ORCID, Google Scholar, and other platforms
- **Configurable notifications** — Control what you're notified about and how often

---

## Academic CV

### What It Tracks

Your Republet CV automatically includes:

| Category | Content |
|----------|---------|
| **Experiments** | All published experiments, including null results |
| **Preprints** | Narrative papers published on Republet |
| **Citations** | Citations to your work (from Republet and external sources) |
| **Reviews** | Peer reviews you've conducted |
| **Code** | Repositories linked to your experiments |
| **Datasets** | Data you've published or contributed to |
| **Collaborations** | Co-authored works and shared projects |
| **Credits** | Republet credits earned through contributions |

### CV Display

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Academic CV                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Dr. Jane Smith                                                         │
│  ─────────────────                                                      │
│  ORCID: 0000-0000-0000-0000                                             │
│  did:peer: z6Mk...8x7k                                                  │
│  Affiliation: University of Example                                     │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  Summary                                                                │
│  ────────                                                               │
│  • 47 experiments published                                             │
│  • 12 null results                                                      │
│  • 156 citations                                                        │
│  • 8 peer reviews completed                                             │
│  • Republet Credit: 2,340                                               │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  Recent Activity                                                        │
│  ───────────────                                                        │
│                                                                         │
│  📄 Deep learning for protein structure prediction                       │
│     LOI:republet.dp.8x7k2m.abc123                                       │
│     Published: Jan 15, 2025 • 12 citations                              │
│                                                                         │
│  📄 Null result: LSTM approach to folding prediction                    │
│     LOI:republet.dp.8x7k2m.def456                                       │
│     Published: Jan 10, 2025 • 3 citations                               │
│                                                                         │
│  🔔 Cited by: Dr. Bob Jones in "Recent advances in protein folding"     │
│     Mar 5, 2025                                                         │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  [Export CV]  [Share Public Link]  [Configure Sections]                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### CV Sections

You can configure which sections appear on your CV:

| Section | Default | Description |
|---------|---------|-------------|
| **Summary** | ✓ | Key metrics at a glance |
| **Experiments** | ✓ | List of all published experiments |
| **Null Results** | ✓ | Highlight null results separately |
| **Preprints** | ✓ | Narrative papers |
| **Citations** | ✓ | Works that cite you |
| **Reviews** | ✓ | Peer reviews conducted |
| **Code** | ✓ | Linked repositories |
| **Datasets** | ✓ | Published data |
| **Collaborations** | ✓ | Co-author network |
| **Presentations** | Optional | Conference talks, posters |
| **Teaching** | Optional | Courses, mentorship |
| **Service** | Optional | Editorial work, committees |

### Export Options

Your CV can be exported in multiple formats:

| Format | Use Case |
|--------|----------|
| **PDF** | Job applications, grant proposals |
| **HTML** | Personal website embedding |
| **JSON** | Integration with other systems |
| **LaTeX** | Academic documents |
| **BibTeX** | Reference management |

### Public CV

Your CV can be made public at a unique URL:

```
https://republet.org/cv/jane-smith
```

Privacy controls:
- **Public** — Anyone can view
- **Link-only** — Only those with the link can view
- **Private** — Only you can view

---

## Activity Monitoring

### How It Works

Republet monitors for activity related to you and your work using three approaches:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Activity Monitoring Approaches                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. Event-driven (Webhooks)                                             │
│     ┌─────────────┐                                                     │
│     │ Integrated  │────── Webhook ──────▶ Republet ────▶ Notification │
│     │ Platform    │                         │                          │
│     │ (ORCID,     │                         │                          │
│     │  CrossRef)  │                         │                          │
│     └─────────────┘                         │                          │
│                                             │                          │
│  2. Periodic Polling                       │                          │
│     ┌─────────────┐                         │                          │
│     │ Platforms   │────── Scheduled ──────▶│                          │
│     │ without     │       Fetch            │                          │
│     │ webhooks    │                         │                          │
│     └─────────────┘                         │                          │
│                                             │                          │
│  3. Active Search (Paid Tier)              │                          │
│     ┌─────────────┐                         │                          │
│     │ Republet    │────── Proactive ──────▶│                          │
│     │ Monitor     │       Search           │                          │
│     └─────────────┘                         │                          │
│                                             ▼                          │
│                                      Your Inbox                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Monitoring Tiers

| Feature | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Method** | Passive (webhooks + polling) | Active + Passive |
| **Coverage** | Integrated platforms only | Comprehensive web search |
| **Frequency** | Daily/weekly checks | Real-time + daily checks |
| **Sources** | ORCID, CrossRef, Republet | + Google Scholar, Semantic Scholar, social media |
| **Notification latency** | Hours to days | Minutes to hours |

### What Gets Monitored

| Activity Type | Description | Free | Paid |
|---------------|-------------|------|------|
| **Citations** | Someone cites your work | ✓ | ✓ |
| **Mentions** | Your name/work mentioned | — | ✓ |
| **New publications** | New work by you (imported) | ✓ | ✓ |
| **Followers** | Someone follows you | ✓ | ✓ |
| **Reviews** | Review on your experiment | ✓ | ✓ |
| **Replications** | Someone replicates your work | ✓ | ✓ |
| **Social media** | Twitter, Mastodon mentions | — | ✓ |
| **News coverage** | Press mentions | — | ✓ |
| **Grant citations** | Your work cited in grants | — | ✓ |

---

## Notifications

### Notification Types

| Type | Icon | Description |
|------|------|-------------|
| **Citation** | 📖 | Your work was cited |
| **Mention** | 🔔 | You were mentioned |
| **Review** | 📝 | Someone reviewed your work |
| **Follower** | 👤 | New follower |
| **Replication** | 🔄 | Someone replicated your experiment |
| **Collaboration** | 🤝 | Collaboration invitation |
| **System** | ⚙️ | Platform updates, maintenance |
| **Recovery** | 🔑 | Delegate recovery request |

### Notification Center

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Notifications                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Filters: [All] [Unread] [Citations] [Mentions] [System]               │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  📖 NEW                                                                 │
│  Dr. Alice Chen cited your experiment                                   │
│  "Deep learning for protein structure prediction"                       │
│  in "Advances in computational biology"                                 │
│  2 hours ago                                          [View] [Dismiss]  │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  📝                                                                     │
│  Your experiment received a review                                      │
│  "Null result: LSTM approach to folding prediction"                     │
│  Reviewer: anonymous • Rating: Methodologically sound                  │
│  Yesterday                                             [View] [Dismiss] │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  👤                                                                     │
│  Dr. Bob Jones started following you                                    │
│  2 days ago                                            [View] [Dismiss] │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  📖                                                                     │
│  Your work was cited in a grant proposal                                │
│  NSF Grant #12345 by Dr. Carol White                                    │
│  3 days ago                                            [View] [Dismiss] │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  [Mark All as Read]  [Notification Settings]                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Delivery Channels

Notifications can be delivered via:

| Channel | Free | Paid | Configurable |
|---------|------|------|--------------|
| **In-app** | ✓ | ✓ | Per type |
| **Email** | ✓ | ✓ | Per type + frequency |
| **Push (browser)** | — | ✓ | Per type |
| **Webhook** | — | ✓ | Per type |
| **Digest** | ✓ | ✓ | Daily/weekly |

### Notification Frequency

Configure how often you receive notifications:

| Frequency | Description |
|-----------|-------------|
| **Real-time** | Immediate notification (paid tier only for active monitoring) |
| **Daily digest** | One email per day with all notifications |
| **Weekly digest** | One email per week with summary |
| **Custom** | Different frequencies per notification type |

### Example Configuration

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Notification Settings                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Citation Notifications                                                 │
│  ──────────────────────                                                 │
│  When someone cites my work:                                            │
│    [✓] In-app notification                                              │
│    [✓] Email (daily digest)                                             │
│    [ ] Browser push                                                     │
│                                                                         │
│  Mention Notifications                                                  │
│  ────────────────────────                                               │
│  When I'm mentioned:                                                    │
│    [✓] In-app notification                                              │
│    [✓] Email (immediate)                                                │
│    [✓] Browser push                                                     │
│                                                                         │
│  Review Notifications                                                   │
│  ───────────────────────                                                │
│  When my work is reviewed:                                              │
│    [✓] In-app notification                                              │
│    [✓] Email (daily digest)                                             │
│    [ ] Browser push                                                     │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Digest Schedule                                                        │
│  ─────────────────                                                      │
│  Daily digest sent at: [9:00 AM ▼]                                      │
│  Weekly digest sent on: [Monday ▼] at [9:00 AM ▼]                       │
│                                                                         │
│  [Save Settings]                                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Activity Sources

### Integrated Platforms

Republet monitors activity from these integrated platforms:

| Platform | Integration Type | Data Retrieved |
|----------|-----------------|----------------|
| **ORCID** | API + Webhook | Publications, affiliations, grants |
| **CrossRef** | API | Citations, publication metadata |
| **DataCite** | API | Dataset citations |
| **OpenAlex** | API | Citations, author matches |
| **Semantic Scholar** | API | Citations, paper matches |
| **arXiv** | API | Preprint submissions |
| **bioRxiv/medRxiv** | API | Preprint submissions |
| **GitHub** | API | Repository activity |
| **GitLab** | API | Repository activity |

### Onboarding Import

During account creation, Republet offers to import your existing publications:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Import Your Publications                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Would you like to import your existing publications?                   │
│                                                                         │
│  This helps Republet:                                                   │
│  • Build your complete CV                                               │
│  • Monitor citations to all your work                                   │
│  • Connect you with your existing academic identity                     │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  Import from:                                                           │
│                                                                         │
│  [✓] ORCID (0000-0000-0000-0000)                                        │
│      Found: 23 publications                                             │
│                                                                         │
│  [ ] Google Scholar (jane.smith@university.edu)                         │
│      Connect to import                                                  │
│                                                                         │
│  [ ] Semantic Scholar                                                   │
│      Will search by name                                                │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                         │
│  [Import Selected]  [Skip for Now]  [Configure Later]                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Ongoing Sync

Configure ongoing synchronization:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Sync Settings                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ORCID Sync                                                             │
│  ───────────                                                            │
│  Status: Connected ✓                                                    │
│  Last sync: 2 hours ago                                                 │
│                                                                         │
│  Sync frequency: [Daily ▼]                                              │
│                                                                         │
│  What to sync:                                                          │
│    [✓] Publications                                                     │
│    [✓] Affiliations                                                     │
│    [ ] Grants                                                           │
│    [ ] Peer reviews                                                     │
│                                                                         │
│  Resource estimate:                                                     │
│  • ~2 MB data transfer per sync                                         │
│  • ~30 seconds processing time                                          │
│                                                                         │
│  [Sync Now]  [Disconnect]                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Privacy Controls

### What You Control

| Setting | Options |
|---------|---------|
| **CV visibility** | Public / Link-only / Private |
| **Activity monitoring** | Enable / Disable |
| **Notification types** | Per-type on/off |
| **Delivery channels** | Per-channel on/off |
| **External sync** | Per-platform on/off |
| **Data retention** | Keep forever / Delete after N days |

### Data Storage

Activity data is stored:
- In your Willow replica (decentralized)
- In Republet's hosted database (for CV generation)
- You can export or delete at any time

---

## Technical Implementation

### Event-Driven Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Event Flow                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  External Platform (e.g., ORCID)                                        │
│       │                                                                 │
│       │ Webhook                                                         │
│       ▼                                                                 │
│  ┌─────────────────┐                                                    │
│  │ Webhook Handler │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │ Event Processor │                                                    │
│  │ - Parse event   │                                                    │
│  │ - Validate      │                                                    │
│  │ - Enrich        │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │ Notification    │                                                    │
│  │ Service         │                                                    │
│  │ - Match users   │                                                    │
│  │ - Create notif  │                                                    │
│  │ - Deliver       │                                                    │
│  └─────────────────┘                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Periodic Polling

For platforms without webhooks:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Polling Flow                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Scheduler (runs on configured interval)                                │
│       │                                                                 │
│       ▼                                                                 │
│  ┌─────────────────┐                                                    │
│  │ Poll Workers    │                                                    │
│  │ - Fetch from    │                                                    │
│  │   each platform │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │ Diff Engine     │                                                    │
│  │ - Compare to    │                                                    │
│  │   last fetch    │                                                    │
│  │ - Identify new  │                                                    │
│  │   activity      │                                                    │
│  └────────┬────────┘                                                    │
│           │                                                             │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │ Event Queue     │                                                    │
│  │ (for processing)│                                                    │
│  └─────────────────┘                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Active Search (Paid Tier)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Active Monitoring                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Monitor Service (runs continuously)                                    │
│       │                                                                 │
│       ├──▶ Google Scholar API (search for name)                        │
│       │         │                                                       │
│       │         └──▶ New citation? → Create notification               │
│       │                                                                 │
│       ├──▶ Semantic Scholar API (search for papers)                    │
│       │         │                                                       │
│       │         └──▶ New citation? → Create notification               │
│       │                                                                 │
│       ├──▶ Twitter/Mastodon API (search for mentions)                  │
│       │         │                                                       │
│       │         └──▶ New mention? → Create notification                │
│       │                                                                 │
│       └──▶ News APIs (search for name/work)                            │
│                 │                                                       │
│                 └──▶ News coverage? → Create notification              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

| Feature | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **CV** | Full features | Full features |
| **CV visibility** | Public/private | Public/private |
| **Monitoring method** | Passive (webhooks + polling) | Active + Passive |
| **Notification channels** | In-app, Email | + Push, Webhook |
| **Digest options** | Daily, Weekly | + Real-time |
| **External sources** | ORCID, CrossRef | + Google Scholar, Social |
| **Activity history** | 1 year | Unlimited |

---

*Version: 0.1.0*
*Last updated: 2025*
