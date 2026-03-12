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
  debug: (...args: Parameters<typeof console.debug>): void => {
    if (isDev) {
      console.debug(...args);
    }
  },

  /**
   * Info logging - only in development
   * Use for general informational messages
   */
  info: (...args: Parameters<typeof console.info>): void => {
    if (isDev) {
      console.info(...args);
    }
  },

  /**
   * Warning logging - only in development
   * Use for non-critical issues that should be addressed
   */
  warn: (...args: Parameters<typeof console.warn>): void => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Error logging - always logged (dev and production)
   * Use for critical errors that need attention
   * Consider also tracking to analytics in production
   */
  error: (...args: Parameters<typeof console.error>): void => {
    console.error(...args);
  },

  /**
   * Conditional logging based on level
   */
  log: (level: LogLevel, ...args: Parameters<typeof console.log>): void => {
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
