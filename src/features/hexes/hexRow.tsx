import Hex from "./hex"
import { hexData } from "@/data/hexes/hexes"
import { rowData } from "@/data/hexes/rows"
type HexRowProps = {
  row: string,
  hexWidth?: number
}

function HexRow({  
  row,
  hexWidth
}: HexRowProps) {

  // creates hexes based on the grid's rows hex ids. Optionally adds hexWidth from the layout data.
  return (
    <div className="hex-row">
      {rowData && rowData[row] && rowData[row].hexes.map((hex, idx) => {
          let props = {...hexData[hex]};
          props.hexWidth = hexWidth !== 0 ? hexWidth : undefined;
          return (<Hex key={idx} {...props}/>)

      })}
    </div>
  )
}

export default HexRow
