import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import { scrollToTarget } from '@/utils/site'
import { shouldAutoScrollToProjects, sanitizeFilterIds } from '../../../utils/projectUtilities'

export function useProjectRouting(initialProjectId?: string) {
  const params = useParams()
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId)

  // Parse URL parameters for filters
  const urlFilterIds = sanitizeFilterIds(params.filterId)
  const urlProjectId = params.projectId

  // Auto-scroll to projects on load if URL has project/filter params
  useEffect(() => {
    if (shouldAutoScrollToProjects({ projectId: params.projectId, filterId: params.filterId })) {
      scrollToTarget("projects")
    }
  }, [params.projectId, params.filterId])

  // Sync URL project ID with local state
  useEffect(() => {
    if (urlProjectId) {
      setSelectedProjectId(urlProjectId)
    }
  }, [urlProjectId])

  const selectProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId)
  }, [])

  const clearSelectedProject = useCallback(() => {
    setSelectedProjectId(undefined)
  }, [])

  return {
    // State
    selectedProjectId,
    urlFilterIds,
    urlProjectId,
    
    // Actions  
    selectProject,
    clearSelectedProject,
  }
}

export type UseProjectRoutingReturn = ReturnType<typeof useProjectRouting>