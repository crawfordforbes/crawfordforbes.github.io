import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";

import { PageErrorBoundary } from '@/components/global/ErrorBoundaryWrappers';
import Projects from '@/app/routes/Projects';

import { MediaQueryContext } from '@/utils/context';
import { useScreenSize } from '@/utils/site';

import type { MediaSizes } from '@/types/layout';

import './styles/index.css'

function App() {

    // a media query used to determine hexlayouts and hexWidths.
  const screenSize = useScreenSize();
  function getScreenSize(): MediaSizes {
    const size: MediaSizes =
      screenSize.width > 1919
        ? "x-large"
        : screenSize.width > 1439
        ? "large"
        : screenSize.width > 1023
        ? "desktop"
        : screenSize.width > 639
        ? "tablet"
        : "mobile";
    return size;
  }

  const [mediaSize, setMediaSize] = useState<MediaSizes>(getScreenSize());

  useEffect(() => {
    setMediaSize(getScreenSize())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize.width]);

  return (
    <MediaQueryContext value={mediaSize}>
      <BrowserRouter>
        <RouterEventListener />
        <Routes>
          {/* Home page */}
          <Route path="/" element={
            <PageErrorBoundary pageName="Home">
              <Projects />
            </PageErrorBoundary>
          } />
          
          {/* Projects routes */}
          <Route path="/projects" element={
            <PageErrorBoundary pageName="Projects">
              <Projects />
            </PageErrorBoundary>
          } />
          <Route path="/projects/:projectId" element={
            <PageErrorBoundary pageName="Project Detail">
              <Projects />
            </PageErrorBoundary>
          } />
          
          {/* Fallback for any unmatched routes */}
          <Route path="*" element={
            <PageErrorBoundary pageName="404">
              <Projects />
            </PageErrorBoundary>
          } />
        </Routes>
      </BrowserRouter>
    </MediaQueryContext>
  );
}

function RouterEventListener() {
  // useNavigate must be used inside a Router; placing this component inside BrowserRouter makes it available
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (evt: Event) => {
      try {
        const detail = (evt as CustomEvent)?.detail || (evt as any).detail;
        if (detail && detail.targetUrl) {
          navigate(detail.targetUrl);
        }
      } catch (e) {
        // swallow errors - this listener is a convenience for non-React callers
        // console.warn('RouterEventListener error', e);
      }
    };

    window.addEventListener('app:navigate', handler as EventListener);
    return () => window.removeEventListener('app:navigate', handler as EventListener);
  }, [navigate]);

  return null;
}

export default App
