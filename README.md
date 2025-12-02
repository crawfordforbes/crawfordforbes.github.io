# Crawford Forbes — Portfolio

This repository contains my professional portfolio site, a production‑minded single page application that demonstrates modern front‑end engineering, performance work, and practical media pipelines.

Live site: https://crawfordforbes.com

## At a glance

- Built with React + TypeScript and Vite for fast iteration and small bundles
- Focused on front‑end performance, accessibility, and pragmatic full‑stack tooling
- Includes automated image and video optimization pipelines, analytics, and CI/CD

---

## Technical Stack

- React 19 + TypeScript
- Vite (SWC) for builds and dev server
- React Router for client routing
- Sharp for image processing; FFmpeg (scripts) for video transcoding
- GitHub Actions for CI/CD and GitHub Pages deployment

## Key Capabilities

- Dynamic project filtering with URL persistence
- Responsive, accessible UI with keyboard support and semantic markup
- Automated asset pipeline producing AVIF/WebP/JPEG variants and WebM/MP4 video outputs
- Performance-led improvements: bundle splitting, asset optimization, and LCP tuning
- Observability: GA4 integration (analytics), error hooks ready for Sentry
- Security: Content Security Policy (CSP) configured and reviewed

## Repo structure

```
src/
├── app/              # App entry, routing, global styles
├── components/       # Reusable UI components
├── features/         # Feature modules (projects, hexes)
├── data/             # Canonical project + content data
└── utils/            # Utilities (analytics, performance, images)
```

## Development

### Prerequisites

- Node.js 20.x or 22.x
- npm 10+

### Common commands

```powershell
# Install dependencies
npm install

# Dev server with HMR
npm run dev

# Build (types + Vite build)
npm run build

# Full build (assets + transcode + build)
npm run build:full

# Preview production build locally
npm run preview

# Image optimization (Sharp pipeline)
npm run images:build

# Hero image optimization (separate helper)
npm run hero:optimize

# Video transcoding (FFmpeg pipeline)
npm run videos:build

# Bundle analyzer
npm run analyze
```

Notes:
- `build` runs the type checks and Vite build.
- `build:full` runs image + video pipelines and then the standard build (use for CI or when assets changed).

## Asset & Media Optimization

- Images: `scripts/optimize-images.cjs` (AVIF/WebP/JPEG outputs). The site serves responsive `<picture>` sources via `OptimizedImage`.
- Hero images: `scripts/optimize-hero-images.cjs` for one‑off/hero-specific compressions.
- Videos: `scripts/transcode-videos.cjs` produces WebM + MP4 variants with tuned CRF settings for small bundle impact.
- Use `npm run analyze` after a build to inspect the `dist/` composition and spot regressions.

See `docs/IMAGE_OPTIMIZATION.md` and `docs/VIDEO_PIPELINE.md` for details and recommended quality settings.

## Analytics & Debugging

- Google Analytics 4 is integrated in `src/utils/analytics.ts`. For local testing the file exposes an `enableInDevelopment` flag — ensure it is `false` in production builds.
- Use GA DebugView (or the browser console) to verify events. The app queues events until analytics finishes initializing to avoid dropped hits during app boot.

## Build & Deployment

- CI: GitHub Actions runs type checks and builds on push to `master`.
- Deployment: Artifacts are published to GitHub Pages; `404.html` includes an SPA fallback for deep links.
- Recommended preview flow:

```powershell
npm run build:full    # if you changed images/videos
npm run preview
```

## Accessibility & Quality

- The site targets WCAG best practices (semantic HTML, focus management, skip links). Run a quick axe or Lighthouse accessibility pass before major demos.

## Contributing

This is primarily a personal portfolio. Bug reports and small improvements are welcome via issues or PRs.

## License

Code is MIT licensed. All design/content © Crawford Forbes.

---

**Contact:** crawford.forbes@gmail.com  
**LinkedIn:** [linkedin.com/in/crawfordforbes](https://linkedin.com/in/crawfordforbes)  
**GitHub:** [github.com/crawfordforbes](https://github.com/crawfordforbes)