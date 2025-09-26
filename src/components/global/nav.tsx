import { useState } from 'react'

import './styles/nav.css'
import Badge from './badge';

import Hex from '@/features/hexes/hex';
import { contactData } from '@/data/contacts';

function Nav() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const navItems: string[] = ['hire', 'projects-link', 'linked-in', 'github-index', 'resume'];

  function renderBadges() {
    return navItems.map((item:string, idx:number) => {
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
    <nav className="nav">
      <div className="shadow">
        <Hex hexClass="nav-toggle" hexOnClick={toggleMenu} hexTitle={`${isMenuOpen ? 'Close' : 'Menu'}`} hexWidth={64}/>
      </div>
      <div className={`nav-hex hex ${isMenuOpen ? 'open' : 'closed'}`}>
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
