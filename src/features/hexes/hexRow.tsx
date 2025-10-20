import Hex from "@/features/hexes/Hex"

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
  // Only log in development builds
  if (import.meta.env.DEV) {
    console.warn(`HexRow: Missing row data. Expected row identifier but received: ${row}`);
  }
  return null;
}
  // fills the row with hex.repeat number of hex.id hexes
  return (
    <div className={`hex-row ${row}`}>
      {rowData && rowData[row] && rowData[row].hexes.map((hexObj, idx) => {
          const hexId = hexObj.id
          // Safely resolve hex definition from hexData (avoid spreading undefined)
          const hexDef = hexData[hexId];
          let props = hexDef && hexDef.id ? { ...hexDef } : { id: hexId, hexClass: hexId };
          props = {
            ...props,
            hexWidth: hexWidth !== 0 ? hexWidth : undefined,
            hexMargin: typeof hexMargin !== 'undefined' ? hexMargin : undefined,
          };
          
          let maxHexes = hexObj.repeat || 1;

          let repeatPlaceholderArray = []
          for(let i = 0; i < maxHexes; i++) {
            repeatPlaceholderArray.push(i+"")
          }

          return repeatPlaceholderArray.map((id)=>{
            // Map old prop names to new unified prop structure
            
            const unifiedProps = {
              ...props,
              onClick: props.onClick,
              href: props.hexLink,
              tabIndex: props.noTabIndex ? -1 : undefined,
            }

            // Remove old prop names
            const { type, onClick, hexLink, noTabIndex, ...cleanProps } = unifiedProps

            return (<Hex key={`${idx}_${id}`} {...cleanProps} />)
          })


      })}
    </div>
  )
}

export default HexRow
