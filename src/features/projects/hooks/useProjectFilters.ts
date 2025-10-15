import { useState, useMemo, useCallback, useEffect } from 'react'
import { 
  getAllProjectsSorted, 
  filterProjects, 
  getFilterableRoles, 
  getFilterableTechs 
} from '../../../utils/projects'

export function useProjectFilters(
  urlRoleFilters?: string[], 
  urlTechFilters?: string[],
  onFiltersChange?: (roleIds: string[], techIds: string[]) => void
) {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([])
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([])

  // Sync URL filters with local state (without triggering callbacks)
  useEffect(() => {
    if (urlRoleFilters && JSON.stringify(urlRoleFilters) !== JSON.stringify(selectedRoleIds)) {
      setSelectedRoleIds(urlRoleFilters)
    }
  }, [urlRoleFilters]) // Intentionally excluding selectedRoleIds to avoid loops

  useEffect(() => {
    if (urlTechFilters && JSON.stringify(urlTechFilters) !== JSON.stringify(selectedTechIds)) {
      setSelectedTechIds(urlTechFilters)
    }
  }, [urlTechFilters]) // Intentionally excluding selectedTechIds to avoid loops

  const availableRoleIds = useMemo(() => getFilterableRoles(), [])
  const availableTechIds = useMemo(() => getFilterableTechs(), [])
  const sortedProjectsArray = useMemo(() => getAllProjectsSorted(), [])

  const filteredProjects = useMemo(() => 
    filterProjects(sortedProjectsArray, selectedRoleIds, selectedTechIds),
    [selectedRoleIds, selectedTechIds, sortedProjectsArray]
  )

  const toggleRoleFilter = useCallback((filterId: string) => {
    const newRoleIds = selectedRoleIds.includes(filterId) 
      ? selectedRoleIds.filter(id => id !== filterId)
      : [...selectedRoleIds, filterId]
    
    setSelectedRoleIds(newRoleIds)
    onFiltersChange?.(newRoleIds, selectedTechIds)
  }, [selectedRoleIds, selectedTechIds, onFiltersChange])

  const toggleTechFilter = useCallback((filterId: string) => {
    const newTechIds = selectedTechIds.includes(filterId)
      ? selectedTechIds.filter(id => id !== filterId) 
      : [...selectedTechIds, filterId]
    
    setSelectedTechIds(newTechIds)
    onFiltersChange?.(selectedRoleIds, newTechIds)
  }, [selectedRoleIds, selectedTechIds, onFiltersChange])

  const clearAllFilters = useCallback(() => {
    setSelectedRoleIds([])
    setSelectedTechIds([])
    onFiltersChange?.([], [])
  }, [onFiltersChange])

  return {
    // State
    selectedRoleIds,
    selectedTechIds,
    availableRoleIds,
    availableTechIds,
    filteredProjects,
    sortedProjectsArray,
    
    // Actions
    toggleRoleFilter,
    toggleTechFilter,
    clearAllFilters,
  }
}

export type UseProjectFiltersReturn = ReturnType<typeof useProjectFilters>