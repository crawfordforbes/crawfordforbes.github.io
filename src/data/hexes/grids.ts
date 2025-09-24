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
  /* header */
  "header-mobile": {
    id: "header-mobile",
    rows: [{id:"header-mobile-1"}, {id:"header-mobile-2"}, {id:"header-mobile-3"}, {id:"header-mobile-4"}, {id:"header-mobile-5"}, {id:"header-mobile-6"}, {id:"header-mobile-7"}]
  },
  "header-tablet": {
    id: "header-tablet",
    rows: [{id:"header-tablet-1"}, {id:"header-tablet-2"}, {id:"header-tablet-3"}, {id:"header-tablet-4"}, {id:"header-tablet-5"}, {id:"header-tablet-6"}, {id:"header-tablet-7"}]
  },
  "header-desktop": {
    id: "header-desktop",
    rows: [{id:"header-desktop-1"}, {id:"header-desktop-2"}, {id:"header-desktop-3"}, {id:"header-desktop-4"}, {id:"header-desktop-5"}, {id:"header-desktop-6"}, {id:"header-desktop-7"}, {id:"header-desktop-8"}, {id:"header-desktop-9"}, {id:"header-desktop-10"}, {id:"header-desktop-11"}, {id:"header-desktop-12"}, {id:"header-desktop-13"}, {id:"header-desktop-14"}, {id:"header-desktop-15"}, {id:"header-desktop-16"}, {id:"header-desktop-17"},
    ]
  },
  "header-large": {
    id: "header-large",
    rows: [{id:"header-large-1"}, {id:"header-large-2"}, {id:"header-large-3"}, {id:"header-large-4"}, {id:"header-large-5"}, {id:"header-large-6"}, {id:"header-large-7"}, {id:"header-large-8"},{id:"header-large-9"},{id:"header-large-10"},{id:"header-large-11"}, {id:"header-large-12"}, {id:"header-large-13"}, {id:"header-large-14"}, {id:"header-large-15"}, {id:"header-large-16"}, {id:"header-large-17"}, {id:"header-large-18"},{id:"header-large-19"},{id:"header-large-20"},{id:"header-large-21"}, {id:"header-large-22"}, {id:"header-large-23"}]
  },
  "header-x-large": {
    id: "header-x-large",
    rows: [{id:"header-x-large-1"}, {id:"header-x-large-2"}, {id:"header-x-large-3"}, {id:"header-x-large-4"}, {id:"header-x-large-5"}, {id:"header-x-large-6"}, {id:"header-x-large-7"}, {id:"header-x-large-8"},{id:"header-x-large-9"},{id:"header-x-large-10"}, {id:"header-x-large-11"}, {id:"header-x-large-12"}, {id:"header-x-large-13"}, {id:"header-x-large-14"}, {id:"header-x-large-15"}, {id:"header-x-large-16"}, {id:"header-x-large-17"}, {id:"header-x-large-18"}, {id:"header-x-large-19"}, {id:"header-x-large-20"}, {id:"header-x-large-21"}, {id:"header-x-large-22"}, {id:"header-x-large-23"}]
  },

  /* project card border */
  "card-border": {
    id: "card-border",
    rows: [{id:"card-border"}]
  },
}