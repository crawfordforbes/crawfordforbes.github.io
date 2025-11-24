import { memo, useMemo } from "react";

import Badge from "@/components/global/Badge";
import SimpleImage from "@/components/global/OptimizedImage";
import HexGridLayout from "@/features/hexes/HexGridLayout";
import Hex from "@/features/hexes/Hex";

import { techData } from "@/data/projects/techs";
import { cardBorder } from "@/data/hexes/layouts";
import { roleData } from "@/data/projects/roles";

import { imagePaths, getProjectPrimaryImageUrl } from "@/utils/images";
import { createAccessibleDescription } from "@/utils/site";

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

  // Memoize badge lists to avoid recreating arrays on every render
  const techBadges = useMemo(() => {
    return project?.techIds?.filter(techId => techData[techId]?.filterable).slice(0,3).map((techId: string) => {
      const tech = techData[techId];
      if (!tech) return null;

      const selected = selectedTechIds?.some((id) => id === techId) || hoveredFilters === techId;

      return (
        <li 
          key={techId} 
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
  }, [project?.techIds, selectedTechIds, hoveredFilters, selectTechFilterClick, highlightFilterHover]);

  const roleBadges = useMemo(() => {
    return project?.roleIds?.map((roleId: string) => {
      const role = roleData[roleId];
      if (!role) return null;

      const selected = selectedRoleIds?.some((id) => id === roleId) || hoveredFilters === roleId;

      return (
        <li 
          key={roleId} 
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
  }, [project?.roleIds, selectedRoleIds, hoveredFilters, selectRoleFilterClick, highlightFilterHover]);

  const hasRoleIds = !!(project?.roleIds && project?.roleIds.length > 0);
  const hasTechIds = !!(project?.techIds && project?.techIds.length > 0);
  const hasLinks = !!(project?.githubLink || project?.externalLink);
  const footerLinkHexWidth = 132

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
              onClick={() => {
                
                selectProjectClick(project.id);
              }}
              aria-label={`View details for ${project.title} project${project.short_description ? ': ' + createAccessibleDescription(project.short_description, 80) : ''}`}
              type="button"
            >
              <SimpleImage
                src={getProjectPrimaryImageUrl(project)} 
                alt={`${project.title} project preview`}
                fallbackSrc={imagePaths.hero.mobile}
                className="image"
                objectFit="cover"
              />
            </button>
          </div>
          
          <div className="header-content">
            <div className="techs-and-border">
              {hasTechIds && (
                <ol role="list" aria-label="Technologies used" className="techs badges-list">
                  {techBadges}
                </ol> 
              )}
              <HexGridLayout layouts={cardBorder} extraClass="decorative-hex-border"/>
            </div>
            <div className="featured-wrapper">
              {project.featured && 
                  <Badge 
                    iconClass={['fas', 'star']}
                    title="Featured"
                    extraClass="pill quaternary featured-flag"
                  />
                }
              <h2 
                id={`project-title-${project.id}`}
                className="title primary"
                onClick={() => {
                  
                  selectProjectClick(project.id);
                }}
              >
                
                {project.title}
              </h2>
            </div>
          </div>
        </header>

        <div className={`info-panel ${hasLinks ? "has-footer-links" : ""}`}>

          {hasRoleIds && (
            <ol role="list" aria-label="Project roles" className="roles badges-list">
              {roleBadges}
            </ol> 
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
            badgeOnClick={() => {
              
              selectProjectClick(project.id)}
            }
          />

        </div>

        {hasLinks && (
          <footer className="footer-links" aria-label="External project links">
            {project.githubLink && (
              <Hex 
                hexClass="link-badge"
                hexWidth={footerLinkHexWidth}
                href={project.githubLink}
                content={
                  <Badge 
                    iconClass={['fab', 'github']} 
                    title="See the Code"
                  />
                }
              />
            )}
            
            {project.externalLink && (
              <Hex 
                hexClass="link-badge"
                hexWidth={footerLinkHexWidth}
                href={project.externalLink}
                content={
                  <Badge 
                    iconClass={['fas', 'up-right-from-square']} 
                    title="Visit the Site"
                  />
                }
              />
            )}
          </footer>
        )}
        
      </article>
    </div>
  );
}

function areEqual(prev: ProjectResultProps, next: ProjectResultProps) {
  // Always re-render if the project identity changed
  if (prev.project.id !== next.project.id) return false;

  // Re-render if hover target changed
  if ((prev.hoveredFilters ?? '') !== (next.hoveredFilters ?? '')) return false;

  // Re-render if selected filter sets changed length (cheap check)
  if ((prev.selectedRoleIds?.length ?? 0) !== (next.selectedRoleIds?.length ?? 0)) return false;
  if ((prev.selectedTechIds?.length ?? 0) !== (next.selectedTechIds?.length ?? 0)) return false;

  // If callbacks changed (rare), re-render
  if (prev.selectProjectClick !== next.selectProjectClick) return false;
  if (prev.selectRoleFilterClick !== next.selectRoleFilterClick) return false;
  if (prev.selectTechFilterClick !== next.selectTechFilterClick) return false;
  if (prev.highlightFilterHover !== next.highlightFilterHover) return false;

  // Otherwise assume stable and skip render
  return true;
}

export default memo(ProjectResult, areEqual);
