/**
 * HexRow.tsx
 *
 * Renders a row of hexagons with two rendering modes:
 *
 * Mode 1 (Preferred): Pass precomputed hexItems array
 *   Each item is a partial Hex component props object, spread directly into <Hex />.
 *   Sizing (hexWidth, hexMargin) can be passed as props or derived from the first item.
 *
 * Mode 2 (Fallback): Pass a row identifier
 *   Looks up row definition in rowData, constructs hex items from hexData.
 *   Handles hex repetition via the repeat config in rowData.
 *   Bridges legacy prop names (hexLink, noTabIndex) to new Hex component.
 *
 * Both modes set CSS variables (--hex-width, --hex-margin) to enable
 * CSS-based hex layout calculations.
 */

import { logger } from '@/utils/logger';

import { useMemo } from 'react'

import Hex from "@/features/hexes/Hex"
import type { HexProps } from '@/features/hexes/Hex'

import { hexData } from "@/data/hexes/hexes"
import { rowData } from "@/data/hexes/rows"

type PrecomputedHexItem = Partial<HexProps> & { _key?: string }

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
  // Mode 1: If precomputed hex items are provided, render them directly (preferred path)
  if (Array.isArray(hexItems) && hexItems.length > 0) {
    // Derive row-level CSS variables from explicit props or from the first item's sizing
    const first = hexItems[0] || {}
    const derivedHexWidth = typeof hexWidth !== 'undefined' && hexWidth !== null ? hexWidth : (typeof first.hexWidth === 'number' ? first.hexWidth : 122)
    const derivedHexMargin = typeof hexMargin !== 'undefined' && hexMargin !== null ? hexMargin : (typeof first.hexMargin === 'number' ? first.hexMargin : 3)

    // Set CSS custom properties so CSS-based layout calculations can use these values
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

  // Mode 2: Backwards-compatible fallback — construct items from rowData/hexData
  if (!row) {
    if (import.meta.env.DEV) {
      logger.warn(`HexRow: Missing row data. Expected row identifier but received: ${row}`);
    }
    return null;
  }

  if (!hexWidth) {
    hexWidth = 122;
  }

  if (!hexMargin) {
    hexMargin = 3;
  }

  // Set CSS custom properties for hex sizing (used by CSS layout logic)
  const inlineVars: React.CSSProperties = useMemo(() => ({
    ['--hex-width' as any]: `${hexWidth}px`,
    ['--hex-margin' as any]: `${hexMargin}px`,
  }), [hexWidth, hexMargin])

  const styleProps = useMemo(() => ({
    style: { ...(inlineVars as object) } as React.CSSProperties,
  }), [inlineVars])

  return (
    <div className={`hex-row ${row}`} {...styleProps}>
      {rowData && rowData[row] && rowData[row].hexes.map((hexObj) => {
          const hexId = hexObj.id
          // Safely resolve hex definition from hexData (avoid spreading undefined)
          const hexDef = hexData[hexId];
          // Fall back to a minimal definition using hexId if not found in hexData
          let props = hexDef && hexDef.id ? { ...hexDef } : { id: hexId, hexClass: hexId };
            
          props = {
            ...props,
            hexWidth: hexWidth !== 0 ? hexWidth : undefined,
            hexMargin: typeof hexMargin !== 'undefined' ? hexMargin : undefined,
          };
          
          // Handle hex repetition: rowData can specify a repeat count for a single hex definition
          let maxHexes = hexObj.repeat || 1;

          let repeatPlaceholderArray = []
          for(let i = 0; i < maxHexes; i++) {
            repeatPlaceholderArray.push(i+"")
          }

          return repeatPlaceholderArray.map((idx)=>{
            // Bridge legacy prop names (hexLink, noTabIndex) to new Hex component props
            const base = props as Partial<HexProps>
            const unifiedProps: Partial<HexProps> = {
              ...base,
              onClick: base.onClick,
              href: base.hexLink ?? base.href,
              tabIndex: base.noTabIndex ? -1 : base.tabIndex,
            }

            // Remove legacy keys to avoid passing unsupported props to Hex component
            const { type: _t, onClick: _oc, hexLink: _hl, noTabIndex: _nt, ...cleanProps } = unifiedProps
            const stableKey = `${hexObj.id}-repeat-${idx}`;
            return (<Hex key={stableKey} {...(cleanProps as Partial<HexProps>)} />)
          })

      })}
    </div>
  )
}

export default HexRow
