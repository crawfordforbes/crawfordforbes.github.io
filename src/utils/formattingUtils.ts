/**
 * Formatting utilities - only used functions
 */

/**
 * Generate alt text for project images
 */
export function generateImageAlt(projectTitle: string, imageType?: 'primary' | 'secondary' | 'tertiary'): string {
  const typeMap = {
    primary: 'Main Project Image',
    secondary: 'Secondary Project Image', 
    tertiary: 'Tertiary Project Image'
  }
  
  const suffix = imageType ? typeMap[imageType] : 'Project Image'
  return `${projectTitle} - ${suffix}`
}