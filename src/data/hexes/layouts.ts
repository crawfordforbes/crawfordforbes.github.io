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
    hexWidth: 122
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

export const introPanelLayouts: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "intro-panel",
    hexWidth: 122
  },
  "tablet" : {
    id: "tablet",
    grid: "intro-panel",
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "intro-panel",
    hexWidth: 250
  },
  "large" : {
    id: "large",
    grid: "intro-panel",
    hexWidth: 250
  },
  "x-large" : {
    id: "x-large",
    grid: "intro-panel",
    hexWidth: 250
  },
}

export const projectDetailHeaderLeftLayouts: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "project-detail-header-left-mobile",
    shiftedUp: false,
    hexWidth: 122
  },
  "tablet" : {
    id: "tablet",
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
  "large" : {
    id: "large",
    grid: "project-detail-header-left-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
  "x-large" : {
    id: "x-large",
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
  "tablet" : {
    id: "tablet",
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
  "large" : {
    id: "large",
    grid: "project-detail-header-right-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
  "x-large" : {
    id: "x-large",
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
  "tablet" : {
    id: "tablet",
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
  "large" : {
    id: "large",
    grid: "project-detail-header-right-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
  "x-large" : {
    id: "x-large",
    grid: "project-detail-header-right-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
}

export const projectIndexBackdrop: LayoutsType  = {
  "mobile" : {
    id: "mobile",
    grid: "project-index-backdrop-mobile",
    shiftedUp: false,
    hexWidth: 58
  },
  "tablet" : {
    id: "tablet",
    grid: "project-index-backdrop-mobile",
    shiftedUp: false,
    hexWidth: 122
  },
  "desktop" : {
    id: "desktop",
    grid: "project-index-backdrop-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
  "large" : {
    id: "large",
    grid: "project-index-backdrop-desktop",
    shiftedUp: false,
    hexWidth: 170
  },
  "x-large" : {
    id: "x-large",
    grid: "project-index-backdrop-desktop",
    shiftedUp: false,
    hexWidth: 170
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