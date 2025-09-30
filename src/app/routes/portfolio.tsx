import Nav from "../../components/global/nav"
import HexHeader from "../../components/panels/hexHeader"
import Hero from "../../components/panels/hero"
import IntroPanel from "../../components/panels/introPanel"
import ProjectIndex from "@/features/projects/projectIndex"
import Footer from "../../components/panels/footer"

function Portfolio() {

  return (
    <div className="portfolio">
      <header>
        <Nav />
        <HexHeader />
        <Hero />
      </header>
      <main className="content" id="main-content" tabIndex={-1}>
        <IntroPanel />
        <ProjectIndex />
      </main>
      <Footer />
    </div>
  )
}

export default Portfolio
