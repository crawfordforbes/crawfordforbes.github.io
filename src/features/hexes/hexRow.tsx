import { useMemo } from 'react'

import Hex from "@/features/hexes/Hex"

import { hexData } from "@/data/hexes/hexes"
import { rowData } from "@/data/hexes/rows"

type PrecomputedHexItem = Record<string, any> & { _key?: string }

type HexRowProps = {
  row?: string,
  hexWidth?: number
  hexMargin?: number,
  /** If provided, `hexItems` will be rendered directly. Each item is spread into `<Hex />`. */
  hexItems?: PrecomputedHexItem[]
}

function HexRow({  
  row,
  hexWidth,
  hexMargin,
  hexItems,
}: HexRowProps) {
  // If precomputed hex items are provided, render them directly (preferred path)
  if (Array.isArray(hexItems) && hexItems.length > 0) {
    // Derive row-level CSS vars from explicit props or from the first item's sizing
    const first = hexItems[0] || {}
    const derivedHexWidth = typeof hexWidth !== 'undefined' && hexWidth !== null ? hexWidth : (typeof first.hexWidth === 'number' ? first.hexWidth : 122)
    const derivedHexMargin = typeof hexMargin !== 'undefined' && hexMargin !== null ? hexMargin : (typeof first.hexMargin === 'number' ? first.hexMargin : 3)

    const rowVars: React.CSSProperties = {
      ['--hex-width' as any]: `${derivedHexWidth}px`,
      ['--hex-margin' as any]: `${derivedHexMargin}px`,
    }

    return (
      <div className={`hex-row ${row ?? ''}`} style={rowVars}>
        {hexItems.map((item, i) => (
          <Hex key={item._key ?? `${i}`} {...item} />
        ))}
      </div>
    )
  }

  // Backwards-compatible fallback: construct items from rowData/hexData
  if (!row) {
    if (import.meta.env.DEV) {
      console.warn(`HexRow: Missing row data. Expected row identifier but received: ${row}`);
    }
    return null;
  }

  if (!hexWidth) {
    hexWidth = 122;
  }

  if (!hexMargin) {
    hexMargin = 3;
  }

  const inlineVars: React.CSSProperties = useMemo(() => ({
    ['--hex-width' as any]: `${hexWidth}px`,
    ['--hex-margin' as any]: `${hexMargin}px`,
  }), [hexWidth, hexMargin])

  const styleProps = useMemo(() => ({
      style: { ...(inlineVars as object) } as React.CSSProperties,
    }), [inlineVars])

  return (
    <div className={`hex-row ${row}`} {...styleProps}>
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
