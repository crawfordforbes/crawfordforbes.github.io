import { useId, useContext } from "react"
import { getImgUrl } from "@/utils/images"
import { MediaQueryContext } from "@/utils/context"

import Badge from "@/components/global/badge"
import { badgeData } from "@/data/global/badges" 

import type { JSX } from "react"

import './styles/hex.css'
import './styles/hexColors.css'
import './styles/hexSvgFills.css'

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
  hexWidth,
  hexMargin = 3,
  badge1Id,
  badge2Id,
  badgeComponent1,
  badgeComponent2,
}: HexProps) {

  const mediaQuery = useContext(MediaQueryContext);
  if (!hexWidth) {
 
    switch (mediaQuery) {
      case "mobile":
        hexWidth = 122;
        break;
      case "tablet":
        hexWidth = 170;
        break;
      case "desktop":
        hexWidth = 250;
        break;
      case "large":
        hexWidth = 250;
        break;
      default: 
        hexWidth = 170;
    }
  }
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
    return (
      <div className="hex-text-content">
        {hexTitle && <h3 className="hex-title">{hexTitle}</h3>}
        {badge1Id || badge2Id  || badgeComponent1 || badgeComponent2? <div className="hex-badges">
          {badge1Id && <Badge {...badgeData[badge1Id]} />}
          {badge2Id && <Badge {...badgeData[badge2Id]} />}
          {badgeComponent1 && badgeComponent1}
          {badgeComponent2 && badgeComponent2}
          </div> : <></>}

      </div>
    )
  }

  // Unique ID for this hex instance to scope CSS
  const uuid = useId();

  // Combine classes based on props
  const classes = `hex ${uuid} ${hexClass ? hexClass : ''} ${hexImagePath ? 'with-image' : ''} ${hexSvgComponent ? 'with-svg' : ''} ${hexOnClick ? 'clickable' : ''} ${hexLink ? 'linkable' : ''}`;

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

export default Hex
