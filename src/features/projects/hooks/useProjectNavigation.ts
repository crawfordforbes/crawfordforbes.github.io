import { useMemo } from 'react'
import { getProjectNavigation } from '../../../utils/projectUtilities'
import type { ProjectType } from '@/data/projects/projects'

export function useProjectNavigation(
  projects: ProjectType[], 
  currentProjectId?: string
) {
  const navigationData = useMemo(() => {
    if (!currentProjectId) {
      return { previous: null, next: null, currentIndex: -1 }
    }
    return getProjectNavigation(currentProjectId, projects)
  }, [projects, currentProjectId])

  const goToPrevious = () => navigationData.previous?.id || null
  const goToNext = () => navigationData.next?.id || null

  return {
    previousProject: navigationData.previous,
    nextProject: navigationData.next,
    goToPrevious,
    goToNext,
    currentIndex: navigationData.currentIndex,
    hasPrevious: navigationData.currentIndex > 0,
    hasNext: navigationData.currentIndex < projects.length - 1,
  }
}

export type UseProjectNavigationReturn = ReturnType<typeof useProjectNavigation>