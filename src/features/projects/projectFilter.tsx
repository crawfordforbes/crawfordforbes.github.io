import type { CategoryType } from "@/data/projects/categories"

import './styles/projectFilter.css'

type projectFilterProps = {
  selectedCatIds: string[],
  availableCatIds: CategoryType[],
  onClick: (id: string) => void;
}

function ProjectFilter({  
  selectedCatIds,
  availableCatIds,
  onClick
}: projectFilterProps) {



  return (
    <ol className="project-filter">
      {availableCatIds && availableCatIds.map((catId, idx)=>{
        return (
          <li key={idx} className="filter">
            <span className={`filter-title ${selectedCatIds.some((id) => id === catId.id) ? 'selected' : ''}`} onClick={() => onClick(catId.id)}>{catId.title}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default ProjectFilter
