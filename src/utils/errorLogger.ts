interface ErrorLogEntry {
  message: string;
  stack?: string;
  componentStack?: string;
  level: 'app' | 'page' | 'component' | 'async';
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
}

class ErrorLogger {
  private logs: ErrorLogEntry[] = [];
  private maxLogs = 100; // Keep last 100 errors in memory
  private sessionId = this.generateSessionId();

  constructor() {
    this.setupGlobalErrorHandlers();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  private setupGlobalErrorHandlers() {
    // Catch unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        level: 'app',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId: this.sessionId,
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        level: 'async',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId: this.sessionId,
      });
    });
  }

  logError(entry: Partial<ErrorLogEntry> & Pick<ErrorLogEntry, 'message' | 'level'>) {
    const fullEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: this.sessionId,
      buildVersion: import.meta.env.VITE_APP_VERSION ?? 'unknown',
      ...entry,
    };

    this.logs.push(fullEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group(`🚨 Error [${entry.level}]`);
      console.error('Message:', entry.message);
      entry.stack && console.error('Stack:', entry.stack);
      entry.componentStack && console.error('Component Stack:', entry.componentStack);
      console.error('Full Entry:', fullEntry);
      console.groupEnd();
    }

    // Send to external service in production
    if (import.meta.env.PROD) {
      this.sendToExternalService(fullEntry);
    }
  }

  private async sendToExternalService(entry: ErrorLogEntry) {
    try {
      // Example integrations:
      
      // 1. Send to your own API
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry),
      // });

      // 2. Send to Sentry
      // if (window.Sentry) {
      //   window.Sentry.captureException(new Error(entry.message), {
      //     tags: { level: entry.level },
      //     extra: entry,
      //   });
      // }

      // 3. Send to LogRocket
      // if (window.LogRocket) {
      //   window.LogRocket.captureException(new Error(entry.message));
      // }

      // For now, just log that we would send it
      console.log('Would send error to external service:', entry);
      
    } catch (error) {
      console.error('Failed to send error to external service:', error);
    }
  }

  // Get all logged errors
  getLogs(): ErrorLogEntry[] {
    return [...this.logs];
  }

  // Get logs by level
  getLogsByLevel(level: ErrorLogEntry['level']): ErrorLogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  // Clear all logs
  clearLogs(): void {
    this.logs = [];
  }

  // Export logs as JSON for debugging
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Get error statistics
  getStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {} as Record<string, number>,
      byUrl: {} as Record<string, number>,
      recent: this.logs.slice(-10), // Last 10 errors
    };

    this.logs.forEach(log => {
      stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
      stats.byUrl[log.url] = (stats.byUrl[log.url] || 0) + 1;
    });

    return stats;
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Utility function for manual error logging
export const logError = (
  message: string, 
  level: ErrorLogEntry['level'] = 'component',
  additionalData?: Partial<ErrorLogEntry>
) => {
  errorLogger.logError({
    message,
    level,
    ...additionalData,
  });
};

// Development helper to access error logs from browser console
if (import.meta.env.DEV) {
  (window as any).errorLogger = errorLogger;
  console.log('Error logger available at window.errorLogger');
}