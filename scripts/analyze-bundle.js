#!/usr/bin/env node
/**
 * Bundle Analyzer Script
 * Analyzes the built bundle for optimization opportunities
 * 
 * Usage:
 * npm run build
 * node scripts/analyze-bundle.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const ASSET_EXTENSIONS = {
  js: ['.js'],
  css: ['.css'],
  images: ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'],
  fonts: ['.woff', '.woff2', '.ttf', '.eot'],
  videos: ['.mp4', '.webm'],
  other: []
};

// Size thresholds (in bytes)
const THRESHOLDS = {
  js: {
    large: 500 * 1024,    // 500KB
    medium: 200 * 1024,   // 200KB
  },
  css: {
    large: 100 * 1024,    // 100KB
    medium: 50 * 1024,    // 50KB
  },
  images: {
    large: 1024 * 1024,   // 1MB
    medium: 500 * 1024,   // 500KB
  },
  videos: {
    large: 5 * 1024 * 1024,    // 5MB per video
    medium: 2 * 1024 * 1024,   // 2MB per video
  }
};

class BundleAnalyzer {
  constructor() {
    this.results = {
      totalSize: 0,
      files: [],
      summary: {},
      recommendations: []
    };
  }

  async analyze() {
    console.log('🔍 Analyzing bundle...\n');

    if (!fs.existsSync(DIST_DIR)) {
      console.error('❌ Dist directory not found. Run `npm run build` first.');
      process.exit(1);
    }

    await this.scanDirectory(DIST_DIR);
    this.categorizeFiles();
    this.generateRecommendations();
    this.displayResults();
  }

  async scanDirectory(dir, relativePath = '') {
    const items = await fs.promises.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const itemRelativePath = path.join(relativePath, item);
      const stats = await fs.promises.stat(fullPath);

      if (stats.isDirectory()) {
        await this.scanDirectory(fullPath, itemRelativePath);
      } else {
        const ext = path.extname(item).toLowerCase();
        const size = stats.size;
        
        this.results.files.push({
          name: item,
          path: itemRelativePath,
          size,
          ext,
          sizeFormatted: this.formatSize(size)
        });
        
        this.results.totalSize += size;
      }
    }
  }

  categorizeFiles() {
    this.results.summary = {
      js: { files: [], totalSize: 0 },
      css: { files: [], totalSize: 0 },
      images: { files: [], totalSize: 0 },
      fonts: { files: [], totalSize: 0 },
      videos: { files: [], totalSize: 0 },
      other: { files: [], totalSize: 0 }
    };

    this.results.files.forEach(file => {
      let category = 'other';
      
      for (const [cat, extensions] of Object.entries(ASSET_EXTENSIONS)) {
        if (extensions.includes(file.ext)) {
          category = cat;
          break;
        }
      }

      this.results.summary[category].files.push(file);
      this.results.summary[category].totalSize += file.size;
    });

    // Sort files by size within each category
    Object.values(this.results.summary).forEach(category => {
      category.files.sort((a, b) => b.size - a.size);
    });
  }

  generateRecommendations() {
    const { js, css, images, videos } = this.results.summary;

    // JavaScript recommendations
    js.files.forEach(file => {
      if (file.size > THRESHOLDS.js.large) {
        this.results.recommendations.push({
          type: 'warning',
          message: `Large JS file: ${file.name} (${file.sizeFormatted}). Consider code splitting.`
        });
      }
    });

    // CSS recommendations
    css.files.forEach(file => {
      if (file.size > THRESHOLDS.css.large) {
        this.results.recommendations.push({
          type: 'warning',
          message: `Large CSS file: ${file.name} (${file.sizeFormatted}). Consider removing unused styles.`
        });
      }
    });

    // Image recommendations
    images.files.forEach(file => {
      if (file.size > THRESHOLDS.images.large) {
        this.results.recommendations.push({
          type: 'error',
          message: `Very large image: ${file.name} (${file.sizeFormatted}). Optimize or use responsive images.`
        });
      } else if (file.size > THRESHOLDS.images.medium && !['.webp', '.avif'].includes(file.ext)) {
        this.results.recommendations.push({
          type: 'info',
          message: `Consider modern format for: ${file.name} (${file.sizeFormatted}). Use WebP/AVIF.`
        });
      }
    });

    // Video recommendations
    if (videos && videos.files.length > 0) {
      videos.files.forEach(file => {
        if (file.size > THRESHOLDS.videos.large) {
          this.results.recommendations.push({
            type: 'error',
            message: `Very large video: ${file.name} (${file.sizeFormatted}). Increase CRF or reduce resolution.`
          });
        } else if (file.size > THRESHOLDS.videos.medium) {
          this.results.recommendations.push({
            type: 'warning',
            message: `Large video: ${file.name} (${file.sizeFormatted}). Consider further compression.`
          });
        }
      });

      if (videos.totalSize > 50 * 1024 * 1024) {
        this.results.recommendations.push({
          type: 'error',
          message: `Total video size is ${this.formatSize(videos.totalSize)}. Consider lazy loading videos or hosting externally.`
        });
      }
    }

    // General recommendations
    if (this.results.totalSize > 5 * 1024 * 1024) {
      this.results.recommendations.push({
        type: 'warning',
        message: `Total bundle size is ${this.formatSize(this.results.totalSize)}. Consider lazy loading and code splitting.`
      });
    }

    if (js.files.length > 10) {
      this.results.recommendations.push({
        type: 'info',
        message: `Many JS files (${js.files.length}). Bundle configuration might benefit from optimization.`
      });
    }
  }

  displayResults() {
    console.log('📊 Bundle Analysis Results');
    console.log('========================\n');

    // Total size
    console.log(`📦 Total Bundle Size: ${this.formatSize(this.results.totalSize)}\n`);

    // Category breakdown
    console.log('📁 Asset Breakdown:');
    Object.entries(this.results.summary).forEach(([category, data]) => {
      if (data.files.length > 0) {
        console.log(`  ${category.toUpperCase()}: ${this.formatSize(data.totalSize)} (${data.files.length} files)`);
      }
    });
    console.log();

    // Largest files in each category
    Object.entries(this.results.summary).forEach(([category, data]) => {
      if (data.files.length > 0) {
        console.log(`🔍 Largest ${category.toUpperCase()} files:`);
        data.files.slice(0, 3).forEach((file, index) => {
          console.log(`  ${index + 1}. ${file.name} - ${file.sizeFormatted}`);
        });
        console.log();
      }
    });

    // Recommendations
    if (this.results.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      this.results.recommendations.forEach(rec => {
        const icon = rec.type === 'error' ? '🚨' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`  ${icon} ${rec.message}`);
      });
      console.log();
    }

    // Performance grades
    this.displayPerformanceGrades();
  }

  displayPerformanceGrades() {
    console.log('🎯 Performance Grades:');
    
    const totalSize = this.results.totalSize;
    const jsSize = this.results.summary.js.totalSize;
    
    // Overall size grade
    const sizeGrade = totalSize < 1024 * 1024 ? 'A' : 
                     totalSize < 2 * 1024 * 1024 ? 'B' : 
                     totalSize < 5 * 1024 * 1024 ? 'C' : 'D';
    
    // JS size grade
    const jsGrade = jsSize < 500 * 1024 ? 'A' : 
                   jsSize < 1024 * 1024 ? 'B' : 
                   jsSize < 2 * 1024 * 1024 ? 'C' : 'D';
    
    console.log(`  Bundle Size: ${sizeGrade} (${this.formatSize(totalSize)})`);
    console.log(`  JavaScript: ${jsGrade} (${this.formatSize(jsSize)})`);
    console.log();

    // Performance tips
    console.log('🚀 Performance Tips:');
    console.log('  • Enable gzip/brotli compression on your server');
    console.log('  • Use a CDN for static assets');
    console.log('  • Implement lazy loading for route-based code splitting');
    console.log('  • Consider preloading critical resources');
    if (sizeGrade === 'C' || sizeGrade === 'D') {
      console.log('  • Consider removing unused dependencies');
      console.log('  • Analyze and split large vendor chunks');
    }
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run the analyzer
const analyzer = new BundleAnalyzer();
analyzer.analyze().catch(console.error);