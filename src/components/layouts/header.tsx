import HexGridLayout from "@/features/hexes/hexGridLayout";
import { headerLayouts } from "@/data/hexes/layouts";

import './styles/header.css'

function Header() { 

  return (
    <div className="header">
      <HexGridLayout layouts={headerLayouts} />
    </div>
  )
}

export default Header
