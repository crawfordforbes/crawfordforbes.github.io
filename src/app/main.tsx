import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AppErrorBoundary } from '../components/global/ErrorBoundaryWrappers'
import { initPerformanceMonitoring } from '../utils/performance'

// Initialize performance monitoring in development
initPerformanceMonitoring()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
