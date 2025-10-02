import { useState, useMemo, useCallback } from 'react'

export function useProjectPagination(
  items: readonly any[], 
  itemsPerPage: number = 6
) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination values
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  // Navigation functions
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }, [totalPages])

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }, [currentPage, totalPages])

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage])

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages)
  }, [totalPages])

  // Reset to first page when items change (e.g., after filtering)
  useMemo(() => {
    setCurrentPage(1)
  }, [items.length])

  return {
    // Current page data
    currentItems,
    currentPage,
    totalPages,
    totalItems: items.length,
    itemsPerPage,
    
    // Pagination info
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: startIndex + 1, // 1-based for display
    endIndex: Math.min(endIndex, items.length), // Don't exceed actual items
    
    // Navigation functions
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
  }
}

export type UseProjectPaginationReturn = ReturnType<typeof useProjectPagination>