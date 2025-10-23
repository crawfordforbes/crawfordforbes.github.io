import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router'

import { scrollToTarget } from '@/utils/site'
import { shouldAutoScrollToProjects, isValidProjectId } from '@/utils/projects'

export function useProjectRouting(initialProjectId?: string) {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId)

  // Parse URL parameters
  const urlProjectId = params.projectId
  
  // Parse filter query parameters
  const roleFilters = searchParams.get('roles')?.split(',').filter(Boolean) || []
  const techFilters = searchParams.get('techs')?.split(',').filter(Boolean) || []

  // Auto-scroll to projects on load if URL has project/filter params
  useEffect(() => {
    const hasFilters = roleFilters.length > 0 || techFilters.length > 0
    if (shouldAutoScrollToProjects({ projectId: urlProjectId, hasFilters })) {
      scrollToTarget("projects")
    }
  }, [urlProjectId, roleFilters.length, techFilters.length])

  // Sync URL project ID with local state and validate
  useEffect(() => {
    if (urlProjectId) {
      if (isValidProjectId(urlProjectId)) {
        setSelectedProjectId(urlProjectId)
      } else {
        // Invalid project ID - redirect to portfolio with 404 indication
        navigate('/portfolio?error=project-not-found', { replace: true })
      }
    } else {
      setSelectedProjectId(undefined)
    }
  }, [urlProjectId, navigate])

  const selectProject = useCallback((projectId: string) => {
    if (isValidProjectId(projectId)) {
      navigate(`/portfolio/${projectId}`)
    }
  }, [navigate])

  const clearSelectedProject = useCallback(() => {
    // Return to portfolio list, preserving current filters but removing error
    const currentParams = new URLSearchParams(searchParams)
    currentParams.delete('error') // Remove error parameter
    const cleanSearch = currentParams.toString()
    navigate(`/portfolio${cleanSearch ? `?${cleanSearch}` : ''}`)
  }, [navigate, searchParams])

  const updateFilters = useCallback((roleIds: string[], techIds: string[]) => {
    // Start from existing params to preserve unknown keys (e.g. ?perf=1)
    const currentParams = new URLSearchParams(searchParams)

    // Remove existing roles/techs so we can set new values or remove them entirely
    currentParams.delete('roles')
    currentParams.delete('techs')

    if (roleIds.length > 0) {
      currentParams.set('roles', roleIds.join(','))
    }
    if (techIds.length > 0) {
      currentParams.set('techs', techIds.join(','))
    }

    // Apply updated params (preserves other query keys)
    setSearchParams(currentParams)
  }, [setSearchParams])

  return {
    // State
    selectedProjectId,
    roleFilters,
    techFilters,
    urlProjectId,
    hasError: searchParams.get('error') === 'project-not-found',
    
    // Actions  
    selectProject,
    clearSelectedProject,
    updateFilters,
  }
}

export type UseProjectRoutingReturn = ReturnType<typeof useProjectRouting>