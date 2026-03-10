---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 6 — Routing & UX Correctness

## Title
[6.1] Create NotFound Component for Unmatched Routes

## Summary
The catch-all `*` route in `src/app/App.tsx` renders the same `Projects` component as the home page. Invalid URLs silently show the portfolio with no indication anything is wrong. Create a dedicated `NotFound` component and wire it to the `*` route.

## Affected Files
- `src/app/App.tsx`
- `src/components/global/ErrorBoundaryWrappers.tsx` (wire new component into the page-level error boundary)
- `src/features/projects/ProjectNotFound.tsx` (reference — existing not-found state for projects, not to be confused with the route-level 404)

## Acceptance Criteria
- [ ] A `NotFound` component created (new file or inline in `App.tsx`) that renders a clear "page not found" message
- [ ] The `*` catch-all route in `App.tsx` renders `NotFound` instead of `Projects`
- [ ] `NotFound` is wrapped in the appropriate page-level error boundary
- [ ] Navigating to an invalid URL (e.g. `/does-not-exist`) shows the `NotFound` component, not the portfolio
- [ ] Existing valid routes (`/`, `/projects`, `/projects/:id`) are unaffected
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 6](../ROADMAP.md#phase-6--routing--ux-correctness)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 6 — Routing & UX Correctness

## Title
[6.2] Document RouterEventListener Separation

## Summary
`RouterEventListener` is a separate component from `App` for a non-obvious reason: React Router hooks (`useNavigate`, `useLocation`) must be called within a Router context, which requires the component to live inside `<BrowserRouter>`. Add a comment making this clear.

## Affected Files
- `src/app/App.tsx`

## Acceptance Criteria
- [ ] Comment added directly above the `RouterEventListener` component definition explaining why it is a separate component
- [ ] No logic changes — comment only
- [ ] Build passes

## Context
[docs/ROADMAP.md — Phase 6](../ROADMAP.md#phase-6--routing--ux-correctness)
