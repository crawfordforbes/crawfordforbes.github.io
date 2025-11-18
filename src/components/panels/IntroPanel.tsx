import { useRef, useState, useEffect } from "react";

import { introPanelContent } from "@/data/content/introPanel";

import './styles/introPanel.css'

function IntroPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradientAngle, setGradientAngle] = useState(0);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Skip if animation frame already scheduled
      if (rafIdRef.current) return;
      
      rafIdRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafIdRef.current = 0;
          return;
        }
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const rad = Math.atan2(deltaY, deltaX);
        const deg = rad * 180 / Math.PI;
        setGradientAngle(deg);
        
        rafIdRef.current = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <article className="intro-panel" ref={containerRef}>
      {introPanelContent.title && <h3 style={{ backgroundImage: `linear-gradient(${gradientAngle}deg, var(--shade-1) 0%, var(--shade-3) 20%, var(--shade-2) 20%, var(--shade-4) 30%, var(--shade-3) 30%, var(--shade-5) 35%, var(--shade-4) 35%, var(--shade-6) 40%, var(--shade-5) 40%, var(--shade-7) 45%, var(--shade-6) 45%, var(--shade-6) 50%, var(--shade-5) 50%, var(--shade-7) 55%, var(--shade-6) 55%, var(--shade-8) 60%, var(--shade-7) 60%, var(--shade-9) 65%, var(--shade-8) 65%, var(--shade-10) 70%, var(--shade-9) 70%, var(--shade-11) 80%, var(--shade-10) 80%, var(--shade-12) 100%)` }}>
        {introPanelContent.title}
      </h3>}
      {introPanelContent.description && (
        
          <div className="description text-content" dangerouslySetInnerHTML={{ __html: introPanelContent.description || '' }} />
        
      )}
    </article>

  )
}

export default IntroPanel
