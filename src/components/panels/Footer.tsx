import Badge from '@/components/global/Badge'

import { badgeData } from '@/data/global/badges';
import { footerContent } from '@/data/content/footer'

import './styles/footer.css'

function Footer() {

  const navItems = ['github-index', 'linked-in', 'resume', 'hire',  'projects-link'];

  function renderBadges() {
    return navItems.map((item:string, idx:number) => {
      return (
        <li key={idx}>
          <Badge 
            iconClass={badgeData?.[item]?.iconClass}
            title={badgeData?.[item]?.title}
            link={badgeData?.[item]?.link}
            extraClass="pill quaternary nav-badge"
            badgeOnClick={badgeData?.[item]?.badgeOnClick}
          />
        </li>
      );
    });
  }

  return (
    <footer className="footer">

      <div className="footer-content text-content">
        <h2 className="title">{badgeData.name.title}</h2>
        <p className="description">{footerContent.description}</p>
        <p className="copyright">© {new Date().getFullYear()} Crawford Forbes</p>
      </div>

      <ul className="nav-links">
        {renderBadges()}
      </ul>
            
    </footer>
  )
}

export default Footer
