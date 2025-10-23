import { useParams } from "react-router";
import { Splide, SplideSlide } from '@splidejs/react-splide';

import Badge from "@/components/global/badge"
import SimpleImage from "@/components/global/OptimizedImage";
import Hex from "@/features/hexes/Hex"
import HexGridLayout from "@/features/hexes/hexGridLayout";

import { imageData } from "@/data/global/images";
import { cardBorder } from "@/data/hexes/layouts";
import { techData } from "@/data/projects/techs";

import { getProjectById, generateImageAlt } from "@/utils/projects";
import { getProjectImageUrl } from "@/utils/images";

import './styles/projectDetail.css'
import './styles/splide.min.css'

type ProjectDetailProps = {
  id?: string;
}

function ProjectDetail({
  id,
}: ProjectDetailProps) {
  let params = useParams()
  let thisProjectId: string = id ? id : params.projectId ? params.projectId : '';
  
  const project = getProjectById(thisProjectId);
  
  if (!project) {
    return (
      <div className="project-detail-container">
        <h2>Project Not Found</h2>
        <p>Sorry, the project you are looking for does not exist.</p>
      </div>
    );
  }

  const hasLinks = project.githubLink || project.externalLink;
  const hasTechBadges = !!(project.techIds && project.techIds.length > 0);

  const detailImages = project.imageIds || [];
  
  // Convert imageIds to filenames using imageData
  const resolvedImageFilenames: string[] = detailImages && detailImages.length > 0 ? detailImages
    .map(imgId => {
      const imageInfo = imageData[imgId];
      if (!imageInfo?.fileName) {
        console.warn(`No image data found for ID: ${imgId}`);
        return null;
      }
      return imageInfo.fileName;
    })
    .filter((filename): filename is string => typeof filename === "string" && filename.length > 0) :
    ["fallback"];

  function renderTechBadges() {
    return project?.techIds?.map((techId: string, idx: number) => {
      const tech = techData[techId]
      if (!tech) return null

      return (
        <li key={idx}>
          <Badge 
            iconClass={tech.iconClass}
            title={tech.title}
            extraClass="pill secondary"
          />
        </li>
      )
    })
  }

  const ghBadge = project.githubLink ? (
    <li>
      <Badge 
        link={project.githubLink} 
        iconClass={['fab', 'github']} 
        title={"View on GitHub"} 
        extraClass="pill tertiary"
      />
    </li>
  ) : null;

  const externalLinkBadge = project.externalLink ? (
    <li>
      <Badge 
        link={project.externalLink} 
        iconClass={['fas', 'up-right-from-square']} 
        title={"Visit the Site"} 
        extraClass="pill tertiary"
      />
    </li>
  ) : null;

  return (
    <article className="project-detail">
      <header className="card-top">
        <div className="image-slider-wrapper">
          <div className="header-image">
            {/* Mobile slider - using SimpleImage components */}
            <Splide aria-label={`${project.title} - Slider`} className="mobile image-slider" options={{ rewind: true, pagination: false }}>
              {resolvedImageFilenames.map((filename, index) => {
                const imageId = detailImages[index]; // Get the actual image ID
                return (
                  <SplideSlide key={index}>
                    <SimpleImage
                      src={getProjectImageUrl(project.id, filename)}
                      alt={generateImageAlt(project.title, imageId)}
                      className="image"
                      priority={index === 0} // First image priority
                      aspectRatio="4/3"
                      objectFit="cover"
                    />
                  </SplideSlide>
                )
              })}
            </Splide>

            {/* Desktop slider - using Hex components with proper image content */}
            <Splide aria-label={`${project.title} - Slider`} className="desktop image-slider" options={{ rewind: true, pagination: false }}>
              {resolvedImageFilenames.map((filename, index) => (
                <SplideSlide key={index}>
                  <Hex 
                    hexClass="image desktop" 
                    hexWidth={640} 
                    contentType="image" 
                    content={getProjectImageUrl(project.id, filename)}
                  />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
        <section className="header-content">   
          <div className="title-dates-wrapper">
            {project.dates && 
              <Badge 
                title={project.dates} 
                extraClass="pill primary"
              />
            }
            <h2 className="title primary overlay">{project.title}</h2>
          </div>
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
        {hasTechBadges &&
          <ol className="badges-list mobile">
            {renderTechBadges()}
          </ol>
        }
        {project.descriptionHTML && 
          <div className={`text-area text-area-gradient ${hasTechBadges ? 'with-tech-badges' : ''}`}>
            <div 
              className="description" 
              dangerouslySetInnerHTML={{ __html: project.descriptionHTML}}
            ></div>
          </div>
        }
      </section>
    </article>
  )
}

export default ProjectDetail
