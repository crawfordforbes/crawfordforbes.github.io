
import { getImgUrl } from "@/utils/images";
import Badge from "@/components/global/badge";

import type { ProjectType } from "@/data/projects/projects";
import { imageData } from "@/data/global/images";
import { imagePath } from "@/data/global/images";

import './styles/ProjectResult.css'
import { techData } from "@/data/projects/techs";

import HexGridLayout from "@/features/hexes/hexGridLayout";
import { cardBorder } from "@/data/hexes/layouts";

import Hex from "@/features/hexes/hex";
import { roleData } from "@/data/projects/roles";
import { Link } from "react-router";

type ProjectResultProps = {
  project: ProjectType,
  selectProjectClick: (id: string) => void;
  selectedRoleIds?: string[];
  selectRoleFilterClick: (id: string) => void;
  selectedTechIds?: string[];
  selectTechFilterClick: (id: string) => void;
  highlightFilterHover: (id: string) => void;
  hoveredFilters?: string;
}

function ProjectResult({  
  project,
  selectProjectClick,
  selectedRoleIds,
  selectRoleFilterClick,
  selectedTechIds,
  selectTechFilterClick,
  highlightFilterHover,
  hoveredFilters,
}: ProjectResultProps) {

  const handleMouseEnter = (filterId: string) => {
    highlightFilterHover(filterId);
  };

  const handleMouseLeave = () => {
    highlightFilterHover("");
  };


  function renderRoleBadges() {
    if (project?.roleIds && project?.roleIds.length > 0) {
      return project?.roleIds.map((id,idx)=>{
        const selectedId = (selectedRoleIds && selectedRoleIds.length > 0 && selectedRoleIds.some((roleId) => roleId === id) ) || (hoveredFilters && hoveredFilters === id)
        return (
          <li
            key={idx}
            onMouseEnter={() => handleMouseEnter(roleData[id]?.id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Badge 
              title={roleData[id]?.title} 
              iconClass={roleData[id]?.iconClass} 
              extraClass={selectedId ? "pill primary highlight" : "pill primary"} 
              badgeOnClick={() => selectRoleFilterClick(roleData[id]?.id)}
              noTabIndex={true}
            />
          </li>
        )
      })
    }
  }

  function renderTechBadges() {
    if (project?.techIds && project?.techIds.length > 0) {
      return project?.techIds.map((id,idx)=>{
        const selectedId = (selectedTechIds && selectedTechIds.length > 0 && selectedTechIds.some((techId) => techId === id) ) || (hoveredFilters && hoveredFilters === id)
        if(techData[id]){
           return (
          <li
            key={idx}
            onMouseEnter={() => handleMouseEnter(techData[id]?.id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Badge 
              title={techData[id]?.title} 
              iconClass={techData[id]?.iconClass} 
              extraClass={selectedId ? "pill primary highlight" : "pill primary"} 
              badgeOnClick={() => selectTechFilterClick(techData[id]?.id)}
              noTabIndex={true}
            />
          </li>
        )
        }
      })
    }
  }

  const ghBadge = project.githubLink ? 
  <Hex hexClass="link-badge" hexWidth={136} badgeComponent1={
    <Badge 
      iconClass={['fab', 'github']} 
      title={"See the Code"} 
      link={project.githubLink}
    />
  } /> : <></>;
  
  const externalLink = project.externalLink ? 
  <Hex hexClass="link-badge" hexWidth={136} badgeComponent1={
    <Badge 
      iconClass={['fas', 'up-right-from-square']} 
      title={"Visit the Site"} 
      link={project.externalLink}
    />
  } /> : <></>;

  const cardImagePath = imagePath + "projects/" + imageData[project.primaryImgId].fileName;
  
  const hasTechIds: boolean = !!(project?.techIds && project?.techIds.length > 0);
  const hasRoleIds: boolean = !!(project?.roleIds && project?.roleIds.length > 0);
  const hasLinks = !!(project.githubLink || project.externalLink);

  return (
    <div className="project-result-container">
    <article className="card project-feature project-result">
      <header className="card-top">
        <div className="header-image">
          <button 
            className="inner" 
            onClick={() => selectProjectClick(project.id)}
            tabIndex={-1}
          >
            <img 
              className="image" 
              src={getImgUrl(cardImagePath)} 
              alt={`${project.title} - card image`} 
            />
          </button>
        </div>
        <section className="header-content">
          <h2 className="title primary overlay">{project.title}</h2>
          {hasTechIds &&
            <ol className="techs badges-list">{renderTechBadges()}</ol> 
          }
          <HexGridLayout layouts={cardBorder} extraClass="decorative-hex-border"/>
        </section>
      </header>
      <section className={ `info-panel ${hasLinks ? "has-footer-links" : ""}` }>

        {hasRoleIds &&
          <ol className="roles badges-list">{renderRoleBadges()}</ol> 
        }
        {project.short_description &&
          <p className="description">{project.short_description}</p>
        }
        <Link 
          to={`/project/${project.id}`} 
          role="button" 
          className="read-more-link" 
          aria-label={`Read more about ${project.title}`}
        >
          <Badge 
            title="Learn More"
            extraClass="to-from-colors pill read-more" 
            badgeOnClick={() => selectProjectClick(project.id)}
            noTabIndex={true}
          />
        </Link>
        <footer className="footer-links">
          {ghBadge}
          {externalLink}
        </footer>
      </section>
    </article>
    </div>
  )
}

export default ProjectResult
