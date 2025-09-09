export type GridRowType = {
  id: string,
  repeat?: number
}

export type GridType = {
  "id": string,
  "rows": GridRowType[],
}

export type GridsType = {
  [key: string]: {
    "id": string,
    "rows": GridRowType[],
  }
}

export const gridData:GridsType = {
  "header-mobile": {
    id: "header-mobile",
    rows: [{id:"header-mobile-1"}, {id:"header-mobile-2"}, {id:"header-mobile-3"}, {id:"header-mobile-4", repeat: 4}]
  },
  "header-desktop": {
    id: "header-desktop",
    rows: [{id:"header-desktop-1"}, {id:"header-desktop-2"}, {id:"header-desktop-3"}, {id:"header-desktop-4", repeat: 4}]
  },
  "project-detail-header-left-mobile": {
    id: "project-detail-header-left-mobile",
    rows: [{id:""},{id:"project-detail-header-left-mobile-1", repeat: 2}]
  },
  "project-detail-header-left-desktop": {
    id: "project-detail-header-left-desktop",
    rows: [{id:"project-detail-header-left-desktop-1"}, {id:"project-detail-header-left-desktop-2"}, ]
  },
  "project-detail-header-right-mobile": {
    id: "project-detail-header-right-mobile",
    rows: [{id:"project-detail-header-left-mobile-1", repeat: 3}]
  },
  "project-detail-header-right-desktop": {
    id: "project-detail-header-right-desktop",
    rows: [{id:"project-detail-header-right-desktop-1"}, {id:"project-detail-header-right-desktop-2"}, ]
  },
}