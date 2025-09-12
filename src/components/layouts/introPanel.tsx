import { introPanelContent } from "@/data/content/introPanel";

import HexGridLayout from "@/features/hexes/hexGridLayout";
import { introPanelLayouts } from "@/data/hexes/layouts";

import './styles/introPanel.css'

function IntroPanel() {
console.log(introPanelLayouts)

  // TODO: replace with hexGridLayout, remove most of the imports.
  return (
    <div className="intro-panel two-col content">
      <div className="left-col col">
        <HexGridLayout layouts={introPanelLayouts} />
      </div>
      <div className="right-col col">
        <div className="text-area-gradient">
          <h2>intro blurb</h2>
          {introPanelContent.descriptionHTML && <div className="intro-panel-description" dangerouslySetInnerHTML={{ __html: introPanelContent.descriptionHTML}} ></div>}
        </div>
      </div>
    </div>

  )
}

export default IntroPanel
