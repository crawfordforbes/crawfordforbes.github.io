import './polyfills'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { AppErrorBoundary } from '@/components/global/ErrorBoundaryWrappers'

import { initPerformanceMonitoring } from '@/utils/performance'
import { initialize } from '@/utils/analytics'

// Initialize performance monitoring in development
initPerformanceMonitoring()

// Initialize analytics immediately (before render)
initialize();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id="root" not found in DOM');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
