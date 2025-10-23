<!-- .github/copilot-instructions.md
Guidance for AI coding assistants working on this repository.
Keep this short and actionable (20-50 lines). Reference concrete files.
-->

# Copilot / AI assistant instructions — crawfordforbes

Quick context
- Tech: React + TypeScript + Vite. Entry: `src/app/Main.tsx` -> `src/app/App.tsx`.
- Routing: Uses `react-router` (see `src/app/App.tsx`). Single-page portfolio with routes under `/portfolio`.
- Data: canonical project data lives in `src/data/projects/*` and is consumed by `src/features/projects` (hooks + UI).

Primary goals for small PRs
- Fix visual bugs or CSS in `src/components` and `src/features`.
- Improve data utilities in `src/utils` and `src/data` (preserve existing shapes).
- Keep changes isolated: update only affected component, styles and tests (if any).

Build / run / debug (explicit)
- dev: `npm run dev` (starts Vite). If HMR fails, check console and `vite.config.ts`.
- build: `npm run build` (runs `tsc -b` then `vite build`).
- preview: `npm run preview` (serves production build).

Project-specific conventions and patterns
- Alias `@` points to `src/` (see `vite.config.ts` and `tsconfig.json`). Use `@/...` imports.
- Centralized plain data objects under `src/data/...` (e.g. `src/data/projects/projects.ts`) — prefer editing those instead of ad-hoc JSON files.
- Features expose hooks under `src/features/<feature>/hooks` (e.g. `src/features/projects/hooks`). Use these hooks rather than duplicating routing/filter logic.
- Error boundaries: `src/components/global/ErrorBoundary.tsx` and wrappers in `ErrorBoundaryWrappers.tsx` — prefer adding errors to those wrappers for page vs component level.
- Images: use `src/components/global/OptimizedImage.tsx` (exports `OptimizedImage` alias). Provide `alt` text using `utils/projects.generateImageAlt` where appropriate.

Files to inspect for common tasks (examples)
- To debug routing / project selection: `src/features/projects/hooks/useProjectRouting.ts` and `src/features/projects/ProjectIndex.tsx`.
- To change layout/media breakpoints: `src/app/App.tsx` and `src/types/layout.ts` and `src/utils/site.ts`.
- To change analytics or performance behavior: `src/utils/analytics.ts` and `src/utils/performance.ts` (analytics uses a hard-coded GA id).

Coding style & priorities
- Keep changes typed (TypeScript). Prefer minimal changes to public/multi-file APIs.
- Keep CSS modular and small — styles live alongside components under `src/components/.../styles` or `src/features/.../styles`.
- Avoid adding global runtime config or secrets. Analytics ID is in repo; do not externalize it without owner consent.

Examples of concrete edits an AI may perform
- Fix a missing `alt` by calling `generateImageAlt(project.title, imageId)` in `ProjectResult`.
- Add a fallback image by editing `OptimizedImage` usage and passing `fallbackSrc` in components under `src/features/projects`.
- Simplify a hook: if a hook duplicates logic in `src/utils/projects.ts`, refactor to call the util functions.

When you are unsure
- Search `src/data` first for domain data. Ask the repo owner before changing GA id, build config, or adding new packages.

End of file
