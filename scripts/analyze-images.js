#!/usr/bin/env node
/**
 * Image Optimization Analysis Tool
 * Analyzes current images and suggests optimizations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

console.log('🔍 Image Optimization Analysis');
console.log('===============================\n');

function analyzeDirectory(dir, basePath = '') {
  const items = fs.readdirSync(dir);
  const analysis = {
    total: 0,
    byFormat: {},
    needsOptimization: [],
    wellOptimized: [],
    totalSize: 0,
    suggestions: []
  };

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subAnalysis = analyzeDirectory(fullPath, relativePath);
      analysis.total += subAnalysis.total;
      analysis.totalSize += subAnalysis.totalSize;
      analysis.needsOptimization.push(...subAnalysis.needsOptimization);
      analysis.wellOptimized.push(...subAnalysis.wellOptimized);
      analysis.suggestions.push(...subAnalysis.suggestions);
      
      // Merge format counts
      Object.keys(subAnalysis.byFormat).forEach(format => {
        analysis.byFormat[format] = (analysis.byFormat[format] || 0) + subAnalysis.byFormat[format];
      });
    } else {
      const ext = path.extname(item).toLowerCase();
      
      if (IMAGE_EXTENSIONS.includes(ext)) {
        analysis.total++;
        analysis.totalSize += stat.size;
        
        const format = ext.slice(1); // Remove dot
        analysis.byFormat[format] = (analysis.byFormat[format] || 0) + 1;
        
        const sizeKB = (stat.size / 1024).toFixed(1);
        
        // Analyze optimization potential
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
          analysis.needsOptimization.push({
            path: relativePath,
            format,
            size: sizeKB,
            potential: 'Generate AVIF/WebP versions'
          });
        } else if (ext === '.webp') {
          // Check if AVIF version exists
          const avifPath = fullPath.replace('.webp', '.avif');
          if (!fs.existsSync(avifPath)) {
            analysis.suggestions.push({
              path: relativePath,
              suggestion: 'Create AVIF version for better compression'
            });
          } else {
            analysis.wellOptimized.push({
              path: relativePath,
              formats: ['webp', 'avif']
            });
          }
        } else if (ext === '.avif') {
          analysis.wellOptimized.push({
            path: relativePath,
            formats: ['avif']
          });
        }
        
        // Size-based suggestions
        if (stat.size > 500 * 1024) { // > 500KB
          analysis.suggestions.push({
            path: relativePath,
            suggestion: `Large file (${sizeKB}KB) - consider compression or responsive versions`
          });
        }
      }
    }
  });

  return analysis;
}

function generateReport(analysis) {
  console.log('📊 Analysis Results:');
  console.log(`   Total Images: ${analysis.total}`);
  console.log(`   Total Size: ${(analysis.totalSize / (1024 * 1024)).toFixed(2)}MB\n`);
  
  console.log('📁 By Format:');
  Object.entries(analysis.byFormat)
    .sort(([,a], [,b]) => b - a)
    .forEach(([format, count]) => {
      const status = ['avif', 'webp'].includes(format) ? '✅' : '⚠️';
      console.log(`   ${status} ${format.toUpperCase()}: ${count} files`);
    });
  
  console.log('\n🔧 Optimization Opportunities:');
  if (analysis.needsOptimization.length === 0) {
    console.log('   ✅ All images are using modern formats!');
  } else {
    analysis.needsOptimization.forEach(item => {
      console.log(`   📸 ${item.path} (${item.size}KB)`);
      console.log(`      → ${item.potential}`);
    });
  }
  
  console.log('\n💡 Suggestions:');
  if (analysis.suggestions.length === 0) {
    console.log('   ✅ No additional suggestions!');
  } else {
    analysis.suggestions.forEach(item => {
      console.log(`   💡 ${item.path}`);
      console.log(`      → ${item.suggestion}`);
    });
  }
  
  console.log('\n✅ Well Optimized:');
  if (analysis.wellOptimized.length === 0) {
    console.log('   📝 No fully optimized images yet');
  } else {
    analysis.wellOptimized.forEach(item => {
      console.log(`   ✅ ${item.path} (${item.formats.join(', ')})`);
    });
  }
}

function generateActionPlan(analysis) {
  console.log('\n🎯 Action Plan:');
  console.log('===============\n');
  
  if (analysis.needsOptimization.length > 0) {
    console.log('1. 🚀 Run Image Optimization:');
    console.log('   npm install sharp');
    console.log('   node scripts/optimize-images.js\n');
    
    console.log('2. 📝 Update Image Usage:');
    console.log('   // Replace manual sources with automatic generation');
    console.log('   <OptimizedImage ');
    console.log('     src="/images/hero.jpg"  // Component auto-generates .avif/.webp');
    console.log('     alt="Hero image" ');
    console.log('   />\n');
  }
  
  console.log('3. 🔧 Performance Monitoring:');
  console.log('   // Check Network tab for format selection');
  console.log('   // Modern browsers should load AVIF/WebP versions\n');
  
  console.log('4. 📊 Expected Improvements:');
  const unoptimized = analysis.needsOptimization.length;
  if (unoptimized > 0) {
    console.log(`   • ${unoptimized} images → 30-50% size reduction with AVIF`);
    console.log(`   • ${unoptimized} images → 20-30% size reduction with WebP`);
    console.log('   • Faster page loads');
    console.log('   • Better Core Web Vitals scores');
  } else {
    console.log('   ✅ Images already optimized!');
  }
}

// Main execution
if (!fs.existsSync(IMAGES_DIR)) {
  console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
  process.exit(1);
}

const analysis = analyzeDirectory(IMAGES_DIR);

generateReport(analysis);
generateActionPlan(analysis);

console.log('\n💻 Next Steps:');
console.log('1. Run optimization script: node scripts/optimize-images.js');
console.log('2. Test OptimizedImage component with different formats');
console.log('3. Monitor loading performance in browser dev tools');
console.log('4. Consider responsive breakpoints for large images');