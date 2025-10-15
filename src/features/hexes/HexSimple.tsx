import { useId, useMemo, memo } from "react"
import { getImageUrl } from "@/utils/images"
import Badge from "@/components/global/badge"
import OptimizedImage from "@/components/global/OptimizedImage"
import { utilsData } from "@/data/global/utils" 
import { contactData } from "@/data/global/contacts"
import { scrollToTarget } from "@/utils/site"
import type { JSX } from "react"

import './styles/hex.css'
import './styles/hexColors.css'
import './styles/hexSvgFills.css'

type HexProps = {
  hexClass?: string,
  hexStyle?: React.CSSProperties,
  content?: string | JSX.Element,
  contentType?: 'image' | 'badge' | 'visual' | 'text',
  hexWidth?: number,
  hexMargin?: number,
  onClick?: () => void,
  href?: string,
  ariaLabel?: string,
  tabIndex?: number,
}

function Hex({  
  hexClass = '',
  hexStyle, 
  content,
  contentType = 'text',
  hexWidth = 122,
  hexMargin = 3,
  onClick,
  href,
  ariaLabel,
  tabIndex,
}: HexProps) {

  // Simplified content rendering - no auto-detection
  const renderContent = () => {
    if (!content) return null
    
    switch (contentType) {
      case 'image':
        return (
          <div className="hex-visual-content">
            {hexWidth >= 300 ? (
              <OptimizedImage
                src={getImageUrl(content as string)}
                alt=""
                className="hex-image"
                objectFit="cover"
              />
            ) : (
              <img src={getImageUrl(content as string)} alt="" className="hex-image" />
            )}
          </div>
        )
      
      case 'badge':
        return (
          <div className="hex-text-content">
            <div className="hex-badges">
              <Badge {...{ ...contactData, ...utilsData }[content as string]} />
            </div>
          </div>
        )
      
      case 'visual':
        return (
          <div className="hex-visual-content">
            {content}
          </div>
        )
      
      default: // text
        return (
          <div className="hex-text-content">
            {content}
          </div>
        )
    }
  }

  // Handle link clicks (internal vs external)
  const handleLinkClick = (e: React.MouseEvent) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      scrollToTarget(href.substring(1))
    }
  }

  // Unique ID for this hex instance to scope CSS
  const uuid = useId();

  // Combine classes based on props
  const contentClass = content 
    ? contentType === 'image' 
      ? 'with-image' 
      : 'with-svg'
    : ''
  const classes = `hex ${uuid} ${hexClass} ${contentClass}`.trim()

  // Memoize CSS to avoid regenerating on every render
  const css = useMemo(() => 
    `.hex-row:nth-child(even):has(.hex.${uuid}) {
        margin-left: calc(${hexWidth}px / 2 + ${hexMargin}px);
    }
    .hex.${uuid} {
        width: ${hexWidth}px;
        min-width: ${hexWidth}px;
        margin: ${hexMargin}px ${hexMargin}px calc(${hexMargin}px - ${hexWidth}px * 0.2886 + 1px); 
        height: calc(${hexWidth}px * 1.1547);
    }`, [uuid, hexWidth, hexMargin]);

  // Common content
  const hexContent = (
    <>
      <style>{css}</style>
      {renderContent()}
    </>
  )

    // Add keyboard event handling
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) {
        onClick();
      }
    }
  };

  // Common props for all element types
  const commonProps = {
    className: classes,
    style: hexStyle,
    'aria-label': ariaLabel,
    tabIndex,
    onKeyDown: handleKeyDown
  }

  // Determine what type of element to render based on interaction props
  const isButton = onClick && !href
  const isLink = href && !onClick
  
  // Render as button
  if (isButton) {
    return (
      <button
        {...commonProps}
        onClick={onClick}
        type="button"
      >
        {hexContent}
      </button>
    )
  }

  // Render as link
  if (isLink) {
    const isExternalLink = href.startsWith('http') || href.startsWith('mailto:')
    
    return (
      <a
        {...commonProps}
        href={href}
        onClick={handleLinkClick}
        {...(isExternalLink && {
          target: "_blank",
          rel: "noopener noreferrer"
        })}
      >
        {hexContent}
      </a>
    )
  }

  // Render as div (display only)
  return (
    <div {...commonProps}>
      {hexContent}
    </div>
  )
}

export default memo(Hex);