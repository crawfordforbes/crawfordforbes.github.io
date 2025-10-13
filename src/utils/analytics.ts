/**
 * Minimal Analytics Implementation
 * Simple Google Analytics 4 tracking without bloat
 */

interface SimpleAnalyticsConfig {
  gaId?: string;
  enableInDevelopment?: boolean;
}

class SimpleAnalytics {
  private gaId?: string;
  private enabled = false;

  constructor(config: SimpleAnalyticsConfig = {}) {
    this.gaId = config.gaId;
    this.enabled = !!(config.gaId && (import.meta.env.PROD || config.enableInDevelopment));
  }

  async initialize(): Promise<void> {
    if (!this.enabled || !this.gaId) {
      console.info('📊 Analytics disabled');
      return;
    }

    try {
      // Load GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
      document.head.appendChild(script);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function() {
        (window as any).dataLayer.push(arguments);
      };

      const gtag = (window as any).gtag;
      gtag('js', new Date());
      gtag('config', this.gaId, {
        anonymize_ip: true,
        allow_google_signals: false
      });

      console.info('✅ Analytics initialized');
    } catch (error) {
      console.error('❌ Analytics initialization failed:', error);
    }
  }

  trackPageView(path?: string): void {
    if (!this.enabled || !this.gaId) return;

    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('config', this.gaId, {
        page_path: path || window.location.pathname
      });
    }
  }

  trackEvent(action: string, category: string = 'general', label?: string): void {
    if (!this.enabled) return;

    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  trackError(error: Error, category: string = 'javascript_error'): void {
    if (!this.enabled) return;

    this.trackEvent('error', category, error.message);
  }
}

// Simple instance - no complex configuration needed
export const analytics = new SimpleAnalytics({
  gaId: 'G-6EJ8FEHZ90', // Move config inline since it's just one value
  enableInDevelopment: false
});

// Simple exports
export const trackPageView = (path?: string) => analytics.trackPageView(path);
export const trackEvent = (action: string, category?: string, label?: string) => 
  analytics.trackEvent(action, category, label);
export const trackClick = (element: string, category?: string) => 
  analytics.trackEvent('click', category || 'engagement', element);
export const trackError = (error: Error, category?: string) => 
  analytics.trackError(error, category);
export const trackPerformance = (name: string, value: number) => 
  analytics.trackEvent('performance_metric', 'performance', `${name}: ${Math.round(value)}`);

// Development helper
if (import.meta.env.DEV) {
  (window as any).analytics = analytics;
  console.info('📊 Analytics available at window.analytics');
}