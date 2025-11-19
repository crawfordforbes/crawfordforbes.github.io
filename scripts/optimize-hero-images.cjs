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

const TARGETS = [
  { input: 'hero-desktop.webp', width: 1920, quality: 75 },
  { input: 'hero-tablet.webp', width: 1024, quality: 75 },
  { input: 'hero-mobile.webp', width: 768, quality: 75 },
];

async function optimizeHero() {
  console.log('[hero-optimize] Starting hero image optimization...');
  console.log('[hero-optimize] NOTE: Close VS Code/dev server if files are locked.\n');
  
  for (const target of TARGETS) {
    const inputPath = path.join(HERO_DIR, target.input);
    const backupPath = path.join(HERO_DIR, target.input + '.backup');
    const newName = target.input.replace('.webp', '.new.webp');
    const newPath = path.join(HERO_DIR, newName);

    try {
      // Check if file exists
      await fs.access(inputPath);
      
      // Create backup if it doesn't exist
      try {
        await fs.access(backupPath);
        console.log(`[hero-optimize] Backup exists for ${target.input}`);
      } catch {
        await fs.copyFile(inputPath, backupPath);
        console.log(`[hero-optimize] Created backup: ${target.input}.backup`);
      }

      const inputStats = await fs.stat(inputPath);
      const inputSizeMB = (inputStats.size / 1024 / 1024).toFixed(2);

      // Optimize to new file
      await sharp(inputPath)
        .resize(target.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: target.quality,
          effort: 6,  // max compression effort
          smartSubsample: true
        })
        .toFile(newPath);

      const outputStats = await fs.stat(newPath);
      const outputSizeMB = (outputStats.size / 1024 / 1024).toFixed(2);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`[hero-optimize] ✓ ${target.input}: ${inputSizeMB}MB → ${outputSizeMB}MB (${savings}% smaller)`);
      console.log(`[hero-optimize]   Created: ${newName}`);
      console.log(`[hero-optimize]   Manual step: Rename ${newName} to ${target.input}\n`);
    } catch (err) {
      console.error(`[hero-optimize] ✗ Failed to optimize ${target.input}:`, err.message);
    }
  }

  console.log('[hero-optimize] Done!');
  console.log('\n📝 Manual steps:');
  console.log('1. Close VS Code or stop dev server');
  console.log('2. In src/assets/images/hero/:');
  console.log('   - Delete hero-desktop.webp, hero-tablet.webp, hero-mobile.webp');
  console.log('   - Rename *.new.webp files (remove ".new" from filenames)');
  console.log('3. Or run: npm run hero:replace');
}

optimizeHero().catch(err => {
  console.error('[hero-optimize] Fatal error:', err);
  process.exit(1);
});
