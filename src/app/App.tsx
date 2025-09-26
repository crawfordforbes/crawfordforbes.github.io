import { BrowserRouter, Route, Routes } from "react-router";

import './styles/index.css'
import { MediaQueryContext } from '@/utils/context';
import { useEffect, useState } from 'react';
import { useScreenSize } from '@/utils/site';
import type { MediaSizes } from '@/types/layout';
import ProjectDetail from '@/features/projects/projectDetail';
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
    <MediaQueryContext value={mediaSize} >
    <BrowserRouter>
    <Routes>
      <Route path="/filters?/:filterId/projects?/:projectId" element={<Portfolio />} />
      <Route path="*" element={<Portfolio />} />
    </Routes>
    </BrowserRouter>
    </MediaQueryContext>
  )
}

export default App
