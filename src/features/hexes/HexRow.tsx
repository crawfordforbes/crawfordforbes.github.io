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
import { rowData, type RowHexType } from "@/data/hexes/rows"

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
  // Compute derived sizing and CSS vars up-front (hooks must run deterministically)
  const first = (Array.isArray(hexItems) && hexItems.length > 0) ? hexItems[0] : {} as Partial<HexProps>
  const derivedHexWidth = typeof hexWidth !== 'undefined' && hexWidth !== null ? hexWidth : (typeof first.hexWidth === 'number' ? first.hexWidth : 122)
  const derivedHexMargin = typeof hexMargin !== 'undefined' && hexMargin !== null ? hexMargin : (typeof first.hexMargin === 'number' ? first.hexMargin : 3)

  const inlineVars = useMemo<Record<string, string>>(() => ({
    '--hex-width': `${derivedHexWidth}px`,
    '--hex-margin': `${derivedHexMargin}px`,
  }), [derivedHexWidth, derivedHexMargin])

  const styleProps = useMemo(() => ({
    style: inlineVars as React.CSSProperties,
  }), [inlineVars])

  // Mode 1: If precomputed hex items are provided, render them directly (preferred path)
  if (Array.isArray(hexItems) && hexItems.length > 0) {
    return (
      <div className={`hex-row ${row ?? ''}`} {...styleProps}>
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

  const safeHexWidth = typeof hexWidth !== 'undefined' ? hexWidth : 122
  const safeHexMargin = typeof hexMargin !== 'undefined' ? hexMargin : 3

  return (
    <div className={`hex-row ${row}`} {...styleProps}>
      {rowData && rowData[row] && rowData[row].hexes.flatMap((hexObj: RowHexType) => {
          const hexId = hexObj.id
          // Safely resolve hex definition from hexData (avoid spreading undefined)
          const hexDef = hexData[hexId];
          // Fall back to a minimal definition using hexId if not found in hexData
          const baseProps = hexDef && hexDef.id ? { ...hexDef } : { id: hexId, hexClass: hexId };
          const props = {
            ...baseProps,
            hexWidth: safeHexWidth !== 0 ? safeHexWidth : undefined,
            hexMargin: typeof safeHexMargin !== 'undefined' ? safeHexMargin : undefined,
          } as Partial<HexProps>;

          const maxHexes = hexObj.repeat || 1;
          return Array.from({ length: maxHexes }, (_, i) => {
            // Bridge legacy prop names (hexLink, noTabIndex) to new Hex component props
            const unifiedProps: Partial<HexProps> = {
              ...props,
              onClick: props.onClick,
              href: props.hexLink ?? props.href,
              tabIndex: props.noTabIndex ? -1 : props.tabIndex,
            }

            // Build a clean props object with only the allowed Hex props
            const cleanProps: Partial<HexProps> = {
              id: unifiedProps.id,
              contactId: unifiedProps.contactId,
              hexClass: unifiedProps.hexClass,
              hexStyle: unifiedProps.hexStyle,
              content: unifiedProps.content,
              contentType: unifiedProps.contentType,
              hexWidth: unifiedProps.hexWidth,
              hexMargin: unifiedProps.hexMargin,
              onClick: unifiedProps.onClick,
              href: unifiedProps.href,
              fullAreaContent: unifiedProps.fullAreaContent,
              ariaLabel: unifiedProps.ariaLabel,
              tabIndex: unifiedProps.tabIndex,
            }

            const stableKey = `${hexObj.id}-repeat-${i}`;
            return (<Hex key={stableKey} {...cleanProps} />)
          })

      })}
    </div>
  )
}

export default HexRow
