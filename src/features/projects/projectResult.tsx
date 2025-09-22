
import { getImgUrl } from "@/utils/images";
import Badge from "@/components/global/badge";

import type { ProjectType } from "@/data/projects/projects";
import { imageData } from "@/data/images";

import './styles/ProjectResult.css'
import { techBadgeData, catBadgeData } from "@/data/global/badges";

import HexGridLayout from "@/features/hexes/hexGridLayout";
import { cardBorder } from "@/data/hexes/layouts";

import Hex from "@/features/hexes/hex";

type ProjectResultProps = {
  project: ProjectType,
  selectProjectClick: (id: string) => void;
  selectedCatIds?: string[];
  selectFilterClick: (id: string) => void;
  highlightFilterHover: (id: string) => void;
  hoveredFilters?: string;
}

function ProjectResult({  
  project,
  selectProjectClick,
  selectedCatIds,
  selectFilterClick,
  highlightFilterHover,
  hoveredFilters,
}: ProjectResultProps) {

  const handleMouseEnter = (filterId: string) => {
    highlightFilterHover(filterId);
  };

  const handleMouseLeave = () => {
    highlightFilterHover("");
  };


  function renderCatBadges() {
    if (project?.catIds && project?.catIds.length > 0) {
      return project?.catIds.map((id,idx)=>{
        const selectedId = (selectedCatIds && selectedCatIds.length > 0 && selectedCatIds.some((catId) => catId === id) ) || (hoveredFilters && hoveredFilters === id)
        return (
          <li
            key={idx}
            onMouseEnter={() => handleMouseEnter(catBadgeData[id]?.id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Badge 
              title={catBadgeData[id]?.title} 
              iconClass={catBadgeData[id]?.iconClass} 
              extraClass={selectedId ? "pill primary highlight" : "pill primary"} 
              badgeOnClick={() => selectFilterClick(catBadgeData[id]?.id)}
            />
          </li>
        )
      })
    }
  }

  function renderTechBadges() {
    if (project?.techIds && project?.techIds.length > 0) {
      return project?.techIds.map((id,idx)=>{
        if(techBadgeData[id]){
          return(
            <li key={idx}>
              <Badge 
                title={techBadgeData[id]?.title} 
                iconClass={techBadgeData[id]?.iconClass} 
                extraClass={"pill tertiary"} 
              />
            </li>
          )
        }
      })
    }
  }

  const ghBadge = project.githubLink ? 
  <Hex hexClass="link-badge" hexWidth={136} hexLink={project.githubLink} badgeComponent1={
    <Badge 
      iconClass={['fab', 'github']} 
      title={"See the Code"} 
    />
  } /> : <></>;
  
  const externalLink = project.externalLink ? 
  <Hex hexClass="link-badge" hexWidth={136} hexLink={project.externalLink} badgeComponent1={
    <Badge 
      iconClass={['fas', 'up-right-from-square']} 
      title={"Visit the Site"} 
    />
  } /> : <></>;

  const cardImage = imageData[project.cardImgId]
  
  const hasTechIds: boolean = !!(project?.techIds && project?.techIds.length > 0);
  const hasCatIds: boolean = !!(project?.catIds && project?.catIds.length > 0);
  const hasLinks = !!(project.githubLink || project.externalLink);

  return (
    <div className="project-result-container">
    <article className="card project-feature project-result">
      <header className="card-top">
        <section className="header-image">
          <button 
            className="inner" 
            onClick={() => selectProjectClick(project.id)}
          >
            <img 
              className="image" 
              src={getImgUrl(cardImage.mobilePath)} 
              // src="https://picsum.photos/480/360"
              alt={`${project.title} - card image`} 
            />
          </button>
        </section>
        <section className="header-content">
          <h2 className="title primary overlay">{project.title}</h2>
          {hasTechIds &&
            <ol className="techs badges-list">{renderTechBadges()}</ol> 
          }
          <HexGridLayout layouts={cardBorder} extraClass="decorative-hex-border"/>
        </section>
      </header>
      <section className={ `info-panel ${hasLinks ? "has-footer-links" : ""}` }>

        {hasCatIds &&
          <ol className="cats badges-list">{renderCatBadges()}</ol> 
        }
        {project.short_description &&
          <p className="description">{project.short_description}</p>
        }
        <Badge 
          title="Learn More"
          extraClass="to-from-colors pill read-more" 
          badgeOnClick={() => selectProjectClick(project.id)}
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

export default ProjectResult
