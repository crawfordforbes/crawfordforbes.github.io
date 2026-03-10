# Roadmap — crawfordforbes Refactoring

---

## Phase 1 — Dead Code & Stub Removal

**Goal**: Delete anything permanently disabled, never called, or placeholder.

- Remove unused analytics exports — `trackClick`, `trackProjectView`, `trackFilterUsage`, and `trackPerformance` are exported from `src/utils/analytics.ts` but have zero call-sites across the codebase
- Remove disabled logo-download feature from `src/features/hexes/svg/logo.tsx` — html2canvas integration gated behind a hardcoded `makingLogo = false` flag, never intended to ship
- Remove `printAllHexSVGs()` from `src/utils/hex-SVG-coords-converter.ts` — only invoked by the logo feature above
- Remove Sentry placeholder in `src/utils/analytics.ts` — `initializeSentry()` is a stub that does nothing except log "not installed"
- Remove commented-out export in `src/features/hexes/HexGridLayout.tsx`

---

## Phase 2 — Analytics Simplification

**Goal**: Replace a 400-line `AnalyticsManager` class with a simple GA4 module.

The current analytics module includes event queuing, performance tracking, error tracking, GTM helpers, and Sentry integration — almost none of which is used. Replace `src/utils/analytics.ts` with a ~30-line module that does exactly what is needed: initialize GA4 and track pageviews.

- Keep: `initialize()`, `trackPageView()`, GA4 measurement ID
- Remove: `AnalyticsManager` class, event queue, `trackError`, `trackPerformance`, GTM helpers, Sentry hooks
- Update call-sites in `src/app/Main.tsx`

---

## Phase 3 — Over-Engineered Code Simplification

**Goal**: Rewrite AI-padded functions with direct, readable implementations.

### `scrollToTarget` — `src/utils/site.ts`
Currently ~100 lines. The function has nested try/catch blocks, a three-tier URL update fallback chain (`navigate` → `history.pushState` → `CustomEvent`), and duplicates that entire fallback in the element-not-found early-return branch. Rewrite to ~25 lines: update URL if provided, scroll to element.

### `OptimizedImage.tsx` alt-text helper
`try/catch` block where the catch executes near-identical code to the try. Collapse to a single code path using a simple string check for HTTP prefix.

### `App.tsx` — `getScreenSize` + ESLint suppression
The function is redefined inline and recalculates on every render. Pairs with an `// eslint-disable-next-line` comment to suppress the resulting dependency warning. Extract to a stable utility, remove the suppression.

### `useProjectFilters.ts` — ref+effect callback sync
Uses a `useRef` + syncing `useEffect` to avoid adding a prop callback to effect deps. Defensive over-engineering — add the callback to the dependency array directly.

### `RouterEventListener` — `src/app/App.tsx`
Unsafe `evt as any` type cast. Replace with a properly typed `CustomEvent<{ targetUrl: string }>`.

### TypeScript config cleanup
- Add `strict: true` and `skipLibCheck: true` to base `tsconfig.json`
- Set `noEmit: true` in `tsconfig.app.json` and `tsconfig.node.json` (Vite handles output, not tsc)

### Other
- Consolidate `mediaSizes` — defined in both `src/types/layout.ts` and `src/utils/site.ts`; keep in `types/`, remove from `site.ts`
- Centralize breakpoints — magic numbers in `App.tsx` `getScreenSize()`; extract to constants in `src/utils/site.ts`
- Simplify image URL helpers — three overlapping functions in `src/utils/images.ts`; consolidate to two
- Add `import.meta.env.DEV` guards to `console.debug` in `polyfills.ts` and `console.error` in `App.tsx`
- Fix root element non-null assertion in `src/app/Main.tsx` — throw a real error instead of relying on `!`

---

## Phase 4 — Hex Feature Improvements

**Goal**: Keep the hex grid, make the implementation defensible.

The hexes feature is a core visual element and worth keeping. The implementation has accumulated excessive memoization and lacks any documentation explaining its non-obvious data structures.

### Memoization cleanup
- **`Hex.tsx`**: Every local variable is wrapped in `useMemo` or `useCallback` — including trivial string `.trim()` calls and a `{ '--hex-width': '...' }` object. Overlapping memos on already-memoized values ("double memoization"). Remove the memoization that doesn't correspond to a real performance benefit; keep what's justified.
- **`HexGridLayout.tsx`**: Memoizing a props object passed into an already-`memo()`-wrapped child component. The outer `useMemo` is redundant. Remove it.

### Documentation
- **`hex-SVG-coords-converter.ts`**: 800+ lines of hardcoded SVG coordinate mappings. This isn't slop — it's legitimate pre-computed data — but it has no explanation. Add a file-level comment explaining what this file is, where the coordinates come from, and why they're static.
- Add inline comments to `HexGridLayout.tsx` and `HexRow.tsx` explaining the layout model for future readers.

---

## Phase 5 — Build & Config Cleanup

**Goal**: Remove misleading comments, rationalize build settings.

- Strip template/AI-generated comments from `vite.config.ts` (e.g. "Replace 'crawfordforbes' with your actual repository name" comment on a `base: '/'` that is already correct)
- Enable `sourcemap: 'hidden'` — source maps are disabled for "performance" but are critical for production debugging; `hidden` generates them without serving them inline
- Evaluate chunk size warning limit — currently doubled to 1000kb from the Vite default of 500kb; either bring it down or document why it's justified
- Evaluate legacy plugin Safari 13–14 targets — these are 6-year-old browser versions; check analytics before keeping them

---

## Phase 6 — Routing & UX Correctness

**Goal**: Make the app behave like real production software on edge cases.

- Create a real `NotFound` component — the catch-all `*` route currently renders the same `Projects` component as the home page; invalid URLs silently show the portfolio with no indication anything is wrong
- Add a comment to `RouterEventListener` in `App.tsx` explaining why it's a separate component (React Router hooks must be called within a Router context)

---

## Out of Scope

The following are known but intentionally deferred:

- New features
- CI/CD pipeline / GitHub Actions
- Lighthouse CI / performance budgets in CI
- Git LFS for binary assets
- Docs folder reorganization
