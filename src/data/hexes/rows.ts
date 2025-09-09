export type RowHexType = {
  id: string,
  repeat?: number
}

export type RowsType = {
  [key: string]: {
    "id": string,
    "hexes": RowHexType[],
  }
}

export const rowData:RowsType = {
  "header-mobile-1": {
    id: "header-mobile-1",
    hexes: [{id:"gradient-orange-pink", repeat: 9}]
  },
  "header-mobile-2": {
    id: "header-mobile-2",
    hexes: [{id:"gradient-orange-pink", repeat: 3}, {id:"svg-top-left-github-index"}, {id:"svg-right-link-projects"}]
  },
  "header-mobile-3": {
    id: "header-mobile-3",
    hexes: [{id:"gradient-orange-pink", repeat: 2}]
  },
  "header-mobile-4": {
    id: "header-mobile-4",
    hexes: [{id:"gradient-blue-cyan-teal-green"}, ]
  },
  "header-desktop-1": {
    id: "header-desktop-1",
    hexes: [{id:"gradient-orange-pink", repeat: 12} ]
  },
  "header-desktop-2": {
    id: "header-desktop-2",
    hexes: [{id:"gradient-orange-pink", repeat: 3}, {id:"svg-top-left-github-index"}, {id:"svg-right-link-projects"}]
  },
  "header-desktop-3": {
    id: "header-desktop-3",
    hexes: [{id:"gradient-orange-pink", repeat: 2},{id:"gradient-blue-cyan-teal-green"}],
  },
  "header-desktop-4": {
    id: "header-desktop-4",
    hexes: [{id:"gradient-orange-pink"}, {id:"gradient-blue-cyan-teal-green"}, ]
  },
  "project-detail-header-left-mobile-1": {
    id: "project-detail-header-left-mobile-1",
    hexes: [{id:"gradient-orange-pink", repeat: 2}]
  }

}