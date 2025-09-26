import Hex from '@/features/hexes/hex'
import './styles/footer.css'
import { contactData } from '@/data/global/contacts'
import { footerContent } from '@/data/content/footer'
import Badge from '../global/badge'

function Footer() {

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
    <footer className="footer">
      <div className="hex-grid">
        <div className="hex-row">
          <Hex />
          <Hex hexClass="footer-hex" hexWidth={360} badgeComponent1={
            <div className="footer-text">
              <h2>{contactData.name.title}</h2>
              <p>{footerContent.description}</p>
            </div>
          } />
        </div>
        <div className="hex-row">
          <Hex />
          <Hex hexClass="footer-hex" hexWidth={360} badgeComponent1={
            <div className="footer-text">
              <ol className="nav-links">
                {renderBadges()}
              </ol>
            </div>
          } />
        </div>
      </div>
    </footer>
  )
}

export default Footer
