import ProjectContainer from "./ProjectContainer";
import ProjectListView from "./ProjectListView";
import ProjectDetailView from "./ProjectDetailView";
import './styles/projectIndex.css'

type projectIndexProps = {
  selectedProjectIdProp?: string,
}

function ProjectIndex({  
  selectedProjectIdProp,
}: projectIndexProps) {
  
  return (
    <ProjectContainer
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