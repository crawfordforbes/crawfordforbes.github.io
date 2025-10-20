import Badge from "@/components/global/badge";

import type { RoleType } from "@/data/projects/roles"

import './styles/projectFilter.css'

type projectFilterProps = {
  selectedRoleIds: string[],
  availableRoleIds: RoleType[],
  selectedTechIds: string[],
  availableTechIds: RoleType[],
  selectRoleFilterClick: (id: string) => void;
  selectTechFilterClick: (id: string) => void;
  hoveredFilters?: string;
  highlightFilterHover: (id: string) => void;
}

function ProjectFilter({  
  selectedRoleIds,
  availableRoleIds,
  selectedTechIds,
  availableTechIds,
  selectRoleFilterClick,
  selectTechFilterClick,
  hoveredFilters,
  highlightFilterHover,
}: projectFilterProps) {
  const handleMouseEnter = (filterId: string) => {
    highlightFilterHover(filterId);
  };

  const handleMouseLeave = () => {
    highlightFilterHover("");
  };

  // Enhanced keyboard handler
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="project-feature filter-container" role="region" aria-label="Project filtering options">
      <div className="variable-height-hex filter-wrapper">
        
        {/* Role Filters */}
        <fieldset>
          <legend className="title" id="role-filter-heading">Role</legend>
          <ol 
            className="filter-list" 
            role="group" 
            aria-labelledby="role-filter-heading"
            aria-describedby="filter-status"
          >
            {availableRoleIds && availableRoleIds.map((roleId, idx) => {
              const selected = selectedRoleIds.some((id) => id === roleId.id) || (hoveredFilters && hoveredFilters === roleId.id)
              let placement = idx <= (availableRoleIds.length + availableTechIds.length) / 2 ? "top" : "bottom";
              
              return (
                <li 
                  key={idx} 
                  className={`filter-item ${selected ? 'selected' : ''} ${placement}`}
                  onMouseEnter={() => handleMouseEnter(roleId.id)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <button 
                    onClick={() => selectRoleFilterClick(roleId.id)} 
                    onKeyDown={(e) => handleKeyDown(e, () => selectRoleFilterClick(roleId.id))}
                    aria-label={`${selected ? 'Remove' : 'Add'} ${roleId.title} role filter`}
                    aria-pressed={selected ? "true" : "false"}
                    className='filter-button'
                    type="button"
                  >
                    <Badge 
                      title={roleId.title} 
                      iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                      noTabIndex={true}
                    />
                  </button>
                </li>
              )
            })}
          </ol>
        </fieldset>

        {/* Technology Filters */}
        <fieldset>
          <legend className="title" id="tech-filter-heading">Technology</legend>
          <ol 
            className="filter-list"
            role="group" 
            aria-labelledby="tech-filter-heading"
            aria-describedby="filter-status"
          >
            {availableTechIds && availableTechIds.map((techId, idx) => {
              const selected = selectedTechIds.some((id) => id === techId.id) || (hoveredFilters && hoveredFilters === techId.id)
              let placement = idx + availableRoleIds.length <= (availableRoleIds.length + availableTechIds.length) / 2 ? "top" : "bottom";
              
              return (
                <li 
                  key={idx} 
                  className={`filter-item ${selected ? 'selected' : ''} ${placement}`}
                  onMouseEnter={() => handleMouseEnter(techId.id)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <button 
                    onClick={() => selectTechFilterClick(techId.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => selectTechFilterClick(techId.id))}
                    aria-label={`${selected ? 'Remove' : 'Add'} ${techId.title} technology filter`}
                    aria-pressed={selected ? "true" : "false"}
                    className='filter-button'
                    type="button"
                  >
                    <Badge 
                      title={techId.title} 
                      iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                      noTabIndex={true}
                    />
                  </button>
                </li>
              )
            })}
          </ol>
        </fieldset>

      </div>
    </div>
  )
}

export default ProjectFilter
