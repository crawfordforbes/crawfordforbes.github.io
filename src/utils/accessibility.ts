/**
 * Accessibility Utilities
 * Essential accessibility tools for portfolio websites
 */

/**
 * Create accessible description from text content
 */
export function createAccessibleDescription(text: string, maxLength: number = 150): string {
  // Remove HTML tags and excessive whitespace
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) return cleanText;
  
  // Truncate at word boundary without ellipsis for better screen reader experience
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > maxLength * 0.8 
    ? truncated.substring(0, lastSpace)
    : truncated;
}