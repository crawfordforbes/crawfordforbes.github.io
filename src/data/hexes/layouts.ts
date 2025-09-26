import type { MediaSizes } from "@/types/layout"

export type LayoutsType = {
  [Key in MediaSizes]?: {
    id: MediaSizes,
    grid: string,
    shiftedUp?: boolean,
    hexWidth?: number,
    hexMargin?: number,
  }
}

export const headerLayouts: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "header-mobile",
    shiftedUp: true,
    hexWidth: 90
  },
  "tablet" : {
    id: "tablet",
    grid: "header-tablet",
    shiftedUp: true,
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "header-desktop",
    shiftedUp: true,
    hexWidth: 122
  },
  "large" : {
    id: "large",
    grid: "header-large",
    shiftedUp: true,
    hexWidth: 122
  },
  "x-large" : {
    id: "x-large",
    grid: "header-x-large",
    shiftedUp: true,
    hexWidth: 122
  },

}

export const cardBorder: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "card-border",
    shiftedUp: false,
    hexWidth: 32,
    hexMargin: 0,
  },
  "tablet" : {
    id: "tablet",
    grid: "card-border",
    shiftedUp: false,
    hexWidth: 32,
    hexMargin: 0,
  },
  "desktop" : {
    id: "desktop",
    grid: "card-border",
    shiftedUp: false,
    hexWidth: 32,
    hexMargin: 0,
  },
  "large" : {
    id: "large",
    grid: "card-border",
    shiftedUp: false,
    hexWidth: 32,
    hexMargin: 0,
  },
  "x-large" : {
    id: "x-large",
    grid: "card-border",
    shiftedUp: false,
    hexWidth: 32,
    hexMargin: 0,
  },
}