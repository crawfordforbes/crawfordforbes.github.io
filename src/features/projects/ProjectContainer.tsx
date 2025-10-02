import { 
  useProjectFilters, 
  useProjectRouting, 
  useProjectNavigation, 
  useProjectUI 
} from "./hooks";
import { usePerformanceMonitor } from "@/utils/performance";

export type ProjectContainerProps = {
  selectedRoleIdsProps?: string[],
  selectedTechIdsProps?: string[],
  selectedProjectIdProp?: string,
  children: (props: ProjectContainerRenderProps) => React.ReactNode
}

export type ProjectContainerRenderProps = {
  filters: ReturnType<typeof useProjectFilters>,
  routing: ReturnType<typeof useProjectRouting>,
  navigation: ReturnType<typeof useProjectNavigation>,
  ui: ReturnType<typeof useProjectUI>,
}

/**
 * Container component that manages all project-related state and logic.
 * Uses render props pattern to provide data to child components.
 */
function ProjectContainer({  
  selectedRoleIdsProps,
  selectedTechIdsProps,
  selectedProjectIdProp,
  children
}: ProjectContainerProps) {
  
  // Monitor performance (set to true to enable)
  usePerformanceMonitor('ProjectContainer', false)
  
  // Initialize all hooks
  const routing = useProjectRouting(selectedProjectIdProp)
  const filters = useProjectFilters(selectedRoleIdsProps, selectedTechIdsProps)
  const ui = useProjectUI()
  const navigation = useProjectNavigation(filters.filteredProjects, routing.selectedProjectId)

  // Provide all state and actions to children via render props
  return (
    <article className="project-feature index-container" id="projects">
      {children({
        filters,
        routing, 
        navigation,
        ui
      })}
    </article>
  )
}

export default ProjectContainer