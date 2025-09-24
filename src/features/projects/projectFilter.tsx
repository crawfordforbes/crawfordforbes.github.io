import type { RoleType } from "@/data/projects/roles"
import Badge from "@/components/global/badge";

import './styles/projectFilter.css'

type projectFilterProps = {
  selectedRoleIds: string[],
  availableRoleIds: RoleType[],
  onClick: (id: string) => void;
  hoveredFilters?: string;
  highlightFilterHover: (id: string) => void;
}

function ProjectFilter({  
  selectedRoleIds,
  availableRoleIds,
  onClick,
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
            let placement = idx + 1 <= availableRoleIds.length / 2 ? "top" : "bottom";
            return (
              <li 
                key={idx} 
                className={`filter-item ${selected ? 'selected' : ''} ${placement}`}
                onMouseEnter={() => handleMouseEnter(roleId.id)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <span 
                  className='filter-title' 
                  onClick={() => onClick(roleId.id)}
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
      </div>
    </article>
  )
}

export default ProjectFilter
