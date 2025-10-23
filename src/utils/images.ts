/**
 * Simplified image utilities
 */

import { imageData } from '@/data/global/images'

import type { ProjectType } from '@/data/projects/projects'

// Import hero images from new hero subfolder
import heroDesktop from '@/assets/images/hero/hero-desktop.webp';
import heroTablet from '@/assets/images/hero/hero-tablet.webp';
import heroMobile from '@/assets/images/hero/hero-mobile.webp';
import heroFull from '@/assets/images/hero/hero-full.jpeg';

// Project-specific image helper for new folder structure
export function getProjectImageUrl(projectId: string, filename: string): string {

  if (filename === "fallback") {
    return imagePaths.hero.desktop;
  }
  if (!filename) {
    console.error(`getProjectImageUrl: filename is "${filename}" for project "${projectId}"`);
    return imagePaths.hero.desktop;
  }
  
  if (!projectId) {
    console.error(`getProjectImageUrl: projectId is "${projectId}" for filename "${filename}"`);
    return imagePaths.hero.desktop;
  }
  
  // Check if filename is already a full path
  if (filename.startsWith('/src/assets/') || filename.startsWith('http')) {
    return filename;
  }
  
  // FIXED: Build the path directly instead of calling getImageUrl again
  const fullPath = `/src/assets/images/projects/${projectId}/${filename}`;
  return fullPath;
}

// Simple helper for getting image URLs
export function getImageUrl(imagePath: string): string {
  // Check if imagePath is already a full URL
  if (imagePath.startsWith('http') || imagePath.startsWith('/src/assets/')) {
    return imagePath;
  }
  
  if (!imagePath || imagePath === 'undefined') {
    console.error(`getImageUrl: imagePath is "${imagePath}"`);
    return imagePaths.hero.desktop;
  }

  // Use Vite's glob import approach - construct the path as a simple string
  // Vite will handle this at build time
  const fullPath = `/src/assets/images/${imagePath}`;
  return fullPath;
}

// Helper to get primary image for project cards - now uses first imageId
export function getProjectPrimaryImageUrl(project: ProjectType): string {
  // Get the first image from imageIds array
  const primaryImageId = project.imageIds?.[0];
  if (!primaryImageId) {
    console.warn(`No images found for project: ${project.id}`);
    // Return hero image as fallback
    return imagePaths.hero.desktop;
  }

  const imageInfo = imageData[primaryImageId];
  if (!imageInfo) {
    console.warn(`Image not found for ID: ${primaryImageId}`);
    // Return hero image as fallback
    return imagePaths.hero.desktop;
  }
  
  return getProjectImageUrl(project.id, imageInfo.fileName);
}

// Image path helpers for different categories
export const imagePaths = {
  hero: {
    desktop: heroDesktop,
    tablet: heroTablet,
    mobile: heroMobile,
    full: heroFull
  }
} as const;