import { useContext } from "react";
import { IsDesktopContext } from "@/utils/context";

import HexGrid from "./hexGrid";
import type { LayoutsType } from "@/data/hexes/layouts"
import { gridData } from "@/data/hexes/grids";

type HexGridLayoutProps = {
  layouts: LayoutsType,
  hexWidth?: number
}

function HexGridLayout({  
  layouts,
  hexWidth
}: HexGridLayoutProps) {
  const isDesktop = useContext(IsDesktopContext);

  // chooses which hex grid to display based on screen size
  return (
    <div className={`hex-grid-layout ${isDesktop ? 'desktop' : 'mobile'}`}>
      <HexGrid 
        grid={isDesktop ? gridData[layouts.desktop.grid] : gridData[layouts.mobile.grid]} 
        shiftedUp={isDesktop ? layouts.desktop.shiftedUp : layouts.mobile.shiftedUp} 
        hexWidth={isDesktop ? layouts.desktop.hexWidth ? layouts.desktop.hexWidth : hexWidth ? hexWidth : 0 : layouts.mobile.hexWidth ? layouts.mobile.hexWidth : hexWidth ? hexWidth : 0}
      />
    </div>
  )
}

export default HexGridLayout
