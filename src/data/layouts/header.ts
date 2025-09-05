import type { MediaSizes } from "@/types/layout"

export type HeaderLayoutType = {
  [K in MediaSizes]: {
    id: K,
    grid: string,
    shiftedUp?: boolean,
    hexWidth?: number
  }
}

export const headerLayouts: HeaderLayoutType  = {
  "mobile" : {
    id: "mobile",
    grid: "header-mobile",
    shiftedUp: true,
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "header-desktop",
    shiftedUp: true,
    hexWidth: 170
  },

}