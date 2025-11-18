import { useState, useCallback, useEffect, useRef, startTransition, useMemo } from 'react'
import { getAllProjectsSorted, filterProjects } from '@/utils/projects'
import type { ProjectType } from '@/data/projects/projects'

export function useProjectFilters(initialRoleIds: string[] = [], initialTechIds: string[] = [], onFiltersChange?: (roleIds: string[], techIds: string[]) => void) {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(initialRoleIds)
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>(initialTechIds)
  
  // Use ref to avoid adding callback to useEffect dependencies
  const onFiltersChangeRef = useRef(onFiltersChange)
  
  // Keep ref updated with latest callback
  useEffect(() => {
    onFiltersChangeRef.current = onFiltersChange
  }, [onFiltersChange])

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
    if (!onFiltersChangeRef.current) return

    if (typeof startTransition === 'function') {
      startTransition(() => {
        onFiltersChangeRef.current!(selectedRoleIds, selectedTechIds)
      })
    } else {
      onFiltersChangeRef.current(selectedRoleIds, selectedTechIds)
    }
  }, [selectedRoleIds, selectedTechIds])

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
    filteredProjects,
  }
}

export type UseProjectFiltersReturn = ReturnType<typeof useProjectFilters>