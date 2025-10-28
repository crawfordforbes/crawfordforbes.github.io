import { useMemo, memo, useCallback } from "react"
 
 import Badge from "@/components/global/Badge"
 import OptimizedImage from "@/components/global/OptimizedImage"
 
 import { badgeData, type BadgeRecord } from '@/data/global/badges'
 
 import { getImageUrl } from "@/utils/images"
 
 import type { JSX } from "react"
 
 import './styles/hex.css'
 import './styles/hexColors.css'
 import './styles/hexSvgFills.css'
 
export type HexProps = {
  id?: string,
  contactId?: string,
  type?: 'display' | 'button' | 'link',
  hexClass?: string,
  hexStyle?: React.CSSProperties,
  content?: string | JSX.Element,
  contentType?: 'auto' | 'image' | 'badge' | 'visual' | 'text',
  hexWidth?: number,
  hexMargin?: number,
  onClick?: (() => void) | undefined,
  href?: string,
  hexLink?: string,
  noTabIndex?: boolean,
  fullAreaContent?: boolean,
  ariaLabel?: string,
  tabIndex?: number,
}
 
 function Hex({  
   contactId,
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
     // if (!content) return null
 
   // contact resolved when needed via badgeData[contactId]
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
       
       case 'badge': {
         // resolve single badge record (BadgeRecord | undefined)
         const badgeKey = contactId || (typeof content === 'string' ? content : undefined);
         const badge: BadgeRecord | undefined = badgeKey ? badgeData[badgeKey] : undefined;
 
         // If there's no badge data and no fallback content, render nothing
         const fallbackTitle = typeof content === 'string' ? content : undefined;
         if (!badge && !fallbackTitle) return null;
 
         // build props using the shared BadgeRecord shape; annotate so TS narrows correctly
         const badgeProps: Partial<BadgeRecord> & { noTabIndex?: boolean } = {
           iconClass: badge?.iconClass,
           title: badge?.title ?? fallbackTitle,
           link: badge?.link,
           badgeOnClick: badge?.badgeOnClick,
           extraClass: badge?.extraClass,
         };
 
         return (
           <div className="hex-text-content">
             <div className="hex-badges">
               <Badge
                 iconClass={badgeProps.iconClass}
                 title={badgeProps.title}
                 link={badgeProps.link}
                 badgeOnClick={badgeProps.badgeOnClick}
                 extraClass={badgeProps.extraClass}
               />
             </div>
           </div>
         );
       }
       
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
 
  // Determine content class (image/svg/text)
  const contentClass = content
    ? contentType === 'image'
      ? 'with-image'
      : 'with-svg'
    : ''

  // Stable className so parent renders don't re-create string
  const classes = useMemo(() => `hex ${hexClass} ${contentClass}`.trim(), [hexClass, contentClass])
 
   // Stable keyboard handler
   const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
     if (event.key === 'Enter' || event.key === ' ') {
       event.preventDefault()
       if (onClick) onClick()
     }
   }, [onClick])
 
   // Memoize the badge (if used) and content nodes to avoid re-allocating JSX each render
   const contentNode = useMemo(() => {
     // badge case
     if (contentType === 'badge') {
       const badgeKey = contactId || (typeof content === 'string' ? content : undefined)
       const badge: BadgeRecord | undefined = badgeKey ? badgeData[badgeKey] : undefined
       const fallbackTitle = typeof content === 'string' ? content : undefined
       if (!badge && !fallbackTitle) return null
 
       return (
         <div className="hex-text-content">
           <div className="hex-badges">
             <Badge
               iconClass={badge?.iconClass}
               title={badge?.title ?? fallbackTitle}
               link={badge?.link}
               badgeOnClick={badge?.badgeOnClick}
               extraClass={badge?.extraClass}
             />
           </div>
         </div>
       )
     }
 
     // image case
     if (contentType === 'image') {
       const src = typeof content === 'string' ? getImageUrl(content) : undefined
       return (
         <div className="hex-visual-content">
           {hexWidth >= 300 ? (
             <OptimizedImage
               src={src ?? ''}
               alt=""
               className="hex-image"
               objectFit="cover"
             />
           ) : (
             <img src={src} alt="" className="hex-image" />
           )}
         </div>
       )
     }
 
     // visual / text / fallback
     if (contentType === 'visual') {
       return <div className="hex-visual-content">{content}</div>
     }
 
     return <div className="hex-text-content">{content}</div>
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [contentType, content, contactId, hexWidth])
 
  // Final memoized content
  const hexContent = useMemo(() => (
    <>
      {contentNode}
    </>
  ), [contentNode])
 
   // Common props for all element types (stable identity)
  // Inline CSS vars for layout (moved from per-hex <style> into CSS variables)
  const inlineVars: React.CSSProperties = useMemo(() => ({
    ['--hex-width' as any]: `${hexWidth}px`,
    ['--hex-margin' as any]: `${hexMargin}px`,
  }), [hexWidth, hexMargin])

  const commonProps = useMemo(() => ({
    className: classes,
    style: { ...(hexStyle as object), ...(inlineVars as object) } as React.CSSProperties,
    'aria-label': ariaLabel,
    tabIndex,
    onKeyDown: handleKeyDown
  }), [classes, hexStyle, ariaLabel, tabIndex, handleKeyDown, inlineVars])
 
   // Determine what type of element to render based on interaction props
   const isButton = Boolean(onClick) && !href
   const isLink = Boolean(href) && !onClick
 
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
     const isExternalLink = href?.startsWith('http') || href?.startsWith('mailto:')
     
     return (
       <a
         {...commonProps}
         href={href}
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