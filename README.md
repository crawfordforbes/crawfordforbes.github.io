# Crawford Forbes — Portfolio

This repository contains my professional portfolio site, built to not only showcase my work but to serve as a demonstration of modern web development practices and production-ready code quality.

**Live Site:** [crawfordforbes.com](https://crawfordforbes.com)

## Overview

This is a fully custom-built single-page application that highlights projects I've worked on, featuring interactive filters, dynamic routing, and optimized media delivery. The site itself is a demonstration of the technical skills and attention to detail that I bring to every project.

## Technical Stack

- **React 19** with TypeScript for type-safe component development
- **Vite 7** for fast builds and optimal bundling
- **React Router 7** with client-side routing and SPA fallback for GitHub Pages
- **CSS Custom Properties** for scalable, maintainable styling with theme support
- **Sharp** for automated image optimization (AVIF/WebP/JPG with fallbacks)
- **GitHub Actions** for CI/CD and automated deployments to GitHub Pages

## Key Features

- **Dynamic Project Filtering** — Filter projects by role, technology, or category with real-time updates and URL persistence
- **Optimized Asset Pipeline** — Automated image transcoding and format selection (modern formats with graceful fallbacks)
- **Responsive Design** — Mobile-first approach with breakpoint-specific layouts and performance tuning
- **Accessibility** — ARIA-compliant navigation, skip links, keyboard support, and semantic HTML
- **Legacy Browser Support** — Polyfills and transpiled bundles for Safari 13+ via Vite legacy plugin
- **SEO & Metadata** — Open Graph, Twitter Cards, JSON-LD structured data, and sitemap
- **Performance Monitoring** — Web Vitals tracking and Core Web Vitals optimization

## Architecture

The codebase follows a feature-based structure with centralized data management:

```
src/
├── app/              # App entry, routing, global styles
├── components/       # Reusable UI components (Nav, Footer, OptimizedImage, etc.)
├── features/         # Feature modules (projects, hexes) with hooks and styles
├── data/             # Centralized project data, tech/role taxonomies, content
└── utils/            # Shared utilities (analytics, performance, images, site helpers)
```

- **Data-driven UI:** All project metadata lives in `src/data/projects/projects.ts` and is consumed by hooks in `src/features/projects/hooks/`.
- **Optimized Images:** The build pipeline generates responsive image sets via `scripts/optimize-images.cjs`, producing AVIF, WebP, and JPEG with a manifest for runtime selection.
- **Custom Routing:** Client-side navigation with `react-router` and a GitHub Pages–compatible SPA fallback (`public/404.html`).

## Development

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm 10+

### Local Setup
```bash
# Install dependencies
npm install

# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Scripts
- `npm run dev` — Start Vite dev server
- `npm run build` — Run full production build (images, videos, types, Vite bundle)
- `npm run preview` — Serve the production build locally
- `npm run images:build` — Optimize and transcode images (Sharp pipeline)
- `npm run videos:build` — Transcode video assets
- `npm run types` — Generate TypeScript declarations

## Build & Deployment

The site is deployed via GitHub Actions on every push to `master`:

1. **CI Workflow** (`.github/workflows/typecheck.yml`) — Runs TypeScript checks and diagnostics
2. **Deploy Workflow** (`.github/workflows/deploy-pages.yml`) — Builds the site and uploads artifacts to GitHub Pages

The production build includes:
- Minified and code-split JS/CSS bundles
- Legacy transpiled bundles for older browsers
- Optimized images (AVIF/WebP/JPG) and videos (webm/mp4)
- SPA fallback `404.html` for deep links

## Asset Optimization

### Images
- Source images in `src/assets/images/` are processed by `scripts/optimize-images.cjs` during build.
- Outputs: AVIF (smallest), WebP (widely supported), JPEG (fallback) — served via `<picture>` elements in `OptimizedImage` component.
- Manifest (`public/images/manifest.json`) maps slugs to generated assets.

### Videos
- Source videos in `src/assets/images/projects/` are transcoded to webm + mp4 by `scripts/transcode-videos.cjs`.
- Runtime fallback: attempts webm, falls back to mp4 on error.

See `docs/IMAGE_OPTIMIZATION.md` for detailed documentation.

## Browser Compatibility

- **Modern browsers:** Native ES modules, AVIF/WebP, CSS custom properties
- **Safari 13+:** Legacy bundles via `@vitejs/plugin-legacy`, polyfills for IntersectionObserver and smooth scroll
- **SPA routing:** Works on GitHub Pages via `404.html` SPA fallback for deep links

## Contributing

This is a personal portfolio site, but if you notice bugs or have suggestions, feel free to open an issue. Pull requests for bug fixes are welcome.

## License

This project is open source for educational and demonstration purposes. All project content and designs are © Crawford Forbes. Code is available under the MIT License.

---

**Contact:** crawford.forbes@gmail.com  
**LinkedIn:** [linkedin.com/in/crawfordforbes](https://linkedin.com/in/crawfordforbes)  
**GitHub:** [github.com/crawfordforbes](https://github.com/crawfordforbes)
