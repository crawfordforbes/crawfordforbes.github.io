import Hex from '@/features/hexes/HexSimple'
import './styles/footer.css'
import { contactData } from '@/data/global/contacts'
import { footerContent } from '@/data/content/footer'
import Badge from '../global/badge'

import { scrollToTarget } from '@/utils/site';

function Footer() {

  const navItems = ['hire', 'github-index', 'projects-link', 'linked-in',  'resume'];

  
  function scrollToElementOnClick(targetId: string) {
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
                <h2 className="title">{contactData.name.title}</h2>
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
