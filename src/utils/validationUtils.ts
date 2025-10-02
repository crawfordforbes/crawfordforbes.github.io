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

/**
 * Sanitize URL filter string into valid array with strict typing
 */
export function sanitizeFilterIds(filterString: unknown): string[] {
  if (!isNonEmptyString(filterString)) return []
  
  return filterString
    .split(',')
    .map((id: string) => id.trim())
    .filter((id): id is string => isNonEmptyString(id))
}

/**
 * Interface for validated project filters
 */
export interface ValidatedProjectFilters {
  readonly roleIds: readonly string[]
  readonly techIds: readonly string[]
  readonly projectId: string | undefined
}

/**
 * Interface for project filter input
 */
interface ProjectFilterInput {
  readonly roleIds?: unknown
  readonly techIds?: unknown
  readonly projectId?: unknown
}

/**
 * Validate project filter parameters with strict typing
 */
export function validateProjectFilters(filters: ProjectFilterInput): ValidatedProjectFilters {
  // For simplicity, just pass through the arrays if they're valid
  const validatedRoleIds = Array.isArray(filters.roleIds) ? filters.roleIds.filter(isNonEmptyString) : []
  const validatedTechIds = Array.isArray(filters.techIds) ? filters.techIds.filter(isNonEmptyString) : []
  const validatedProjectId = isValidProjectId(filters.projectId) ? filters.projectId : undefined

  return {
    roleIds: validatedRoleIds,
    techIds: validatedTechIds,
    projectId: validatedProjectId
  } as const
}