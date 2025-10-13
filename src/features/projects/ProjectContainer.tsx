import { useState } from 'react';
import { 
  useProjectFilters, 
  useProjectRouting
} from "./hooks";
import { usePerformanceMonitor } from "@/utils/performance";

interface ProjectContainerProps {
  selectedProjectIdProp?: string,
  children: (props: ProjectContainerRenderProps) => React.ReactNode
}

export type ProjectContainerRenderProps = {
  filters: ReturnType<typeof useProjectFilters>,
  routing: ReturnType<typeof useProjectRouting>,
  navigation: {
    goToPrevious: () => string | null;
    goToNext: () => string | null;
  };
  ui: {
    showMobileFilter: boolean;
    toggleMobileFilter: () => void;
  };
}

/**
 * Container component that manages all project-related state and logic.
 * Uses render props pattern to provide data to child components.
 */
function ProjectContainer({  
  selectedProjectIdProp, // Legacy props - will be removed
  children
}: ProjectContainerProps) {
  
  // Monitor performance (set to true to enable)
  usePerformanceMonitor('ProjectContainer', false)
  
  // Initialize routing first to get URL state
  const routing = useProjectRouting(selectedProjectIdProp)
  
  // Initialize filters with URL state and routing callback
  const filters = useProjectFilters(
    routing.roleFilters, 
    routing.techFilters,
    routing.updateFilters
  )
  
  // Simple mobile filter state (was over-engineered useProjectUI hook)
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const ui = {
    showMobileFilter,
    toggleMobileFilter: () => setShowMobileFilter(prev => !prev)
  };
  
  // Simple navigation logic (was over-engineered useProjectNavigation hook)
  const currentIndex = routing.selectedProjectId 
    ? filters.filteredProjects.findIndex(p => p.id === routing.selectedProjectId)
    : -1;
  const navigation = {
    goToPrevious: () => currentIndex > 0 ? filters.filteredProjects[currentIndex - 1]?.id || null : null,
    goToNext: () => currentIndex < filters.filteredProjects.length - 1 ? filters.filteredProjects[currentIndex + 1]?.id || null : null
  };

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