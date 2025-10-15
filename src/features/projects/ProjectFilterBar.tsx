import { memo } from "react";
import Hex from "@/features/hexes/HexSimple";
import ProjectFilter from "./projectFilter";
import type { useProjectFilters } from "./hooks";

type ProjectFilterBarProps = {
  filters: ReturnType<typeof useProjectFilters>;
  ui: {
    showMobileFilter: boolean;
    toggleMobileFilter: () => void;
  };
  // ADD: Global hover props
  globalHoveredFilter: string;
  onFilterHover: (filterId: string) => void;
}

/**
 * Component that encapsulates the filter UI including mobile toggle
 */
function ProjectFilterBar({ filters, ui, globalHoveredFilter, onFilterHover }: ProjectFilterBarProps) {
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
        contentType="badge"
        ariaLabel={`${ui.showMobileFilter ? 'Hide' : 'Show'} project filters`}
      />
      <ProjectFilter
        selectedRoleIds={filters.selectedRoleIds}
        availableRoleIds={filters.availableRoleIds}
        selectRoleFilterClick={filters.toggleRoleFilter}
        selectedTechIds={filters.selectedTechIds}
        availableTechIds={filters.availableTechIds}
        selectTechFilterClick={filters.toggleTechFilter}
        // CHANGE: Use global hover state instead of local
        hoveredFilters={globalHoveredFilter}
        highlightFilterHover={onFilterHover}
      />
    </div>
  )
}

export default memo(ProjectFilterBar)