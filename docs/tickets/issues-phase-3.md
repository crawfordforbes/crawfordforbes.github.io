---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.1] Rewrite scrollToTarget to Remove Fallback Chain

## Summary
`scrollToTarget` in `src/utils/site.ts` is ~100 lines. It contains nested try/catch blocks and a three-tier URL update fallback chain (`navigate` → `history.pushState` → `CustomEvent`) that is duplicated in full in the element-not-found early-return branch. Rewrite to ~25 lines: update URL via the provided `navigate` callback if given, then scroll to the element.

## Affected Files
- `src/utils/site.ts`

## Acceptance Criteria
- [ ] `scrollToTarget` rewritten to ~25 lines
- [ ] Nested try/catch blocks removed
- [ ] Three-tier URL fallback chain (`navigate` → `history.pushState` → `CustomEvent`) removed; use `navigate` callback only
- [ ] Duplicated fallback logic in the element-not-found branch removed
- [ ] Function still correctly scrolls to the target element with easing
- [ ] Function still correctly calls `navigate(targetUrl)` when provided
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.2] Simplify OptimizedImage Alt-Text Helper

## Summary
The alt-text helper in `src/components/global/OptimizedImage.tsx` wraps `new URL()` in a try/catch where the catch block executes near-identical code to the try. Collapse to a single code path using a simple string prefix check for HTTP URLs.

## Affected Files
- `src/components/global/OptimizedImage.tsx`

## Acceptance Criteria
- [ ] try/catch in the alt-text helper removed
- [ ] Replaced with a single code path using a string check (e.g. `src.startsWith('http')`)
- [ ] Alt text output is identical for both absolute and relative src values
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.3] Extract getScreenSize and Remove ESLint Suppression

## Summary
`getScreenSize` in `src/app/App.tsx` is defined inline and recalculates on every render. This requires an `// eslint-disable-next-line` comment to suppress a hooks dependency warning. Extract the function to a stable location and remove the suppression comment.

## Affected Files
- `src/app/App.tsx`
- `src/utils/site.ts` (likely destination for the extracted function)

## Acceptance Criteria
- [ ] `getScreenSize` extracted out of the render cycle
- [ ] `// eslint-disable-next-line react-hooks/exhaustive-deps` comment removed
- [ ] No change to runtime behaviour — screen size tracking works as before
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.4] Remove Ref+Effect Callback Sync in useProjectFilters

## Summary
`useProjectFilters.ts` uses a `useRef` + syncing `useEffect` to avoid listing a prop callback in effect dependencies. This is defensive over-engineering. Remove the ref/effect sync and add the callback to the dependency array directly.

## Affected Files
- `src/features/projects/hooks/useProjectFilters.ts`

## Acceptance Criteria
- [ ] `useRef` storing the callback removed
- [ ] Syncing `useEffect` that updates the ref removed
- [ ] `onFiltersChange` added to the relevant effect's dependency array
- [ ] Filter behaviour unchanged at runtime
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.5] Fix RouterEventListener Unsafe Type Cast

## Summary
`RouterEventListener` in `src/app/App.tsx` casts the event argument as `evt as any` to access `.detail`. Replace with a properly typed `CustomEvent<{ targetUrl: string }>` to restore type safety.

## Affected Files
- `src/app/App.tsx`

## Acceptance Criteria
- [ ] `evt as any` cast removed from `RouterEventListener`
- [ ] Handler typed using `CustomEvent<{ targetUrl: string }>`
- [ ] No TypeScript errors on the event handler
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.6] TypeScript Config Cleanup

## Summary
The base `tsconfig.json` is missing `strict` and `skipLibCheck`, both configs set `noEmit: false` despite Vite handling output. Fix all three tsconfig files to reflect how the project actually builds.

## Affected Files
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`

## Acceptance Criteria
- [ ] `"strict": true` added to base `tsconfig.json`
- [ ] `"skipLibCheck": true` added to base `tsconfig.json`
- [ ] `"noEmit": true` set in `tsconfig.app.json`
- [ ] `"noEmit": true` set in `tsconfig.node.json`
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 3 — Over-Engineered Code Simplification

## Title
[3.7] Miscellaneous Small Code Quality Fixes

## Summary
Several small, independent code quality fixes across the codebase: duplicate type definition, magic number breakpoints, overlapping image URL helpers, missing `DEV` guards on console calls, and an unsafe non-null assertion on the root element.

## Affected Files
- `src/types/layout.ts`
- `src/utils/site.ts`
- `src/app/App.tsx`
- `src/utils/images.ts`
- `src/app/polyfills.ts`
- `src/app/Main.tsx`

## Acceptance Criteria
- [ ] `mediaSizes` definition removed from `src/utils/site.ts`; single definition remains in `src/types/layout.ts`; all imports updated
- [ ] Breakpoint magic numbers in `App.tsx` `getScreenSize()` extracted to named constants in `src/utils/site.ts`
- [ ] Three overlapping image URL helpers in `src/utils/images.ts` consolidated to two
- [ ] `console.debug` in `polyfills.ts` guarded with `import.meta.env.DEV`
- [ ] `console.error` in `App.tsx` guarded with `import.meta.env.DEV`
- [ ] Non-null assertion (`!`) on root element in `Main.tsx` replaced with an explicit null check that throws a descriptive error
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 3](../ROADMAP.md#phase-3--over-engineered-code-simplification)
