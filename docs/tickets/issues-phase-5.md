---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 5 — Build & Config Cleanup

## Title
[5.1] Strip Misleading Comments from vite.config.ts

## Summary
`vite.config.ts` contains AI-generated or template-style comments that are misleading or no longer accurate (e.g. "Replace 'crawfordforbes' with your actual repository name" on a `base: '/'` that is already correct). Strip all comments that don't add real information.

## Affected Files
- `vite.config.ts`

## Acceptance Criteria
- [ ] Template/placeholder comments removed from `vite.config.ts`
- [ ] Any remaining comments are accurate and add value (rationale, non-obvious trade-offs)
- [ ] No logic changes — comments only
- [ ] Build passes

## Context
[docs/ROADMAP.md — Phase 5](../ROADMAP.md#phase-5--build--config-cleanup)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 5 — Build & Config Cleanup

## Title
[5.2] Enable Hidden Source Maps for Production

## Summary
Source maps are disabled in `vite.config.ts` with a comment citing "better performance". Source maps are critical for production debugging — without them, stack traces point to minified code. Enable `sourcemap: 'hidden'` to generate them without serving them inline.

## Affected Files
- `vite.config.ts`

## Acceptance Criteria
- [ ] `sourcemap` option set to `'hidden'` in `vite.config.ts`
- [ ] "disabled for better performance" comment removed
- [ ] Production build generates `.map` files
- [ ] Source map files are not referenced inline in the built JS bundles
- [ ] Build passes

## Context
[docs/ROADMAP.md — Phase 5](../ROADMAP.md#phase-5--build--config-cleanup)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 5 — Build & Config Cleanup

## Title
[5.3] Evaluate and Resolve Chunk Size Warning Limit

## Summary
The `chunkSizeWarningLimit` in `vite.config.ts` is set to 1000kb — double the Vite default of 500kb. This suppresses warnings that may indicate a real problem. Investigate what is causing large chunks and either fix the root cause or explicitly document the justification for the higher limit.

## Affected Files
- `vite.config.ts`

## Acceptance Criteria
- [ ] Run `npm run build` and review chunk sizes in the output
- [ ] Either: reduce `chunkSizeWarningLimit` back toward 500kb by splitting or lazy-loading the offending chunks, OR add a comment in `vite.config.ts` that names the specific chunk(s) driving the limit and explains why they cannot be split
- [ ] Decision documented in this issue before closing
- [ ] Build passes

## Context
[docs/ROADMAP.md — Phase 5](../ROADMAP.md#phase-5--build--config-cleanup)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 5 — Build & Config Cleanup

## Title
[5.4] Evaluate Legacy Safari 13–14 Bundle Targets

## Summary
The Vite legacy plugin is configured to target Safari 13–14 (released 2019–2020), generating additional legacy bundles on every build. Evaluate whether real users on those versions exist before keeping the extra build weight.

## Affected Files
- `vite.config.ts`

## Acceptance Criteria
- [ ] Check GA4 analytics for Safari version breakdown
- [ ] Either: remove the legacy plugin targets if Safari 13–14 usage is negligible (<1%), OR add a comment in `vite.config.ts` citing the analytics data that justifies keeping them
- [ ] Decision documented in this issue before closing
- [ ] Build passes

## Context
[docs/ROADMAP.md — Phase 5](../ROADMAP.md#phase-5--build--config-cleanup)
