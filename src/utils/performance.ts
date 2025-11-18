import { logger } from './logger';

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

  // Record the start time during render so the effect below measures
  // the time spent between the start of render and when the browser
  // commits the paint (useEffect runs after paint).
  renderStartTime.current = performance.now();

  useEffect(() => {
    if (!enabled) return;

    const renderTime = performance.now() - renderStartTime.current;

    // Log performance metrics (warn only in production by default)
    if (renderTime > 16) { // More than one frame at 60fps
      // Keep the emoji for visibility, but avoid noisy logs in DEV by
      // allowing developers to enable the hook explicitly.
      logger.warn(`🐌 Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }

    // Store metrics for analysis
    if (typeof window !== 'undefined' && (window as any).__PERFORMANCE_METRICS__) {
      (window as any).__PERFORMANCE_METRICS__.push({
        renderTime,
        componentName,
        timestamp: Date.now()
      } as PerformanceMetrics);
    }
  }, [componentName, enabled]);

  return {
    measureTime: <T,>(label: string, fn: () => T): T => {
      const start = performance.now();
      try {
        const result = fn();
        const end = performance.now();
        if (enabled) {
          logger.debug(`⏱️ ${componentName} - ${label}: ${(end - start).toFixed(2)}ms`);
        }
        return result;
      } catch (err) {
        const end = performance.now();
        if (enabled) {
          logger.debug(`⏱️ ${componentName} - ${label} (error): ${(end - start).toFixed(2)}ms`);
        }
        throw err;
      }
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
      // Avoid creating duplicate intervals (HMR / re-run protection)
      const existingId = (window as any).__PERF_SUMMARY_INTERVAL_ID__;
      if (existingId) {
        clearInterval(existingId);
      }

      const id = setInterval(() => {
        const metrics = (window as any).__PERFORMANCE_METRICS__ as PerformanceMetrics[];
        if (metrics.length > 0) {
          const avgRenderTime = metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length;
          logger.debug(`📊 Performance Summary - Avg render time: ${avgRenderTime.toFixed(2)}ms`);

          // Clear metrics
          (window as any).__PERFORMANCE_METRICS__ = [];
        }
      }, 10000);

      (window as any).__PERF_SUMMARY_INTERVAL_ID__ = id;
    }
  }
}

export type UsePerformanceMonitorReturn = ReturnType<typeof usePerformanceMonitor>