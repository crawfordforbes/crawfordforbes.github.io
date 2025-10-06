import { projectData } from '@/data/projects/projects'

/**
 * Validation utilities with strict typing - only used functions
 */

/**
 * Type guard to check if a value is a non-empty string
 */
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

/**
 * Validate if a project ID exists with strict typing
 */
export function isValidProjectId(id: unknown): id is string {
  return isNonEmptyString(id) && id in projectData
}