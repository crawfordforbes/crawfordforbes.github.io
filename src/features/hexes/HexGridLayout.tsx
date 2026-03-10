/**
 * HexGridLayout.tsx
 *
 * Responsive hex grid layout component that selects and renders the
 * appropriate grid configuration based on the current media query.
 *
 * The layout model works as follows:
 * 1. Resolve the layout object from the layouts map using the current mediaQuery
 * 2. Use the layout's grid identifier to look up grid data (rows and hex positions)
 * 3. Combine layout config (shiftedUp, hexWidth, hexMargin) with grid data
 * 4. Pass everything to HexGrid for rendering
 *
 * This decouples grid structure (rows, hex positions) from visual styling
 * (size, margin, shift), allowing multiple layouts to share the same grid data.
 */

import { logger } from '@/utils/logger';

import { useContext, useMemo, memo } from "react";

import HexGrid from "@/features/hexes/HexGrid";

import type { LayoutsType } from "@/data/hexes/layouts"
import { gridData } from "@/data/hexes/grids";

import { MediaQueryContext } from "@/utils/context";

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

const mediaQuery = useContext(MediaQueryContext);

  hexWidth = hexWidth ? hexWidth : 0;

  // Resolve the appropriate layout config for the current screen size
  const layout = useMemo(() =>
    layouts[mediaQuery] ? layouts[mediaQuery] : undefined,
    [layouts, mediaQuery]
  );
  // Look up the grid data (rows and hex coordinate positions) using the layout's grid identifier
  const grid = useMemo(() =>
    layout && gridData[layout?.grid] ? gridData[layout?.grid] : undefined,
    [layout]
  );

  if(!grid) {
    if (import.meta.env.DEV) {
      logger.warn(`HexGridLayout: Grid not found for layout "${layout?.grid}". Check if the grid is properly registered in gridData.`);
    }
    return null;
  }

  // Combine grid structure with layout-specific visual config (hex size, margin, vertical shift)
  const hexGridProps = {
    grid,
    shiftedUp: layout?.shiftedUp,
    hexWidth: layout?.hexWidth ? layout?.hexWidth : hexWidth,
    hexMargin: typeof layout?.hexMargin !== 'undefined' ? layout?.hexMargin : 3,
  };

  // chooses which hex grid to display based on screen size
  return (
    <article className={`hex-grid-layout ${mediaQuery} ${extraClass ? extraClass : ""}`}>
      {grid && layout && <HexGrid {...hexGridProps} />}
    </article>
  )
}

export default memo(HexGridLayout);