import { useMemo } from 'react'
import Hex from '@/features/hexes/Hex'
import Badge from '@/components/global/Badge'

import { badgeData } from '@/data/global/badges';
import { footerContent } from '@/data/content/footer'

import './styles/footer.css'

function Footer() {

  const navItems = ['hire', 'github-index', 'projects-link', 'linked-in',  'resume'];
  const hexWidth = 360;
  const hexMargin = 3
  const inlineVars: React.CSSProperties = useMemo(() => ({
    ['--hex-width' as any]: `${hexWidth}px`,
    ['--hex-margin' as any]: `${hexMargin}px`,
  }), [hexWidth, hexMargin])

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
  const commonProps = useMemo(() => ({
    style: { ...(inlineVars as object) } as React.CSSProperties,
    hexWidth: hexWidth
  }), [hexWidth, inlineVars])

  const commonRowProps = useMemo(() => ({
    style: { ...(inlineVars as object) } as React.CSSProperties,
  }), [inlineVars])

  return (
    <footer className="footer">
      <div className="footer-hex-wrapper">
        <div className="hex-grid">
          <div className="hex-row" {...commonRowProps}>
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex footer-text" {...commonProps}  contentType="visual" content={
              <div className="footer-content text-content">
                <h2 className="title">{badgeData.name.title}</h2>
                <p className="description">{footerContent.description}</p>
                <p className="copyright">© {new Date().getFullYear()} Crawford Forbes</p>
              </div>
            } />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
          </div>
          <div className="hex-row" {...commonRowProps}>
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex footer-links" {...commonProps}  content={
              <div className="footer-text">
                <ol className="nav-links">
                  {renderBadges()}
                </ol>
              </div>
            } />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
          </div>
          <div className="hex-row" {...commonRowProps}>
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
            <Hex hexClass="footer-hex decorative" {...commonProps} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
