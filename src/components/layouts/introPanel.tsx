import { introPanelContent } from "@/data/content/introPanel";

import { useRef, useState, useEffect } from "react";

import './styles/introPanel.css'

function IntroPanel() {
  const containerRef = useRef(null);
  const [gradientAngle, setGradientAngle] = useState(0);

  useEffect(() => {
  interface MouseMoveEvent extends MouseEvent {}

  interface ContainerRef extends HTMLDivElement {}

  const handleMouseMove = (event: MouseMoveEvent) => {
    if (!containerRef.current) return;

    const rect = (containerRef.current as ContainerRef).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const rad = Math.atan2(deltaY, deltaX); // Get angle in radians
    const deg = rad * 180 / Math.PI; // Convert to degrees

    // Adjust for CSS linear-gradient behavior, where 0deg is bottom-to-top
    // Adding 90 degrees rotates it so that 0deg is right-to-left
    const cssGradientAngle = deg; // + 90;

    setGradientAngle(cssGradientAngle);
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

  return (
    <article className="intro-panel text-area-gradient" ref={containerRef}>
      {introPanelContent.title && <h3 style={{ backgroundImage: `linear-gradient(${gradientAngle}deg, var(--color-1) 0%, var(--color-1) 20%, var(--color-2) 20%, var(--color-2) 30%, var(--color-3) 30%, var(--color-3) 35%, var(--color-4) 35%, var(--color-4) 40%, var(--color-5) 40%, var(--color-5) 45%, var(--color-6) 45%, var(--color-6) 50%, var(--color-7) 50%, var(--color-7) 55%, var(--color-8) 55%, var(--color-8) 60%, var(--color-9) 60%, var(--color-9) 65%, var(--color-10) 65%, var(--color-10) 70%, var(--color-11) 70%, var(--color-11) 80%, var(--color-12) 80%, var(--color-12) 100%)` }}>
        {introPanelContent.title}
      </h3>}
      {introPanelContent.descriptionHTML && <div className="description" dangerouslySetInnerHTML={{ __html: introPanelContent.descriptionHTML}} ></div>}
    </article>

  )
}

export default IntroPanel
