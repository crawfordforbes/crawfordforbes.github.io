import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router";

import { PageErrorBoundary } from '@/components/global/ErrorBoundaryWrappers';
import Projects from '@/app/routes/Projects';

import { MediaQueryContext } from '@/utils/context';
import { useScreenSize, getScreenSize } from '@/utils/site';

import type { MediaSizes } from '@/utils/site';
import { trackPageView } from '@/utils/analytics';

import './styles/index.css'

function App() {

    // a media query used to determine hexlayouts and hexWidths.
  const screenSize = useScreenSize();
  const [mediaSize, setMediaSize] = useState<MediaSizes>(getScreenSize(screenSize.width));

  useEffect(() => {
    setMediaSize(getScreenSize(screenSize.width))
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
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);

  useEffect(() => {
    const handler = (evt: CustomEvent<{ targetUrl: string }>) => {
      try {
        if (evt.detail && evt.detail.targetUrl) {
          navigate(evt.detail.targetUrl);
        }
      } catch (e) {
        console.error('RouterEventListener: Navigation failed', e);
      }
    };

    window.addEventListener('app:navigate', handler as EventListener);
    return () => window.removeEventListener('app:navigate', handler as EventListener);
  }, [navigate]);

  return null;
}

export default App
