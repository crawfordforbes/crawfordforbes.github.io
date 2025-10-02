import { useState, useCallback } from 'react'

export function useProjectUI() {
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const toggleMobileFilter = useCallback(() => {
    setShowMobileFilter(prev => !prev)
  }, [])

  const closeMobileFilter = useCallback(() => {
    setShowMobileFilter(false)
  }, [])

  const openMobileFilter = useCallback(() => {
    setShowMobileFilter(true)
  }, [])

  return {
    // State
    showMobileFilter,
    
    // Actions
    toggleMobileFilter,
    closeMobileFilter,
    openMobileFilter,
  }
}

export type UseProjectUIReturn = ReturnType<typeof useProjectUI>