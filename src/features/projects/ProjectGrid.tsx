import { memo } from "react";
import ProjectResult from "./projectResult";
import Pagination from "./Pagination";
import { useProjectPagination } from "./hooks";
import type { ProjectContainerRenderProps } from "./ProjectContainer";

type ProjectGridProps = {
  filters: ProjectContainerRenderProps['filters'],
  routing: ProjectContainerRenderProps['routing']
}

/**
 * Component that renders the grid of project results
 */
function ProjectGrid({ filters, routing }: ProjectGridProps) {
  const projects = filters.filteredProjects;
  
  // Use pagination instead of virtualization
  const pagination = useProjectPagination(projects, 3); // 6 projects per page

  const renderProject = (project: typeof projects[0]) => (
    <ProjectResult 
      project={project}
      selectProjectClick={routing.selectProject}
      selectedRoleIds={filters.selectedRoleIds}
      selectRoleFilterClick={filters.toggleRoleFilter}
      selectedTechIds={filters.selectedTechIds}
      selectTechFilterClick={filters.toggleTechFilter}
      highlightFilterHover={filters.setHighlightFilterOnHover}
      hoveredFilters={filters.highlightFilterOnHover}
    />
  );

  return (
    <div className="helper-results">
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