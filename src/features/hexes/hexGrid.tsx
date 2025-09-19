import HexRow from "./hexRow"
import { rowData } from "@/data/hexes/rows"
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
  console.log("did you miss registering a grid or a row somewhere? The grid in hexGrid.tsx is undefined.")
  return <></>
}
  // breaks out each hex grid's rows
  return (
    <div className={`hex-grid ${shiftedUp ? 'shifted-up' : ''} ${grid.id}`}>
        {grid && grid.rows.map((rowObj, idx) => {
          const rowId = rowObj.id;
          let rows = {...rowData[rowId]};
          let maxRows = rowObj.repeat || 1;

          let repeatPlaceholderArray = []
          for(let i = 0; i < maxRows; i++) {
            repeatPlaceholderArray.push(i)
          }

          return repeatPlaceholderArray.map((id)=>{
            return(
              <HexRow 
              key={`${idx}_${id}`} 
              row={rows.id} 
              hexWidth={hexWidth} 
              hexMargin={hexMargin}/>
            )
          })
        })}
    </div>
  )
}

export default HexGrid
