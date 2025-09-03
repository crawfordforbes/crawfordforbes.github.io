import Badge from "../../components/global/badge"
import { getImgUrl } from "../../utils/images"
import { useId } from "react"

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
  badge1IconClass?: string,
  badge1Link?: string,
  badge1Title?: string,
  badge2IconClass?: string,
  badge2Link?: string,
  badge2Title?: string,
}

function Hex({  
  hexLink, 
  hexTitle, 
  hexClass,
  hexStyle, 
  hexImagePath, 
  hexSvgComponent,
  hexOnClick,
  hexWidth = 160,
  hexMargin = 10,
  badge1IconClass,
  badge1Link,
  badge1Title,
  badge2IconClass,
  badge2Link,
  badge2Title,
}: HexProps) {
  
  // Determine if there is any text content to display
  function hasTextContent() {
    return badge1IconClass || badge1Title || badge2IconClass || badge2Title || hexTitle;
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
      return <button onClick={hexOnClick} className="hex-full-area-content" aria-label={hexTitle ? hexTitle : 'Hex button'}>{renderImageAndSvg()}</button>;
    } else if (hexLink) {
      return <a href={hexLink} className="hex-full-area-content" aria-label={hexTitle ? hexTitle : 'Hex hexLink'}>{renderImageAndSvg()}</a>;
    } else {
      return <span className="hex-full-area-content">{renderImageAndSvg()}</span>;
    }
  }

  // Render the text content (title and badges) if available
  function renderTextContent() {
    return (
      <div className="hex-text-content">
        {hexTitle && <h3 className="hex-title">{hexTitle}</h3>}
        {badge1IconClass || badge1Title && <Badge iconClass={badge1IconClass} link={badge1Link} title={badge1Title}/>}
        {badge2IconClass || badge2Title && <Badge iconClass={badge2IconClass} link={badge2Link} title={badge2Title}/>}
      </div>
    )
  }

  // Unique ID for this hex instance to scope CSS
  const uuid = useId();

  // Combine classes based on props
  const classes = `hex ${uuid} ${hexClass ? hexClass : ''} ${hexImagePath ? 'with-image' : ''} ${hexSvgComponent ? 'with-svg' : ''} ${hexOnClick ? 'clickable' : ''} ${hexLink ? 'linkable' : ''}`;

  // Inline styles for adjustable width and margin
  const css = 
    `.hex.${uuid} .hex-row:nth-child(odd) {
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
