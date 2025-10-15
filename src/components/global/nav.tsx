import { useState, useEffect } from 'react'

import './styles/nav.css'
import Badge from './badge';

import Hex from '@/features/hexes/HexSimple';
import { contactData } from '@/data/global/contacts';
import { scrollToTarget } from '@/utils/site';

function Nav() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Add escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const navItems = ['hire', 'projects-link', 'linked-in', 'github-index', 'resume'];

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
        <button 
          className="nav-toggle-button" 
          onClick={toggleMenu} 
          aria-label={`${isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}`} 
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          tabIndex={0}
        >
          <Hex 
            hexClass="nav-toggle icon-bg" 
            content={isMenuOpen ? "toggle-open" : "toggle-close"} 
            contentType="badge"
            hexWidth={64}
          />
        </button>
      </div>
      <div 
        id="nav-menu"
        className={`nav-hex hex ${isMenuOpen ? 'open' : 'closed'}`} 
        aria-expanded={isMenuOpen} 
        role="region" 
        aria-label="Navigation menu"
        aria-hidden={!isMenuOpen}
        {...(!isMenuOpen && { inert: true })}
      >
        <div className="hex-content">
          <div className="locale" role="banner" aria-label="Site author information">
            <div><h4>{contactData.fname.title} {contactData.lname.title}</h4></div>
            <div><h4>{contactData.tagline1.title}</h4></div>
            <div><h4>{contactData.locale.title}</h4></div>
          </div>
          <nav role="navigation" aria-label="Primary navigation links">
            <ul className="nav-links" role="list">
              {renderBadges()}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default Nav
