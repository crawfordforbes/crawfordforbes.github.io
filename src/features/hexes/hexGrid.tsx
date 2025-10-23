import HexRow from "@/features/hexes/HexRow"

import { rowData } from "@/data/hexes/rows"
import { hexData } from "@/data/hexes/hexes"
import { useMemo } from 'react'
import type { GridType }  from "@/data/hexes/grids"

type HexGridProps = {
  grid: GridType,
  shiftedUp?: boolean,
  hexWidth?: number,
  hexMargin?: number,
}

function HexGrid({  
  grid,
  shiftedUp,
  hexWidth,
  hexMargin
}: HexGridProps) {
if (!grid) {
  if (import.meta.env.DEV) {
    console.warn(`HexGrid: Missing grid data. Expected grid object but received: ${grid}`);
  }
  return null;
}
  // breaks out each hex grid's rows
  // Precompute rows with memo to avoid recreating arrays/objects each render
  const rowsToRender = useMemo(() => {
    const out: Array<{ rowId: string; items: any[] }> = []
    grid.rows.forEach((rowObj) => {
      const rowId = rowObj.id
      const rowDef = rowData[rowId]
      const repeat = rowObj.repeat || 1

      for (let r = 0; r < repeat; r++) {
        // Build hex items for this row instance
        const items = (rowDef?.hexes || []).flatMap((hexObj: any, idx: number) => {
          const hexId = hexObj.id
          const hexDef = hexData[hexId]
          const base = hexDef && hexDef.id ? { ...hexDef } : { id: hexId, hexClass: hexId }
          // unify props
          const unified = {
            ...base,
            hexWidth: hexWidth !== 0 ? hexWidth : undefined,
            hexMargin: typeof hexMargin !== 'undefined' ? hexMargin : undefined,
            onClick: base.onClick,
            href: base.hexLink,
            tabIndex: base.noTabIndex ? -1 : undefined,
          }

          const max = hexObj.repeat || 1
          return new Array(max).fill(0).map((_, repeatIdx) => ({ ...unified, _key: `${rowId}_${idx}_${repeatIdx}` }))
        })

        out.push({ rowId, items })
      }
    })
    return out
  }, [grid, hexWidth, hexMargin])

  return (
    <div className={`hex-grid ${shiftedUp ? 'shifted-up' : ''} ${grid.id}`}>
      {rowsToRender.map((r, idx) => (
        <HexRow key={`${grid.id}_${r.rowId}_${idx}`} row={r.rowId} hexItems={r.items} />
      ))}
    </div>
  )
}

export default HexGrid
