import Badge from '@/components/global/Badge'
import Hex from '@/features/hexes/Hex'

import { badgeData } from '@/data/global/badges';
import { footerContent, footerStatus } from '@/data/content/footer'

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
    <div className="main-footer">
      <div className="footer-content">
        <div className="text-content">
          <h2 className="title">{badgeData.name.title}</h2>
          <p className="description">{footerContent.description}</p>
          <div className="status hex-row">
            <Hex hexWidth={16} hexClass="footer-hex" />{footerStatus.description}
          </div>
        </div>

        <ul className="nav-links">
          {renderBadges()}
        </ul>
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} Crawford Forbes</p>
      </div>
    </div>
  )
}

export default Footer
