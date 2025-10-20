import { ComponentErrorBoundary } from "@/components/global/ErrorBoundaryWrappers"
import Nav from "@/components/global/Nav"
import HexHeader from "@/components/panels/HexHeader"
import Hero from "@/components/panels/Hero"
import IntroPanel from "@/components/panels/IntroPanel"
import ProjectIndex from "@/features/projects/ProjectIndex"
import Footer from "@/components/panels/Footer"

function Portfolio() {

  return (
    <div className="portfolio">
      <header>
        <ComponentErrorBoundary componentName="Navigation">
          <Nav />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="HexHeader">
          <HexHeader />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="Hero">
          <Hero />
        </ComponentErrorBoundary>
      </header>
      <main className="content" id="main-content" tabIndex={-1}>
        <ComponentErrorBoundary componentName="IntroPanel">
          <IntroPanel />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="ProjectIndex">
          <ProjectIndex />
        </ComponentErrorBoundary>
      </main>
      <ComponentErrorBoundary componentName="Footer">
        <Footer />
      </ComponentErrorBoundary>
    </div>
  )
}

export default Portfolio
