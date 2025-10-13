import { memo } from "react";
import Hex from "@/features/hexes/HexSimple";
import ProjectFilter from "./projectFilter";
import type { ProjectContainerRenderProps } from "./ProjectContainer";

type ProjectFilterBarProps = {
  filters: ProjectContainerRenderProps['filters'],
  ui: ProjectContainerRenderProps['ui']
}

/**
 * Component that encapsulates the filter UI including mobile toggle
 */
function ProjectFilterBar({ filters, ui }: ProjectFilterBarProps) {
  // Calculate active filter count for announcements
  const activeFilterCount = filters.selectedRoleIds.length + filters.selectedTechIds.length;
  const filterStatusMessage = activeFilterCount > 0 
    ? `${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} active. Showing ${filters.filteredProjects.length} project${filters.filteredProjects.length === 1 ? '' : 's'}.`
    : `No filters active. Showing all ${filters.filteredProjects.length} projects.`;
  return (
    <div 
      className={`filters ${ui.showMobileFilter ? 'show-mobile-filter' : 'hide-mobile-filter'}`}
      role="toolbar" 
      aria-label="Project filters"
    >
      {/* Live region for screen reader announcements */}
      <div 
        id="filter-status" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {filterStatusMessage}
      </div>
      <Hex 
        hexClass="filter-toggle hex-button mobile icon-bg" 
        hexWidth={64} 
        onClick={ui.toggleMobileFilter}
        content={ui.showMobileFilter ? 'toggle-open' : 'toggle-close'}
        ariaLabel={`${ui.showMobileFilter ? 'Hide' : 'Show'} project filters`}
      />
      <ProjectFilter
        selectedRoleIds={filters.selectedRoleIds}
        availableRoleIds={filters.availableRoleIds}
        selectRoleFilterClick={filters.toggleRoleFilter}
        selectedTechIds={filters.selectedTechIds}
        availableTechIds={filters.availableTechIds}
        selectTechFilterClick={filters.toggleTechFilter}
        hoveredFilters={filters.highlightFilterOnHover}
        highlightFilterHover={filters.setHighlightFilterOnHover}
      />
    </div>
  )
}

export default memo(ProjectFilterBar)