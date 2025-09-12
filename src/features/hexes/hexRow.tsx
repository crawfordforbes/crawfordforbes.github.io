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
if (!row) {
  console.log("did you miss registering a grid or a row somewhere?")
  return <></>
}
  // fills the row with hex.repeat number of hex.id hexes
  return (
    <div className={`hex-row ${row}`}>
      {rowData && rowData[row] && rowData[row].hexes.map((hexObj, idx) => {
          const hexId = hexObj.id
          let props = {...hexData[hexId]}.id ? {...hexData[hexId]} : {hexClass: hexId};
          props = { ...props, hexWidth: hexWidth !== 0 ? hexWidth : undefined };
          
          let maxHexes = hexObj.repeat || 1;

          let repeatPlaceholderArray = []
          for(let i = 0; i < maxHexes; i++) {
            repeatPlaceholderArray.push(i+"")
          }

          return repeatPlaceholderArray.map((id)=>{
            return(<Hex key={`${idx}_${id}`} {...props}/>)
          })


      })}
    </div>
  )
}

export default HexRow
