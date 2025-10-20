import { memo } from "react";

import Badge from "@/components/global/badge";
import SimpleImage from "@/components/global/OptimizedImage";
import { imageSizes } from "@/components/global/OptimizedImage";
import HexGridLayout from "@/features/hexes/hexGridLayout";
import Hex from "@/features/hexes/Hex";

import { imageData } from "@/data/global/images";
import { techData } from "@/data/projects/techs";
import { cardBorder } from "@/data/hexes/layouts";
import { roleData } from "@/data/projects/roles";

import { getImageUrl, imagePaths, getProjectPrimaryImageUrl } from "@/utils/images";
import { createAccessibleDescription } from "@/utils/ui";

import type { ProjectType } from "@/data/projects/projects";

import './styles/projectResult.css'



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

  const renderTechBadges = () => {
    return project?.techIds?.filter(techId => {return techData[techId]?.filterable ? techId : null}).slice(0,3).map((techId: string, idx: number) => {
      const tech = techData[techId];
      if (!tech) return null;

      const selected = selectedTechIds?.some((id) => id === techId) || hoveredFilters === techId;

      return (
        <li 
          key={idx} 
          onMouseEnter={() => highlightFilterHover(techId)}
          onMouseLeave={() => highlightFilterHover("")}
        >
          <Badge 
            iconClass={tech.iconClass}
            title={tech.title}
            extraClass={`pill secondary ${selected ? 'selected highlight' : ''}`}
            badgeOnClick={() => selectTechFilterClick(techId)}
          />
        </li>
      );
    });
  };

  const renderRoleBadges = () => {
    return project?.roleIds?.map((roleId: string, idx: number) => {
      const role = roleData[roleId];
      if (!role) return null;

      const selected = selectedRoleIds?.some((id) => id === roleId) || hoveredFilters === roleId;

      return (
        <li 
          key={idx} 
          onMouseEnter={() => highlightFilterHover(roleId)}
          onMouseLeave={() => highlightFilterHover("")}
        >
          <Badge 
            iconClass={role.iconClass}
            title={role.title}
            extraClass={`pill primary ${selected ? 'selected highlight' : ''}`}
            badgeOnClick={() => selectRoleFilterClick(roleId)}
          />
        </li>
      );
    });
  };

  const hasRoleIds = !!(project?.roleIds && project?.roleIds.length > 0);
  const hasTechIds = !!(project?.techIds && project?.techIds.length > 0);
  const hasLinks = !!(project?.githubLink || project?.externalLink);

  return (
    <div className="project-result-container">
      <article 
        className="card project-feature project-result"
        role="article"
        aria-labelledby={`project-title-${project.id}`}
        aria-describedby={project.short_description ? `project-desc-${project.id}` : undefined}
      >
        <header className="card-top">
          <div className="header-image">
            <button 
              className="inner" 
              onClick={() => selectProjectClick(project.id)}
              aria-label={`View details for ${project.title} project${project.short_description ? ': ' + createAccessibleDescription(project.short_description, 80) : ''}`}
              type="button"
            >
              <SimpleImage
                src={getProjectPrimaryImageUrl(project)} 
                alt={`${project.title} project preview`}
                fallbackSrc={imagePaths.hero.full}
                className="image"
                objectFit="cover"
              />
            </button>
          </div>
          
          <div className="header-content">
            <div className="techs-and-border">
              {hasTechIds && (
                <div role="list" aria-label="Technologies used" className="techs badges-list">
                  {renderTechBadges()}
                </div> 
              )}
              <HexGridLayout layouts={cardBorder} extraClass="decorative-hex-border"/>
            </div>
            
            <h2 
              id={`project-title-${project.id}`}
              className="title primary"
            >
              {project.title}
            </h2>
          </div>
        </header>

        <section className={`info-panel ${hasLinks ? "has-footer-links" : ""}`}>
          {hasRoleIds && (
            <div role="list" aria-label="Project roles" className="roles badges-list">
              {renderRoleBadges()}
            </div> 
          )}
          
          {project.short_description && (
            <p 
              id={`project-desc-${project.id}`}
              className="description"
            >
              {project.short_description}
            </p>
          )}
          
          <Badge 
            title="Learn More"
            extraClass="to-from-colors pill read-more" 
            badgeOnClick={() => selectProjectClick(project.id)}
          />
        </section>

        {hasLinks && (
          <footer className="footer-links" aria-label="External project links">
            {project.githubLink && (
              <a href={project.githubLink} className="link-badge" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github" aria-hidden="true"></i>
                See the Code
              </a>
            )}
            {project.externalLink && (
              <a href={project.externalLink} className="link-badge" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                Visit the Site
              </a>
            )}
          </footer>
        )}
      </article>
    </div>
  );
}

export default memo(ProjectResult);
