import { BrowserRouter, Route, Routes } from "react-router";

import './styles/index.css'
import { MediaQueryContext } from '@/utils/context';
import { useEffect, useState } from 'react';
import { useScreenSize } from '@/utils/site';
import type { MediaSizes } from '@/types/layout';
import Portfolio from './routes/portfolio';

function App() {

    // a media query used to determine hexlayouts and hexWidths.
  const screenSize = useScreenSize();
  function getScreenSize(): MediaSizes {
    const size: MediaSizes =
      screenSize.width > 1920
        ? "x-large"
        : screenSize.width > 1440
        ? "large"
        : screenSize.width > 1024
        ? "desktop"
        : screenSize.width > 640
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
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link" 
        tabIndex={0} 
        onClick={() => {
          const el = document.getElementById('main-content');
          if (el) el.focus();
        }}
      >
        Skip to main content
      </a>
      <MediaQueryContext value={mediaSize}>
        <BrowserRouter>
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Portfolio />} />
            
            {/* Portfolio routes */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectId" element={<Portfolio />} />
            
            {/* Fallback for any unmatched routes */}
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
      </MediaQueryContext>
    </>
  );
}

export default App
