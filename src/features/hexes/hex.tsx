import { useId, useMemo, memo } from "react"
import { getImgUrl } from "@/utils/images"

import Badge from "@/components/global/badge"
import { utilsData } from "@/data/global/utils" 

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

  // Render the full area content based on the provided props
  function renderFullAreaContent() {
    if(hexOnClick) {
      return (
        <button
          onClick={hexOnClick}
          className="hex-full-area-content"
          aria-label={hexTitle ? hexTitle : 'Hex button'}
        >
          {renderImageAndSvg()}
        </button>
      );
    } else if (hexLink) {
      return (
        <a
          href={hexLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hex-full-area-content"
          aria-label={hexTitle ? hexTitle : 'Hex hexLink'}
        >
          {renderImageAndSvg()}
        </a>
      );
    } else {
      return <span className="hex-full-area-content">{renderImageAndSvg()}</span>;
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
  // how to keep this from happening on every render?

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
    <div className={classes} style={hexStyle}>
      <style>
        {css}
      </style>
      {hasFullAreaContent() && renderFullAreaContent()}
      {hasTextContent() && renderTextContent()}
    </div>
  )
}

export default memo(Hex);
