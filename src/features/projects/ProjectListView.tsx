import { memo } from "react";
import ProjectFilterBar from "./ProjectFilterBar";
import ProjectGrid from "./ProjectGrid";
import type { ProjectContainerRenderProps } from "./ProjectContainer";
import './styles/projectIndex.css';

type ProjectListViewProps = {
  filters: ProjectContainerRenderProps['filters'],
  routing: ProjectContainerRenderProps['routing'],
  ui: ProjectContainerRenderProps['ui']
}

/**
 * Component that renders the main projects listing view
 */
function ProjectListView({ filters, routing, ui }: ProjectListViewProps) {
  return (
    <article className={`project-index ${routing.hasError ? 'routing-error' : ''}`} aria-live="polite" aria-atomic="true">
      <ProjectFilterBar filters={filters} ui={ui} />
      <ProjectGrid filters={filters} routing={routing} />
    </article>
  )
}

export default memo(ProjectListView)