---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 1 — Dead Code & Stub Removal

## Title
[1.1] Remove Unused Analytics Exports

## Summary
`trackClick`, `trackProjectView`, `trackFilterUsage`, and `trackPerformance` are exported from `src/utils/analytics.ts` but have zero call-sites anywhere in the codebase. Remove all four exports and their implementations.

## Affected Files
- `src/utils/analytics.ts`

## Acceptance Criteria
- [ ] `trackClick` export and implementation removed from `analytics.ts`
- [ ] `trackProjectView` export and implementation removed from `analytics.ts`
- [ ] `trackFilterUsage` export and implementation removed from `analytics.ts`
- [ ] `trackPerformance` export and implementation removed from `analytics.ts`
- [ ] No other files import or reference any of the four removed functions
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 1](../ROADMAP.md#phase-1--dead-code--stub-removal)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 1 — Dead Code & Stub Removal

## Title
[1.2] Remove Disabled Logo-Download Feature

## Summary
`src/features/hexes/svg/logo.tsx` contains an html2canvas-based logo download feature gated behind a hardcoded `makingLogo = false` flag. It was never intended to ship. Remove the flag, the html2canvas integration, and all associated dead code paths.

## Affected Files
- `src/features/hexes/svg/logo.tsx`

## Acceptance Criteria
- [ ] `makingLogo` flag and all code paths branching on it removed
- [ ] html2canvas import (if present) removed
- [ ] Component still renders correctly without the download feature
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 1](../ROADMAP.md#phase-1--dead-code--stub-removal)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 1 — Dead Code & Stub Removal

## Title
[1.3] Remove `printAllHexSVGs()` Function

## Summary
`printAllHexSVGs()` exists in `src/utils/hex-SVG-coords-converter.ts` solely to support the disabled logo-download feature. With that feature removed, this function has no call-sites and should be deleted.

## Affected Files
- `src/utils/hex-SVG-coords-converter.ts`
- `src/features/hexes/svg/logo.tsx` (remove the import, if not already done in the logo issue)

## Acceptance Criteria
- [ ] `printAllHexSVGs` function removed from `hex-SVG-coords-converter.ts`
- [ ] Any import of `printAllHexSVGs` removed from consuming files
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 1](../ROADMAP.md#phase-1--dead-code--stub-removal)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 1 — Dead Code & Stub Removal

## Title
[1.4] Remove Sentry Placeholder Stub

## Summary
`initializeSentry()` in `src/utils/analytics.ts` is a stub that does nothing except log "not installed". Sentry is not a dependency of this project. Remove the function entirely.

## Affected Files
- `src/utils/analytics.ts`

## Acceptance Criteria
- [ ] `initializeSentry` function removed from `analytics.ts`
- [ ] No remaining references to `initializeSentry` anywhere in the codebase
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 1](../ROADMAP.md#phase-1--dead-code--stub-removal)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 1 — Dead Code & Stub Removal

## Title
[1.5] Remove Commented-Out Export in HexGridLayout

## Summary
`src/features/hexes/HexGridLayout.tsx` contains a commented-out export that was superseded by the current export. Remove the dead comment line.

## Affected Files
- `src/features/hexes/HexGridLayout.tsx`

## Acceptance Criteria
- [ ] Commented-out export line removed from `HexGridLayout.tsx`
- [ ] No other commented-out code left in the file
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 1](../ROADMAP.md#phase-1--dead-code--stub-removal)
