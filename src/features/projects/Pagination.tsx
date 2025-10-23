import { memo } from 'react'

import type { UseProjectPaginationReturn } from './hooks/useProjectPagination'

import './styles/pagination.css'
import Badge from '@/components/global/Badge'

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
        <Badge
          iconClass={['fas', 'angle-double-left']}
          badgeOnClick={hasPrevPage ? goToFirstPage : undefined}
          extraClass={`pill primary pagination-btn pagination-first ${!hasPrevPage ? 'disabled' : ''}`}
          noTabIndex={!hasPrevPage}
        />

        <Badge
          iconClass={['fas', 'angle-left']}
          badgeOnClick={hasPrevPage ? goToPrevPage : undefined}
          extraClass={`pill secondary pagination-btn pagination-prev ${!hasPrevPage ? 'disabled' : ''}`}
          noTabIndex={!hasPrevPage}
        />

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <Badge
                key={page}
                iconClass={['fas', `${page}`]}
                badgeOnClick={page === currentPage ? undefined : () => goToPage(page)}
                extraClass={`pill tertiary pagination-btn pagination-page ${page === currentPage ? 'active' : ''}`}
                noTabIndex={page === currentPage}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            ) : (
              <Badge key={`ellipsis-${index}`} className="pagination-ellipsis pill tertiary" title="...">
                {page}
              </Badge>
            )
          ))}
        </div>

        <Badge
          iconClass={['fas', 'angle-right']}
          badgeOnClick={hasNextPage ? goToNextPage : undefined}
          extraClass={`pill secondary pagination-btn pagination-next ${!hasNextPage ? 'disabled' : ''}`}
          noTabIndex={!hasNextPage}
        />

        <Badge
          iconClass={['fas', 'angle-double-right']}
          badgeOnClick={hasNextPage ? goToLastPage : undefined}
          extraClass={`pill primary pagination-btn pagination-last ${!hasNextPage ? 'disabled' : ''}`}
          noTabIndex={!hasNextPage}
        />
      </div>
    </nav>
  )
}
 
export default memo(Pagination)