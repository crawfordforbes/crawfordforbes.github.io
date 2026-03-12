import { lazy, Suspense } from 'react'
import { ComponentErrorBoundary } from "@/components/global/ErrorBoundaryWrappers"
import Nav from "@/components/global/Nav"
import HexHeader from "@/components/panels/HexHeader"
import Hero from "@/components/panels/Hero"
import IntroPanel from "@/components/panels/IntroPanel"
import TextPanel from "@/components/panels/TextPanel"
import FavoriteTechs from "@/components/panels/FavoriteTechs"
import Footer from "@/components/panels/Footer"

const ProjectIndex = lazy(() => import("@/features/projects/ProjectIndex"))

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
          <Suspense fallback={null}>
            <ProjectIndex />
          </Suspense>
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
