import HexGridLayout from "@/features/hexes/hexGridLayout";
import { headerLayouts } from "@/data/hexes/layouts";

import './styles/hexHeader.css'

function HexHeader() {

  return (
    <section className="hex-header">
      <HexGridLayout layouts={headerLayouts} />
    </section>
  )
}

export default HexHeader
