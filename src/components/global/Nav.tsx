import { useState, useEffect } from 'react'

import Badge from '@/components/global/Badge';
import Hex from '@/features/hexes/Hex';

import { badgeData } from '@/data/global/badges';

import './styles/nav.css'

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

  function renderBadges() {
    return navItems.map((item:string, idx:number) => {
      return (
        <li key={idx}>
          <Badge 
            iconClass={badgeData?.[item]?.iconClass}
            title={badgeData?.[item]?.title}
            link={badgeData?.[item]?.link}
            badgeOnClick={badgeData?.[item]?.badgeOnClick}
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
          className="nav-toggle" 
          onClick={toggleMenu} 
          aria-label={`${isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}`} 
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          tabIndex={0}
        >
          <Hex 
            hexClass="nav-toggle-hex icon-bg" 
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
            <div><h4>{badgeData.fname.title} {badgeData.lname.title}</h4></div>
            <div><h4>{badgeData.tagline1.title}</h4></div>
            <div><h4>{badgeData.locale.title}</h4></div>
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
