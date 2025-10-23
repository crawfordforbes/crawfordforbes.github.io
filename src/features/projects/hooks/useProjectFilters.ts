import { useState, useCallback, useEffect, startTransition, useMemo } from 'react'
import { getAllProjectsSorted, filterProjects } from '@/utils/projects'
import type { ProjectType } from '@/data/projects/projects'

export function useProjectFilters(initialRoleIds: string[] = [], initialTechIds: string[] = [], onFiltersChange?: (roleIds: string[], techIds: string[]) => void) {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(initialRoleIds)
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>(initialTechIds)

  const toggleRoleFilter = useCallback((filterId: string) => {
    setSelectedRoleIds(prev => {
      return prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]
    })
  }, [])

  const toggleTechFilter = useCallback((filterId: string) => {
    setSelectedTechIds(prev => {
      return prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]
    })
  }, [])

  // Sync URL / parent after local state stabilizes
  useEffect(() => {
    if (!onFiltersChange) return

    if (typeof startTransition === 'function') {
      startTransition(() => {
        onFiltersChange(selectedRoleIds, selectedTechIds)
      })
    } else {
      onFiltersChange(selectedRoleIds, selectedTechIds)
    }
  }, [selectedRoleIds, selectedTechIds, onFiltersChange])

  // Derived project list for consumers (ProjectIndex / ProjectGrid expect this)
  const allProjects = useMemo<ProjectType[]>(() => getAllProjectsSorted(), [])
  const filteredProjects = useMemo<ProjectType[]>(() => {
    return filterProjects(allProjects, selectedRoleIds, selectedTechIds)
  }, [allProjects, selectedRoleIds, selectedTechIds])

  return {
    selectedRoleIds,
    selectedTechIds,
    toggleRoleFilter,
    toggleTechFilter,
    setSelectedRoleIds,
    setSelectedTechIds,
    // ADDED: derived list consumed by ProjectIndex/ProjectGrid
    filteredProjects,
  }
}

export type UseProjectFiltersReturn = ReturnType<typeof useProjectFilters>