import { MediaQueryContext } from "@/utils/context"
import { useContext, useEffect, useState } from "react"

import HexHeader from "./hexHeader"
import Hero from "./hero"
import IntroPanel from "./introPanel"
import ProjectDetail from "@/features/projects/projectDetail"
import ProjectIndex from "@/features/projects/projectIndex"
import Footer from "./footer"

import type { MediaSizes } from "@/types/layout";
import { useDebounce } from "@/utils/site"

import { useScreenSize } from "@/utils/site";

import './styles/page.css'

function Page() {

  // a media query used to determine hexlayouts and hexWidths.
  // const defaultMediaSize: MediaSizes = useContext(MediaQueryContext);

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
  // const debouncedUpdateMediaSize = useDebounce(() => setMediaSize(getScreenSize()), 50);

  // useEffect(() => {
  //   debouncedUpdateMediaSize();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [screenSize.width]);

  useEffect(() => {
    setMediaSize(getScreenSize())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize.width]);


  return (
    <MediaQueryContext value={mediaSize} >
      <div className="page">
        <header>
          <HexHeader />
          <Hero />
        </header>
        <main className="content">
          <ProjectIndex />
          {/* <IntroPanel /> */}
          {/* <ProjectDetail id={"sunshine-nights"}/> */}
        </main>
        <Footer />
      </div>
    </MediaQueryContext>
  )
}

export default Page
