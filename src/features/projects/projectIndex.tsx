import { useEffect, useState } from "react";

import Hex from "@/features/hexes/HexSimple";

import { roleData } from "@/data/projects/roles";
import type { RoleType } from "@/data/projects/roles";

import ProjectDetail from "./projectDetail";
import ProjectFilter from "./projectFilter";
import ProjectResult from "./projectResult";
import { projectData } from "@/data/projects/projects";
import './styles/projectIndex.css'
import { techData } from "@/data/projects/techs";
import { Link, useParams } from "react-router";
import { scrollToTarget } from '@/utils/site';


type projectIndexProps = {
  selectedRoleIdsProps?: string[],
  selectedTechIdsProps?: string[],
  selectedProjectIdProp?: string,
}

function projectIndex({  
  selectedRoleIdsProps,
  selectedTechIdsProps,
  selectedProjectIdProp,
}: projectIndexProps) {
  let availableRoleIds: RoleType[] = Object.keys(roleData)
    .filter(id => roleData[id].filterable)
    .map(id => roleData[id]);

  let availableTechIds: RoleType[] = Object.keys(techData)
    .filter(id => techData[id].filterable)
    .map(id => techData[id]);
  const params = useParams();
  const paramFilterIds = params.filterId ? params.filterId.split(',') : [];

  const filteredRoleIds = paramFilterIds.filter(id => availableRoleIds.some(role => role.id === id));
  const filteredTechIds = paramFilterIds.filter(id => availableTechIds.some(tech => tech.id === id));

  const preSelectedRoleIds = filteredRoleIds && filteredRoleIds.length > 0 ? filteredRoleIds : selectedRoleIdsProps;

  const preSelectedTechIds = filteredTechIds && filteredTechIds.length > 0 ? filteredTechIds : selectedTechIdsProps;

  const paramProjectId = params.projectId ? params.projectId : undefined;

  const preSelectedProjectId = paramProjectId ? paramProjectId : selectedProjectIdProp;

  const [selectedRoleIds, setSelectedRoleIds] = useState(preSelectedRoleIds ? preSelectedRoleIds : [])
  const [selectedTechIds, setSelectedTechIds] = useState(preSelectedTechIds ? preSelectedTechIds : [])
  const [selectedProjectId, setSelectedProjectId] = useState(preSelectedProjectId ? preSelectedProjectId : undefined)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [highlightFilterOnHover, setHighlightFilterOnHover] = useState("")

  const [sortedProjectsArray, setSortedProjectsArray] = useState(Object.keys(projectData).map((key)=>{return projectData[key]}).sort((a, b) => {
    return a.title.localeCompare(b.title);
  }))

  // Scroll to projects section on initial load if URL contains a projectId. todo: add options for different sections
  useEffect(() => {
    const goToProjects = params.projectId || params.filterId;
    if (goToProjects) {
      scrollToTarget("projects");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <article className="project-feature index-container" id="projects">

      {!selectedProjectId ? 
        <article className="project-index" aria-live="polite" aria-atomic="true">
          <div className={`filters ${showMobileFilter ? 'show-mobile-filter' : 'hide-mobile-filter'}`}>
            {<Hex 
              hexClass="filter-toggle hex-button mobile icon-bg" 
              hexWidth={64} 
              onClick={handleMobileFilterToggleClick}
              content={showMobileFilter ? 'toggle-open' : 'toggle-close'}
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
          {/* todo fix to="/" */}
          <Link to="/" role="button" className="back-link" aria-label="Back to Projects List">
            <Hex 
              hexClass="back-button hex-button mobile" 
              content="more-projects"
              hexWidth={64} 
              onClick={() => handleReturnToIndexClick()} 
              tabIndex={-1}
            />
            <Hex 
              hexClass="back-button hex-button desktop" 
              content="more-projects"
              hexWidth={96} 
              onClick={() => handleReturnToIndexClick()} 
              tabIndex={-1}
            />
          </Link>
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
