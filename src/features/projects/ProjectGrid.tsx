import { memo, useRef, useEffect, useState } from "react";
import type { MutableRefObject } from "react";

import ProjectResult from "@/features/projects/ProjectResult";
import Pagination from "@/features/projects/Pagination";
import { useProjectPagination } from "@/features/projects/hooks";
import { usePerformanceMonitor } from '@/utils/performance';

import type { ProjectType } from "@/data/projects/projects";

type ProjectGridProps = {
  projects: ProjectType[];
  onProjectSelect: (id: string) => void;
  selectedRoleIds: string[];
  selectedTechIds: string[];
  onRoleToggle: (id: string) => void;
  onTechToggle: (id: string) => void;
  hasError: boolean;
  onClearError: () => void;
  globalHoveredFilter: string;
  onFilterHover: (filterId: string) => void;
}

/**
 * Component that renders the grid of project results
 */
function ProjectGrid({ 
  projects, 
  onProjectSelect, 
  selectedRoleIds, 
  selectedTechIds, 
  onRoleToggle, 
  onTechToggle,
  hasError,
  onClearError,
  globalHoveredFilter,
  onFilterHover
}: ProjectGridProps) {
  // Use pagination instead of virtualization
  const pagination = useProjectPagination(projects, 6); // 6 projects per page

  // Enable performance monitoring when ?perf=1 is in the URL
  const perfEnabled = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('perf') === '1';
  usePerformanceMonitor('ProjectGrid', perfEnabled);

  const [isFading, setIsFading] = useState(false)
  const prevIdsRef = useRef<string[]>([])
  const fadeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    // clear any existing timer at the start to avoid races
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current)
      fadeTimerRef.current = null
    }

    const ids = pagination.currentItems.map((p) => p.id)
    const prev = prevIdsRef.current
    const changed = prev.length && (prev.length !== ids.length || prev.some((v, i) => v !== ids[i]))

    if (!changed) {
      // no structural change -> ensure fade is off and update prev snapshot
      prevIdsRef.current = ids
      setIsFading(false)
      return
    }

    // Items changed -> enable fade, schedule clearing
    prevIdsRef.current = ids
    setIsFading(true)
    fadeTimerRef.current = window.setTimeout(() => {
      setIsFading(false)
      fadeTimerRef.current = null
    }, 3000)

    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentItems])

  const renderProject = (project: ProjectType) => (
    <ProjectResult 
      project={project}
      selectProjectClick={onProjectSelect}
      selectedRoleIds={selectedRoleIds}
      selectRoleFilterClick={onRoleToggle}
      selectedTechIds={selectedTechIds}
      selectTechFilterClick={onTechToggle}
      // CHANGE: Use global hover state
      highlightFilterHover={onFilterHover}
      hoveredFilters={globalHoveredFilter}
    />
  );

  return (
    <div className="helper-results">
      {/* Show error banner if there's a project-not-found error */}
      {hasError && (
        <div className="error-banner">
          <div className="error-content">
            <p>
              <strong>Project not found.</strong> The project you're looking for doesn't exist or may have been removed.
            </p>
            <button 
              onClick={onClearError}
              className="dismiss-error"
              aria-label="Dismiss error message"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="pagination-cont desktop">
        <Pagination pagination={pagination} />
      </div>
      <ol className={`results ${isFading ? 'fade' : ''}`}>
        {pagination.currentItems.map((project) => (
          <li key={project.id} className="result-item">
            {renderProject(project)}
          </li>
        ))}
      </ol>
      <div className="pagination-cont mobile">
        <Pagination pagination={pagination} />
      </div>

      
    </div>
  )
}

export default memo(ProjectGrid)