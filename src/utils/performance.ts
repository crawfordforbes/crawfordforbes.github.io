import { useEffect, useRef } from 'react';

type PerformanceMetrics = {
  renderTime: number;
  componentName: string;
}

/**
 * Hook for monitoring component render performance
 */
export function usePerformanceMonitor(componentName: string, enabled = false) {
  const renderStartTime = useRef<number>(0);
  
  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    if (enabled) {
      const renderTime = performance.now() - renderStartTime.current;
      
      // Log performance metrics
      if (renderTime > 16) { // More than one frame at 60fps
        console.warn(`🐌 Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
      
      // Store metrics for analysis
      if (typeof window !== 'undefined' && (window as any).__PERFORMANCE_METRICS__) {
        (window as any).__PERFORMANCE_METRICS__.push({
          renderTime,
          componentName,
          timestamp: Date.now()
        } as PerformanceMetrics);
      }
    }
  });

  return {
    measureTime: (label: string, fn: () => void) => {
      if (!enabled) {
        fn();
        return;
      }
      
      const start = performance.now();
      fn();
      const end = performance.now();
      console.log(`⏱️ ${componentName} - ${label}: ${(end - start).toFixed(2)}ms`);
    }
  };
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    (window as any).__PERFORMANCE_METRICS__ = [];
    
    // Log performance summary every 10 seconds in development
    if (import.meta.env.DEV) {
      setInterval(() => {
        const metrics = (window as any).__PERFORMANCE_METRICS__ as PerformanceMetrics[];
        if (metrics.length > 0) {
          const avgRenderTime = metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length;
          console.log(`📊 Performance Summary - Avg render time: ${avgRenderTime.toFixed(2)}ms`);
          
          // Clear metrics
          (window as any).__PERFORMANCE_METRICS__ = [];
        }
      }, 10000);
    }
  }
}

export type UsePerformanceMonitorReturn = ReturnType<typeof usePerformanceMonitor>