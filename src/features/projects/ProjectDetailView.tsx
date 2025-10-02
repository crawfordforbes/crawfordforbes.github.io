import { memo } from "react";
import BackButton from "./BackButton";
import ProjectDetail from "./projectDetail";
import type { ProjectContainerRenderProps } from "./ProjectContainer";

type ProjectDetailViewProps = {
  routing: ProjectContainerRenderProps['routing'],
  navigation: ProjectContainerRenderProps['navigation']
}

/**
 * Component that renders the selected project detail view
 */
function ProjectDetailView({ routing, navigation }: ProjectDetailViewProps) {
  const handlePrevious = () => {
    const prevId = navigation.goToPrevious()
    if (prevId) routing.selectProject(prevId)
  }

  const handleNext = () => {
    const nextId = navigation.goToNext()
    if (nextId) routing.selectProject(nextId)
  }

  return (
    <article className="selected-project">
      <BackButton onBack={routing.clearSelectedProject} />
      <ProjectDetail
        id={routing.selectedProjectId}
        onBackButtonClick={routing.clearSelectedProject}
        onPreviousClick={handlePrevious}
        onNextClick={handleNext}
      />
    </article>
  )
}

export default memo(ProjectDetailView)