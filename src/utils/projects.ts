import { projectData } from '@/data/projects/projects'
import { roleData } from '@/data/projects/roles'
import { techData } from '@/data/projects/techs'
import { imageData } from '@/data/global/images'
import type { ProjectType } from '@/data/projects/projects'
import type { RoleType } from '@/data/projects/roles'
import type { TechType } from '@/data/projects/techs'

/**
 * Project utilities - all project-related functions consolidated
 */

// ===== VALIDATION =====
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

export function isValidProjectId(id: unknown): id is string {
  return isNonEmptyString(id) && id in projectData
}

// ===== CORE PROJECT FUNCTIONS =====
export function getAllProjectsSorted(): ProjectType[] {
  return Object.values(projectData).sort((a: ProjectType, b: ProjectType) => {
    // First, sort by featured (featured projects first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // If both have same featured status, sort alphabetically by title
    return a.title.localeCompare(b.title);
  });
}

export function getProjectById(id: string | undefined | null): ProjectType | null {
  if (!id || typeof id !== 'string' || !projectData[id]) {
    return null
  }
  return projectData[id]
}

export function filterProjects(
  projects: readonly ProjectType[], 
  roleIds: readonly string[] = [], 
  techIds: readonly string[] = []
): ProjectType[] {
  // If no filters are selected, return all projects
  if (roleIds.length === 0 && techIds.length === 0) {
    return [...projects]
  }

  return projects.filter((project: ProjectType) => {
    // If only role filters are selected
    if (roleIds.length > 0 && techIds.length === 0) {
      return project.roleIds?.some((roleId: string) => roleIds.includes(roleId)) ?? false
    }
    
    // If only tech filters are selected  
    if (techIds.length > 0 && roleIds.length === 0) {
      return project.techIds?.some((techId: string) => techIds.includes(techId)) ?? false
    }
    
    // If both role and tech filters are selected, match either (OR logic)
    const matchesRole = project.roleIds?.some((roleId: string) => roleIds.includes(roleId)) ?? false
    const matchesTech = project.techIds?.some((techId: string) => techIds.includes(techId)) ?? false
    
    return matchesRole || matchesTech
  })
}

export function getFilterableRoles(): RoleType[] {
  return Object.keys(roleData)
    .filter((id: string) => roleData[id]?.filterable === true)
    .map((id: string) => roleData[id])
}

export function getFilterableTechs(): TechType[] {
  return Object.keys(techData)
    .filter((id: string) => techData[id]?.filterable === true)
    .map((id: string) => techData[id])
}

// ===== FORMATTING =====
export function generateImageAlt(projectTitle: string, imageId?: string): string {
  // Try to get alt text from imageData first
  if (imageId && imageData[imageId]?.alt) {
    return imageData[imageId].alt
  }
  
  // Fallback to generic alt text
  return `${projectTitle} - Project Image`
}

// ===== ROUTING =====
export interface ProjectURLParams {
  readonly projectId?: string | null
  readonly filterId?: string | null
  readonly hasFilters?: boolean
}

export function shouldAutoScrollToProjects(params: ProjectURLParams): boolean {
  return Boolean(params.projectId || params.filterId || params.hasFilters)
}