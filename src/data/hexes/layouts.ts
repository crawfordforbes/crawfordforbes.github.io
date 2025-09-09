import type { MediaSizes } from "@/types/layout"

export type LayoutsType = {
  [K in MediaSizes]: {
    id: K,
    grid: string,
    shiftedUp?: boolean,
    hexWidth?: number
  }
}

export const headerLayouts: LayoutsType  = {
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

export const projectDetailHeaderLeftLayouts: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "project-detail-header-left-mobile",
    shiftedUp: false,
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "project-detail-header-left-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
}
export const projectDetailHeaderRightLayouts: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "project-detail-header-right-mobile",
    shiftedUp: false,
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "project-detail-header-right-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
}
export const projectDetailFooterLayouts: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "project-detail-header-right-mobile",
    shiftedUp: false,
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "project-detail-header-right-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
}