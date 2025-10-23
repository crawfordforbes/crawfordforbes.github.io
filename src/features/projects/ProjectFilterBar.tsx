import { memo } from "react";

import Hex from "@/features/hexes/Hex";
import ProjectFilter from "@/features/projects/ProjectFilter";

// Use the exported return type for the filters hook
import type { UseProjectFiltersReturn } from "@/features/projects/hooks";

// Normalizers / data
import { getFilterableRoles, getFilterableTechs } from "@/utils/projects";
import { roleData } from "@/data/projects/roles";
import { techData } from "@/data/projects/techs";
import type { RoleType } from "@/data/projects/roles";
import type { TechType } from "@/data/projects/techs";

type ProjectFilterBarProps = {
  filters: UseProjectFiltersReturn & { filteredProjects?: unknown[]; availableRoleIds?: unknown[]; availableTechIds?: unknown[] };
  ui: {
    showMobileFilter: boolean;
    toggleMobileFilter: () => void;
  };
  globalHoveredFilter: string;
  onFilterHover: (filterId: string) => void;
};

/**
 * Component that encapsulates the filter UI including mobile toggle
 */
function ProjectFilterBar({ filters, ui, globalHoveredFilter, onFilterHover }: ProjectFilterBarProps) {
  // Defensive getters in case the hook typing is partial
  const selectedRoleIds = (filters.selectedRoleIds ?? []) as string[];
  const selectedTechIds = (filters.selectedTechIds ?? []) as string[];
  const filteredCount = (filters.filteredProjects?.length ?? 0);

  const activeFilterCount = selectedRoleIds.length + selectedTechIds.length;
  const filterStatusMessage = activeFilterCount > 0
    ? `${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} active. Showing ${filteredCount} project${filteredCount === 1 ? '' : 's'}.`
    : `No filters active. Showing all ${filteredCount} projects.`;

  // Normalize available roles -> RoleType[]
  let availableRoles: RoleType[] = [];
  if (Array.isArray(filters.availableRoleIds)) {
    const first = filters.availableRoleIds[0];
    if (typeof first === "string") {
      availableRoles = (filters.availableRoleIds as string[])
        .map(id => roleData[id])
        .filter(Boolean) as RoleType[];
    } else {
      availableRoles = filters.availableRoleIds as RoleType[];
    }
  } else {
    availableRoles = getFilterableRoles();
  }

  // Normalize available techs -> TechType[]
  let availableTechs: TechType[] = [];
  if (Array.isArray(filters.availableTechIds)) {
    const first = filters.availableTechIds[0];
    if (typeof first === "string") {
      availableTechs = (filters.availableTechIds as string[])
        .map(id => techData[id])
        .filter(Boolean) as TechType[];
    } else {
      availableTechs = filters.availableTechIds as TechType[];
    }
  } else {
    availableTechs = getFilterableTechs();
  }

  return (
    <div
      className={`filters ${ui.showMobileFilter ? "show-mobile-filter" : "hide-mobile-filter"}`}
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
        hexWidth={72}
        onClick={ui.toggleMobileFilter}
        content={ui.showMobileFilter ? "toggle-filter-open" : "toggle-filter-close"}
        contentType="badge"
        ariaLabel={`${ui.showMobileFilter ? "Hide" : "Show"} project filters`}
      />
      <ProjectFilter
        selectedRoleIds={selectedRoleIds}
        availableRoleIds={availableRoles}
        selectRoleFilterClick={filters.toggleRoleFilter}
        selectedTechIds={selectedTechIds}
        availableTechIds={availableTechs}
        selectTechFilterClick={filters.toggleTechFilter}
        hoveredFilters={globalHoveredFilter}
        highlightFilterHover={onFilterHover}
      />
    </div>
  );
}

export default memo(ProjectFilterBar);