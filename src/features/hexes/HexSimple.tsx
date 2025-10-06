import { useId, useMemo, memo } from "react"
import { getImgUrl } from "@/utils/images"
import Badge from "@/components/global/badge"
import OptimizedImage from "@/components/global/OptimizedImage"
import { createImageSources, imageSizes } from "@/components/global/OptimizedImage"
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
  contentType?: 'auto' | 'image' | 'badge' | 'visual',
  hexWidth?: number,
  hexMargin?: number,
  // Interaction props (previously in wrappers)
  onClick?: () => void,
  href?: string,
  ariaLabel?: string,
  tabIndex?: number,
}

function Hex({  
  hexClass,
  hexStyle, 
  content,
  contentType = 'auto',
  hexWidth = 122,
  hexMargin = 3,
  onClick,
  href,
  ariaLabel,
  tabIndex,
}: HexProps) {

  // Auto-detect content type if not explicitly specified
  const detectContentType = (content: string | JSX.Element): 'image' | 'badge' | 'visual' => {
    if (typeof content === 'string') {
      // Check for image file extensions
      if (content.match(/\.(png|jpg|jpeg|svg|webp)$/i)) return 'image'
      // Check for image paths or URLs
      if (content.includes('/') || content.startsWith('http')) return 'image'
      // Default to badge lookup for strings
      return 'badge'
    }

    // JSX elements are visual content
    return 'visual'
  }

  const finalContentType = contentType === 'auto' && content 
    ? detectContentType(content)
    : contentType

  // Unified content rendering function
  const renderContent = () => {
    if (!content) return null

    const typeToRender = finalContentType

    if (typeToRender === 'image' && typeof content === 'string') {
      // Handle image path as string
      const useOptimizedImage = hexWidth >= 300; // Use OptimizedImage for larger hexes
      
      if (useOptimizedImage) {
        // Generate responsive sources for larger hex images
        const basePath = content.replace(/\.[^/.]+$/, ""); // Remove extension
        const imageSources = createImageSources(basePath, [400, 600, 800, 1200]);
        
        return (
          <div className="hex-visual-content">
            <OptimizedImage
              src={getImgUrl(content)}
              alt=""
              sources={imageSources}
              sizes={imageSizes.project}
              className="hex-image"
              objectFit="cover"
            />
          </div>
        );
      } else {
        // Use regular img for small hexes (icons, logos)
        return (
          <div className="hex-visual-content">
            <img src={getImgUrl(content)} alt="" className="hex-image"/>
          </div>
        );
      }
    }

    if (typeToRender === 'badge') {
      // Handle badge content
      const allBadgeData = { ...contactData, ...utilsData }
      
      return (
        <article className="hex-text-content">
          <div className="hex-badges">
            {typeof content === 'string' 
              ? <Badge {...allBadgeData[content]} />
              : content
            }
          </div>
        </article>
      )
    }

    if (typeToRender === 'visual') {
      // Handle JSX visual content (SVGs, custom components)
      return (
        <div className="hex-visual-content">
          {content}
        </div>
      )
    }

    return null
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
    ? (finalContentType === 'image' || (typeof content === 'string' && finalContentType === 'auto' && detectContentType(content) === 'image')) 
      ? 'with-image' 
      : 'with-svg'
    : ''
  const classes = `hex ${uuid} ${hexClass || ''} ${contentClass}`.trim()

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

  // Common props for all element types
  const commonProps = {
    className: classes,
    style: hexStyle,
    'aria-label': ariaLabel,
    tabIndex,
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