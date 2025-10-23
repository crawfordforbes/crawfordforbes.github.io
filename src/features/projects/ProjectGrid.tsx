import { memo } from "react";

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
      
      <div className="intro-text">
        <p>Filter by role to see projects I led, contributed to, or built solo. Click a card for the case study.</p>
      </div>
      
      <ol className="results">
        {pagination.currentItems.map((project) => (
          <li key={project.id}>
            {renderProject(project)}
          </li>
        ))}
      </ol>

      <Pagination pagination={pagination} />
    </div>
  )
}

export default memo(ProjectGrid)