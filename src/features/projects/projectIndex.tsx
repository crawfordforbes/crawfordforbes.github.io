import { useState } from "react";

import Hex from "@/features/hexes/hex";

import { roleData } from "@/data/projects/roles";
import type { RoleType } from "@/data/projects/roles";

import ProjectDetail from "./projectDetail";
import ProjectFilter from "./projectFilter";
import ProjectResult from "./projectResult";
import { projectData } from "@/data/projects/projects";
import './styles/projectIndex.css'
import { techData } from "@/data/projects/techs";


type projectIndexProps = {
  selectedRoleIdsProps?: string[],
  selectedTechIdsProps?: string[],
  selectedProjectIdProp?: string
}

function projectIndex({  
  selectedRoleIdsProps,
  selectedTechIdsProps,
  selectedProjectIdProp
}: projectIndexProps) {

  const [selectedRoleIds, setSelectedRoleIds] = useState(selectedRoleIdsProps ? selectedRoleIdsProps : [])
  const [selectedTechIds, setSelectedTechIds] = useState(selectedTechIdsProps ? selectedTechIdsProps : [])
  const [selectedProjectId, setSelectedProjectId] = useState(selectedProjectIdProp ? selectedProjectIdProp : undefined)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [highlightFilterOnHover, setHighlightFilterOnHover] = useState("")

  const [sortedProjectsArray, setSortedProjectsArray] = useState(Object.keys(projectData).map((key)=>{return projectData[key]}).sort((a, b) => {
    return a.title.localeCompare(b.title);
  }))

  function handleRoleFilterClick(filterId: string) {
    if(selectedRoleIds.some((id) => id === filterId)) {
      setSelectedRoleIds(selectedRoleIds.filter(id => id !== filterId));
    } else {
      setSelectedRoleIds([...selectedRoleIds, filterId]);
    }
  }

  function handleTechFilterClick(filterId: string) {
    if(selectedTechIds.some((id) => id === filterId)) {
      setSelectedTechIds(selectedTechIds.filter(id => id !== filterId));
    } else {
      setSelectedTechIds([...selectedTechIds, filterId]);
    }
  }

  function handleCardDetailClick(projectId: string) {
    setSelectedProjectId(projectId)
  }

  function handleReturnToIndexClick() {
    setSelectedProjectId(undefined)
  }

  let availableRoleIds: RoleType[] = Object.keys(roleData)
    .filter(id => roleData[id].filterable)
    .map(id => roleData[id]);

  let availableTechIds: RoleType[] = Object.keys(techData)
    .filter(id => techData[id].filterable)
    .map(id => techData[id]);

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
    if(selectedRoleIds.length <= 0 && selectedTechIds.length <= 0) {
      return sortedProjectsArray.map((project, idx)=>{
        return (
          <li key={idx}>
            <ProjectResult 
              key={idx}
              project={project}
              selectProjectClick={handleCardDetailClick}
              selectedRoleIds={selectedRoleIds}
              selectRoleFilterClick={handleRoleFilterClick}
              selectedTechIds={selectedTechIds}
              selectTechFilterClick={handleTechFilterClick}
              highlightFilterHover={highlightFilterHover}
              hoveredFilters={highlightFilterOnHover}
            />
          </li>
        )
      })
      
    } else {
      return sortedProjectsArray.map((project, idx)=>{
        if(project.roleIds?.some(roleId=>selectedRoleIds.includes(roleId)) || project.techIds?.some(techId=>selectedTechIds.includes(techId))) {
          return (
            <li key={idx}>
              <ProjectResult 
                project={project}
                selectProjectClick={handleCardDetailClick}
                selectedRoleIds={selectedRoleIds}
                selectRoleFilterClick={handleRoleFilterClick}
                selectedTechIds={selectedTechIds}
                selectTechFilterClick={handleTechFilterClick}
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
    <article className="project-feature index-container">

      {!selectedProjectId ? 
        <article className="project-index">
          <div className={`filters ${showMobileFilter ? 'show-mobile-filter' : 'hide-mobile-filter'}`}>
            {<Hex 
              hexClass="filter-toggle hex-button mobile" 
              hexWidth={64} 
              hexOnClick={handleMobileFilterToggleClick}
              badge1Id={showMobileFilter ? 'toggle-open' : 'toggle-close'}
            />}
            <ProjectFilter
              selectedRoleIds={selectedRoleIds}
              availableRoleIds={availableRoleIds}
              selectRoleFilterClick={handleRoleFilterClick}
              selectedTechIds={selectedTechIds}
              availableTechIds={availableTechIds}
              selectTechFilterClick={handleTechFilterClick}
              hoveredFilters={highlightFilterOnHover}
              highlightFilterHover={highlightFilterHover}
              />
          </div>
          <div className="helper-results">
            <div className="intro-text"><p>Filter by role to see projects I led, contributed to, or built solo. Click a card for the case study.</p></div>
            <ol className="results">{renderfilteredProjects()}</ol>
          </div>
        </article>
        :
        <article className="selected-project">
          <Hex 
            hexClass="back-button hex-button mobile" 
            hexTitle="Back" 
            hexWidth={64} 
            hexOnClick={() => handleReturnToIndexClick()} 
          />
          <Hex 
            hexClass="back-button hex-button desktop" 
            hexTitle="Back" 
            hexWidth={96} 
            hexOnClick={() => handleReturnToIndexClick()} 
          />
          <ProjectDetail
            id={selectedProjectId}
            onBackButtonClick={handleReturnToIndexClick}
            onPreviousClick={() => handlePreviousClick(selectedProjectId)}
            onNextClick={() => handleNextClick(selectedProjectId)}
          />
        </article>
      }
    </article>
  )
}

export default projectIndex
