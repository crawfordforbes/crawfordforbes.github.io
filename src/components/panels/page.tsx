import { MediaQueryContext } from "@/utils/context"
import { useContext, useEffect, useState } from "react"

import Nav from "../global/nav"
import HexHeader from "./hexHeader"
import Hero from "./hero"
import IntroPanel from "./introPanel"
import ProjectDetail from "@/features/projects/projectDetail"
import ProjectIndex from "@/features/projects/projectIndex"
import Footer from "./footer"

import type { MediaSizes } from "@/types/layout";

import { useScreenSize } from "@/utils/site";

import './styles/page.css'

function Page() {

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
      <div className="page">
        <header>
          <Nav />
          <HexHeader />
          <Hero />
        </header>
        <main className="content">
          {/* <ProjectDetail id={"sunshine-nights"}/> */}
          <IntroPanel />
          <ProjectIndex />
        </main>
        <Footer />
      </div>
    </MediaQueryContext>
  )
}

export default Page
