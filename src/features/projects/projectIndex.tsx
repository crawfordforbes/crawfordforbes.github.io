import { useState } from 'react';
import { usePerformanceMonitor } from '@/utils/performance';

import { useProjectFilters, useProjectRouting } from "@/features/projects/hooks";
import ProjectFilterBar from "@/features/projects/ProjectFilterBar";
import ProjectGrid from "@/features/projects/ProjectGrid";
import ProjectDetail from "@/features/projects/ProjectDetail";
import BackButton from "@/features/projects/BackButton";

import './styles/projectIndex.css'

type projectIndexProps = {
  selectedProjectIdProp?: string,
}

function ProjectIndex({  
  selectedProjectIdProp,
}: projectIndexProps) {
  
  // Direct hook usage instead of render props
  const routing = useProjectRouting(selectedProjectIdProp);
  const filters = useProjectFilters(routing.roleFilters, routing.techFilters, routing.updateFilters);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  // ADD: Global hover state management
  const [globalHoveredFilter, setGlobalHoveredFilter] = useState<string>("");

  // Enable performance monitoring via query param: ?perf=1
  const perfEnabled = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('perf') === '1';
  usePerformanceMonitor('ProjectIndex', perfEnabled);

  // Project detail view
  if (routing.selectedProjectId) {
    return (
      <article className="project-feature index-container" id="projects">
        <div className="project-detail-view">
          <div className="selected-project">
            <BackButton onBack={routing.clearSelectedProject} />
            <ProjectDetail id={routing.selectedProjectId} />
          </div>
        </div>
      </article>
    );
  }

  // Project list view
  return (
    <article className="project-feature index-container" id="projects">
      <div className="project-index project-list-view">
        <ProjectFilterBar 
          filters={filters}
          ui={{
            showMobileFilter,
            toggleMobileFilter: () => setShowMobileFilter(!showMobileFilter)
          }}
          globalHoveredFilter={globalHoveredFilter}
          onFilterHover={setGlobalHoveredFilter}
        />
        
        <ProjectGrid 
          projects={filters.filteredProjects}
          onProjectSelect={routing.selectProject}
          selectedRoleIds={filters.selectedRoleIds}
          selectedTechIds={filters.selectedTechIds}
          onRoleToggle={filters.toggleRoleFilter}
          onTechToggle={filters.toggleTechFilter}
          hasError={routing.hasError}
          onClearError={routing.clearSelectedProject}
          globalHoveredFilter={globalHoveredFilter}
          onFilterHover={setGlobalHoveredFilter}
        />
      </div>
    </article>
  );
}

export default ProjectIndex