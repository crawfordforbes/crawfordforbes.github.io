import { introPanelContent } from "@/data/content/introPanel";

import { useRef, useState, useEffect } from "react";

import './styles/introPanel.css'

function IntroPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradientAngle, setGradientAngle] = useState(0);


  useEffect(() => {
    interface MouseMoveEvent extends MouseEvent {}

    const handleMouseMove = (event: MouseMoveEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const rad = Math.atan2(deltaY, deltaX);
      const deg = rad * 180 / Math.PI;
      setGradientAngle(deg);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <article className="intro-panel text-area-gradient" ref={containerRef}>
      {introPanelContent.title && <h3 style={{ backgroundImage: `linear-gradient(${gradientAngle}deg, var(--color-1) 0%, var(--color-3) 20%, var(--color-2) 20%, var(--color-4) 30%, var(--color-3) 30%, var(--color-5) 35%, var(--color-4) 35%, var(--color-6) 40%, var(--color-5) 40%, var(--color-7) 45%, var(--color-6) 45%, var(--color-6) 50%, var(--color-5) 50%, var(--color-7) 55%, var(--color-6) 55%, var(--color-8) 60%, var(--color-7) 60%, var(--color-9) 65%, var(--color-8) 65%, var(--color-10) 70%, var(--color-9) 70%, var(--color-11) 80%, var(--color-10) 80%, var(--color-12) 100%)` }}>
        {introPanelContent.title}
      </h3>}
      {introPanelContent.descriptionHTML && 
        <div 
          className="description" 
          dangerouslySetInnerHTML={{ __html: introPanelContent.descriptionHTML}}
        ></div>
      }
    </article>

  )
}

export default IntroPanel
