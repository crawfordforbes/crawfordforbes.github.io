import { useState, useEffect } from 'react';

// Layout types
export const mediaSizes = ["mobile", "tablet", "desktop", "large", "x-large"] as const;
export type MediaSizes = typeof mediaSizes[number];

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

export const scrollToTarget = (targetId: string, time: number = 800, targetUrl?: string, navigate?: (url: string) => void) => {
  // Update URL via the provided navigate callback if given
  if (targetUrl && typeof navigate === 'function') {
    navigate(targetUrl);
  }

  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    console.error(`Element with ID '${targetId}' not found`);
    return;
  }

  // Get the target position, accounting for any fixed headers
  const headerOffset = 80;
  const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

  let start: number | null = null;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easedProgress = easeInOutCubic(Math.min(progress / time, 1));
    window.scrollTo(0, window.pageYOffset + (targetY - window.pageYOffset) * easedProgress);

    if (progress < time) {
      window.requestAnimationFrame(step);
    } else if (targetElement !== null) {
      const tag = targetElement.tagName;
      if (targetElement.getAttribute('tabindex') !== null || tag === 'BUTTON' || tag === 'A') {
        (targetElement as HTMLElement).focus();
      }
    }
  }

  window.requestAnimationFrame(step);
};

export function createAccessibleDescription(text: string, maxLength: number = 150): string {
  // Remove HTML tags and excessive whitespace
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  if (cleanText.length <= maxLength) return cleanText;

  // Truncate at word boundary without ellipsis for better screen reader experience
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > maxLength * 0.8
    ? truncated.substring(0, lastSpace)
    : truncated;
}

export function getScreenSize(width: number): MediaSizes {
  const size: MediaSizes =
    width > 1919
      ? "x-large"
      : width > 1439
      ? "large"
      : width > 1023
      ? "desktop"
      : width > 639
      ? "tablet"
      : "mobile";
  return size;
}