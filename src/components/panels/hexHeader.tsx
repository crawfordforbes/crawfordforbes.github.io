import HexGridLayout from "@/features/hexes/hexGridLayout";

import { headerLayouts } from "@/data/hexes/layouts";

import './styles/hexHeader.css'

function HexHeader() {

  return (
    <article className="hex-header">
      <HexGridLayout layouts={headerLayouts} />
    </article>
  )
}

export default HexHeader
