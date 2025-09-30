import { useId, useMemo, memo } from "react"
import { getImgUrl } from "@/utils/images"

import Badge from "@/components/global/badge"
import { utilsData } from "@/data/global/utils" 
import { scrollToTarget } from "@/utils/site"

import type { JSX } from "react"

import './styles/hex.css'
import './styles/hexColors.css'
import './styles/hexSvgFills.css'
import { contactData } from "@/data/global/contacts"

type HexProps = {
  hexLink?: string,
  hexTitle?: string,
  hexClass?: string,
  hexStyle?: React.CSSProperties,
  hexImagePath?: string,
  hexSvgComponent?: JSX.Element,
  hexOnClick?: () => void,
  hexWidth?: number,
  hexMargin?: number,
  badge1Id?: string,
  badge2Id?: string,
  badgeComponent1?: JSX.Element,
  badgeComponent2?: JSX.Element,
  noTabIndex?: boolean,
}

function Hex({  
  hexLink, 
  hexTitle, 
  hexClass,
  hexStyle, 
  hexImagePath, 
  hexSvgComponent,
  hexOnClick,
  hexWidth = 122,
  hexMargin = 3,
  badge1Id,
  badge2Id,
  badgeComponent1,
  badgeComponent2,
  noTabIndex,
}: HexProps) {

  // Determine if there is any text content to display
  function hasTextContent() {
    return badge1Id || badge2Id || hexTitle || badgeComponent1 || badgeComponent2;
  }

  // Determine if there is any full area content to display
  function hasFullAreaContent() {
    return hexLink || hexImagePath || hexSvgComponent || hexOnClick;
  }
  
  // Render the image if hexImagePath is provided
  function renderImage() {
    if (hexImagePath) {
      return <img src={getImgUrl(hexImagePath)} alt={hexTitle} className="hex-image"/>;
    }
  }
  
  // Render both image and SVG component if provided
  function renderImageAndSvg() {
    return (
      <>
        {hexImagePath && renderImage()}
        {hexSvgComponent}
      </>
    );
  }

  function scrollToElementOnClick(targetId: string) {
    scrollToTarget(targetId);
  }

  // Render the full area content based on the provided props
  function renderFullAreaContent() {
    if(hexOnClick) {
      return (
        <button
          onClick={hexOnClick}
          className="hex-full-area-content onclick"
          aria-label={hexTitle ? hexTitle : 'Hex button'}
          tabIndex={noTabIndex ? -1 : 1}
        >
          {renderImageAndSvg()}
        </button>
      );
    } else if (hexLink) {
      if(hexLink[0] === "#") { // internal link
        return (
          <button 
            onClick={() => scrollToElementOnClick(hexLink.slice(1))}
            className="hex-full-area-content internal"
            aria-label={hexTitle ? hexTitle : 'Hex hexLink'}
            tabIndex={noTabIndex ? -1 : 0}
          >
            {renderImageAndSvg()}
          </button>
        );
      } else { // external link
        return (
          <a
            href={hexLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hex-full-area-content external"
            aria-label={hexTitle ? hexTitle : 'Hex hexLink'}
            tabIndex={noTabIndex ? -1 : 0}
          >
            {renderImageAndSvg()}
          </a>
        );
      }
    } else {
      return <span className="hex-full-area-content no-link">{renderImageAndSvg()}</span>;
    }
  }

  // Render the text content (title and badges) if available
  function renderTextContent() {
    let allBadgeData = { ...contactData, ...utilsData };
    return (
      <article className="hex-text-content">
        {hexTitle && <h3 className="hex-title">{hexTitle}</h3>}
        {badge1Id || badge2Id  || badgeComponent1 || badgeComponent2? <div className="hex-badges">
          {badge1Id && <Badge {...allBadgeData[badge1Id]} />}
          {badge2Id && <Badge {...allBadgeData[badge2Id]} />}
          {badgeComponent1 && badgeComponent1}
          {badgeComponent2 && badgeComponent2}
          </div> : <></>}

      </article>
    )
  }

  // Unique ID for this hex instance to scope CSS
  const uuid = useId();

  // Combine classes based on props
  const classes = `hex ${uuid} ${hexClass ? hexClass : ''} ${hexImagePath ? 'with-image' : ''} ${hexSvgComponent ? 'with-svg' : ''} ${hexOnClick ? 'with-onclick' : ''} ${hexLink ? 'with-link' : ''}`; // todo remove unused classes

  // Inline styles for adjustable width and margin
  const css = 
    `.hex-row:nth-child(even):has(.hex.${uuid}) {
        margin-left: calc(${hexWidth}px / 2 + ${hexMargin}px);
    }
    .hex.${uuid} {
        width: ${hexWidth}px;
        min-width: ${hexWidth}px;
        margin: ${hexMargin}px ${hexMargin}px calc(${hexMargin}px - ${hexWidth}px * 0.2886 + 1px); 
        height: calc(${hexWidth}px * 1.1547);
    }`;

  // If hexClass is "random", apply a random background color from predefined CSS variables, memoized per mount
  const randomColor = useMemo(() => {
    if (hexClass === "random") {
      return `var(--color-${Math.floor(Math.random() * 12) + 1})`;
    }
    return undefined;
  }, [hexClass]);
  if(hexClass === "random" && !hexStyle) {
    hexStyle = { background: randomColor };
  }
  
  return (
    <div className={classes} style={hexStyle} tabIndex={hexOnClick || hexLink ? 0 : undefined} aria-pressed={hexOnClick ? "false" : undefined} aria-label={hexTitle ? hexTitle : (hexOnClick ? 'Hex button' : (hexLink ? 'Hex link' : undefined))}>
      <style>
        {css}
      </style>
      {hasFullAreaContent() && renderFullAreaContent()}
      {hasTextContent() && renderTextContent()}
    </div>
  )
}

export default memo(Hex);
