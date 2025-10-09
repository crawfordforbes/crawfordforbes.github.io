/**
 * Analytics & Monitoring Utilities
 * Comprehensive tracking setup for Google Analytics, error monitoring, and custom events
 */

/* TODO review this file more */

import { siteConfig } from './siteConfig';

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface UserProperties {
  user_id?: string;
  custom_map?: Record<string, any>;
}

export interface AnalyticsConfig {
  gaId?: string;
  gtmId?: string;
  sentryDsn?: string;
  enableInDevelopment?: boolean;
  enableUserTracking?: boolean;
  enablePerformanceTracking?: boolean;
  enableErrorTracking?: boolean;
}

/**
 * Analytics Manager
 * Handles Google Analytics, GTM, and custom event tracking
 */
export class AnalyticsManager {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private isGALoaded = false;
  private eventQueue: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig = {}) {
    this.config = {
      enableInDevelopment: false,
      enableUserTracking: true,
      enablePerformanceTracking: true,
      enableErrorTracking: true,
      ...config
    };
  }

  /**
   * Initialize analytics services
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Skip in development unless explicitly enabled
    if (import.meta.env.DEV && !this.config.enableInDevelopment) {
      console.info('📊 Analytics disabled in development mode');
      return;
    }

    console.info('📊 Initializing analytics...');

    try {
      // Initialize Google Analytics
      if (this.config.gaId) {
        await this.initializeGoogleAnalytics();
      }

      // Initialize Google Tag Manager
      if (this.config.gtmId) {
        this.initializeGTM();
      }

      // Initialize error tracking
      if (this.config.enableErrorTracking && this.config.sentryDsn) {
        await this.initializeSentry();
      }

      // Process queued events
      this.processEventQueue();

      this.isInitialized = true;
      console.info('✅ Analytics initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize analytics:', error);
    }
  }

  /**
   * Initialize Google Analytics 4
   */
  private async initializeGoogleAnalytics(): Promise<void> {
    if (!this.config.gaId) return;

    return new Promise((resolve, reject) => {
      try {
        // Load GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
        script.onload = () => {
          // Initialize gtag
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).gtag = function() {
            (window as any).dataLayer.push(arguments);
          };

          const gtag = (window as any).gtag;
          
          gtag('js', new Date());
          gtag('config', this.config.gaId, {
            // Enhanced measurement
            enhanced_measurements: true,
            // Privacy settings
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            // Custom settings
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              custom_dimension_1: 'user_type',
              custom_dimension_2: 'content_group'
            }
          });

          this.isGALoaded = true;
          console.info('✅ Google Analytics loaded');
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Initialize Google Tag Manager
   */
  private initializeGTM(): void {
    if (!this.config.gtmId) return;

    try {
      // GTM initialization
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      // Load GTM script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.gtmId}`;
      document.head.appendChild(script);

      console.info('✅ Google Tag Manager loaded');
    } catch (error) {
      console.error('❌ Failed to load GTM:', error);
    }
  }

  /**
   * Initialize Sentry for error tracking
   * Currently disabled - uncomment and install @sentry/browser to enable
   */
  private async initializeSentry(): Promise<void> {
    if (!this.config.sentryDsn) return;

    console.info('📊 Sentry error tracking is disabled (not installed)');
    
    /* Uncomment this section when you want to add Sentry:
    
    try {
      // Install @sentry/browser first: npm install @sentry/browser
      const sentryModule = await import('@sentry/browser');
      const Sentry = sentryModule.default || sentryModule;
      
      Sentry.init({
        dsn: this.config.sentryDsn,
        environment: import.meta.env.MODE,
        release: import.meta.env.VITE_APP_VERSION || '1.0.0',
        integrations: [
          new Sentry.BrowserTracing(),
        ],
        tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
        beforeSend(event: any) => {
          // Filter out development errors in production
          if (import.meta.env.PROD && event.level === 'warning') {
            return null;
          }
          return event;
        }
      });

      console.info('✅ Sentry error tracking initialized');
    } catch (error) {
      console.warn('⚠️ Sentry initialization failed:', error);
    }
    */
  }

  /**
   * Track page view
   */
  trackPageView(path?: string, title?: string): void {
    if (!this.isInitialized && !import.meta.env.DEV) {
      return;
    }

    const pagePath = path || window.location.pathname;
    const pageTitle = title || document.title;

    if (this.isGALoaded && (window as any).gtag) {
      (window as any).gtag('config', this.config.gaId, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }

    // Custom page view tracking
    this.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: pagePath,
      customParameters: {
        page_title: pageTitle,
        page_location: window.location.href
      }
    });

    console.debug('📊 Page view tracked:', pagePath);
  }

  /**
   * Track custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized && !import.meta.env.DEV) {
      this.eventQueue.push(event);
      return;
    }

    try {
      // Google Analytics 4 event tracking
      if (this.isGALoaded && (window as any).gtag) {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.customParameters
        });
      }

      // GTM data layer push
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'custom_event',
          event_action: event.action,
          event_category: event.category,
          event_label: event.label,
          event_value: event.value,
          ...event.customParameters
        });
      }

      console.debug('📊 Event tracked:', event);
    } catch (error) {
      console.error('❌ Failed to track event:', error);
    }
  }

  /**
   * Track user interaction
   */
  trackInteraction(element: string, action: string, details?: Record<string, any>): void {
    this.trackEvent({
      action: action,
      category: 'user_interaction',
      label: element,
      customParameters: details
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number, category = 'performance'): void {
    if (!this.config.enablePerformanceTracking) return;

    this.trackEvent({
      action: metric,
      category: category,
      value: Math.round(value),
      customParameters: {
        metric_name: metric,
        metric_value: value,
        user_agent: navigator.userAgent,
        connection_type: this.getConnectionType()
      }
    });
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: string): void {
    if (!this.config.enableErrorTracking) return;

    this.trackEvent({
      action: 'error_occurred',
      category: 'errors',
      label: error.message,
      customParameters: {
        error_name: error.name,
        error_stack: error.stack,
        error_context: context,
        page_location: window.location.href
      }
    });

    console.error('📊 Error tracked:', error);
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: UserProperties): void {
    if (!this.config.enableUserTracking) return;

    try {
      if (this.isGALoaded && (window as any).gtag) {
        (window as any).gtag('config', this.config.gaId, {
          custom_map: properties.custom_map
        });

        if (properties.user_id) {
          (window as any).gtag('config', this.config.gaId, {
            user_id: properties.user_id
          });
        }
      }

      console.debug('📊 User properties set:', properties);
    } catch (error) {
      console.error('❌ Failed to set user properties:', error);
    }
  }

  /**
   * Process queued events
   */
  private processEventQueue(): void {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        this.trackEvent(event);
      }
    }
  }

  /**
   * Get connection type for performance analysis
   */
  private getConnectionType(): string {
    if ('connection' in navigator) {
      return (navigator as any).connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  /**
   * Get analytics configuration for debugging
   */
  getConfig(): AnalyticsConfig {
    return { ...this.config };
  }

  /**
   * Check if analytics is ready
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

/**
 * Ready-to-use analytics instance
 * Configure with your actual tracking IDs when ready
 */
export const analytics = new AnalyticsManager({
  gaId: siteConfig.analytics.googleAnalyticsId,
  gtmId: siteConfig.analytics.gtmId,
  // sentryDsn: 'your-sentry-dsn-here', // Uncomment when ready
  enableInDevelopment: false, // Set to true for testing
  enableUserTracking: true,
  enablePerformanceTracking: true,
  enableErrorTracking: true
});

/**
 * Convenience functions for common tracking scenarios
 */
export const trackPageView = (path?: string, title?: string) => analytics.trackPageView(path, title);
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackClick = (element: string, details?: Record<string, any>) => 
  analytics.trackInteraction(element, 'click', details);
export const trackError = (error: Error, context?: string) => analytics.trackError(error, context);
export const trackPerformance = (metric: string, value: number) => analytics.trackPerformance(metric, value);

/**
 * Hook into global error handling for automatic error tracking
 */
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    analytics.trackError(new Error(event.message), `${event.filename}:${event.lineno}`);
  });

  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackError(new Error(event.reason), 'unhandled_promise_rejection');
  });
}