/**
 * Logger utility - wraps console methods with development-only behavior
 * Production builds will only log errors, not debug/info/warn
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDev = import.meta.env.DEV;

export const logger = {
  /**
   * Debug logging - only in development
   * Use for detailed troubleshooting information
   */
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args);
    }
  },

  /**
   * Info logging - only in development
   * Use for general informational messages
   */
  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  },

  /**
   * Warning logging - only in development
   * Use for non-critical issues that should be addressed
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Error logging - always logged (dev and production)
   * Use for critical errors that need attention
   * Consider also tracking to analytics in production
   */
  error: (...args: any[]) => {
    console.error(...args);
    // Optional: Send to analytics in production
    if (!isDev && args[0] instanceof Error) {
      import('@/utils/analytics').then(({ trackError }) => {
        trackError(args[0] as Error);
      });
    }
  },

  /**
   * Conditional logging based on level
   */
  log: (level: LogLevel, ...args: any[]) => {
    switch (level) {
      case 'debug':
        logger.debug(...args);
        break;
      case 'info':
        logger.info(...args);
        break;
      case 'warn':
        logger.warn(...args);
        break;
      case 'error':
        logger.error(...args);
        break;
    }
  }
};

export default logger;
