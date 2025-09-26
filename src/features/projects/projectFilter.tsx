import type { RoleType } from "@/data/projects/roles"
import Badge from "@/components/global/badge";

import './styles/projectFilter.css'
import { NavLink } from "react-router";

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

  const selectedFiltersArr = [...selectedRoleIds, ...selectedTechIds];


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
                <NavLink to={`/filters/${selectedFiltersArr.some(id => id === roleId.id) ? selectedFiltersArr.filter(id => id !== roleId.id).join(',') : [...selectedFiltersArr, roleId.id].join(',')}`}>
                  <span 
                    className='filter-title' 
                    onClick={() => selectRoleFilterClick(roleId.id)}
                    >
                    <Badge 
                      title={roleId.title} 
                      iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                    />
                  </span>
                </NavLink>
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
                <NavLink to={`/filters/${selectedFiltersArr.some(id => id === techId.id) ? selectedFiltersArr.filter(id => id !== techId.id).join(',') : [...selectedFiltersArr, techId.id].join(',')}`}>
                  <span 
                    className='filter-title' 
                    onClick={() => selectTechFilterClick(techId.id)}
                    >
                    <Badge 
                      title={techId.title} 
                      iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                    />
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ol>
      </div>
    </article>
  )
}

export default ProjectFilter
