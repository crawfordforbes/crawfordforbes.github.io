/**
 * Analytics & Monitoring Utilities
 * Comprehensive tracking setup for Google Analytics, error monitoring, and custom events
 */

import { logger } from './logger';

export interface SiteConfig {
  analytics: {
    googleAnalyticsId?: string;
    gtmId?: string;
  };
}

export const siteConfig: SiteConfig = {
  analytics: {
    googleAnalyticsId: "G-6EJ8FEHZ90",
    gtmId: undefined,
  }
};

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

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export class AnalyticsManager {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private isGALoaded = false;
  private eventQueue: AnalyticsEvent[] = [];
  private initPromise: Promise<void> | null = null;

  constructor(config: AnalyticsConfig = {}) {
    this.config = {
      enableUserTracking: true,
      enablePerformanceTracking: true,
      enableErrorTracking: true,
      enableInDevelopment: false,
      ...config
    };

    logger.debug('📊 Analytics config:', this.config);
  }

  /**
   * Initialize analytics services
   */
  async initialize(): Promise<void> {
    if (this.initPromise) return this.initPromise;
    
    if (this.isInitialized) {
      logger.debug('📊 Analytics already initialized');
      return Promise.resolve();
    }

    if (import.meta.env.DEV && !this.config.enableInDevelopment) {
      logger.info('📊 Analytics disabled in development mode');
      logger.info('📊 Set enableInDevelopment: true to test analytics locally');
      return Promise.resolve();
    }

    logger.info('📊 Initializing analytics...');

    this.initPromise = (async () => {
      try {
        if (this.config.gaId) {
          await this.initializeGoogleAnalytics();
        } else {
          logger.warn('⚠️ No GA ID provided');
        }

        if (this.config.gtmId) {
          this.initializeGTM();
        }

        if (this.config.enableErrorTracking && this.config.sentryDsn) {
          await this.initializeSentry();
        }

        this.isInitialized = true;
        this.processEventQueue();
        logger.info('✅ Analytics initialized successfully');
      } catch (error) {
        logger.error('❌ Failed to initialize analytics:', error);
        this.isInitialized = true;
      }
    })();

    return this.initPromise;
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    if (!this.config.gaId) return;

    logger.debug('📊 Loading Google Analytics script...');

    return new Promise((resolve, reject) => {
      try {
        if (window.gtag) {
          logger.debug('📊 Google Analytics already loaded');
          this.isGALoaded = true;
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
        
        script.onload = () => {
          // Wait for gtag.js to define gtag in window
          setTimeout(() => {
            if (!window.gtag) {
              // Fallback if gtag wasn't defined by script
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag() {
                window.dataLayer?.push(arguments);
              };
            }

            const gtag = window.gtag;
            
            logger.debug('📊 Configuring GA with ID:', this.config.gaId);
            
            gtag('js', new Date());
            gtag('config', this.config.gaId!, {
              send_page_view: false, // We'll send manually
              debug_mode: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });

            this.isGALoaded = true;
            logger.info('✅ Google Analytics loaded and configured');
            logger.debug('📊 dataLayer length:', window.dataLayer?.length);
            resolve();
          }, 100); // Small delay to let gtag.js initialize
        };
        
        script.onerror = (error) => {
          logger.error('❌ Failed to load GA script:', error);
          reject(error);
        };
        
        document.head.appendChild(script);
      } catch (error) {
        logger.error('❌ Error in GA initialization:', error);
        reject(error);
      }
    });
  }

  private initializeGTM(): void {
    if (!this.config.gtmId) return;

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.gtmId}`;
      document.head.appendChild(script);

      logger.info('✅ Google Tag Manager loaded');
    } catch (error) {
      logger.error('❌ Failed to load GTM:', error);
    }
  }

  private async initializeSentry(): Promise<void> {
    if (!this.config.sentryDsn) return;
    logger.info('📊 Sentry error tracking is disabled (not installed)');
  }

  trackPageView(path?: string, title?: string): void {
    const pagePath = path || window.location.pathname;
    const pageTitle = title || document.title;

    logger.info('📊 Tracking page view:', { pagePath, pageTitle, isInitialized: this.isInitialized, isGALoaded: this.isGALoaded });

    if (!this.isInitialized) {
      logger.warn('⚠️ Analytics not initialized, queueing page view');
      this.eventQueue.push({
        action: 'page_view',
        category: 'navigation',
        label: pagePath,
        customParameters: {
          page_title: pageTitle,
          page_location: window.location.href
        }
      });
      return;
    }

    if (this.isGALoaded && window.gtag) {
      window.gtag('config', this.config.gaId!, {
        page_path: pagePath,
        page_title: pageTitle,
      });
      logger.info('✅ GA page view sent:', pagePath);
    } else {
      logger.warn('⚠️ GA not loaded, cannot track page view');
    }

    this.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: pagePath,
      customParameters: {
        page_title: pageTitle,
        page_location: window.location.href
      }
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    logger.info('📊 Tracking event:', event.action, { isInitialized: this.isInitialized, isGALoaded: this.isGALoaded });

    if (!this.isInitialized) {
      logger.warn('⚠️ Analytics not initialized, queueing event:', event.action);
      this.eventQueue.push(event);
      return;
    }

    try {
      if (this.isGALoaded && window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.customParameters
        });
        logger.info('✅ GA event sent:', event.action);
      } else {
        logger.warn('⚠️ GA not loaded, cannot track event');
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'custom_event',
          event_action: event.action,
          event_category: event.category,
          event_label: event.label,
          event_value: event.value,
          ...event.customParameters
        });
        logger.debug('✅ GTM event pushed:', event.action);
      }
    } catch (error) {
      logger.error('❌ Failed to track event:', error);
    }
  }

  trackInteraction(element: string, action: string, details?: Record<string, any>): void {
    this.trackEvent({
      action: action,
      category: 'user_interaction',
      label: element,
      customParameters: details
    });
  }

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

    logger.error('📊 Error tracked:', error);
  }

  setUserProperties(properties: UserProperties): void {
    if (!this.config.enableUserTracking) return;

    try {
      if (this.isGALoaded && window.gtag) {
        window.gtag('config', this.config.gaId!, {
          custom_map: properties.custom_map
        });

        if (properties.user_id) {
          window.gtag('config', this.config.gaId!, {
            user_id: properties.user_id
          });
        }
      }

      logger.debug('📊 User properties set:', properties);
    } catch (error) {
      logger.error('❌ Failed to set user properties:', error);
    }
  }

  private processEventQueue(): void {
    if (this.eventQueue.length === 0) return;

    logger.info(`📊 Processing ${this.eventQueue.length} queued events`);
    
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        this.trackEvent(event);
      }
    }
  }

  private getConnectionType(): string {
    if ('connection' in navigator) {
      return (navigator as any).connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  getConfig(): AnalyticsConfig {
    return { ...this.config };
  }

  isReady(): boolean {
    return this.isInitialized && this.isGALoaded;
  }
}

export const analytics = new AnalyticsManager({
  gaId: siteConfig.analytics.googleAnalyticsId,
  gtmId: siteConfig.analytics.gtmId,
  enableInDevelopment: false,
  enableUserTracking: true,
  enablePerformanceTracking: true,
  enableErrorTracking: true
});

export const trackPageView = (path?: string, title?: string) => analytics.trackPageView(path, title);
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackClick = (element: string, details?: Record<string, any>) => 
  analytics.trackInteraction(element, 'click', details);
export const trackError = (error: Error, context?: string) => analytics.trackError(error, context);
export const trackPerformance = (metric: string, value: number) => analytics.trackPerformance(metric, value);

export function trackProjectView(projectId: string) {
  trackEvent({
    action: 'project_view',
    category: 'projects',
    label: projectId,
    customParameters: {
      project_id: projectId,
      timestamp: Date.now()
    }
  });
}

export function trackFilterUsage(filterType: string, filterValue: string) {
  trackEvent({
    action: 'filter_applied',
    category: 'filters',
    label: `${filterType}:${filterValue}`,
    customParameters: {
      filter_type: filterType,
      filter_value: filterValue
    }
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    analytics.trackError(new Error(event.message), `${event.filename}:${event.lineno}`);
  });

  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackError(new Error(event.reason), 'unhandled_promise_rejection');
  });
}
