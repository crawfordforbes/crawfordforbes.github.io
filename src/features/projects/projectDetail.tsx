import { useContext } from "react";
import { MediaQueryContext } from "@/utils/context";
import { getImgUrl } from "@/utils/images";

import Hex from "../hexes/hex"
import HexGridLayout from "@/features/hexes/hexGridLayout";

import { projectData } from "@/data/projects/projects"
import { cardBorder } from "@/data/hexes/layouts";
import { imageData } from "@/data/images";

import Badge from "@/components/global/badge"
import { badgeData, techBadgeData } from "@/data/global/badges";

import './styles/projectDetail.css'

type ProjectDetailProps = {
  id: string,
  onBackButtonClick?: ()=>void,
  onPreviousClick?: ()=>void,
  onNextClick?: ()=>void,
}


function ProjectDetail({
  id, 
  onBackButtonClick,
  onPreviousClick,
  onNextClick
}:ProjectDetailProps) {
  const mediaQuery = useContext(MediaQueryContext);
  
  const project = projectData[id];
  
  const cardImage = imageData[project.cardImgId]
  const primaryImage = imageData[project.primaryImgId]
  const secondaryImage = imageData[project.secondaryImgId]

  const hasLinks = project.githubLink || project.externalLink;

    const ghBadge = project.githubLink ? 
      <li><Badge 
        iconClass={['fab', 'github']} 
        title={"See the Code"} 
        link={project.githubLink} 
        extraClass="pill primary"
      /></li> : <></>

    const externalLinkBadge = project.externalLink ? 
      <li><Badge 
        iconClass={['fas', 'external-link-alt']} 
        title={"View Live"} 
        link={project.externalLink} 
        extraClass="pill primary"
      /></li> : <></>

    function renderTechBadges() {
      if (project?.techIds && project?.techIds.length > 0) {
        return project?.techIds.map((id,idx)=>{
          if(techBadgeData[id]){
            return(
              <li key={idx}>
                <Badge 
                  title={techBadgeData[id]?.title} 
                  iconClass={techBadgeData[id]?.iconClass} 
                  extraClass={"pill secondary"} 
                />
              </li>
            )
          }
        })
      }
    }

  return(
    <div className="project-detail-container">
    <article className="card project-feature project-detail">
      <header className="card-top">
        <section className="header-image">
          <div className="inner">
            <img 
              className="image mobile" 
              src={getImgUrl(cardImage.mobilePath)} 
              // src="https://picsum.photos/480/360"
              alt={`${project.title} - Main Project Image`} 
            />
            <Hex hexClass="image" hexWidth={640} hexImagePath={cardImage?.desktopPath} />
          </div>
        </section>
        <section className="header-content">   
          <h2 className="title overlay">{project.title}</h2>
          {hasLinks && 
            <ol className="badges-list links">
              {ghBadge}
              {externalLinkBadge}
            </ol>
          }
        </section>
        <HexGridLayout layouts={cardBorder} extraClass="card-border"/>
      </header>
      <section className="info-panel">
        <ol className="tech-list">
          <span className="tech-title">Technologies used:</span>
          {renderTechBadges()}
        </ol>
        <div className="text-area text-area-gradient">
          {project.descriptionHTML && <div className="description" dangerouslySetInnerHTML={{ __html: project.descriptionHTML}} ></div>}
        </div>
      </section>
      <footer>
        <div className="hex-grid">
          <div className="hex-row">
              <Hex hexClass="image-hex" hexWidth={640} hexImagePath={primaryImage?.desktopPath} />
            </div>
          <div className="hex-row">
            <Hex />
            <Hex hexClass="image-hex" hexWidth={640} hexImagePath={secondaryImage?.desktopPath} />
          </div>
        </div>
      </footer>
    </article>
    </div>
  )
}

export default ProjectDetail
