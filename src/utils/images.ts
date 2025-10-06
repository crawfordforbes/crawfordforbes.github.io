/**
 * Image utilities with optimization support
 */

// Import hero images directly for proper Vite URL resolution
import heroDesktop from '@/assets/images/hero-desktop.webp';
import heroTablet from '@/assets/images/hero-tablet.webp';
import heroMobile from '@/assets/images/hero-mobile.webp';
import heroFull from '@/assets/images/hero-full.jpeg';

// Function to dynamically import images using Vite's import.meta.glob
const imageModules = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,webp,svg}', { 
  eager: true, 
  query: '?url',
  import: 'default'
});

// Create a lookup map for easier access
const imageMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => {
    // Convert '/src/assets/images/projects/sunshine-nights-primary.png' 
    // to 'projects/sunshine-nights-primary.png'
    const relativePath = path.replace('/src/assets/images/', '');
    return [relativePath, url as string];
  })
);

// Enhanced image URL function that works with Vite's asset handling
export function getImgUrl(relativePath: string): string {
  // Remove leading '../assets/images/' or similar prefixes to normalize the path
  const normalizedPath = relativePath.replace(/^\.\.\/assets\/images\//, '');
  
  // Try to find the image in our import map
  const imageUrl = imageMap[normalizedPath];
  
  if (imageUrl) {
    return imageUrl;
  }
  
  // Fallback: log warning and try the original approach
  console.warn(`Image not found in import map: ${normalizedPath}. Available images:`, Object.keys(imageMap));
  return new URL(`/src/assets/images/${normalizedPath}`, import.meta.url).href;
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

// Image path helpers for different categories - now using dynamic imports
export const imagePaths = {
  hero: {
    desktop: heroDesktop,
    tablet: heroTablet,
    mobile: heroMobile,
    full: heroFull
  },
  
  projects: {
    // Helper function to get project image URLs
    getImageUrl: (imageName: string) => getImgUrl(`projects/${imageName}`)
  }
} as const;

// Image URL generation functions are above
// createImageSources is in OptimizedImage.tsx where it's used