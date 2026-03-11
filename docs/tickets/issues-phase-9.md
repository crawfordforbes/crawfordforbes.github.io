## Title
[9.1] Audit CSS for motion declarations

## Summary
Audit all CSS files under `src/` and identify every declaration that uses `transition`, `animation`, or `transform`. Produce an inventory of files and rule locations to scope follow-up fixes.

## Affected Files
- All CSS/SCSS/CSS-module files under `src/` (e.g. `src/**/*.{css,scss,module.css}`)

## Acceptance Criteria
- [ ] Inventory lists every file path under `src/` that contains `transition`, `animation`, or `transform` declarations
- [ ] Inventory includes a line-level example (file:line) for each matched rule

## Context
- See [docs/ROADMAP.md](docs/ROADMAP.md#L144)

---

## Title
[9.2] Add `prefers-reduced-motion` fallbacks for motion styles

## Summary
For each transition or animation identified in the audit, add a complementary `@media (prefers-reduced-motion: reduce)` block that removes or replaces the motion with a simple opacity fade.

## Affected Files
- The files discovered by the Phase 9 audit (see issue [9.1]). Typical targets will be component-scoped styles under `src/components/` and feature styles under `src/features/`.

## Acceptance Criteria
- [ ] Every motion declaration found in the audit has a corresponding `@media (prefers-reduced-motion: reduce)` rule that disables the motion or substitutes a simple opacity fade
- [ ] No CSS rules outside those media queries continue to animate when the media query matches

## Context
- See [docs/ROADMAP.md](docs/ROADMAP.md#L144)

---

## Title
[9.3] Reduce motion in key interactive areas (nav, hex hover, carousel)

## Summary
Update the nav menu open/close slide, hex hover effects, and project carousel slide transitions so they respect the user's `prefers-reduced-motion` setting, replacing movement with subtle opacity changes or instant state changes.

## Affected Files
- `src/components/navigation/*` (nav menu open/close styles and components — infer likely files)
- `src/features/hexes/Hex.tsx`
- `src/features/hexes/HexGridLayout.tsx`
- Project carousel component(s) (likely under `src/features/projects/` or `src/components/carousel/`)

## Acceptance Criteria
- [ ] Nav open/close no longer performs a sliding animation when `prefers-reduced-motion: reduce` is active
- [ ] Hex hover effects are disabled or replaced with opacity changes under the media query
- [ ] Project carousel does not perform slide transitions when the media query matches (uses opacity or instant change)

## Context
- See [docs/ROADMAP.md](docs/ROADMAP.md#L144)

---

## Title
[9.4] Add vitest matchMedia test for reduced-motion nav

## Summary
Add a unit/interaction test to the test suite (Phase 7) that asserts the navigation renders and behaves correctly when the `prefers-reduced-motion` media query is active, using a `window.matchMedia` mock in Vitest.

## Affected Files
- Test file to be added under the navigation tests, e.g. `src/components/navigation/__tests__/nav.prefers-reduced-motion.test.tsx`
- Vitest setup files if necessary (e.g. `vitest` setup file) to include a `matchMedia` mock

## Acceptance Criteria
- [ ] A test exists that mocks `window.matchMedia('(prefers-reduced-motion: reduce)')` and verifies the nav renders without motion
- [ ] The test runs under the project's Vitest configuration and passes locally

## Context
- See [docs/ROADMAP.md](docs/ROADMAP.md#L144)

