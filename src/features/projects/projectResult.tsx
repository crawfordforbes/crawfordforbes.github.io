
import { getImgUrl, imagePaths } from "@/utils/images";
import Badge from "@/components/global/badge";
import { memo } from "react";
import OptimizedImage from "@/components/global/OptimizedImage";
import { imageSizes } from "@/components/global/OptimizedImage";

import type { ProjectType } from "@/data/projects/projects";
import { imageData } from "@/data/global/images";

import './styles/ProjectResult.css'
import { techData } from "@/data/projects/techs";

import HexGridLayout from "@/features/hexes/hexGridLayout";
import { cardBorder } from "@/data/hexes/layouts";

import Hex from "@/features/hexes/HexSimple";
import { roleData } from "@/data/projects/roles";

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
  <Hex href={project.githubLink} hexClass="link-badge" hexWidth={136} content={
    <Badge 
      iconClass={['fab', 'github']} 
      title={"See the Code"} 
    />
  } /> : <></>;
  
  const externalLink = project.externalLink ? 
  <Hex href={project.externalLink} hexClass="link-badge" hexWidth={136} content={
    <Badge 
      iconClass={['fas', 'up-right-from-square']} 
      title={"Visit the Site"} 
    />
  } /> : <></>;

  const cardImagePath = "projects/" + imageData[project.primaryImgId].fileName;
  
  // Note: Responsive image sources temporarily disabled until optimized images are generated
  // const cardImageBasePath = cardImagePath.replace(/\.[^/.]+$/, ""); // Remove extension
  // const cardImageSources = createImageSources(cardImageBasePath, [300, 600, 800]);
  
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
            <OptimizedImage
              src={getImgUrl(cardImagePath)}
              alt={`${project.title} - card image`}
              sources={[]} // Temporarily disable responsive sources until optimized images are generated
              fallbackSrc={imagePaths.hero.full}
              sizes={imageSizes.card}
              className="image"
              objectFit="cover"
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
        <Badge 
          title="Learn More"
          extraClass="to-from-colors pill read-more" 
          badgeOnClick={() => selectProjectClick(project.id)}
          noTabIndex={true}
        />
        <footer className="footer-links">
          {ghBadge}
          {externalLink}
        </footer>
      </section>
    </article>
    </div>
  )
}

export default memo(ProjectResult)
