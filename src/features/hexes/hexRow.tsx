import Hex from "./HexSimple"
import { hexData } from "@/data/hexes/hexes"
import { rowData } from "@/data/hexes/rows"

type HexRowProps = {
  row: string,
  hexWidth?: number
  hexMargin?: number,
}

function HexRow({  
  row,
  hexWidth,
  hexMargin,
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
          let props = {...hexData[hexId]}.id ? {...hexData[hexId]} : {id: hexId, hexClass: hexId, type: 'display' as const};
          props = { ...props, hexWidth: hexWidth !== 0 ? hexWidth : undefined, hexMargin: hexMargin || hexMargin === 0 ? hexMargin : undefined };
          
          let maxHexes = hexObj.repeat || 1;

          let repeatPlaceholderArray = []
          for(let i = 0; i < maxHexes; i++) {
            repeatPlaceholderArray.push(i+"")
          }

          return repeatPlaceholderArray.map((id)=>{
            // Map old prop names to new unified prop structure
            const unifiedProps = {
              ...props,
              onClick: props.hexOnClick,
              href: props.hexLink,
              tabIndex: props.noTabIndex ? -1 : undefined,
            }
            
            // Remove old prop names
            const { type, hexOnClick, hexLink, noTabIndex, ...cleanProps } = unifiedProps
            
            return(<Hex key={`${idx}_${id}`} {...cleanProps}/>)
          })


      })}
    </div>
  )
}

export default HexRow
