import { headerLayouts } from "@/data/layouts/header";
import HexGridLayout from "@/features/hexes/hexGridLayout";

import './styles/header.css'

function Header() { 

  return (
    <div className="header">
      <HexGridLayout layouts={headerLayouts} />
    </div>
  )
}

export default Header
