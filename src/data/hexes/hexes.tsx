import TopLeft from "@/features/hexes/svg/top-left"
import TopRight from "@/features/hexes/svg/top-right"
import Left from "@/features/hexes/svg/left"
import Right from "@/features/hexes/svg/right"
import BottomLeft from "@/features/hexes/svg/bottom-left"
import BottomRight from "@/features/hexes/svg/bottom-right"

import type { JSX } from "react"

export type HexOptions = {
  [key: string]: {
    id: string,
    hexLink?: string,
    hexTitle?: string,
    hexClass?: string,
    hexStyle?: React.CSSProperties,
    hexImagePath?: string,
    hexSvgComponent?: JSX.Element,
    hexOnClick?: () => void,
    hexWidth?: number,
    hexMargin?: number,
    badge1Id?: string,
    badge2Id?: string,
  }
}

export const hexData:HexOptions = {
  "gradient-orange-pink": {
    id: "gradient-orange-pink",
    hexClass: "gradient-orange-pink"
  },
  "gradient-blue-cyan-teal-green": {
    id: "gradient-blue-cyan-teal-green",
    hexClass: "gradient-blue-cyan-teal-green"
  },
  "svg-top-left-github-index": {
    id: "svg-top-left-github-index",
    hexSvgComponent: <TopLeft />,
    badge1Id: "github-index"
  },
  "svg-right-link-projects": {
    id: "svg-right-link-projects",
    hexSvgComponent: <Right />,
    hexLink: "/#projects-filter-wrapper",
    hexTitle: "Projects"
  }
}