import { memo } from 'react'

import type { UseProjectPaginationReturn } from './hooks/useProjectPagination'

import './styles/pagination.css'
import Badge from '@/components/global/Badge'
import { scrollToTarget } from '@/utils/site'

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

  // Helper to call page action then scroll to projects
  const withScroll = (fn?: () => void) => {
    if (!fn) return undefined
    return () => {
      fn()
      // ensure we scroll to the projects container after navigation
      scrollToTarget('projects')
    }
  }

  // Always render the pagination UI but disable controls when there's only one page

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= 0) {
      // no pages, still show page 1 as disabled
      pages.push(1)
      return pages
    }

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
          badgeOnClick={hasPrevPage ? withScroll(goToFirstPage) : undefined}
          extraClass={`pill primary pagination-btn pagination-first ${!hasPrevPage ? 'disabled' : ''}`}
          noTabIndex={!hasPrevPage}
        />

        <Badge
          iconClass={['fas', 'angle-left']}
          badgeOnClick={hasPrevPage ? withScroll(goToPrevPage) : undefined}
          extraClass={`pill secondary pagination-btn pagination-prev ${!hasPrevPage ? 'disabled' : ''}`}
          noTabIndex={!hasPrevPage}
        />

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <Badge
                key={page}
                title={page.toString()}
                badgeOnClick={page === currentPage ? undefined : withScroll(() => goToPage(page))}
                extraClass={`pill tertiary pagination-btn pagination-page ${page === currentPage ? 'active' : ''}`}
                noTabIndex={page === currentPage}
              />
            ) : (
              <Badge key={`ellipsis-${index}`} extraClass="pagination-ellipsis pill tertiary" title={page} />
            )
          ))}
        </div>

        <Badge
          iconClass={['fas', 'angle-right']}
          badgeOnClick={hasNextPage ? withScroll(goToNextPage) : undefined}
          extraClass={`pill secondary pagination-btn pagination-next ${!hasNextPage ? 'disabled' : ''}`}
          noTabIndex={!hasNextPage}
        />

        <Badge
          iconClass={['fas', 'angle-double-right']}
          badgeOnClick={hasNextPage ? withScroll(goToLastPage) : undefined}
          extraClass={`pill primary pagination-btn pagination-last ${!hasNextPage ? 'disabled' : ''}`}
          noTabIndex={!hasNextPage}
        />
      </div>
    </nav>
  )
}
 
export default memo(Pagination)