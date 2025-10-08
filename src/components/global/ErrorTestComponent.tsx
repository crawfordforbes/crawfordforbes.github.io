import { useState } from 'react';
import { useAsyncError } from '@/utils/errorHandling';

interface ErrorTestComponentProps {
  componentName?: string;
}

// Feature flag for error test buttons
const SHOW_ERROR_TEST_BUTTONS = false; // Set to true to show error test buttons

// Component for testing error boundaries (development only)
export const ErrorTestComponent = ({ componentName = 'Test' }: ErrorTestComponentProps) => {
  const [shouldError, setShouldError] = useState(false);
  const { executeAsync, error: asyncError } = useAsyncError();

  if (!import.meta.env.DEV || !SHOW_ERROR_TEST_BUTTONS) {
    return null; // Only show in development when flag is enabled
  }

  // Trigger synchronous error (caught by error boundary)
  if (shouldError) {
    throw new Error(`Test error from ${componentName} component`);
  }

  // Trigger async error
  const triggerAsyncError = async (type: string) => {
    await executeAsync(async () => {
      switch (type) {
        case 'network':
          throw new Error('Simulated network error');
        case 'timeout':
          throw new Error('Request timeout');
        case 'validation':
          throw new Error('Validation failed');
        default:
          throw new Error('Generic async error');
      }
    }, {
      throwOnError: true, // This will cause the error to be thrown and caught by error boundary
    });
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: '#333', 
      color: 'white', 
      padding: '12px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        Error Testing ({componentName})
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <button
          onClick={() => setShouldError(true)}
          style={{
            padding: '4px 8px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Trigger Sync Error
        </button>
        
        <button
          onClick={() => triggerAsyncError('network')}
          style={{
            padding: '4px 8px',
            background: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Trigger Async Error
        </button>
      </div>
      
      {asyncError && (
        <div style={{ 
          marginTop: '8px', 
          fontSize: '10px', 
          color: '#ff6b6b',
          maxWidth: '200px',
          wordBreak: 'break-word'
        }}>
          Async Error: {asyncError.message}
        </div>
      )}
    </div>
  );
};

// HOC to easily add error testing to any component
export const withErrorTesting = <P extends object>(
  Component: React.ComponentType<P>, 
  componentName?: string
) => {
  return (props: P) => (
    <>
      <Component {...props} />
      <ErrorTestComponent componentName={componentName} />
    </>
  );
};