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
  const [showMobileFilter, setShowMobileFilter] = useState(false)

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

  const projectDataKeys = Object.keys(projectData)
  let sortedProjectsArray = projectDataKeys.map((key, idx)=>{return projectData[key]}).sort((a, b) => {
    return a.title.localeCompare(b.title);
  }).filter(project=>{
    return project.catIds?.some(catId=>selectedCatIds.includes(catId))
  })

  function handlePreviousClick(currentProjectId: string) {
    let currentIdx = sortedProjectsArray.findIndex(project => project.id === currentProjectId);
    let prevIdx = currentIdx <= 0 ? sortedProjectsArray.length - 1 : currentIdx - 1;
    console.log(currentProjectId, currentIdx, prevIdx, sortedProjectsArray[prevIdx].id)
    setSelectedProjectId(sortedProjectsArray[prevIdx].id);
  }

  function handleNextClick(currentProjectId: string) {
    let currentIdx = sortedProjectsArray.findIndex(project => project.id === currentProjectId);
    let nextIdx = currentIdx >= sortedProjectsArray.length - 1 ? 0 : currentIdx + 1;
    console.log(currentProjectId, currentIdx, nextIdx, sortedProjectsArray[nextIdx].id)
    setSelectedProjectId(sortedProjectsArray[nextIdx].id);
  }

  function handleMobileFilterToggleClick() {
    setShowMobileFilter(!showMobileFilter)
  }

  function renderfilteredProjects() {

    if(selectedCatIds.length <= 0){
      return sortedProjectsArray.map((project, idx)=>{
        
        return (<ProjectCard key={idx} project={project} onClick={handleCardClick}/>)
      })
      
    } else {
      return sortedProjectsArray.map((project, idx)=>{
        if(project.catIds?.some(catId=>selectedCatIds.includes(catId))) {
          return (
            <ProjectCard 
              key={idx} 
              project={project} 
              onClick={handleCardClick}
            />
          )
        }
      })
    }
  }

  return (
    <div className="project-feature">
      {!selectedProjectId ? 
        <div className="project-index">
          <div className={`filters ${showMobileFilter ? 'show-mobile-filter' : 'hide-mobile-filter'}`}>
            <div className="filterToggle">
              <Hex 
                hexClass="gradient-orange-pink" 
                hexTitle="toggle" 
                hexWidth={64} 
                hexOnClick={handleMobileFilterToggleClick}
              />
            </div>
            <div className="mobile-filter-control">
              <ProjectFilter
                selectedCatIds={selectedCatIds}
                availableCatIds={availableCatIds}
                onClick={handleFilterClick}
                />
            </div>
          </div>
          <ol className="results">{renderfilteredProjects()}</ol>
        </div>
        :
        <ProjectDetail
          id={selectedProjectId}
          onClick={handleReturnToIndexClick}
          onPreviousClick={() => handlePreviousClick(selectedProjectId)}
          onNextClick={() => handleNextClick(selectedProjectId)}
        />
      }
    </div>
  )
}

export default projectIndex
