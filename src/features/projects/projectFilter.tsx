import type { RoleType } from "@/data/projects/roles"
import Badge from "@/components/global/badge";

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


  return (
    <article className="project-feature filter-container">
      <div className="variable-height-hex filter-wrapper">
        <h2 className="title">Role</h2>
        <ol className="filter-list">
          {availableRoleIds && availableRoleIds.map((roleId, idx)=>{
            const selected = selectedRoleIds.some((id) => id === roleId.id) || (hoveredFilters && hoveredFilters === roleId.id)
            let placement = idx <= (availableRoleIds.length + availableTechIds.length) / 2 ? "top" : "bottom";
            return (
              <li 
                key={idx} 
                className={`filter-item ${selected ? 'selected' : ''} ${placement}`}
                onMouseEnter={() => handleMouseEnter(roleId.id)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <span 
                  className='filter-title' 
                  onClick={() => selectRoleFilterClick(roleId.id)}
                  >
                  <Badge 
                    title={roleId.title} 
                    iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                  />
                </span>
              </li>
            )
          })}
        </ol>
        <h2 className="title">Technology</h2>
        <ol className="filter-list">
          {availableTechIds && availableTechIds.map((techId, idx)=>{
            const selected = selectedTechIds.some((id) => id === techId.id) || (hoveredFilters && hoveredFilters === techId.id)
            let placement = idx + availableRoleIds.length <= (availableRoleIds.length + availableTechIds.length) / 2 ? "top" : "bottom";
            return (
              <li 
                key={idx} 
                className={`filter-item ${selected ? 'selected' : ''} ${placement}`}
                onMouseEnter={() => handleMouseEnter(techId.id)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <span 
                  className='filter-title' 
                  onClick={() => selectTechFilterClick(techId.id)}
                  >
                  <Badge 
                    title={techId.title} 
                    iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                  />
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </article>
  )
}

export default ProjectFilter
