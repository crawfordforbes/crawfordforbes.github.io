import { useState } from 'react'

import './styles/nav.css'
import Badge from './badge';

import Hex from '@/features/hexes/hex';
import { contactData } from '@/data/global/contacts';
import { scrollToTarget } from '@/utils/site';

function Nav() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const navItems: string[] = ['hire', 'projects-link', 'linked-in', 'github-index', 'resume'];

  function scrollToElementOnClick(targetId: string) {
    setIsMenuOpen(false);
    scrollToTarget(targetId);
  }


  function renderBadges() {
    return navItems.map((item:string, idx:number) => {
      // If the link is an internal link (starts with "/"), use scrollToElementOnClick
      if(contactData?.[item] && contactData?.[item]?.link && contactData?.[item]?.link[0] === "#") {
        return (
          <li key={idx}>
              <Badge 
                iconClass={contactData?.[item]?.iconClass}
                title={contactData?.[item]?.title}
                badgeOnClick={() => {
                  const link = contactData?.[item]?.link;
                  if (typeof link === 'string') {
                    scrollToElementOnClick(link.slice(1));
                  }
                }}
                extraClass="pill secondary nav-badge"
              />
          </li>
        )
      }
      return (
        <li key={idx}>
          <Badge 
            iconClass={contactData?.[item]?.iconClass}
            title={contactData?.[item]?.title}
            link={contactData?.[item]?.link}
            extraClass="pill secondary nav-badge"
          />
        </li>
      );
    });
  }

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="shadow">
        <button className="nav-toggle-button" onClick={toggleMenu} aria-label={`${isMenuOpen ? 'Close' : 'Menu'}`} tabIndex={0}>
          <Hex hexClass="nav-toggle" hexTitle={`${isMenuOpen ? 'Close' : 'Menu'}`} hexWidth={64}/>
        </button>
      </div>
      <div className={`nav-hex hex ${isMenuOpen ? 'open' : 'closed'}`} aria-expanded={isMenuOpen} role="region" aria-label="Navigation Menu">
        <div className="hex-content">
          <ol className="locale">
            <li><h4>{contactData.fname.title} {contactData.lname.title}</h4></li>
            <li><h4>{contactData.tagline1.title}</h4></li>
            <li><h4>{contactData.locale.title}</h4></li>
          </ol>
          <ol className="nav-links">
            {renderBadges()}
          </ol>
        </div>
      </div>
    </nav>
  )
}

export default Nav
