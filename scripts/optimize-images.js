#!/usr/bin/env node
/**
 * Image Optimization Script
 * Generates modern image formats (AVIF, WebP) from source images
 * 
 * Usage:
 * npm install -g sharp
 * node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_DIR = path.join(__dirname, '../src/assets/images');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/images/optimized');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// Quality settings
const QUALITY_SETTINGS = {
  avif: { quality: 80, effort: 6 }, // Higher effort = better compression
  webp: { quality: 85, effort: 6 },
  jpeg: { quality: 85, progressive: true },
  png: { compressionLevel: 9, progressive: true }
};

// Responsive breakpoints
const BREAKPOINTS = [
  { suffix: '_mobile', width: 480 },
  { suffix: '_tablet', width: 768 },
  { suffix: '_desktop', width: 1200 },
  { suffix: '_large', width: 1920 }
];

console.log('🖼️  Image Optimization Tool');
console.log('============================\n');

// Check if Sharp is available
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default;
  console.log('✅ Sharp library loaded');
} catch (error) {
  console.error('❌ Sharp library not found. Please install it:');
  console.error('   npm install sharp');
  console.error('   or');
  console.error('   yarn add sharp');
  process.exit(1);
}

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
}

/**
 * Process a single image file
 */
async function processImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;
  
  console.log(`\n🔄 Processing: ${filename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`   Original: ${metadata.width}x${metadata.height}, ${(originalSize / 1024).toFixed(1)}KB`);
    
    const results = [];
    
    // Generate AVIF (best compression)
    const avifPath = path.join(outputDir, `${filename}.avif`);
    await image
      .avif(QUALITY_SETTINGS.avif)
      .toFile(avifPath);
    
    const avifSize = fs.statSync(avifPath).size;
    const avifSavings = ((originalSize - avifSize) / originalSize * 100).toFixed(1);
    results.push(`AVIF: ${(avifSize / 1024).toFixed(1)}KB (-${avifSavings}%)`);
    
    // Generate WebP (good compression, wide support)
    const webpPath = path.join(outputDir, `${filename}.webp`);
    await image
      .webp(QUALITY_SETTINGS.webp)
      .toFile(webpPath);
    
    const webpSize = fs.statSync(webpPath).size;
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    results.push(`WebP: ${(webpSize / 1024).toFixed(1)}KB (-${webpSavings}%)`);
    
    // Generate responsive versions
    for (const breakpoint of BREAKPOINTS) {
      if (metadata.width && metadata.width > breakpoint.width) {
        // AVIF responsive
        const avifResponsivePath = path.join(outputDir, `${filename}${breakpoint.suffix}.avif`);
        await image
          .resize(breakpoint.width)
          .avif(QUALITY_SETTINGS.avif)
          .toFile(avifResponsivePath);
        
        // WebP responsive
        const webpResponsivePath = path.join(outputDir, `${filename}${breakpoint.suffix}.webp`);
        await image
          .resize(breakpoint.width)
          .webp(QUALITY_SETTINGS.webp)
          .toFile(webpResponsivePath);
      }
    }
    
    console.log(`   ✅ Generated: ${results.join(', ')}`);
    
  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
  }
}

/**
 * Process all images in a directory recursively
 */
async function processDirectory(inputDir, outputDir) {
  const items = fs.readdirSync(inputDir);
  
  for (const item of items) {
    const inputPath = path.join(inputDir, item);
    const stat = fs.statSync(inputPath);
    
    if (stat.isDirectory()) {
      // Create corresponding output directory
      const newOutputDir = path.join(outputDir, item);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      
      // Process subdirectory recursively
      await processDirectory(inputPath, newOutputDir);
      
    } else if (stat.isFile()) {
      const ext = path.extname(inputPath).toLowerCase();
      
      if (SUPPORTED_FORMATS.includes(ext)) {
        await processImage(inputPath, outputDir);
      }
    }
  }
}

/**
 * Generate usage examples
 */
function generateUsageExamples() {
  console.log('\n📋 Usage Examples:');
  console.log('==================\n');
  
  console.log('// Basic usage with auto-generated modern formats:');
  console.log('<OptimizedImage ');
  console.log('  src="/images/hero.jpg" ');
  console.log('  alt="Hero image" ');
  console.log('  className="hero-image" ');
  console.log('/>\n');
  
  console.log('// Manual sources with responsive breakpoints:');
  console.log('<OptimizedImage ');
  console.log('  src="/images/hero.jpg" ');
  console.log('  alt="Hero image" ');
  console.log('  sources={[');
  console.log('    { src: "/images/optimized/hero.avif", type: "image/avif" },');
  console.log('    { src: "/images/optimized/hero.webp", type: "image/webp" },');
  console.log('    { src: "/images/optimized/hero_mobile.avif", type: "image/avif", media: "(max-width: 768px)" }');
  console.log('  ]}');
  console.log('  sizes="(max-width: 768px) 100vw, 50vw"');
  console.log('/>\n');
  
  console.log('// With placeholder and priority loading:');
  console.log('<OptimizedImage ');
  console.log('  src="/images/hero.jpg" ');
  console.log('  alt="Hero image" ');
  console.log('  priority={true} ');
  console.log('  placeholder="blur" ');
  console.log('  blurDataURL="data:image/jpeg;base64,..." ');
  console.log('/>\n');
}

// Main execution
async function main() {
  console.log(`📂 Input directory: ${INPUT_DIR}`);
  console.log(`📂 Output directory: ${OUTPUT_DIR}\n`);
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }
  
  const startTime = Date.now();
  
  await processDirectory(INPUT_DIR, OUTPUT_DIR);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`\n✨ Image optimization complete in ${duration}s!`);
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  
  generateUsageExamples();
  
  console.log('\n💡 Next Steps:');
  console.log('1. Update your image imports to use optimized versions');
  console.log('2. Configure your build process to copy optimized images to public folder');
  console.log('3. Update OptimizedImage component usage with new sources');
  console.log('4. Test image loading in different browsers and network conditions');
}

main().catch(console.error);