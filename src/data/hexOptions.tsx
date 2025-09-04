import Hex from "../features/hexes/hex";

type hexOptionsArray = Array<keyof HexOptions>;

export type HexOptions = {
  [key: string]: React.ReactElement
}

export const hexOptionsArray: hexOptionsArray = [
]
export const hexOptions = {
  // "svg_topLeft": <Hex svgComponent="top-left" />,
  // "svg_topRight": <Hex svgComponent="top-right" />,
  // "svg_right": <Hex svgComponent="right" />,
}