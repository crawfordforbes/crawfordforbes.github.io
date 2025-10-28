const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const WIDTH = 655;
const HEIGHT = 757;
const webpQuality = 75;
const avifQuality = 50;
const jpgQuality = 80;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isImageFile(name) {
  return /\.(jpe?g|png|gif|webp|avif)$/i.test(name);
}

// Directories to exclude from processing (e.g. hero is handled separately)
const EXCLUDE_DIRS = new Set(['hero']);

async function processFile(filePath, relDir = '') {
  const fileName = path.basename(filePath);
  const base = path.parse(fileName).name;
  const relPrefix = relDir ? relDir.replace(/\\/g, '-').replace(/\//g, '-') + '-' : '';
  const rawSlug = `${relPrefix}${base}`;
  const slug = slugify(rawSlug);

  // Log when we find a projects/fallback source so it's easy to spot
  if (base === 'fallback' && relPrefix.toLowerCase().startsWith('projects')) {
    console.log('Found project fallback source; generating slug:', slug);
  }

  ensureDir(OUT_DIR);

  const outAvif = path.join(OUT_DIR, `${slug}.avif`);
  const outWebp = path.join(OUT_DIR, `${slug}.webp`);
  const outJpg = path.join(OUT_DIR, `${slug}.jpg`);

  try {
    await sharp(filePath)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .avif({ quality: avifQuality })
      .toFile(outAvif);

    await sharp(filePath)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .webp({ quality: webpQuality })
      .toFile(outWebp);

    await sharp(filePath)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .jpeg({ quality: jpgQuality, mozjpeg: true })
      .toFile(outJpg);

    return { slug, avif: `/images/${slug}.avif`, webp: `/images/${slug}.webp`, jpg: `/images/${slug}.jpg` };
  } catch (err) {
    console.error('Failed to process', filePath, err);
    return null;
  }
}

async function walkAndProcess(dir, relDir = '') {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // Skip excluded directories
      if (EXCLUDE_DIRS.has(ent.name.toLowerCase())) {
        console.log('Skipping folder (excluded):', full);
        continue;
      }
      const sub = path.join(relDir, ent.name);
      const res = await walkAndProcess(full, sub);
      results.push(...res);
    } else if (ent.isFile() && isImageFile(ent.name)) {
      const r = await processFile(full, relDir);
      if (r) results.push(r);
    }
  }
  return results;
}

(async () => {
  console.log('Optimizing images from', SRC_DIR, '→', OUT_DIR);
  ensureDir(OUT_DIR);
  // Clean up previously-generated hero files (we now exclude `src/assets/images/hero`)
  try {
    const existing = fs.readdirSync(OUT_DIR);
    for (const f of existing) {
      if (/^hero-.*\.(avif|webp|jpg)$/i.test(f)) {
        try {
          fs.unlinkSync(path.join(OUT_DIR, f));
          console.log('Removed previously-generated hero file:', f);
        } catch (e) {
          // non-fatal
        }
      }
    }
  } catch (e) {
    // ignore
  }
  const processed = await walkAndProcess(SRC_DIR, '');
  const manifest = {};
  for (const p of processed) {
    manifest[p.slug] = { avif: p.avif, webp: p.webp, jpg: p.jpg, width: WIDTH, height: HEIGHT };
  }
  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Wrote manifest to', manifestPath);
  console.log('Done. Processed', processed.length, 'images');
})();
