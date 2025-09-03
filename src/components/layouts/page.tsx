import ProjectsFilterWrapper from "../../features/projects-filter/projects-filter-wrapper"
import ContentPanel from "../global/content-panel"
import Hero from "../hero/hero"
import Footer from "../footer/footer"

function Page() {

  return (
    <>
      <Hero />
      <ContentPanel> 
        <h2>intro blurb</h2>
      </ContentPanel>
      <ProjectsFilterWrapper />
      <Footer />
    </>
  )
}

export default Page
