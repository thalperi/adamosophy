# Republet UI Design Guide

> Design patterns and styling conventions for Republet, informed by analysis of Couchers (design patterns) and Chatwoot (styling conventions).

---

## Overview

This guide establishes design and styling standards for Republet's user interface. It combines:

- **Design Patterns** from [Couchers](https://github.com/Couchers-org/couchers) — UX flows, interaction patterns, information architecture
- **Styling Conventions** from [Chatwoot](https://github.com/chatwoot/chatwoot) — Color system, typography, component styling

These are adapted for Republet's specific context: a decentralized scientific experiment platform built with Next.js 16, Tailwind CSS 4, and shadcn/ui.

---

## Design Principles

### Core UX Principles

1. **Progressive Disclosure** — Start simple, reveal complexity as needed
2. **Graceful Degradation** — Users can browse with incomplete profiles but are gated from key actions
3. **Trust Indicators** — Multiple visual signals for trustworthiness (verification, citations, contributions)
4. **Action-oriented CTAs** — Clear primary and secondary actions on all pages
5. **Recoverable Flows** — Multi-step processes that can be resumed if abandoned
6. **Contextual Help** — Explanatory text and tooltips for complex features

### Visual Design Principles

1. **CSS Variables for Theming** — All colors as CSS variables enables instant theme switching
2. **Semantic Color Naming** — Color names reflect purpose, not appearance
3. **Accessible by Default** — Use color scales with built-in accessible contrast ratios
4. **Layered Surfaces** — Multiple surface colors create depth in complex UIs
5. **Utility-first with Components** — Tailwind utilities composed into reusable patterns

---

## Authentication & Onboarding

### Multi-Step Signup Flow

Implement progressive onboarding for new researchers:

```
Step 1: Basic Info
├── Name
├── Email
└── Password

Step 2: Identity Setup
├── Create/Import did:peer
└── OAuth linking (optional)

Step 3: Profile Details
├── Affiliation
├── Research areas
└── ORCID linking (optional)

Step 4: Import Publications
├── Import from ORCID
├── Import from Google Scholar
└── Skip for now

Step 5: Community Guidelines
├── Review guidelines
└── Accept terms

Step 6: Email Verification
└── Complete
```

**Implementation notes:**
- Each step should have its own route/state
- Allow users to resume if they drop off
- Store progress in localStorage
- Display progress indicator

### "Jail" Pattern for Required Actions

Users who need to complete mandatory actions are redirected to a dedicated page:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Complete Your Setup                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Before you can continue, please complete the following:        │
│                                                                 │
│  [✓] Email verified                                             │
│  [✓] did:peer created                                           │
│  [ ] Accept Community Guidelines                                │
│  [ ] Set up profile (2/5 required fields)                       │
│                                                                 │
│  [Continue]                                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Invite Code System

Users can join via invite links that display the inviter's context:

```
┌─────────────────────────────────────────────────────────────────┐
│                    You're Invited!                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────┐                                                       │
│  │ 👤   │  Dr. Jane Smith invited you to join Republet         │
│  │      │  Computational Biology Researcher                    │
│  └──────┘                                                       │
│                                                                 │
│  Join to collaborate on experiments and share your research.    │
│                                                                 │
│  [Accept Invitation]  [Sign In]                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Profile & Identity

### Two-Column Profile Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Header                                                          │
├────────────────┬────────────────────────────────────────────────┤
│                │                                                │
│  SIDEBAR       │  MAIN CONTENT                                  │
│  (280px)       │                                                │
│                │  ┌────────────────────────────────────────┐   │
│  ┌──────────┐  │  │ [About] [Experiments] [CV] [Code]     │   │
│  │          │  │  └────────────────────────────────────────┘   │
│  │  Avatar  │  │                                                │
│  │          │  │  Tab content area                              │
│  └──────────┘  │                                                │
│                │                                                │
│  Dr. Jane Smith│                                                │
│  ✓ Verified    │                                                │
│                │                                                │
│  ────────────  │                                                │
│  Affiliation   │                                                │
│  University    │                                                │
│                │                                                │
│  ────────────  │                                                │
│  47 experiments│                                                │
│  156 citations │                                                │
│                │                                                │
│  ────────────  │                                                │
│  [Contact]     │                                                │
│  [Follow]      │                                                │
│                │                                                │
└────────────────┴────────────────────────────────────────────────┘
```

### Profile Completeness Gate

Users cannot perform certain actions if profile is incomplete:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Complete Your Profile                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  To publish experiments, please complete your profile:          │
│                                                                 │
│  [✓] Name                                                       │
│  [✓] Email verified                                             │
│  [ ] Affiliation                                                │
│  [ ] Research areas (at least 1)                                │
│  [ ] ORCID linked (optional but recommended)                    │
│                                                                 │
│  Profile completeness: ████████░░ 80%                           │
│                                                                 │
│  [Complete Profile]                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Verification & Trust Badges

Display trust indicators inline:

```
Dr. Jane Smith ✓        (verified researcher)
Dr. Bob Jones           (unverified)
Lab Admin 🔬           (role badge)
Top Contributor ⭐      (achievement badge)
```

**Badge types:**
- ✓ Verified — Identity verified
- 🔬 Admin — Lab/institution admin
- ⭐ Contributor — Top contributor
- 🎖️ Reviewer — Active peer reviewer
- 📚 Curator — Content curator

---

## Navigation & Information Architecture

### Responsive Navigation

**Desktop (≥1024px):**
- Horizontal navigation bar
- User menu dropdown
- Notification badges on nav items

**Mobile (<1024px):**
- Hamburger menu
- Bottom navigation bar
- Slide-out drawer for user menu

### Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo] Republet                                                 │
│                                                                   │
│  [Discover] [My Experiments] [CV] [Notifications 🔔] [Profile ▼]│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Logged-out navigation:**
```
[Discover] [About] [Pricing] [Sign In] [Sign Up]
```

**Logged-in navigation:**
```
[Discover] [My Experiments] [Collaborations] [CV] [Notifications 🔔] [Profile ▼]
```

### User Menu Dropdown

```
┌─────────────────────┐
│  👤 Dr. Jane Smith  │
│  jane@university.edu│
│  ─────────────────  │
│  Profile            │
│  Settings           │
│  ─────────────────  │
│  Help & Support     │
│  What's New         │
│  ─────────────────  │
│  Sign Out           │
└─────────────────────┘
```

---

## Experiments

### Experiment Card

```
┌─────────────────────────────────────────────────────────────────┐
│  📄 Deep learning for protein structure prediction               │
│                                                                   │
│  LOI:republet.dp.8x7k2m.abc123 • Published Jan 15, 2025         │
│                                                                   │
│  We present a novel approach to protein structure prediction     │
│  using transformer architectures trained on evolutionary...      │
│                                                                   │
│  ─────────────────────────────────────────────────────────────  │
│                                                                   │
│  👤 Dr. Jane Smith  🏷️ computational biology, ML, proteins     │
│                                                                   │
│  📊 12 citations  👁️ 1.2k views  📝 3 reviews                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Experiment Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│  [Back to Results]                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  # Deep learning for protein structure prediction               │
│                                                                 │
│  LOI:republet.dp.8x7k2m.abc123                                  │
│  DOI: 10.12345/republet.abc123 (optional)                       │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [About] [Data] [Code] [Reviews] [Citations]                    │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ## Authors                                                      │
│  Dr. Jane Smith¹, Dr. Bob Jones²                                │
│  ¹ University of Example, ² Research Institute                  │
│                                                                 │
│  ## Abstract                                                     │
│  ...                                                             │
│                                                                 │
│  ## Hypothesis                                                   │
│  ...                                                             │
│                                                                 │
│  ## Methodology                                                  │
│  ...                                                             │
│                                                                 │
│  ## Results                                                      │
│  Status: ✓ Positive result                                       │
│  ...                                                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Sidebar:                                                        │
│  ┌─────────────┐                                                │
│  │ [Cite]      │                                                │
│  │ [Bookmark]  │                                                │
│  │ [Share]     │                                                │
│  │ [Report]    │                                                │
│  └─────────────┘                                                │
│                                                                 │
│  Related Experiments...                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Null Result Display

Null results should be visually distinct but equally prominent:

```
┌─────────────────────────────────────────────────────────────────┐
│  📄 Null result: LSTM approach to folding prediction            │
│                                                                   │
│  ⚠️ NULL RESULT — Did not support hypothesis                     │
│                                                                   │
│  This experiment tested whether LSTM networks could predict      │
│  protein folding rates. Results did not support the hypothesis. │
│                                                                   │
│  ... (rest of card)                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color System

### Semantic Color Scales (12-step)

Use Radix Colors or similar for accessible, semantic color scales:

```
Primary (Brand):   1 ──────────────────────────────────────► 12
                  (lightest)                              (darkest)

Semantic Colors:
- slate (neutral)   — Backgrounds, text, borders
- blue (primary)    — Primary actions, links, focus
- ruby (error)      — Errors, destructive actions
- amber (warning)   — Warnings, caution states
- teal (success)    — Success states, positive results
- violet (accent)   — Accent, highlights
```

### CSS Variable Architecture

```css
:root {
  /* Surfaces */
  --background: 252 252 253;
  --surface-1: 255 255 255;
  --surface-2: 249 250 251;
  --surface-active: 243 244 246;
  
  /* Primary */
  --primary-1: 254 252 254;
  --primary-9: 124 58 237;
  --primary-12: 75 0 130;
  
  /* Borders */
  --border-weak: 234 236 240;
  --border-container: 219 222 229;
  --border-strong: 179 184 194;
  
  /* Semantic */
  --error-9: 229 72 77;    /* ruby */
  --warning-9: 245 158 11; /* amber */
  --success-9: 20 184 166; /* teal */
}

.dark {
  --background: 17 17 19;
  --surface-1: 23 23 26;
  --surface-2: 33 33 38;
  --surface-active: 45 45 51;
  
  /* ... inverted values ... */
}
```

### Surface Layering

```
┌─────────────────────────────────────────┐  ← background
│  ┌───────────────────────────────────┐  │  
│  │  Card (surface-1)                 │  │  ← surface-1 (elevated)
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Nested element (surface-2) │  │  │  ← surface-2 (more elevated)
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Typography

### Font Family

```css
--font-sans: "Inter", -apple-system, system-ui, BlinkMacSystemFont, 
             "Segoe UI", Roboto, "Helvetica Neue", Tahoma, Arial, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", Consolas, Monaco, monospace;
```

### Type Scale

| Class | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| `text-display` | 32px | 520 | 40px | Page titles (rare) |
| `text-heading-1` | 24px | 520 | 32px | Page titles |
| `text-heading-2` | 18px | 520 | 28px | Section headings |
| `text-heading-3` | 16px | 500 | 24px | Card headings |
| `text-body` | 14px | 420 | 22px | Body text |
| `text-body-small` | 13px | 420 | 20px | Secondary text |
| `text-label` | 14px | 500 | 20px | Form labels |
| `text-caption` | 12px | 440 | 18px | Captions, footnotes |
| `text-button` | 14px | 460 | 20px | Button text |

### Font Weights

```css
--font-weight-normal: 420;
--font-weight-medium: 460;
--font-weight-semibold: 500;
--font-weight-bold: 520;
```

*Note: Custom weights (420, 460, 500, 520) provide subtle hierarchy beyond standard weights.*

---

## Spacing & Layout

### Spacing Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `space-1` | 4px | Tight spacing, inline elements |
| `space-2` | 8px | Default spacing |
| `space-3` | 12px | Comfortable spacing |
| `space-4` | 16px | Section gaps |
| `space-5` | 24px | Component gaps |
| `space-6` | 32px | Section separators |
| `space-8` | 48px | Page sections |
| `space-10` | 64px | Major sections |

### Breakpoints

| Name | Min Width | Use Case |
|------|-----------|----------|
| `xs` | 480px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |
| `3xl` | 1900px | Extra-large displays |

### Container Widths

```css
.container-sm { max-width: 640px; }   /* Single column content */
.container-md { max-width: 768px; }   /* Narrow content */
.container-lg { max-width: 1024px; }  /* Standard content */
.container-xl { max-width: 1280px; }  /* Wide content */
.container-2xl { max-width: 1536px; } /* Extra wide */
```

---

## Components

### Buttons

**Variants:**
- Primary — Filled with brand color
- Secondary — Outlined or subtle fill
- Ghost — Transparent with hover state
- Danger — Destructive actions (ruby color)

**Sizes:**
- Small — 32px height, 12px text
- Default — 40px height, 14px text
- Large — 48px height, 16px text

```
[Primary Button]  [Secondary]  [Ghost]  [Danger]
```

**Button with icon:**
```
[⊕ New Experiment]  [→ View All]  [⚙ Settings]
```

### Form Fields

**Base styling:**
```css
.field-base {
  background: var(--surface-1);
  border-radius: 6px;
  padding: 8px 12px;
  outline: 1px solid var(--border-container);
}

.field-base:focus {
  outline: 2px solid var(--primary-9);
}

.field-error {
  outline-color: var(--error-9);
}

.field-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Field with label:**
```
┌─────────────────────────────────────────┐
│  Email Address                          │  ← label
│  ┌───────────────────────────────────┐  │
│  │  jane@university.edu              │  │  ← input
│  └───────────────────────────────────┘  │
│  We'll never share your email.          │  ← helper text
└─────────────────────────────────────────┘
```

**Error state:**
```
┌─────────────────────────────────────────┐
│  Email Address                          │
│  ┌───────────────────────────────────┐  │
│  │  invalid-email                    │  │  ← ruby outline
│  └───────────────────────────────────┘  │
│  ⚠️ Please enter a valid email address  │  ← error message
└─────────────────────────────────────────┘
```

### Cards

**Default card:**
```css
.card {
  background: var(--surface-1);
  border-radius: 12px;
  border: 1px solid var(--border-container);
  padding: 16px;
}

.card-elevated {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Modals & Dialogs

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--surface-1);
  border-radius: 16px;
  max-width: 480px;
  padding: 24px;
}
```

---

## Trust & Verification

### Verification Badge

```
┌─────────────────────────────────────────────────────────────────┐
│  Verification Status                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✓ Identity Verified                                            │
│                                                                 │
│  This researcher has verified their identity through ORCID      │
│  and institutional email confirmation.                          │
│                                                                 │
│  Verified on: January 15, 2025                                  │
│  [View Verification Details]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Community Standing

```
┌─────────────────────────────────────────────────────────────────┐
│  Community Standing                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████████████████░░░░░░ 76%                                 │
│                                                                 │
│  Based on: 47 experiments, 12 reviews, 156 citations            │
│  Response rate: 94% (within 2 days avg)                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Responsive Design

### Mobile-First Approach

1. Design for mobile (375px) first
2. Add breakpoints for larger screens
3. Test on 375px, 768px, 1024px, 1440px minimum

### Mobile Navigation

```
┌─────────────────────────────────────────┐
│  ☰ Republet                    [🔔] [👤] │  ← Header
├─────────────────────────────────────────┤
│                                         │
│  Content Area                           │
│                                         │
├─────────────────────────────────────────┤
│  [🏠]  [🔍]  [📄]  [CV]  [👤]          │  ← Bottom nav
└─────────────────────────────────────────┘
```

### Touch Targets

- Minimum touch target: 44px × 44px
- Spacing between interactive elements: 8px minimum

---

## Dark Mode

### Implementation

- Use `class="dark"` on `<html>` or `<body>` element
- All colors defined as CSS variables
- Switch via:
  - System preference (`prefers-color-scheme`)
  - Manual toggle in settings
  - Persist preference in localStorage

### Color Adjustments

Dark mode should not simply invert colors:
- Reduce contrast slightly (avoid pure white on black)
- Surfaces: 17-51 range instead of 252-255
- Text: 230-250 range instead of 0-30
- Borders: Subtle but visible

---

## Accessibility

### Requirements

- **Contrast ratios:** WCAG AA minimum (4.5:1 for text)
- **Focus states:** Visible focus ring on all interactive elements
- **Keyboard navigation:** All functionality accessible via keyboard
- **Screen readers:** Proper ARIA labels, roles, and live regions
- **Reduced motion:** Respect `prefers-reduced-motion`

### Focus Ring

```css
.focus-ring {
  outline: 2px solid var(--primary-9);
  outline-offset: 2px;
}

.focus-ring:focus-visible {
  outline: 2px solid var(--primary-9);
  outline-offset: 2px;
}
```

---

## Implementation Notes

### Technology Stack

- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (New York style)
- **Icons:** Lucide React
- **Colors:** @radix-ui/colors or custom semantic scales

### Tailwind Configuration

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Semantic colors from CSS variables
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... etc
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
}
```

---

## Summary

| Aspect | Standard |
|--------|----------|
| **Colors** | Radix-style semantic scales, CSS variables |
| **Typography** | Inter, custom weights, utility classes |
| **Spacing** | 4px base unit, 8-step scale |
| **Breakpoints** | xs-3xl (480px-1900px) |
| **Components** | shadcn/ui patterns with custom styling |
| **Dark mode** | Class-based, CSS variable switching |
| **Accessibility** | WCAG AA, visible focus, keyboard nav |

---

*Version: 0.1.0*
*Last updated: 2025*
