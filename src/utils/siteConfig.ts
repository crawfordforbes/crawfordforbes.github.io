/**
 * Site Configuration
 * Analytics configuration for the portfolio
 */

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