import ProjectsFilterWrapper from "@/features/projects-filter/projects-filter-wrapper"
import Header from "./header"
import Hero from "./hero"
import IntroPanel from "./introPanel"
import Footer from "./footer"
import { IsDesktopContext } from "@/utils/context"
import { useContext } from "react"
import { useMediaQuery } from "usehooks-ts";

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
      <ProjectsFilterWrapper />
      <Footer />
    </IsDesktopContext>

  )
}

export default Page
