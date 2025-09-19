import { introPanelContent } from "@/data/content/introPanel";

import HexGridLayout from "@/features/hexes/hexGridLayout";
import { introPanelLayouts } from "@/data/hexes/layouts";

import './styles/introPanel.css'

function IntroPanel() {

  return (
    <section className="intro-panel two-col content">
      <section className="left-col col">
        <HexGridLayout layouts={introPanelLayouts} />
      </section>
      <section className="right-col col">
        <div className="text-area-gradient">
          <h2>intro blurb</h2>
          {introPanelContent.descriptionHTML && <div className="intro-panel-description" dangerouslySetInnerHTML={{ __html: introPanelContent.descriptionHTML}} ></div>}
        </div>
      </section>
    </section>

  )
}

export default IntroPanel
