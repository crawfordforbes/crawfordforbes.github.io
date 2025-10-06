/**
 * Image utilities with optimization support
 */

interface ImageSource {
  src: string;
  width: number;
  type: string;
}

// Legacy function for compatibility
export function getImgUrl(filePath: string) {
  return new URL(filePath, import.meta.url).href
}

// Enhanced image URL generation with optimization
export function getOptimizedImageUrl(
  basePath: string, 
  options: {
    width?: number;
    format?: 'webp' | 'jpeg' | 'png';
    quality?: number;
  } = {}
): string {
  const { width, format = 'webp' } = options;
  
  // Remove file extension from basePath
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  
  // Build optimized filename
  let filename = baseWithoutExt;
  if (width) filename += `-${width}w`;
  filename += `.${format}`;
  
  return getImgUrl(`../assets/images/${filename}`);
}

// Generate multiple image sources for responsive images
export function generateImageSources(
  basePath: string,
  sizes: number[] = [400, 800, 1200, 1600]
): ImageSource[] {
  const sources: ImageSource[] = [];
  
  // WebP sources
  sizes.forEach(size => {
    sources.push({
      src: getOptimizedImageUrl(basePath, { width: size, format: 'webp' }),
      width: size,
      type: 'image/webp'
    });
  });
  
  // JPEG fallback sources
  sizes.forEach(size => {
    sources.push({
      src: getOptimizedImageUrl(basePath, { width: size, format: 'jpeg' }),
      width: size,
      type: 'image/jpeg'
    });
  });
  
  return sources;
}

// Image path helpers for different categories
export const imagePaths = {
  hero: {
    desktop: '../assets/images/hero-desktop.webp',
    tablet: '../assets/images/hero-tablet.webp', 
    mobile: '../assets/images/hero-mobile.webp',
    full: '../assets/images/hero-full.jpeg'
  },
  
  projects: {
    getPath: (projectId: string, type: 'primary' | 'secondary' | 'tertiary' | 'banner') => 
      `../assets/images/projects/${projectId}-${type}.png`
  }
} as const;

// Preload critical images
export function preloadImage(src: string, as: 'image' = 'image') {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
}

// Preload critical images for above-the-fold content
export function preloadCriticalImages() {
  // Preload hero images
  preloadImage(getImgUrl(imagePaths.hero.mobile));
  preloadImage(getImgUrl(imagePaths.hero.tablet));
  preloadImage(getImgUrl(imagePaths.hero.desktop));
}