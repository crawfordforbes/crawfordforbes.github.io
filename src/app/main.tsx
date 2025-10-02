import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initPerformanceMonitoring } from '../utils/performance'

// Initialize performance monitoring in development
initPerformanceMonitoring()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
