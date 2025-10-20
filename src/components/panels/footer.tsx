import Hex from '@/features/hexes/Hex'
import Badge from '@/components/global/badge'

import { badgeData } from '@/data/global/badges';
import { footerContent } from '@/data/content/footer'

import { scrollToTarget } from '@/utils/site';

import './styles/footer.css'

function Footer() {

  const navItems = ['hire', 'github-index', 'projects-link', 'linked-in',  'resume'];

  
  function scrollToElementOnClick(targetId: string) {
    scrollToTarget(targetId);
  }

  function renderBadges() {
    return navItems.map((item:string, idx:number) => {
      return (
        <li key={idx}>
          <Badge 
            iconClass={badgeData?.[item]?.iconClass}
            title={badgeData?.[item]?.title}
            link={badgeData?.[item]?.link}
            extraClass="pill secondary nav-badge"
            badgeOnClick={badgeData?.[item]?.badgeOnClick}
          />
        </li>
      );
    });
  }

  return (
    <footer className="footer">
      <div className="footer-hex-wrapper">
        <div className="hex-grid">
          <div className="hex-row">
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex footer-text" hexWidth={360} contentType="visual" content={
              <div className="footer-content">
                <h2 className="title">{badgeData.name.title}</h2>
                <p className="description">{footerContent.description}</p>
                <p className="copyright">© {new Date().getFullYear()} Crawford Forbes</p>
              </div>
            } />
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
          </div>
          <div className="hex-row">
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex footer-links" hexWidth={360} content={
              <div className="footer-text">
                <ol className="nav-links">
                  {renderBadges()}
                </ol>
              </div>
            } />
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
          </div>
          <div className="hex-row">
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
            <Hex hexClass="footer-hex decorative" hexWidth={360}/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
