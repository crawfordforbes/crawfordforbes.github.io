import { useState, useCallback } from 'react';

/**
 * UI utilities - accessibility, error handling, and user interface helpers
 */

// ===== ACCESSIBILITY =====
export function createAccessibleDescription(text: string, maxLength: number = 150): string {
  // Remove HTML tags and excessive whitespace
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) return cleanText;
  
  // Truncate at word boundary without ellipsis for better screen reader experience
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > maxLength * 0.8 
    ? truncated.substring(0, lastSpace)
    : truncated;
}

// ===== ERROR HANDLING =====
interface AsyncErrorState {
  error: Error | null;
  isLoading: boolean;
}

export const useAsyncError = () => {
  const [state, setState] = useState<AsyncErrorState>({
    error: null,
    isLoading: false,
  });

  const throwError = useCallback((error: Error) => {
    throw error;
  }, []);

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
      
      if (options?.onError) {
        options.onError(errorObj);
      }
      
      if (options?.throwOnError) {
        throw errorObj;
      }
      
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    error: state.error,
    isLoading: state.isLoading,
    executeAsync,
    clearError,
    throwError,
  };
};

// ===== SIMPLE ERROR TYPES =====
export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
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