import ErrorBoundary from './ErrorBoundary';

import type { ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

// App-level error boundary - catches critical application errors
export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => {
  const handleAppError = (error: Error) => {
    // App-level errors are critical - could send to error tracking service
    console.error('Critical app error:', error);
    
    // Example: Track with analytics
    // analytics.track('app_error', {
    //   message: error.message,
    //   stack: error.stack,
    //   timestamp: Date.now(),
    // });
  };

  return (
    <ErrorBoundary 
      level="app" 
      onError={handleAppError}
    >
      {children}
    </ErrorBoundary>
  );
};

interface PageErrorBoundaryProps {
  children: ReactNode;
  pageName?: string;
}

// Page-level error boundary - catches page-specific errors
export const PageErrorBoundary = ({ children, pageName }: PageErrorBoundaryProps) => {
  const handlePageError = (error: Error) => {
    console.error(`Page error in ${pageName ?? 'unknown page'}:`, error);
    
    // Example: Track page-specific errors
    // analytics.track('page_error', {
    //   page: pageName,
    //   message: error.message,
    //   timestamp: Date.now(),
    // });
  };

  return (
    <ErrorBoundary 
      level="page" 
      componentName={pageName}
      onError={handlePageError}
    >
      {children}
    </ErrorBoundary>
  );
};

interface ComponentErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
}

// Component-level error boundary - catches individual component errors
export const ComponentErrorBoundary = ({ 
  children, 
  componentName, 
  fallback 
}: ComponentErrorBoundaryProps) => {
  const handleComponentError = (error: Error) => {
    console.warn(`Component error in ${componentName ?? 'unknown component'}:`, error);
  };

  return (
    <ErrorBoundary 
      level="component"
      componentName={componentName}
      fallback={fallback}
      onError={handleComponentError}
    >
      {children}
    </ErrorBoundary>
  );
};

// Hook for manually triggering errors (useful for testing)
export const useErrorHandler = () => {
  return (error: Error) => {
    // This will be caught by the nearest error boundary
    throw error;
  };
};