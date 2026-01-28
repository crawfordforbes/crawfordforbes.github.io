#!/usr/bin/env node
/*
  scripts/optimize-hero-images.cjs

  Optimizes hero images using sharp to reduce file size while maintaining quality.
  Converts to WebP with quality 75 and progressive rendering.

  Usage:
    node scripts/optimize-hero-images.cjs
*/

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');


const HERO_DIR = path.resolve(__dirname, '../src/assets/images/hero');
const INPUT_IMAGE = 'hero-full.jpeg'; // Change to your actual source image name
const OUTPUT_IMAGE = 'hero.avif';
const MAX_WIDTH = 1920;
const QUALITY = 43; // Adjust as needed for quality/size tradeoff
const TARGET_SIZE_KB = 150;

async function optimizeHero() {
  console.log('[hero-optimize] Optimizing single hero image to AVIF...');
  const inputPath = path.join(HERO_DIR, INPUT_IMAGE);
  const outputPath = path.join(HERO_DIR, OUTPUT_IMAGE);
  const backupPath = inputPath + '.backup';

  try {
    // Check if file exists
    await fs.access(inputPath);

    // Create backup if it doesn't exist
    try {
      await fs.access(backupPath);
      console.log(`[hero-optimize] Backup exists for ${INPUT_IMAGE}`);
    } catch {
      await fs.copyFile(inputPath, backupPath);
      console.log(`[hero-optimize] Created backup: ${INPUT_IMAGE}.backup`);
    }

    const inputStats = await fs.stat(inputPath);
    const inputSizeMB = (inputStats.size / 1024 / 1024).toFixed(2);

    // Optimize to AVIF
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .avif({
        quality: QUALITY,
        effort: 6,
      })
      .toFile(outputPath);

    const outputStats = await fs.stat(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(0);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`[hero-optimize] ✓ ${INPUT_IMAGE}: ${inputSizeMB}MB → ${(outputStats.size / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
    console.log(`[hero-optimize]   Created: ${OUTPUT_IMAGE} (${outputSizeKB}KB)`);
    if (outputStats.size > TARGET_SIZE_KB * 1024) {
      console.warn(`[hero-optimize]   WARNING: Output is >${TARGET_SIZE_KB}KB. Lower quality or width if needed.`);
    }
  } catch (err) {
    console.error(`[hero-optimize] ✗ Failed to optimize hero image:`, err.message);
    process.exit(1);
  }

  console.log('[hero-optimize] Done!');
  console.log('\n📝 Next steps:');
  console.log(`- Use ${OUTPUT_IMAGE} as your hero image.`);
  console.log('- Test visually on all devices.');
  console.log('- Consider keeping a WebP or JPEG fallback for browser compatibility.');
}

optimizeHero();
