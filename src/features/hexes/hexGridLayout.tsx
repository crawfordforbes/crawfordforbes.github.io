import { useContext } from "react";
import { MediaQueryContext } from "@/utils/context";

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

  const mediaQuery = useContext(MediaQueryContext);

  hexWidth = hexWidth ? hexWidth : 0;

  const layout = layouts[mediaQuery] ? layouts[mediaQuery] : undefined;
  const grid = layout && gridData[layout?.grid] ? gridData[layout?.grid] : undefined;

  if(!grid) {
    console.log("did you register your layouts and grids correctly? grid is undefined in hexGridLayout.tsx")
  }

  // chooses which hex grid to display based on screen size
  return (
    <div className={`hex-grid-layout ${mediaQuery}`}>
      {grid && layout && <HexGrid 
        grid={grid} 
        shiftedUp={layout.shiftedUp} 
        hexWidth={layout.hexWidth ? layout.hexWidth : hexWidth}
      />}
    </div>
  )
}

export default HexGridLayout
