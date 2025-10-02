import { projectData } from '@/data/projects/projects'
import { roleData } from '@/data/projects/roles'
import { techData } from '@/data/projects/techs'
import type { ProjectType } from '@/data/projects/projects'
import type { RoleType } from '@/data/projects/roles'

/**
 * Project data manipulation utilities with strict typing
 */

/**
 * Get all projects as a sorted array
 */
export function getAllProjectsSorted(): ProjectType[] {
  return Object.values(projectData).sort((a: ProjectType, b: ProjectType) => 
    a.title.localeCompare(b.title)
  )
}

/**
 * Get project by ID with strict null safety
 */
export function getProjectById(id: string | undefined | null): ProjectType | null {
  if (!id || typeof id !== 'string' || !projectData[id]) {
    return null
  }
  return projectData[id]
}

/**
 * Filter projects by both roles and technologies with strict typing
 */
export function filterProjects(
  projects: readonly ProjectType[], 
  roleIds: readonly string[] = [], 
  techIds: readonly string[] = []
): ProjectType[] {
  // If no filters are selected, return all projects
  if (roleIds.length === 0 && techIds.length === 0) {
    return [...projects]
  }

  return projects.filter((project: ProjectType): boolean => {
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

/**
 * Get available filterable roles with strict typing
 */
export function getFilterableRoles(): RoleType[] {
  return Object.keys(roleData)
    .filter((id: string): boolean => roleData[id]?.filterable === true)
    .map((id: string) => roleData[id])
}

/**
 * Get available filterable technologies with strict typing
 */
export function getFilterableTechs(): RoleType[] {
  return Object.keys(techData)
    .filter((id: string): boolean => techData[id]?.filterable === true)
    .map((id: string) => techData[id])
}

/**
 * Get project navigation context with strict null safety
 */
export function getProjectNavigation(
  currentProjectId: string, 
  allProjects: readonly ProjectType[]
): { previous: ProjectType | null; next: ProjectType | null; currentIndex: number } {
  const currentIndex = allProjects.findIndex((p: ProjectType) => p.id === currentProjectId)
  
  if (currentIndex === -1) {
    return { previous: null, next: null, currentIndex: -1 }
  }

  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return { previous, next, currentIndex }
}