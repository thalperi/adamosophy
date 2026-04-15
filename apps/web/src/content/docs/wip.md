---
title: "Work in Progress"
description: "Current development status and active tasks for the documentation system."
sortOrder: 0
draft: false
---

# Work in Progress

This document tracks **actively ongoing** development work for the Adamosophy documentation system.

## Stale Information Policy

**CRITICAL: This document must reflect ONLY what is actively "in progress" NOW.**

### Criteria for Removing Information

Remove content from this document when ANY of these conditions are met:

1. **Completed & Verified**: Task is done, build passed, and user confirmed acceptance
   - Move historical details to a separate `changelog.md` or archive if needed for reference
   - Do NOT keep completed checkboxes here as a work log

2. **Abandoned or Deprioritized**: Work was started but stopped without completion
   - If it might resume soon (within 1-2 sessions), move to a "Paused" section with date paused
   - If unlikely to resume, remove entirely and document reasoning in `decisions.md`

3. **Superseded**: Approach was changed or solution was replaced
   - Document the final approach in relevant technical docs (`ui.md`, `settings.md`, etc.)
   - Remove the abandoned approach from this document

4. **Older Than 3 Sessions**: Any item without updates for 3+ working sessions
   - Review during session start: Is this still active?
   - If yes, add fresh timestamp and continue
   - If no, apply criteria 1-3 above

### Learning Capture Protocol

If you struggled with something and learned important lessons:
- **Do NOT** leave the struggle narrative in `wip.md`
- **DO** document key learnings in:
  - `decisions.md` for architectural choices
  - `agent.md` for operational lessons
  - Inline code comments for implementation specifics
- Then remove the entire episode from `wip.md`

**Remember**: `wip.md` is a current status dashboard, NOT a project diary, changelog, or work log.

---

## Currently Active Tasks

Tasks being worked on in the current session:

- [ ] Implement GitHub integration for actual file updates
  - Install `octokit` and `gray-matter` packages
  - Update API endpoints to commit/push changes back to repo
  - Test end-to-end workflow with build verification

- [ ] Add image upload and optimization logic
  - Implement file storage in `/api/upload-image`
  - Add automatic resizing to optimal dimensions (400x250px for cards)
  - Convert images to WebP format
  - Store optimized images in `/public/docs/images/`

- [ ] Implement remaining Markdown rendering options
  - [ ] Option 2: remark/rehype ecosystem solution
  - [ ] Option 3: @tailwindcss/typography with prose class
  - [ ] Add tristate toggle in drawer for renderer selection
  - [ ] Integrate with user settings profile section

---

## Recently Completed (Pending Removal)

**These items should be moved to changelog and removed within 1-2 sessions:**

- [x] Fix MD viewer nested list indentation
  - Completed: 2026-04-14
  - Implementation: marked + github-markdown-css modular renderer
  - Build: Run #91 passed
  
*(Note: Once changelog.md exists, move this there and delete from wip.md)*

---

## Paused Items

**Items temporarily on hold with intent to resume:**

*None currently*

---

## Notes & Context

Reference information for active tasks:

- **GitHub Integration**: Changes made via UI (reordering, metadata edits) will commit directly to `main` branch using PAT, triggering automatic rebuilds
- **Image Handling**: Smart resizing and WebP conversion for performance optimization
- **Markdown Rendering**: Three optional rendering methods with user preference stored in settings
- **Build Verification**: All commits must pass GitHub Actions build before task completion confirmation

---

*Last Updated: 2026-01-14*
*Next Review: Beginning of next session - apply stale information criteria*
