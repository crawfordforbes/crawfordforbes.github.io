import { IsDesktopContext } from "@/utils/context"
import { useContext } from "react"
import { useMediaQuery } from "usehooks-ts";

import Header from "./header"
import Hero from "./hero"
import IntroPanel from "./introPanel"
import ProjectDetail from "@/features/projects/projectDetail"
import ProjectIndex from "@/features/projects/projectIndex"
import Footer from "./footer"

import './styles/page.css'

function Page() {

  // a media query used to determine hexlayouts and hexWidths.
  let isDesktop = useContext(IsDesktopContext);
  isDesktop = useMediaQuery('(min-width: 64em)');

  return (

    <IsDesktopContext value={isDesktop} >
      <Header />
      <Hero />
      <IntroPanel />
      <ProjectIndex />
      {/* <ProjectDetail id={"sunshine-nights"}/> */}
      <Footer />
    </IsDesktopContext>

  )
}

export default Page
