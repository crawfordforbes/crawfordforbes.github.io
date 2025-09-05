import type { GridType } from "@/data/hexes/grids"
import HexRow from "./hexRow"

type HexGridProps = {
  grid: GridType,
  shiftedUp?: boolean,
  hexWidth?: number
}

function HexGrid({  
  grid,
  shiftedUp,
  hexWidth
}: HexGridProps) {

  // breaks out each hex grid's rows
  return (
    <div className={`hex-grid ${shiftedUp ? 'shifted-up' : ''}`}>
        {grid.rows && grid.rows.map((row, idx) => (
          <HexRow key={idx} row={row} hexWidth={hexWidth}/>
        ))}
    </div>
  )
}

export default HexGrid
