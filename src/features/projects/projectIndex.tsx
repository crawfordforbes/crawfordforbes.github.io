import { useState } from "react";

import Hex from "@/features/hexes/hex";

import { categoryData } from "@/data/projects/categories";
import type { CategoryType } from "@/data/projects/categories";

import ProjectDetail from "./projectDetail";
import ProjectFilter from "./projectFilter";
import ProjectResult from "./projectResult";
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
  const [highlightFilterOnHover, setHighlightFilterOnHover] = useState("")

  const [sortedProjectsArray, setSortedProjectsArray] = useState(Object.keys(projectData).map((key)=>{return projectData[key]}).sort((a, b) => {
    return a.title.localeCompare(b.title);
  }))

  function handleFilterClick(filterId: string) {
    if(selectedCatIds.some((id) => id === filterId)) {
      setSelectedCatIds(selectedCatIds.filter(id => id !== filterId));
    } else {
      setSelectedCatIds([...selectedCatIds, filterId]);
    }
  }

  function handleCardDetailClick(projectId: string) {
    setSelectedProjectId(projectId)
  }

  function handleReturnToIndexClick() {
    setSelectedProjectId(undefined)
  }

  let availableCatIds: CategoryType[] = Object.keys(categoryData)
    .filter(id => categoryData[id].filterable)
    .map(id => categoryData[id]);

  function handlePreviousClick(currentProjectId: string) {
    let currentIdx = sortedProjectsArray.findIndex(project => project.id === currentProjectId);
    let prevIdx = currentIdx <= 0 ? sortedProjectsArray.length - 1 : currentIdx - 1;
    setSelectedProjectId(sortedProjectsArray[prevIdx].id);
  }

  function handleNextClick(currentProjectId: string) {
    let currentIdx = sortedProjectsArray.findIndex(project => project.id === currentProjectId);
    let nextIdx = currentIdx >= sortedProjectsArray.length - 1 ? 0 : currentIdx + 1;
    setSelectedProjectId(sortedProjectsArray[nextIdx].id);
  }

  function handleMobileFilterToggleClick() {
    setShowMobileFilter(!showMobileFilter)
  }

  function highlightFilterHover(filterId: string) {
    setHighlightFilterOnHover(filterId);
  }

  function renderfilteredProjects() {
    if(selectedCatIds.length <= 0){
      return sortedProjectsArray.map((project, idx)=>{
        return (
          <ProjectResult 
            key={idx}
            project={project}
            selectProjectClick={handleCardDetailClick}
            selectedCatIds={selectedCatIds}
            selectFilterClick={handleFilterClick}
            highlightFilterHover={highlightFilterHover}
            hoveredFilters={highlightFilterOnHover}
          />
        )
      })
      
    } else {
      return sortedProjectsArray.map((project, idx)=>{
        if(project.catIds?.some(catId=>selectedCatIds.includes(catId))) {
          return (
            <li key={idx}>
              <ProjectResult 
                project={project}
                selectProjectClick={handleCardDetailClick}
                selectedCatIds={selectedCatIds}
                selectFilterClick={handleFilterClick}
                highlightFilterHover={highlightFilterHover}
                hoveredFilters={highlightFilterOnHover}
              />
            </li>
          )
        }
      })
    }
  }

  return (
    <section className="project-feature index-container">

      {!selectedProjectId ? 
        <section className="project-index">
          <div className={`filters ${showMobileFilter ? 'show-mobile-filter' : 'hide-mobile-filter'}`}>
            {<Hex 
              hexClass="filter-toggle hex-button" 
              hexWidth={64} 
              hexOnClick={handleMobileFilterToggleClick}
              badge1Id={showMobileFilter ? 'toggle-open' : 'toggle-close'}
            />}
            <ProjectFilter
              selectedCatIds={selectedCatIds}
              availableCatIds={availableCatIds}
              onClick={handleFilterClick}
              hoveredFilters={highlightFilterOnHover}
              highlightFilterHover={highlightFilterHover}
              />
          </div>
          <ol className="results">{renderfilteredProjects()}</ol>
        </section>
        :
        <section className="selected-project">
          <Hex 
            hexClass="back-button hex-button" 
            hexTitle="Back" 
            hexWidth={64} 
            hexOnClick={() => handleReturnToIndexClick()} 
          />
          <ProjectDetail
            id={selectedProjectId}
            onBackButtonClick={handleReturnToIndexClick}
            onPreviousClick={() => handlePreviousClick(selectedProjectId)}
            onNextClick={() => handleNextClick(selectedProjectId)}
          />
        </section>
      }
    </section>
  )
}

export default projectIndex
