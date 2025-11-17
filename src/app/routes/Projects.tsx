import { ComponentErrorBoundary } from "@/components/global/ErrorBoundaryWrappers"
import Nav from "@/components/global/Nav"
import HexHeader from "@/components/panels/HexHeader"
import Hero from "@/components/panels/Hero"
import IntroPanel from "@/components/panels/IntroPanel"
import TextPanel from "@/components/panels/TextPanel"
import FavoriteTechs from "@/components/panels/FavoriteTechs"
import ProjectIndex from "@/features/projects/ProjectIndex"
import Footer from "@/components/panels/Footer"

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
        <ComponentErrorBoundary componentName="IntroPanel">
          <IntroPanel />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="TextPanel">
          <TextPanel textPanelId="about-me" toggleReadMore={true} />
        </ComponentErrorBoundary>
        
        <ComponentErrorBoundary componentName="TextPanel">
          <TextPanel textPanelId="projects-title" />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="ProjectIndex">
          <ProjectIndex />
        </ComponentErrorBoundary>
      </main>
      <footer>
        <ComponentErrorBoundary componentName="TextPanel">
          <TextPanel textPanelId="favorites-title" />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="FavoriteTechs">
          <FavoriteTechs />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary componentName="Footer">
          <Footer />
        </ComponentErrorBoundary>
      </footer>
    </div>
  )
}

export default Projects
