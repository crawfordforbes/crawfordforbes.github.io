import { useState, useCallback } from 'react';
import { errorLogger } from './errorLogger';

interface AsyncErrorState {
  error: Error | null;
  isLoading: boolean;
}

// Hook for handling async errors that error boundaries can't catch
export const useAsyncError = () => {
  const [state, setState] = useState<AsyncErrorState>({
    error: null,
    isLoading: false,
  });

  // Function to trigger an error that will be caught by error boundaries
  const throwError = useCallback((error: Error) => {
    throw error;
  }, []);

  // Wrapper for async operations
  const executeAsync = useCallback(async <T>(
    asyncFunction: () => Promise<T>,
    options?: {
      onError?: (error: Error) => void;
      throwOnError?: boolean;
    }
  ): Promise<T | null> => {
    setState({ error: null, isLoading: true });
    
    try {
      const result = await asyncFunction();
      setState({ error: null, isLoading: false });
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      setState({ error: errorObj, isLoading: false });
      
      // Log the async error
      errorLogger.logError({
        message: errorObj.message,
        stack: errorObj.stack,
        level: 'async',
      });
      
      if (options?.onError) {
        options.onError(errorObj);
      }
      
      if (options?.throwOnError) {
        throwError(errorObj);
      }
      
      return null;
    }
  }, [throwError]);

  // Function to clear errors
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Function to manually set an error
  const setError = useCallback((error: Error, shouldThrow = false) => {
    setState(prev => ({ ...prev, error }));
    
    if (shouldThrow) {
      throwError(error);
    }
  }, [throwError]);

  return {
    error: state.error,
    isLoading: state.isLoading,
    executeAsync,
    clearError,
    setError,
    throwError,
  };
};

// Error types for common scenarios
export class NetworkError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class ValidationError extends Error {
  field?: string;
  
  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// Utility function for handling promise rejections
export const handleAsyncError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  return new Error('An unknown error occurred');
};