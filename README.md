# Crawford Forbes — Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&style=flat-square)
![Deployed](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?logo=github&style=flat-square)
![Tests](https://github.com/crawfordforbes/crawfordforbes.github.io/actions/workflows/deploy-pages.yml/badge.svg)

My personal portfolio site — a single-page app built with React and TypeScript. The site showcases past projects, but the codebase itself is also meant to reflect how I work day-to-day.

**Live:** https://crawfordforbes.com

---

## About this project

The portfolio is as much a part of my work as anything listed in it. I built it to have something I could point to that shows both the finished product and the thinking behind it — the asset pipeline, the testing setup, the CI/CD configuration.

The V2 transition was tracked as a proper project: a phased roadmap with scoped [GitHub Issues](https://github.com/crawfordforbes/crawfordforbes.github.io/issues) for architectural milestones, technical debt, and feature parity. Ten phases, each with acceptance criteria and affected files listed. The full [project board](https://github.com/users/crawfordforbes/projects/1) is public if you want to see the history. It's the same workflow I'd use on a team.

Current Lighthouse scores:

| Metric | Score |
|---|---|
| Performance | 94\* |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

\* Hosted on GitHub Pages; the gap is likely infrastructure-related rather than anything in the app itself.

Some things worth noting:

- **Agentic workflow** — built using a structured LLM-assisted process:
  - **Orchestration** — authored custom prompt files, copilot instructions, and GitHub Issues directly from the project roadmap
  - **Execution loop** — a "fetch → propose → approve → implement → revise" cycle: the AI fetches an issue, proposes a plan, checks in before touching anything, then we iterate until it's done
  - **The goal** — a repeatable, high-velocity engineering loop rather than AI autocomplete
- **Component architecture** — feature-scoped modules (`src/features/`) with co-located hooks, styles, and tests; shared primitives under `src/components/global/`
- **Performance** — AVIF/WebP/JPEG responsive images via a Sharp pipeline, WebM/MP4 video with tuned CRF values, and code-split bundles
- **Routing & state** — React Router 7 with URL-persistent project filters, so deep links always work
- **Type safety** — strict TypeScript throughout; a separate `tsconfig.declarations.json` emits types for shared utilities
- **Testing** — Vitest + Testing Library; tests run before every deploy and will cancel it if they fail
- **Security** — Content Security Policy headers configured and reviewed; no secrets in source
- **Observability** — GA4 with a dev-mode kill-switch; error boundaries wired up and compatible with Sentry

---

## Stack

| Layer | Choice |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 7 (SWC) |
| Routing | React Router 7 |
| Styling | CSS Modules (component-scoped) |
| Icons | Font Awesome 7 |
| Carousel | Splide (patched for React 19 via `patch-package`) |
| Images | Sharp (AVIF / WebP / JPEG pipeline) |
| Video | FFmpeg (WebM + MP4 transcode scripts) |
| Testing | Vitest + @testing-library/react |
| CI/CD | GitHub Actions → GitHub Pages |

---

## CI/CD

Two workflows run on `master`:

1. **`deploy-pages.yml`** — installs dependencies, runs tests, builds, then deploys to GitHub Pages. A failing test cancels the deploy.
2. **`typecheck.yml`** — runs `tsc` (strict) and emits declaration files; npm module cache is keyed on `package-lock.json` for faster runs.

Both use concurrency groups so rapid pushes cancel stale runs rather than queuing.

---

## Repo structure

The codebase is organized by feature rather than by file type, so the logic, types, hooks, styles, and tests for a given domain all live together.

```
src/
├── app/              # App entry, routing, global layout
├── components/
│   ├── global/       # OptimizedImage, VideoPlayer, Caption, ErrorBoundary…
│   └── panels/       # Page-level layout panels
├── features/
│   ├── projects/     # Project index, detail, filtering, routing hooks
│   └── hexes/        # Hexagonal decorative grid feature
├── data/
│   ├── projects/     # Canonical project records, tech tags, role tags
│   └── content/      # Global copy and metadata
└── utils/            # analytics, performance, image helpers
scripts/
├── optimize-images.cjs       # Sharp pipeline (AVIF / WebP / JPEG)
├── optimize-hero-images.cjs  # Hero-specific compression pass
└── transcode-videos.cjs      # FFmpeg WebM + MP4 outputs
```

---

## Development

**Prerequisites:** Node.js 20.x or 22.x, npm 10+

```bash
# Install
npm install

# Dev server (HMR)
npm run dev

# Build — runs tsc strict-check, then Vite build
npm run build

# Full build — runs asset pipelines first, then build
npm run build:full

# Preview the production bundle locally
npm run preview

# Tests
npm test

# Tests with coverage report
npm run test:coverage
```

### Asset pipeline commands

```bash
npm run images:build   # AVIF / WebP / JPEG variants via Sharp
npm run hero:optimize  # Hero-specific compression pass
npm run videos:build   # WebM + MP4 transcoding via FFmpeg
npm run analyze        # Bundle composition report (run after build)
```

`build:full` chains `images:build → videos:build → build`. Use it when assets have changed; the standard `build` skips the pipeline for speed.

---

## Design notes

The hexagonal motif started as research into elevation mapping — I got interested in how hex grids handle spatial data and wanted to bring that geometry into the UI. Early versions used large hex project cards, but they didn't scale and the layouts got unwieldy. Eventually I pulled the hex concept back to a decorative role and moved project cards to rounded rectangles with pill filters, which turned out to be a better fit for the content anyway.

The color choices were just as deliberate; I wanted to invoke the beauty of the surrounding desert. A lot of portfolio sites feel a bit flat to me, so I leaned into vibrant gradients and bold accents. The goal was something that felt energetic but still readable. 

---

## License

Code is MIT licensed. All design and content © Crawford Forbes.

**Contact:** crawford.forbes@gmail.com  
**LinkedIn:** [linkedin.com/in/crawfordforbes](https://linkedin.com/in/crawfordforbes)  
**GitHub:** [github.com/crawfordforbes](https://github.com/crawfordforbes)
