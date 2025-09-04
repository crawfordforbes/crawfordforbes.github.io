import ProjectsFilterWrapper from "@/features/projects-filter/projects-filter-wrapper"
import ContentPanel from "@/components/global/content-panel"
import Hero from "./hero"
import Footer from "./footer"
import { IsDesktopContext } from "@/utils/context"
import { useContext } from "react"
import { useMediaQuery } from "usehooks-ts";

function Page() {

  let isDesktop = useContext(IsDesktopContext);
  isDesktop = useMediaQuery('(min-width: 64em)');
  return (

    <IsDesktopContext value={isDesktop} >
      <Hero />
      <ContentPanel> 
        <h2>intro blurb</h2>
        <p>"this is a smart quote about how art and code are one and the same" - someone, probably</p>
        <p>
          Crawford Forbes is an alien who came to earth not in peace but in a space ship. The ship had many things such as a transmogrifier, a helping friendly book, and a blue ring that turned the wearer white. Most importantly though, it included a poster that taught him all the things he needed to survive in an oxygen based atmosphere, as well as smart tips and trips on how to WOW lesser beings. He then built this very website because even alien beings need an income. And now, perhaps the most incredible part of this whole journey is happening, as you, are main character, are reading this blurb!
        </p>
      </ContentPanel>
      <ProjectsFilterWrapper />
      <Footer />
    </IsDesktopContext>

  )
}

export default Page
