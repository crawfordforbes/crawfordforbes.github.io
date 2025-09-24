import { useDebouncedMediaQueryContext } from "@/utils/useDebouncedMediaQueryContext";

import { useContext } from "react";
import { MediaQueryContext } from "@/utils/context";

import HexGrid from "./hexGrid";
import type { LayoutsType } from "@/data/hexes/layouts"
import { gridData } from "@/data/hexes/grids";


import { useMemo } from "react";

import { memo } from "react";
type HexGridLayoutProps = {
  layouts: LayoutsType,
  hexWidth?: number,
  extraClass?: string,
}


function HexGridLayout({  
  layouts,
  hexWidth,
  extraClass,
}: HexGridLayoutProps) {
  // set up media query context so that it is held in state and can be debounced when resizing the screen
  // const mediaQuery = useDebouncedMediaQueryContext(150)
const mediaQuery = useContext(MediaQueryContext);


  hexWidth = hexWidth ? hexWidth : 0;

  const layout = useMemo(() =>
    layouts[mediaQuery] ? layouts[mediaQuery] : undefined,
    [layouts, mediaQuery]
  );
  const grid = useMemo(() =>
    layout && gridData[layout?.grid] ? gridData[layout?.grid] : undefined,
    [layout]
  );

  if(!grid) {
    console.log("did you register your layouts and grids correctly? grid is undefined in hexGridLayout.tsx")
  }

  // chooses which hex grid to display based on screen size
  return (
    <article className={`hex-grid-layout ${mediaQuery} ${extraClass ? extraClass : ""}`}>
      {grid && layout && <HexGrid 
        grid={grid} 
        shiftedUp={layout.shiftedUp} 
        hexWidth={layout.hexWidth ? layout.hexWidth : hexWidth}
        hexMargin={layout.hexMargin || layout.hexMargin === 0 ? layout.hexMargin : 3}
      />}
    </article>
  )
}

// export default HexGridLayout
export default memo(HexGridLayout);