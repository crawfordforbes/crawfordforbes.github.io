import { getImgUrl } from "@/utils/images";

import Hex from "../hexes/HexSimple"
import HexGridLayout from "@/features/hexes/hexGridLayout";

import { projectData } from "@/data/projects/projects"
import { cardBorder } from "@/data/hexes/layouts";
import { imageData } from "@/data/global/images";
import { imagePath } from "@/data/global/images";

import Badge from "@/components/global/badge"
import { techData } from "@/data/projects/techs";

import { Splide, SplideSlide } from '@splidejs/react-splide';

import { useParams } from "react-router";

import './styles/projectDetail.css'
import './styles/splide.min.css'

type ProjectDetailProps = {
  id?: string,
  onBackButtonClick?: ()=>void,
  onPreviousClick?: ()=>void,
  onNextClick?: ()=>void,
}


function ProjectDetail({
  id, 
}:ProjectDetailProps) {
  let params = useParams()
  let thisProjectId:string = id ? id : params.projectId ? params.projectId : '';
  if(!thisProjectId || !projectData[thisProjectId]){
    return(
      <div className="project-detail-container">
        <h2>Project Not Found</h2>
        <p>Sorry, the project you are looking for does not exist. </p>
      </div>
    )
  }
  const project = projectData[thisProjectId];

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
        if(techData[id]){
          let placement = idx + 1 <= threshold / 2 ? "top" : "bottom";
          return(
            <li key={idx}>
              <Badge 
                title={techData[id]?.title} 
                iconClass={techData[id]?.iconClass} 
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
          <div className="header-image">
            <div className="inner">
              <Splide aria-label={`${project.title} - Slider`} className="mobile image-slider" options={ { rewind: true, gap: '1rem', pagination: false } }>
                {primaryImage.length > 0 && <SplideSlide>
                  <img className="image mobile" src={getImgUrl(primaryImage)} alt={`${project.title} - Main Project Image`} />
                </SplideSlide>}
                {secondaryImage.length > 0 && <SplideSlide>
                  <img className="image mobile" src={getImgUrl(secondaryImage)} alt={`${project.title} - Secondary Project Image`} />
                </SplideSlide>}
                {tertiaryImage.length > 0 && <SplideSlide>
                  <img className="image mobile" src={getImgUrl(tertiaryImage)} alt={`${project.title} - Tertiary Project Image`} />
                </SplideSlide>}
              </Splide>
              {/* <img 
                className="image mobile" 
                src={getImgUrl(primaryImage)} 
                alt={`${project.title} - Main Project Image`} 
              /> */}
              <Splide aria-label={`${project.title} - Slider`} className="desktop image-slider" options={ { rewind: true, pagination: false } }>
                {primaryImage.length > 0 && <SplideSlide>
                  <Hex hexClass="image desktop" hexWidth={640} content={primaryImage} />
                </SplideSlide>}
                {secondaryImage.length > 0 && <SplideSlide>
                  <Hex hexClass="image desktop" hexWidth={640} content={secondaryImage} />
                </SplideSlide>}
                {tertiaryImage.length > 0 && <SplideSlide>
                  <Hex hexClass="image desktop" hexWidth={640} content={tertiaryImage} />
                </SplideSlide>}
              </Splide>
            </div>
          </div>
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
