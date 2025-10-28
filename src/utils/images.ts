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
  // Return hero fallback when requested
  if (filename === "fallback") {
    // Use the generated public fallback in /public/images (projects-fallback)
    return `/images/projects-fallback`;
  }

  if (!filename) {
    console.error(`getProjectImageUrl: filename is "${filename}" for project "${projectId}"`);
    return imagePaths.hero.desktop;
  }

  if (!projectId) {
    console.error(`getProjectImageUrl: projectId is "${projectId}" for filename "${filename}"`);
    return imagePaths.hero.desktop;
  }

  // If caller already provides a public or absolute URL, return as-is
  if (filename.startsWith('/images/') || filename.startsWith('http') || filename.startsWith('/src/assets/')) {
    return filename;
  }

  // Normalize filename to a slug without extension and match the generator naming scheme
  // e.g. filename 'sunshine-nights-primary.png' for project 'sunshine-nights' ->
  // '/images/projects-sunshine-nights-sunshine-nights-primary'
  const nameOnly = filename.split('/').pop() || filename;
  const base = nameOnly.replace(/\.[^/.]+$/, '');

  // simple slugify (lowercase, spaces -> -, remove unsafe chars)
  const slug = String(base)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  const projectSlug = String(projectId)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `/images/projects-${projectSlug}-${slug}`;
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
    // Return the generated projects fallback (will be created by the images script)
    return `/images/projects-fallback`;
  }

  const imageInfo = imageData[primaryImageId];
  if (!imageInfo) {
    console.warn(`Image not found for ID: ${primaryImageId}`);
    // Return the generated projects fallback
    return `/images/projects-fallback`;
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