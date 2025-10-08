import Nav from "../../components/global/nav"
import HexHeader from "../../components/panels/hexHeader"
import Hero from "../../components/panels/hero"
import IntroPanel from "../../components/panels/introPanel"
import ProjectIndex from "@/features/projects/projectIndex"
import Footer from "../../components/panels/footer"
import { ComponentErrorBoundary } from "@/components/global/ErrorBoundaryWrappers"
import { ErrorTestComponent } from "@/components/global/ErrorTestComponent"

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
      
      {/* Error testing component (development only) */}
      <ErrorTestComponent componentName="Portfolio" />
    </div>
  )
}

export default Portfolio
