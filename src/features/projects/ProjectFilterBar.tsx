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
  return (
    <div className={`filters ${ui.showMobileFilter ? 'show-mobile-filter' : 'hide-mobile-filter'}`}>
      <Hex 
        hexClass="filter-toggle hex-button mobile icon-bg" 
        hexWidth={64} 
        onClick={ui.toggleMobileFilter}
        content={ui.showMobileFilter ? 'toggle-open' : 'toggle-close'}
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