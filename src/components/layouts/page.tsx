import ProjectsFilterWrapper from "@/features/projects-filter/projects-filter-wrapper"
import ContentPanel from "@/components/global/content-panel"
import Hero from "./hero"
import Footer from "./footer"

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
