import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faReact, faGithub, faGit, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCircle, faCircleXmark, faCode, faEnvelope, faFileArrowDown, faIcons, faPeopleArrows, faPeopleGroup, faPerson, faServer, faSpinner, faUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons"

library.add(faReact, faGithub, faGit, faEnvelope, faFileArrowDown, faLinkedin, faSpinner, faBars, faXmark, faCircle, faCircleXmark, faCode, faIcons, faPerson, faPeopleGroup, faPeopleArrows, faServer, faUpRightFromSquare)

import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

import './styles/badge.css'

type BadgeProps = {
  iconClass?: [IconPrefix, IconName];
  link?: string;
  title?: string;
  badgeOnClick?: () => void;
  extraClass?: string;
  noTabIndex?: boolean;
}

const Badge = ({
  iconClass, 
  title, 
  link, 
  badgeOnClick,
  extraClass,
  noTabIndex
}: BadgeProps) => {

  // optional font awesome icon
  const FAicon = iconClass ? <FontAwesomeIcon icon={iconClass} /> : <></>

  function renderContent() {
    return (
      <>
        {FAicon && iconClass && <span className="fa-icon">{FAicon}</span>}
        {title && <h4 className="title">{title}</h4>}
      </>
    )
  }

  // make the full badge clickable as needed
  function renderFullAreaContent() {
    if(badgeOnClick) {
      return (
        <button 
          onClick={badgeOnClick} 
          className="badge-content" 
          aria-label={title ? title : 'badge button'}
          tabIndex={noTabIndex ? -1 : 0}
        >
          {renderContent()}
        </button>
      );
    } else if (link) {
      return (
        <a 
          href={link} 
          target="_blank"
          rel="noopener noreferrer"
          className="badge-content" 
          aria-label={title ? title : 'badge link'}
          tabIndex={noTabIndex ? -1 : 0}
        >
          {renderContent()}
        </a>
      );
    } else {
      return <span className="badge-content">{renderContent()}</span>;
    }
  }

  const badgeClass = extraClass ? `badge ${extraClass}` : 'badge';

  return (
    <article className={badgeClass}>
      {renderFullAreaContent()}
    </article>
  )
};

export default Badge;