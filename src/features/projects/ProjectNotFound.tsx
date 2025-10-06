import { Link } from 'react-router'
import './styles/ProjectNotFound.css'

type ProjectNotFoundProps = {
  onBackToPortfolio?: () => void
}

function ProjectNotFound({ onBackToPortfolio }: ProjectNotFoundProps) {
  return (
    <div className="project-not-found">
      <h2>Project Not Found</h2>
      <p>Sorry, the project you're looking for doesn't exist or may have been removed.</p>
      
      <div className="actions">
        {onBackToPortfolio ? (
          <button 
            onClick={onBackToPortfolio}
            className="btn primary"
          >
            ← Back to Portfolio
          </button>
        ) : (
          <Link to="/portfolio" className="btn primary">
            ← View All Projects
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProjectNotFound