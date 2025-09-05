import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faReact, faGithub, faGit, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileArrowDown, faSpinner } from "@fortawesome/free-solid-svg-icons"

library.add(faReact, faGithub, faGit, faEnvelope, faFileArrowDown, faLinkedinIn, faSpinner)

import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

import './styles/badge.css'

type BadgeProps = {
  iconClass?: [IconPrefix, IconName];
  link?: string;
  title?: string;
  badgeOnClick?: () => void;
  extraClass?: string;
}

const Badge = ({
  iconClass, 
  title, 
  link, 
  badgeOnClick,
  extraClass
}: BadgeProps) => {

  // optional font awesome icon
  const FAicon = iconClass ? <FontAwesomeIcon icon={iconClass} /> : <></>

  function renderContent() {
    return (
      <>
        {FAicon}
        <span>{title}</span>
      </>
    )
  }

  // make the full badge clickable as needed
  function renderFullAreaContent() {
    if(badgeOnClick) {
      return (
        <button 
          onClick={badgeOnClick} 
          className="badge-full-area-content" 
          aria-label={title ? title : 'badge button'}
        >
          {renderContent()}
        </button>
      );
    } else if (link) {
      return (
        <a 
          href={link} 
          className="badge-full-area-content" 
          aria-label={title ? title : 'badge link'}
        >
          {renderContent()}
        </a>
      );
    } else {
      return <span className="badge-full-area-content">{renderContent()}</span>;
    }
  }

  return (
    <div className={`badge ${extraClass ? extraClass : ''}`}>
      {renderFullAreaContent()}
    </div>
  )
};

export default Badge;