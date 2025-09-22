import { getImgUrl } from "@/utils/images";

import Hex from "../hexes/hex"
import HexGridLayout from "@/features/hexes/hexGridLayout";

import { projectData } from "@/data/projects/projects"
import { cardBorder } from "@/data/hexes/layouts";
import { imageData } from "@/data/images";
import { imagePath } from "@/data/images";

import Badge from "@/components/global/badge"
import { techBadgeData } from "@/data/global/badges";

import './styles/projectDetail.css'

type ProjectDetailProps = {
  id: string,
  onBackButtonClick?: ()=>void,
  onPreviousClick?: ()=>void,
  onNextClick?: ()=>void,
}


function ProjectDetail({
  id, 
}:ProjectDetailProps) {
  
  const project = projectData[id];

  const primaryImage = imagePath + 'projects/' + imageData[project.primaryImgId].fileName
  const secondaryImage = project.secondaryImgId ? imagePath + 'projects/' + imageData[project.secondaryImgId].fileName : '';
  const tertiaryImage = project.tertiaryImgId ? imagePath + 'projects/' + imageData[project.tertiaryImgId].fileName : '';

  const hasLinks = project.githubLink || project.externalLink;
  const hasTechBadges = !!(project.techIds && project.techIds.length > 0);

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
      const threshold = project.techIds.length;

      return project?.techIds.map((id,idx)=>{
        if(techBadgeData[id]){
          let placement = idx + 1 <= threshold / 2 ? "top" : "bottom";
          return(
            <li key={idx}>
              <Badge 
                title={techBadgeData[id]?.title} 
                iconClass={techBadgeData[id]?.iconClass} 
                extraClass={`pill inherit ${placement}`} 
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
              src={getImgUrl(primaryImage)} 
              alt={`${project.title} - Main Project Image`} 
            />
            <Hex hexClass="image desktop" hexWidth={640} hexImagePath={primaryImage} />
          </div>
        </section>
        <section className="header-content">   
          <h2 className="title primary overlay">{project.title}</h2>
          {hasLinks && 
            <ol className="badges-list links">
              {ghBadge}
              {externalLinkBadge}
            </ol>
          }
          {hasTechBadges &&
            <div className="variable-height-hex desktop">
              <ol className="badges-list">
                {renderTechBadges()}
              </ol>
            </div>
          }
        </section>
        <HexGridLayout layouts={cardBorder} extraClass="decorative-hex-border"/>
      </header>
      <section className="info-panel">

        {project.descriptionHTML && 
          <div className={`text-area text-area-gradient ${hasTechBadges ? 'with-tech-badges' : ''}`}>
            <div className="description" dangerouslySetInnerHTML={{ __html: project.descriptionHTML}} ></div>
          </div>
        }

        {hasTechBadges &&
          <ol className="badges-list mobile">
            {renderTechBadges()}
          </ol>
        }
        
        
      </section>

    </article>
    </div>
  )
}

export default ProjectDetail
