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
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.error(`Element with ID '${targetId}' not found`);
    // If navigation requested but element missing, still update URL via router or history
    if (targetUrl) {
      if (typeof navigate === 'function') {
        navigate(targetUrl);
      } else {
        // update history and notify any React router listeners via an event
        try {
          if (window.location.pathname !== targetUrl) {
            window.history.pushState({}, '', targetUrl);
          }
        } catch (e) {
          console.warn('Failed to update URL via history.pushState', e);
        }

        try {
          const ev = new CustomEvent('app:navigate', { detail: { targetUrl } });
          window.dispatchEvent(ev);
        } catch (e) {
          // CustomEvent may not be constructable in some older environments
          // fallback to creating a plain event and attaching detail
          const ev: any = document.createEvent('Event');
          ev.initEvent('app:navigate', true, true);
          ev.detail = { targetUrl };
          window.dispatchEvent(ev);
        }
      }
    }
    return;
  }

  // Optionally update the URL first (router preferred)
  if (targetUrl) {
    if (typeof navigate === 'function') {
      // Let react-router handle the navigation so app routing state stays consistent
      try {
        navigate(targetUrl);
      } catch (e) {
        console.warn('navigate() threw an error, falling back to history.pushState', e);
        if (window.location.pathname !== targetUrl) {
          window.history.pushState({}, '', targetUrl);
        }

        // Inform any listeners
        try {
          const ev = new CustomEvent('app:navigate', { detail: { targetUrl } });
          window.dispatchEvent(ev);
        } catch (e) {
          const ev: any = document.createEvent('Event');
          ev.initEvent('app:navigate', true, true);
          ev.detail = { targetUrl };
          window.dispatchEvent(ev);
        }
      }
    } else {
      try {
        if (window.location.pathname !== targetUrl) {
          window.history.pushState({}, '', targetUrl);
        }
      } catch (e) {
        console.warn('Failed to update URL via history.pushState', e);
      }

      try {
        const ev = new CustomEvent('app:navigate', { detail: { targetUrl } });
        window.dispatchEvent(ev);
      } catch (e) {
        const ev: any = document.createEvent('Event');
        ev.initEvent('app:navigate', true, true);
        ev.detail = { targetUrl };
        window.dispatchEvent(ev);
      }
    }
  }

  // Get the target position, accounting for any fixed headers
  const headerOffset = 80; // Adjust this based on your nav height
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
      // Only focus after scrolling is complete, and only if it won't cause issues
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