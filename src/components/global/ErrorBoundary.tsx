import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { errorLogger } from '../../utils/errorLogger';
import './styles/errorBoundary.css';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  level: 'app' | 'page' | 'component';
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Log error using centralized logger
    errorLogger.logError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack ?? undefined,
      level: this.props.level,
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      return this.props.fallback ?? this.renderDefaultFallback();
    }

    return this.props.children;
  }

  private renderDefaultFallback() {
    const { level, showErrorDetails } = this.props;
    const { error, errorInfo } = this.state;

    const isDev = import.meta.env.DEV;

    if (level === 'app') {
      return (
        <div className="error-boundary error-boundary--app">
          <div className="error-boundary__content">
            <h1>Oops! Something went wrong</h1>
            <p>We're sorry, but the application has encountered an unexpected error.</p>
            <div className="error-boundary__actions">
              <button onClick={this.handleReload} className="error-boundary__button">
                Reload Page
              </button>
            </div>
            {showErrorDetails && isDev && (
              <details className="error-boundary__details">
                <summary>Error Details (Development)</summary>
                <pre className="error-boundary__stack">
                  {error?.message}
                  {error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    if (level === 'page') {
      return (
        <div className="error-boundary error-boundary--page">
          <div className="error-boundary__content">
            <h2>Page Error</h2>
            <p>Sorry, this page couldn't load properly.</p>
            <div className="error-boundary__actions">
              <button onClick={this.handleRetry} className="error-boundary__button">
                Try Again
              </button>
              <button onClick={this.handleReload} className="error-boundary__button error-boundary__button--secondary">
                Reload Page
              </button>
            </div>
            {showErrorDetails && isDev && (
              <details className="error-boundary__details">
                <summary>Error Details (Development)</summary>
                <pre className="error-boundary__stack">
                  {error?.message}
                  {error?.stack}
                  {errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // Component level fallback
    return (
      <div className="error-boundary error-boundary--component">
        <div className="error-boundary__content">
          <p>Unable to load this section</p>
          <button onClick={this.handleRetry} className="error-boundary__button error-boundary__button--small">
            Retry
          </button>
          {showErrorDetails && isDev && (
            <details className="error-boundary__details error-boundary__details--small">
              <summary>Debug Info</summary>
              <pre className="error-boundary__stack">
                {error?.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}