import { MediaQueryContext } from "@/utils/context"
import { useContext } from "react"

import Header from "./header"
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
  let mediaSize: MediaSizes = useContext(MediaQueryContext);
  
  const screenSize = useScreenSize();
  function getScreenSize() : MediaSizes{
    const size:MediaSizes = screenSize.width > 1920 ? "x-large" : screenSize.width > 1440 ? "large" : screenSize.width > 1024 ? "desktop" : screenSize.width > 640 ? "tablet" : "mobile";
    return size;
  }

  mediaSize = getScreenSize()

  return (
    <MediaQueryContext value={mediaSize} >
            <Header />
            <Hero />
            <ProjectIndex />
            {/* <IntroPanel /> */}
            {/* <ProjectDetail id={"sunshine-nights"}/> */}
            <Footer />

    </MediaQueryContext>
  )
}

export default Page
