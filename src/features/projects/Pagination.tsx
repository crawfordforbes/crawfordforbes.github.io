import { memo } from 'react'
import type { UseProjectPaginationReturn } from './hooks/useProjectPagination'
import './styles/pagination.css'

type PaginationProps = {
  pagination: UseProjectPaginationReturn
  className?: string
}

function Pagination({ pagination, className = '' }: PaginationProps) {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    totalItems,
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
  } = pagination

  if (totalPages <= 1) return null

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if we have 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <nav className={`pagination ${className}`} aria-label="Project pagination">
      <div className="pagination-info">
        Showing {startIndex}-{endIndex} of {totalItems} projects
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={goToFirstPage}
          disabled={!hasPrevPage}
          aria-label="Go to first page"
          className="pagination-btn pagination-first"
        >
          ⟪
        </button>
        
        <button
          onClick={goToPrevPage}
          disabled={!hasPrevPage}
          aria-label="Go to previous page"
          className="pagination-btn pagination-prev"
        >
          ‹ Previous
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`pagination-btn pagination-page ${
                  page === currentPage ? 'active' : ''
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                {page}
              </span>
            )
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          aria-label="Go to next page"
          className="pagination-btn pagination-next"
        >
          Next ›
        </button>
        
        <button
          onClick={goToLastPage}
          disabled={!hasNextPage}
          aria-label="Go to last page"
          className="pagination-btn pagination-last"
        >
          ⟫
        </button>
      </div>
    </nav>
  )
}

export default memo(Pagination)