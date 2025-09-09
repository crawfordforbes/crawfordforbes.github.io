import { useContext } from "react";
import { IsDesktopContext } from "@/utils/context";
import { getImgUrl } from "@/utils/images";

import type { ProjectType } from "@/data/projects/projects";
import { imageData } from "@/data/images";

import './styles/projectCard.css'

type ProjectCardProps = {
  project: ProjectType,
  onClick: (id: string) => void;
}

function ProjectCard({  
  project,
  onClick
}: ProjectCardProps) {

  const isDesktop = useContext(IsDesktopContext);

  const bannerImage = imageData[project.bannerImgId]

  return (
    <li className="project-title-card">
      {isDesktop ?
        <span 
          className="banner-image" 
          style={{backgroundImage: `url(${getImgUrl(bannerImage.mobilePath)})`}} 
          onClick={() => onClick(project.id)}
        >
          {project.title}
        </span>
      :
        <span 
          className="banner-image" 
          style={{backgroundImage: `url(${getImgUrl(bannerImage.desktopPath)})`}} 
          onClick={() => onClick(project.id)}
        >
          {project.title}
        </span>
      }
    </li>
  )
}

export default ProjectCard
