---
title: 'Architecture Decisions'
description: 'Record of key architectural decisions, design choices, and lessons learned during development.'
sortOrder: 2
---

# Architecture Decisions

This document captures significant architectural decisions, design rationales, and lessons learned during the development of Adamosophy.

## Decision Log

### 2026-04-14: Markdown Rendering Strategy

**Decision**: Implement modular Markdown renderer with three interchangeable options

**Context**: The default MD viewer had nested list indentation issues where all list items appeared left-aligned instead of hierarchically indented.

**Options Considered**:
1. **marked + github-markdown-css** (SELECTED as default)
   - Fast parsing performance
   - Authentic GitHub-style appearance
   - Simple integration

2. **remark/rehype ecosystem**
   - Advanced processing capabilities
   - Better Astro integration
   - Plugin extensibility for future needs

3. **@tailwindcss/typography**
   - Beautiful default styles
   - Perfect Tailwind integration
   - Consistent design system alignment

**Rationale**: Providing user choice accommodates different preferences while the modular architecture allows incremental implementation. Option 1 was chosen as default for its simplicity and proven results.

**Implementation**: Modular renderer architecture in place; Option 1 complete; Options 2 & 3 pending.

**Consequences**: 
- Users can select preferred rendering method via settings
- Slight increase in bundle size (mitigated by lazy loading)
- Future-proof architecture for additional renderers

---

### 2026-01-14: Build Error Resolution (esbuild Parsing)

**Problem**: Build failed with error `Expected "(" but found "type"` in API route files (`update-doc-metadata.ts`, `update-doc-order.ts`, `upload-image.ts`).

**Root Cause**: Astro's static build mode (using esbuild) cannot parse TypeScript `import type` syntax inside `.ts` API route files when combined with frontmatter delimiters.

**Decision**: Remove `type` keyword from imports and eliminate trailing frontmatter delimiters

**Before**:
```typescript
import type { APIRoute } from 'astro';
```

**After**:
```typescript
import { APIRoute } from 'astro';
```

**Rationale**: The `type` modifier is unnecessary at runtime and causes esbuild parsing conflicts in this specific context. Removing it has no functional impact while resolving the build failure.

**Lesson Learned**: API route files in Astro should avoid `import type` syntax and must not contain frontmatter delimiters (`---`).

---

### 2026-01-14: Sidebar Resizing Implementation

**Decision**: Implement drag-to-resize sidebar with localStorage persistence

**Requirements**:
- Default width: 21rem (30% wider than original 16rem)
- Resize range: 200px - 600px
- Mobile support with touch events
- User preference persistence

**Implementation Approach**:
- CSS custom property `--sidebar-width` updated via drag logic
- Resize handle appears on hover with blue highlight
- Touch event support for mobile devices
- Width saved to localStorage and restored on page load

**Mobile Fix**: Initial implementation used `display: none` toggle which caused drawer collapse on mobile. Switched to off-canvas transform pattern (`translate-x`) ensuring proper rendering on small screens.

**Consequences**: Improved usability with customizable sidebar width; mobile responsiveness maintained.

---

### 2026-01-14: Documentation Structure Organization

**Decision**: Separate documentation into distinct purpose-driven files

**Structure**:
- **agent.md**: Operational constraints and protocols (agent-facing)
- **wip.md**: Current active work status dashboard
- **decisions.md**: Architectural decisions and lessons learned (this file)
- **ui.md**: UI architecture and component documentation
- **settings.md**: User settings and configuration options

**Rationale**: Clear separation of concerns prevents information overload and makes each document more maintainable. Prevents `wip.md` from becoming a dumping ground for historical information.

**Consequences**: 
- Easier navigation and maintenance
- Clear ownership of information types
- Reduced redundancy across documents

---

## Pending Decisions

Items requiring architectural decisions:

- **GitHub Integration Strategy**: Direct Octokit integration vs. alternative approaches
- **Image Storage**: Local `/public/docs/images/` vs. external CDN/storage service
- **User Settings Persistence**: localStorage vs. backend user profiles

---

*Last Updated: 2026-01-14*
*Maintained as part of the restructured documentation system*
