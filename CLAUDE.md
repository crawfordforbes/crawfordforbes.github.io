# crawfordforbes.github.io — Portfolio

Personal portfolio single-page app. See [README.md](README.md) for the full project story (architecture rationale, CI/CD, design notes).

Detailed AI-assistant guidance already exists at [.github/copilot-instructions.md](.github/copilot-instructions.md) — @.github/copilot-instructions.md is imported below. This file adds Claude-specific commands and fills gaps.

## Tech Stack

React 19 + TypeScript 5 (strict) · Vite 7 (SWC) · React Router 7 · Vitest + Testing Library · Font Awesome 7 · Splide (patched for React 19) · Sharp (image pipeline) · FFmpeg (video pipeline)

## Commands

- Dev server: `npm run dev`
- Build (typecheck + build, skips asset pipeline): `npm run build`
- Full build (asset pipelines + build): `npm run build:full`
- Typecheck only: `npm run types` (declarations) or `tsc -b --noEmit`
- Lint: `npm run lint`
- Test: `npm test` (Vitest watch) — single run: `npx vitest run`
- Test with coverage: `npm run test:coverage`
- Preview production build: `npm run preview`
- Bundle analysis (run after build): `npm run analyze`

## Code Conventions

- **Components**: arrow function, `export default` at the bottom (not named exports) — see [Badge.tsx](src/components/global/Badge.tsx). Props typed via an inline `type XProps = {}` above the component.
- **Imports**: use the `@/` alias for `src/` (e.g. `@/components/global/Badge`), not relative `../../..` chains.
- **Styles**: plain `.css` files colocated under a `styles/` folder next to the component, imported directly (`import './styles/badge.css'`) with global (non-hashed) class names — **not** CSS Modules, despite what the README's stack table says. Treat the README's "CSS Modules" line as aspirational/stale, not current behavior.
- **Icons**: Font Awesome icons are registered per-file via `library.add(...)` at module scope, then referenced by `[prefix, iconName]` tuples — follow the existing registration list rather than adding a new global icon registry.
- **Tests**: colocated as `ComponentOrHook.test.tsx` next to the source file, using Vitest (`describe/it/expect`) + `@testing-library/react` + `@testing-library/user-event`. See [useProjectFilters.test.tsx](src/features/projects/hooks/useProjectFilters.test.tsx).
- **Data**: canonical content/data lives in plain TS objects under `src/data/**` (e.g. `src/data/content/footer.ts`, `src/data/projects/projects.tsx`) — edit those rather than hardcoding copy in components.
- **Feature structure**: feature-scoped code under `src/features/<feature>/` with colocated hooks (`hooks/`), styles (`styles/`), and tests; shared primitives under `src/components/global/`.

## Boundaries (from copilot-instructions.md — repeated here for emphasis)

- Don't add `useMemo`/`useCallback` without a measured perf reason.
- Don't add try/catch fallback chains around simple DOM/browser operations.
- Don't add placeholder stubs (unimplemented trackers, feature flags hardcoded `false`, etc.).
- `src/utils/analytics.ts` is intentionally minimal — don't expand it, and don't externalize the GA id without owner consent.
- Ask before changing build config or adding new dependencies.
- Never commit secrets; there are none in source today by design.
