import type { CategoryType } from "@/data/projects/categories"
import Badge from "@/components/global/badge";

import './styles/projectFilter.css'

type projectFilterProps = {
  selectedCatIds: string[],
  availableCatIds: CategoryType[],
  onClick: (id: string) => void;
  hoveredFilters?: string;
  highlightFilterHover: (id: string) => void;
}

function ProjectFilter({  
  selectedCatIds,
  availableCatIds,
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
    <section className="project-feature filter-container">
      <div className="variable-height-hex filter-wrapper">
        <ol className="filter-list">
          {availableCatIds && availableCatIds.map((catId, idx)=>{
            const selected = selectedCatIds.some((id) => id === catId.id) || (hoveredFilters && hoveredFilters === catId.id)
            let placement = idx + 1 <= availableCatIds.length / 2 ? "top" : "bottom";
            return (
              <li 
                key={idx} 
                className={`filter-item ${selected ? 'selected' : ''} ${placement}`}
                onMouseEnter={() => handleMouseEnter(catId.id)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <span 
                  className='filter-title' 
                  onClick={() => onClick(catId.id)}
                  >
                  <Badge 
                    title={catId.title} 
                    iconClass={selected ? ['fas', 'circle-xmark'] : ['fas', 'circle']}
                  />
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default ProjectFilter
