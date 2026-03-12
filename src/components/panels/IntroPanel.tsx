import { useRef, useEffect } from "react";

import { introPanelContent } from "@/data/content/introPanel";

import './styles/introPanel.css'

function IntroPanel() {
const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null); // Cache the dimensions

  useEffect(() => {
    // 1. Function to update the cached dimensions
    const updateRect = () => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    // Initialize and update on resize/scroll
    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    const handleMouseMove = (event: MouseEvent) => {
      if (!rectRef.current || !containerRef.current) return;

      requestAnimationFrame(() => {
        const rect = rectRef.current!;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const deg = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
        
        // Update the CSS variable directly
        containerRef.current?.style.setProperty('--mouse-angle', `${deg}deg`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  return (
    <article className="intro-panel" ref={containerRef}>
      {introPanelContent.title && (
        <h3 className="dynamic-title">
          {introPanelContent.title}
        </h3>
      )}
      {introPanelContent.description && (
        
          <div className="description text-content" dangerouslySetInnerHTML={{ __html: introPanelContent.description || '' }} />
        
      )}
    </article>

  )
}

export default IntroPanel
