export const useErrorHandler = (): ((error: Error) => never) => {
  return (error: Error) => {
    // Intentionally throw so the nearest ErrorBoundary catches it
    throw error;
  };
};
