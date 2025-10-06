/**
 * Routing utilities - only used functions
 */

/**
 * Interface for project URL parameters
 */
export interface ProjectURLParams {
  readonly projectId?: string | null
  readonly filterId?: string | null
  readonly hasFilters?: boolean
}

/**
 * Determine if page should auto-scroll to projects section
 */
export function shouldAutoScrollToProjects(params: ProjectURLParams): boolean {
  return Boolean(params.projectId || params.filterId || params.hasFilters)
}