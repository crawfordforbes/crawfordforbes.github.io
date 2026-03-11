import { ComponentErrorBoundary } from "@/components/global/ErrorBoundaryWrappers"
import Nav from "@/components/global/Nav"
import HexHeader from "@/components/panels/HexHeader"
import Hero from "@/components/panels/Hero"
import Footer from "@/components/panels/Footer"
import TextPanel from "@/components/panels/TextPanel"

function Projects() {

  return (
    <div className="portfolio has-hex-header">
      <ComponentErrorBoundary componentName="HexHeader">
        <HexHeader />
      </ComponentErrorBoundary>
      <header>
        <ComponentErrorBoundary componentName="Navigation">
          <Nav />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="Hero">
          <Hero />
        </ComponentErrorBoundary>
      </header>
      <main className="content" id="main-content">
        <ComponentErrorBoundary componentName="Main Content">
          <TextPanel textPanelId="not-found-title" />
        </ComponentErrorBoundary>
      </main>
      <footer>
        <ComponentErrorBoundary componentName="Footer">
          <Footer />
        </ComponentErrorBoundary>
      </footer>
    </div>
  )
}

export default Projects
