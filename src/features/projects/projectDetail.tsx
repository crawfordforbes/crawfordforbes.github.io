import { useContext } from "react";
import { IsDesktopContext } from "@/utils/context";
import { getImgUrl } from "@/utils/images";

import Hex from "../hexes/hex"
import HexGridLayout from "@/features/hexes/hexGridLayout";

import { projectData } from "@/data/projects/projects"
import { projectDetailHeaderLeftLayouts, projectDetailHeaderRightLayouts } from "@/data/hexes/layouts";
import { imageData } from "@/data/images";

import Badge from "@/components/global/badge"
import { badgeData } from "@/data/global/badges";

import './styles/projectDetail.css'

type ProjectDetailProps = {
  id: string,
  onClick?: ()=>void
}


function ProjectDetail({
  id, 
  onClick
}:ProjectDetailProps) {
  const isDesktop = useContext(IsDesktopContext);
  
  const project = projectData[id];
  
  const bannerImage = imageData[project.bannerImgId]
  const primaryImage = imageData[project.primaryImgId]
  const secondaryImage = imageData[project.secondaryImgId]

  const ghBadge = project.githubLink ? 
    <Badge 
      iconClass={['fab', 'github']} 
      title={"See the Code"} 
      link={project.githubLink} 
    /> : <></>

  return (
    <div className="project-detail content"> 
      <header className="project-header">

        <div className="hex-left project-header-hex-wrapper">
          {!isDesktop ? 
            <div className="layout-gh-wrapper">
            <HexGridLayout layouts={projectDetailHeaderLeftLayouts} />
            {project.githubLink ?
              <div className="hex-row">
                <Hex hexClass="gradient-blue-cyan-teal-green" hexWidth={122} />
                <Hex 
                  hexClass="gradient-blue-cyan-teal-green" 
                  badgeComponent1={ghBadge} 
                  hexWidth={122} 
                />
              </div>
              :
              <div className="hex-row">
                <Hex hexClass="gradient-blue-cyan-teal-green" hexWidth={122} />
                <Hex hexClass="gradient-blue-cyan-teal-green" hexWidth={122} />
              </div>
            }
            </div>
          :
            <div className="desktop">
              <div className="hex-grid">
                <div className="hex-row">
                  <Hex hexClass="gradient-orange-pink"/>
                  <Hex hexClass="gradient-blue-cyan-teal-green" badgeComponent1={ghBadge} />
                </div>

                <div className="hex-row">
                  <Hex 
                    hexClass="gradient-blue-cyan-teal-green" 
                    hexImagePath={primaryImage.desktopPath} 
                    hexWidth={346} 
                  />
                </div>
              </div>
            </div>
          }
        </div>
        <div className="banner-wrapper">
          {onClick &&
            <div className="optional back-to-index-button">
              <Hex 
                hexClass="gradient-blue-cyan-teal-green mobile" 
                hexTitle="Back" 
                hexWidth={58} 
                hexOnClick={() => onClick()} 
              />
              <Hex 
                hexClass="gradient-blue-cyan-teal-green desktop" 
                hexTitle="Back" 
                hexWidth={82} 
                hexOnClick={() => onClick()} 
              />
            </div>
          }

          {isDesktop ?
            project.externalLink && project.externalLink.length > 0 ? 
            <a 
              href={project.externalLink} 
              target="_blank" 
              className="banner-image" 
              style={{backgroundImage: `url(${getImgUrl(bannerImage.mobilePath)})`}}
            >
            </a>
              : 
            <span className="banner-image" style={{backgroundImage: `url(${getImgUrl(bannerImage.mobilePath)})`}}></span>
            :
            project.externalLink && project.externalLink.length > 0 ? 
            <a 
              href={project.externalLink} 
              target="_blank" 
              className="banner-image" 
              style={{backgroundImage: `url(${getImgUrl(bannerImage.desktopPath)})`}}
            >
            </a>
              : 
            <span className="banner-image" style={{backgroundImage: `url(${getImgUrl(bannerImage.desktopPath)})`}}></span>
          }
        </div>
        <div className="hex-right project-header-hex-wrapper">
          <h2 className="project-title">{project.title}</h2>
          {!isDesktop ?
            <HexGridLayout layouts={projectDetailHeaderRightLayouts} />
          :
            <div className="desktop">
              <div className="hex-grid">
                <div className="hex-row">
                  <Hex hexClass="gradient-orange-pink"/>
                </div>
                <div className="hex-row">
                  <Hex hexClass="gradient-blue-cyan-teal-green" hexImagePath={secondaryImage.desktopPath} />
                </div>
              </div>
            </div>
          }
        </div>

      </header>

      <article className="project-body text-area-gradient">

        <div className="meta">
          {ghBadge}
          {project.catIds &&
            <ol className="cats">
              {project.catIds.map((id, idx)=>{
                return <li key={idx} > <Badge {...badgeData[id]} /> </li>
              })}
            </ol>
          }
          
        </div>
          {project.descriptionHTML &&
            <div className="project-description" dangerouslySetInnerHTML={{ __html: project.descriptionHTML}} >
          </div>
          }
        

        
        {!isDesktop && 
          <div className="mobile">
            <div className="hex-grid">
              <div className="hex-row">
                <Hex hexClass="gradient-blue-cyan-teal-green" hexImagePath={primaryImage.mobilePath} />
                <Hex hexClass="gradient-orange-pink"/>
              </div>
              <div className="hex-row">
                <Hex hexClass="gradient-orange-pink"/>
                <Hex hexClass="gradient-blue-cyan-teal-green" hexImagePath={secondaryImage.mobilePath} />
              </div>
            </div>
          </div>
        }

      </article>
    </div>
  )
}

export default ProjectDetail
