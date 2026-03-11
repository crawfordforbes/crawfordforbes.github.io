---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 7 — Testing Foundation

## Title
[7.1] Testing Infrastructure Setup

## Summary
The project has no test runner or test configuration. Install Vitest and Testing Library, wire up the Vitest config block in `vite.config.ts`, and add `test` and `test:coverage` scripts to `package.json` so the test suite can be run locally and in CI.

## Affected Files
- `vite.config.ts`
- `package.json`

## Acceptance Criteria
- [ ] `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/user-event`, and `jsdom` installed as dev dependencies
- [ ] `vite.config.ts` includes a `test` config block with `environment: 'jsdom'`, `globals: true`, and `setupFiles` defined
- [ ] `package.json` has a `test` script and a `test:coverage` script
- [ ] `npm test -- --run` exits 0 (even with no test files yet)
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 7, Setup](../ROADMAP.md#phase-7--testing-foundation)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 7 — Testing Foundation

## Title
[7.2] Utility Function Tests — `src/utils/projects.ts`

## Summary
`src/utils/projects.ts` contains core data-access helpers with no test coverage. Add unit tests for `isValidProjectId`, `generateImageAlt`, and the tag filter utilities to verify their contracts and guard against regressions.

## Affected Files
- `src/utils/projects.ts`
- `src/utils/projects.test.ts` (new test file)

## Acceptance Criteria
- [ ] `isValidProjectId` returns `true` for a known project ID
- [ ] `isValidProjectId` returns `false` for an unknown string
- [ ] `isValidProjectId` returns `false` for non-string values
- [ ] `generateImageAlt` returns a well-formed string from known inputs
- [ ] `generateImageAlt` handles an empty `imageId` without throwing
- [ ] Tag filter utility returns only projects matching the selected tag
- [ ] Tag filter utility returns all projects when the filter is empty
- [ ] `npm test -- --run` exits 0

## Context
[docs/ROADMAP.md — Phase 7, Tests to write — Utility functions](../ROADMAP.md#phase-7--testing-foundation)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 7 — Testing Foundation

## Title
[7.3] Hook Tests — `useProjectFilters`

## Summary
`useProjectFilters` manages selected-tag state for project filtering but has no tests. Add hook-level tests covering the default state, tag selection, and tag-clearing behaviour.

## Affected Files
- `src/features/projects/hooks/useProjectFilters.ts`
- `src/features/projects/hooks/useProjectFilters.test.ts` (new test file)

## Acceptance Criteria
- [ ] Default state has no selected tags
- [ ] Selecting a tag updates filter state to include that tag
- [ ] Clearing tags resets state back to the default (no selected tags)
- [ ] `npm test -- --run` exits 0

## Context
[docs/ROADMAP.md — Phase 7, Tests to write — Hook: useProjectFilters](../ROADMAP.md#phase-7--testing-foundation)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 7 — Testing Foundation

## Title
[7.4] Hook Tests — `useProjectRouting`

## Summary
`useProjectRouting` reads the URL to resolve the active project and handles invalid IDs, but has no tests. Add hook-level tests verifying that a valid project ID in the URL sets `selectedProjectId` and that an invalid ID triggers navigation to the error route.

## Affected Files
- `src/features/projects/hooks/useProjectRouting.ts`
- `src/features/projects/hooks/useProjectRouting.test.ts` (new test file)

## Acceptance Criteria
- [ ] A valid project ID in the URL sets `selectedProjectId` to that ID
- [ ] An invalid project ID in the URL triggers navigation to `/projects?error=project-not-found`
- [ ] Tests wrap the hook with `RouterProvider` / `MemoryRouter` as needed
- [ ] `npm test -- --run` exits 0

## Context
[docs/ROADMAP.md — Phase 7, Tests to write — Hook: useProjectRouting](../ROADMAP.md#phase-7--testing-foundation)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 7 — Testing Foundation

## Title
[7.5] Component Smoke Tests — ErrorBoundary, OptimizedImage, App

## Summary
`ErrorBoundary`, `OptimizedImage`, and `App` are core components with no test coverage. Add smoke tests to verify they render correctly under normal conditions and handle error/fallback cases as designed.

## Affected Files
- `src/components/global/ErrorBoundary.tsx`
- `src/components/global/OptimizedImage.tsx`
- `src/app/App.tsx`
- `src/components/global/ErrorBoundary.test.tsx` (new test file)
- `src/components/global/OptimizedImage.test.tsx` (new test file)
- `src/app/App.test.tsx` (new test file)

## Acceptance Criteria
- [ ] `ErrorBoundary` renders children normally when no error is thrown
- [ ] `ErrorBoundary` renders its fallback UI when a child component throws
- [ ] `OptimizedImage` renders an `<img>` with the provided `alt` and `src`
- [ ] `OptimizedImage` renders the fallback `src` on image load error
- [ ] Verifies picture tag renders expected source sets.
- [ ] `App` mounts without throwing
- [ ] `npm test -- --run` exits 0

## Context
[docs/ROADMAP.md — Phase 7, Tests to write — Component smoke tests](../ROADMAP.md#phase-7--testing-foundation)
