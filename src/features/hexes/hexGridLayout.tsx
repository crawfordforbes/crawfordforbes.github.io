import type { HeaderLayoutType } from "@/data/layouts/header"
import { useContext } from "react";
import { IsDesktopContext } from "@/utils/context";
import { gridData } from "@/data/hexes/grids";
import HexGrid from "./hexGrid";

type HexGridLayoutProps = {
  layouts: HeaderLayoutType,
}

function HexGridLayout({  
  layouts
}: HexGridLayoutProps) {
  const isDesktop = useContext(IsDesktopContext);

  // chooses which hex grid to display based on screen size
  return (
    <div className="hex-grid-layout">
      <HexGrid grid={isDesktop ? gridData[layouts.desktop.grid] : gridData[layouts.mobile.grid]} shiftedUp={isDesktop ? layouts.desktop.shiftedUp : layouts.mobile.shiftedUp} hexWidth={isDesktop ? layouts.desktop.hexWidth ? layouts.desktop.hexWidth : 0 : layouts.mobile.hexWidth ? layouts.mobile.hexWidth : 0}/>
    </div>
  )
}

export default HexGridLayout
