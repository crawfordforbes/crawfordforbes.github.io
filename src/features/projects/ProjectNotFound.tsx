import { Link } from 'react-router'

import './styles/ProjectNotFound.css'

type ProjectNotFoundProps = {
  onBackToProjects?: () => void
}

function ProjectNotFound({ onBackToProjects }: ProjectNotFoundProps) {
  return (
    <div className="project-not-found">
      <h2>Project Not Found</h2>
      <p>Sorry, the project you're looking for doesn't exist or may have been removed.</p>
      
      <div className="actions">
        {onBackToProjects ? (
          <button 
            onClick={onBackToProjects}
            className="btn primary"
          >
            ← Back to Projects
          </button>
        ) : (
          <Link to="/projects" className="btn primary">
            ← View All Projects
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProjectNotFound