import { logger } from '@/utils/logger';

import { useParams } from "react-router";
import { Splide, SplideSlide } from '@splidejs/react-splide';

import Badge from "@/components/global/Badge"
import SimpleImage from "@/components/global/OptimizedImage";

import HexGridLayout from "@/features/hexes/HexGridLayout";

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
  
  // Convert imageIds to fileIds using imageData
  // Limit to 5 images on mobile/tablet to prevent memory crashes
  const maxImages = typeof window !== 'undefined' && window.innerWidth < 1024 ? 5 : 999;
  const resolvedImageFileIds: string[] = detailImages && detailImages.length > 0 ? detailImages
    .slice(0, maxImages)
    .map(imgId => {
      const imageInfo = imageData[imgId];
      if (!imageInfo?.id) {
        logger.warn(`No image data found for ID: ${imgId}`);
        return null;
      }
      return imageInfo.id;
    })
    .filter((fileId): fileId is string => typeof fileId === "string" && fileId.length > 0) :
    ["fallback"];

  function renderTechBadges() {
    return project?.techIds?.map((techId: string) => {
      const tech = techData[techId]
      if (!tech) return null

      return (
        <li key={techId}>
          <Badge 
            iconClass={tech.iconClass}
            title={tech.title}
            extraClass="pill secondary"
            link={tech.link}
          />
        </li>
      )
    })
  }

  const ghBadge = project.githubLink ? (
    <li key="gh">
      <Badge 
        link={project.githubLink} 
        iconClass={['fab', 'github']} 
        title={"View on GitHub"} 
        extraClass="pill tertiary"
      />
    </li>
  ) : null;

  const externalLinkBadge = project.externalLink ? (
    <li key="external">
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
            {resolvedImageFileIds.length > 1 &&
              <Splide aria-label={`${project.title} - Slider`} className="image-slider" options={{ rewind: true, pagination: false, lazyLoad: 'nearby', preloadPages: 1 }}>
                {resolvedImageFileIds.map((fileId, index) => {
                  const imageId = detailImages[index]; // Get the actual image ID
                  return (
                    <SplideSlide key={project.id}>
                      <SimpleImage
                        src={getProjectImageUrl(project.id, fileId)}
                        alt={generateImageAlt(project.title, imageId)}
                        className="image"
                        priority={index === 0} // First image priority
                        loading={index === 0 ? 'eager' : 'lazy'}
                        aspectRatio="4/3"
                        objectFit="cover"
                      />
                      <span className="overlay-caption">{generateImageAlt(project.title, imageId)}</span>
                    </SplideSlide>
                  )
                })}
              </Splide>
            }
            {resolvedImageFileIds.length < 2 &&
              resolvedImageFileIds.map((fileId, index) => {
                const imageId = detailImages[index]; // Get the actual image ID
                return (
                 <div key={project.id}>
                    <SimpleImage
                      src={getProjectImageUrl(project.id, fileId)}
                      alt={generateImageAlt(project.title, imageId)}
                      className="image"
                      priority={index === 0} // First image priority
                      aspectRatio="4/3"
                      objectFit="cover"
                    />
                    <span className="overlay-caption">{generateImageAlt(project.title, imageId)}</span>
                  </div>
                )
              })
            }
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
            <h2 className="title primary overlay desktop">{project.title}</h2>
          </div>
          {hasLinks && 
            <ul className="badges-list links">
              {ghBadge}
              {externalLinkBadge}
            </ul>
          }
          {hasTechBadges &&
            <div className="variable-height-hex desktop">
              <ul className="badges-list">
                {renderTechBadges()}
              </ul>
            </div>
          }
        </section>
        <HexGridLayout layouts={cardBorder} extraClass="decorative-hex-border"/>
      </header>
      <section className="info-panel">
        <h2 className="title primary overlay mobile">{project.title}</h2>
        {(project.description || project.descriptionHTML) && (
          <div className={`text-area text-area-gradient ${hasTechBadges ? 'with-tech-badges' : ''}`}>
            {project.description ? (
              <div className="description text-content">{project.description}</div>
            ) : (
              <div className="description text-content" dangerouslySetInnerHTML={{ __html: project.descriptionHTML || '' }} />
            )}
          </div>
        )}
        {hasTechBadges &&
          <ul className="badges-list mobile">
            {renderTechBadges()}
          </ul>
        }
      </section>
    </article>
  )
}

export default ProjectDetail
