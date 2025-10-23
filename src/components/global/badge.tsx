import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faReact, faGithub, faGit, faLinkedin, faNodeJs, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCircle, faCircleXmark, faCode, faEnvelope, faFileArrowDown, faIcons, faPeopleArrows, faPeopleGroup, faPerson, faServer, faSpinner, faUpRightFromSquare, faXmark, faDatabase, faLock, faCubes, faChartLine, faBolt, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, } from "@fortawesome/free-solid-svg-icons"

import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

import './styles/badge.css'

library.add(faReact, faGithub, faGit, faEnvelope, faFileArrowDown, faLinkedin, faSpinner, faBars, faXmark, faCircle, faCircleXmark, faCode, faIcons, faPerson, faPeopleGroup, faPeopleArrows, faServer, faUpRightFromSquare, faDatabase, faLock, faCubes, faNodeJs, faChartLine, faBolt, faVuejs, faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9,)

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

  const content = (
    <>
      {iconClass && <span className="fa-icon"><FontAwesomeIcon icon={iconClass} /></span>}
      {title && <h4 className="title">{title}</h4>}
    </>
  );

  const className = `badge ${extraClass || ''}`.trim();
  const tabIndex = noTabIndex ? -1 : 0;
  const ariaLabel = title || 'badge';

  if (badgeOnClick) {
    return (
      <article className={className}>
        <button 
          onClick={badgeOnClick} 
          className="badge-content" 
          aria-label={ariaLabel}
          tabIndex={tabIndex}
        >
          {content}
        </button>
      </article>
    );
  }

  if (link) {
    return (
      <article className={className}>
        <a 
          href={link} 
          target="_blank"
          rel="noopener noreferrer"
          className="badge-content" 
          aria-label={ariaLabel}
          tabIndex={tabIndex}
        >
          {content}
        </a>
      </article>
    );
  }

  return (
    <article className={className}>
      <span className="badge-content">{content}</span>
    </article>
  );
};

export default Badge;