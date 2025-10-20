import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export const scrollToTarget = (targetId: string, time: number = 800) => {
  
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.error(`Element with ID '${targetId}' not found`);
    return;
  }
  
  // Get the target position, accounting for any fixed headers
  const headerOffset = 80; // Adjust this based on your nav height
  const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  
  let start: number | null = null;
  
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = easeInOutCubic(Math.min(progress / time, 1));
    window.scrollTo(0, window.pageYOffset + (targetY - window.pageYOffset) * easedProgress);
    
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else if (targetElement !== null) {
      // Only focus after scrolling is complete, and only if it won't cause issues
      if (targetElement.getAttribute('tabindex') !== null || targetElement.tagName === 'BUTTON' || targetElement.tagName === 'A') {
        targetElement.focus();
      }
    }
  }
  
  window.requestAnimationFrame(step);
};