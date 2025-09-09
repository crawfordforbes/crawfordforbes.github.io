import { useState } from "react";

import Hex from "@/features/hexes/hex";

import { categoryData } from "@/data/projects/categories";
import type { CategoryType } from "@/data/projects/categories";

import ProjectDetail from "./projectDetail";
import ProjectFilter from "./projectFilter";
import ProjectCard from "./projectCard";
import { projectData } from "@/data/projects/projects";
import './styles/projectIndex.css'

type projectIndexProps = {
  selectedCatIdsProps?: string[],
  selectedProjectIdProp?: string
}

function projectIndex({  
  selectedCatIdsProps,
  selectedProjectIdProp
}: projectIndexProps) {

  const [selectedCatIds, setSelectedCatIds] = useState(selectedCatIdsProps ? selectedCatIdsProps : [])
  const [selectedProjectId, setSelectedProjectId] = useState(selectedProjectIdProp ? selectedProjectIdProp : undefined)

  function handleFilterClick(filterId: string) {
    if(selectedCatIds.some((id) => id === filterId)) {
      setSelectedCatIds(selectedCatIds.filter(id => id !== filterId));
    } else {
      setSelectedCatIds([...selectedCatIds, filterId]);
    }
  }

  function handleCardClick(projectId: string) {
    setSelectedProjectId(projectId)
  }

  function handleReturnToIndexClick() {
    setSelectedProjectId(undefined)
  }

  let availableCatIds: CategoryType[] = Object.keys(categoryData)
    .filter(id => categoryData[id].filterable)
    .map(id => categoryData[id]);

  function renderfilteredProjects() {
    const projectDataKeys = Object.keys(projectData);
    if(selectedCatIds.length <= 0){
      return projectDataKeys.map((key, idx)=>{
        const project = projectData[key]
        return (<ProjectCard key={idx} project={project} onClick={handleCardClick}/>)
      })
      
    } else {
      return projectDataKeys.map((key, idx)=>{
        const project = projectData[key]
        if(project.catIds?.some(catId=>selectedCatIds.includes(catId))) {
          return (<ProjectCard key={idx} project={project} onClick={handleCardClick}/>)
        }
      })
    }
  }

  return (
    <div className="project-feature">
      {!selectedProjectId ? 
        <div className="project-index">
          <div className="filters">
            <div className="filterToggle">
              <Hex hexClass="gradient-orange-pink" hexTitle="toggle" hexWidth={64}/>
            </div>
            <ProjectFilter
              selectedCatIds={selectedCatIds}
              availableCatIds={availableCatIds}
              onClick={handleFilterClick}
            />
          </div>
          <ol className="results">{renderfilteredProjects()}</ol>
        </div>
        :
        <ProjectDetail id={selectedProjectId} onClick={handleReturnToIndexClick}/>
      }
    </div>
  )
}

export default projectIndex
