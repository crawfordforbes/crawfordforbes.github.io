import './polyfills'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { AppErrorBoundary } from '@/components/global/ErrorBoundaryWrappers'

import { initPerformanceMonitoring } from '@/utils/performance'
import { analytics } from '@/utils/analytics'

// Initialize performance monitoring in development
initPerformanceMonitoring()

// Initialize analytics immediately (before render)
analytics.initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
