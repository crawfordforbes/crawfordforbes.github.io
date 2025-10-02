import { useState, useMemo, useCallback } from 'react'
import { 
  getAllProjectsSorted, 
  filterProjects, 
  getFilterableRoles, 
  getFilterableTechs 
} from '../../../utils/projectUtilities'

export function useProjectFilters(initialRoleIds?: string[], initialTechIds?: string[]) {
  const [selectedRoleIds, setSelectedRoleIds] = useState(initialRoleIds || [])
  const [selectedTechIds, setSelectedTechIds] = useState(initialTechIds || [])
  const [highlightFilterOnHover, setHighlightFilterOnHover] = useState("")

  const availableRoleIds = useMemo(() => getFilterableRoles(), [])
  const availableTechIds = useMemo(() => getFilterableTechs(), [])
  const sortedProjectsArray = useMemo(() => getAllProjectsSorted(), [])

  const filteredProjects = useMemo(() => 
    filterProjects(sortedProjectsArray, selectedRoleIds, selectedTechIds),
    [selectedRoleIds, selectedTechIds, sortedProjectsArray]
  )

  const toggleRoleFilter = useCallback((filterId: string) => {
    setSelectedRoleIds(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }, [])

  const toggleTechFilter = useCallback((filterId: string) => {
    setSelectedTechIds(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    )
  }, [])

  const clearAllFilters = useCallback(() => {
    setSelectedRoleIds([])
    setSelectedTechIds([])
  }, [])

  return {
    // State
    selectedRoleIds,
    selectedTechIds,
    highlightFilterOnHover,
    availableRoleIds,
    availableTechIds,
    filteredProjects,
    sortedProjectsArray,
    
    // Actions
    toggleRoleFilter,
    toggleTechFilter,
    clearAllFilters,
    setHighlightFilterOnHover,
  }
}

export type UseProjectFiltersReturn = ReturnType<typeof useProjectFilters>