import { Component, type ErrorInfo, type ReactNode } from "react";

import './styles/errorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  level?: 'app' | 'page' | 'component';
  componentName?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.componentName || 'Component'}:`, error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const level = this.props.level || 'component';

      return (
        <div className={`error-boundary error-boundary--${level} ${this.state.hasError ? 'has-error' : ''}`} role="alert">
          <div className="error-boundary__content">
            <span className="error-boundary__icon" aria-hidden="true">⚠️</span>
            <h2 className="error-boundary__title">Something went wrong</h2>
            <p className="error-boundary__message">
              {this.props.componentName 
                ? `There was an error loading the ${this.props.componentName} ${level}.` 
                : `There was an error loading this ${level}.`}
            </p>
            <div className="error-boundary__actions">
              <button 
                onClick={() => this.setState({ hasError: false })}
                className="error-boundary__button error-boundary__button--primary"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="error-boundary__button error-boundary__button--secondary"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    // When no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;

// Legacy export for backwards compatibility
export { ErrorBoundary as ComponentErrorBoundary };