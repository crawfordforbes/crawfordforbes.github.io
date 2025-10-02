import ProjectContainer from "./ProjectContainer";
import ProjectListView from "./ProjectListView";
import ProjectDetailView from "./ProjectDetailView";
import './styles/projectIndex.css'

type projectIndexProps = {
  selectedRoleIdsProps?: string[],
  selectedTechIdsProps?: string[],
  selectedProjectIdProp?: string,
}

function ProjectIndex({  
  selectedRoleIdsProps,
  selectedTechIdsProps,
  selectedProjectIdProp,
}: projectIndexProps) {
  
  return (
    <ProjectContainer
      selectedRoleIdsProps={selectedRoleIdsProps}
      selectedTechIdsProps={selectedTechIdsProps}
      selectedProjectIdProp={selectedProjectIdProp}
    >
      {({ filters, routing, navigation, ui }) => (
        !routing.selectedProjectId ? (
          <ProjectListView 
            filters={filters}
            routing={routing}
            ui={ui}
          />
        ) : (
          <ProjectDetailView
            routing={routing}
            navigation={navigation}
          />
        )
      )}
    </ProjectContainer>
  )
}

export default ProjectIndex