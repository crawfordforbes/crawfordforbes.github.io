CHECK THE TODO IN .gitignore

# Image generation script (optimize-images.cjs)

This folder contains a small image generation script used to build modern, single-size images for the site. The script is intentionally simple and deterministic so generated image filenames can be used directly by the app.

## What the script does

- Walks `src/assets/images` recursively (except excluded folders).
- For each image file it finds it generates three outputs at a fixed size (655×491):
  - AVIF (`.avif`)
  - WebP (`.webp`)
  - JPEG (`.jpg`, mozjpeg)
- Writes the outputs to `public/images` using slugified names.
- Produces `public/images/manifest.json` mapping slug → variant URLs and dimensions.

## Naming convention

- Generated files use a slug derived from the source path. Example:
  - `src/assets/images/projects/sunshine-nights/primary.png` → `public/images/projects-sunshine-nights-primary.jpg|.webp|.avif`
- Project images are prefixed with `projects-` in the slug to avoid collisions with other top-level folders.

## Exclusions

- The `hero` folder is excluded on purpose. Hero images are treated as a special case and should remain referenced directly from `src/assets/images/hero/`.
  - The script skips `src/assets/images/hero` and removes previously-generated `hero-*` files from `public/images` to avoid confusion.

## Fallback image

- To provide a site-wide fallback used by project cards, add a fallback image at:
  - `src/assets/images/projects/fallback.webp` (or `.png`/`.jpg`).
- The generator will create `public/images/projects-fallback.{avif,webp,jpg}` which the app will use as `/images/projects-fallback.jpg` as the last-resort fallback.

## How to run

From repository root (PowerShell):

```powershell
npm run images:build
```

This runs `node scripts/optimize-images.cjs` and writes outputs to `public/images`.

To run as part of the normal build (already wired):

```powershell
npm run build
# (this runs images:build first)
```

## CI / Commit guidance

- For a small, mostly-static set of images (~50): committing `public/images` is fine and simplifies deployments. If you prefer not to commit generated assets, ensure your CI runs `npm run images:build` before `vite build`.
- Example CI snippet (bash):

```bash
npm ci
npm run images:build
npm run build
```

## Troubleshooting

- If images 404 after a change, restart the dev server (full restart, not just HMR) to ensure Vite picks up new public assets.
- Verify generated files exist in `public/images`:

```powershell
ls .\public\images\projects-fallback.*
```

- Check the manifest:

```powershell
cat .\public\images\manifest.json | Out-String
```

- If you want to change the naming or include/exclude more folders, edit `scripts/optimize-images.cjs`. Keep the slug logic in sync with how the app constructs public paths (`/images/<slug>.<ext>`).

## Notes

- The script uses `sharp` which requires native binaries — ensure `npm install` is run in CI (or add prebuilt binaries as appropriate).
- The target size is intentionally fixed; if you need responsive variants in the future we can extend the script to emit size-suffixed variants and update the app accordingly.

---

If you'd like, I can add a short unit-test for the slugify logic or change the script to emit different filename shapes. Let me know your preference.
