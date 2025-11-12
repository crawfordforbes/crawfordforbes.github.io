/**
 * Minimal app-wide polyfills for older Safari support.
 * Excludes fetch and ResizeObserver polyfills per request.
 * Keep this file small and import it at the very top of the app entry.
 */

// Broad ES features (Array.from, Promise, Map, Set, etc.)
import 'core-js/stable';

// Async/await runtime for older engines
import 'regenerator-runtime/runtime';

// IntersectionObserver polyfill (commonly used for lazy loading / observers)
// This package exports a side-effectful module that defines window.IntersectionObserver
import 'intersection-observer';

// Smooth scroll polyfill (window.scroll / element.scrollIntoView behavior)
import { polyfill as smoothscrollPolyfill } from 'smoothscroll-polyfill';

// Apply the smoothscroll polyfill in a safe way
try {
  // initialize polyfill (no-op if already supported)
  smoothscrollPolyfill();
} catch (e) {
  // Swallow; we don't want polyfill initialization to break app startup
  // eslint-disable-next-line no-console
  console.debug('smoothscroll polyfill failed to initialize', e);
}

// NOTE: Do not import fetch or ResizeObserver polyfills here per request.
