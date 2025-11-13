/**
 * Minimal Analytics Implementation
 * Simple Google Analytics 4 tracking without bloat
 */

// Type declarations for gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Config
const GA_ID = 'G-6EJ8FEHZ90';
const ENABLE_IN_DEV = true;

// State
let enabled = !!(GA_ID && (import.meta.env.PROD || ENABLE_IN_DEV));
let initialized = false;
const eventQueue: Array<() => void> = [];

// Initialization
export async function initialize(): Promise<void> {
  if (!enabled || !GA_ID) {
    console.info('📊 Analytics disabled');
    return;
  }

  try {
    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      send_page_view: false // Manual page view tracking for SPA
    });

    // Load GA script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.onload = () => {
      initialized = true;
      console.info('✅ Analytics script loaded, flushing queued events');
      // Flush queued events
      while (eventQueue.length > 0) {
        const fn = eventQueue.shift();
        fn?.();
      }
    };
    script.onerror = () => {
      console.warn('⚠️ Analytics script failed to load');
      enabled = false;
      eventQueue.length = 0; // Clear queue
    };
    document.head.appendChild(script);

    console.info('✅ Analytics initialized (script loading...)');
  } catch (error) {
    console.error('❌ Analytics initialization failed:', error);
    enabled = false;
  }
}

// Track page view
export function trackPageView(path?: string): void {
  if (!enabled || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path || window.location.pathname
  });
}

// Track generic event
export function trackEvent(action: string, category: string = 'general', label?: string): void {
  if (!enabled) return;

  console.log(`📊 Tracking event: action=${action}, category=${category}, label=${label}`);

  const sendEvent = () => {
    if (window.gtag) {
      console.log('🔍 gtag exists, calling with:', { action, category, label });
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
      console.log('✅ Event sent to GA');
      console.log('🔍 Check Network tab for requests to www.google-analytics.com/g/collect or /collect');
    }
  };

  // If gtag is ready, send immediately; otherwise queue it
  if (initialized && window.gtag) {
    sendEvent();
  } else {
    console.log('⏳ Queueing event (gtag not ready yet)');
    eventQueue.push(sendEvent);
  }
}

// Track click
export function trackClick(element: string, category?: string): void {
  trackEvent('click', category || 'engagement', element);
}

// Track error
export function trackError(error: Error, category: string = 'javascript_error'): void {
  if (!enabled) return;
  trackEvent('error', category, error.message);
}

// Track performance metric
export function trackPerformance(name: string, value: number): void {
  trackEvent('performance_metric', 'performance', `${name}: ${Math.round(value)}`);
}

// Legacy export for backwards compatibility
export const analytics = {
  initialize,
  trackPageView,
  trackEvent,
  trackError
};

// Development helper
if (import.meta.env.DEV) {
  (window as any).analytics = analytics;
  console.info('📊 Analytics available at window.analytics');
}