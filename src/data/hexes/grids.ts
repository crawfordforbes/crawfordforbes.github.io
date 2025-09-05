export type GridType = {
  "id": string,
  "rows": string[],
}

export type GridsType = {
  [key: string]: {
    "id": string,
    "rows": string[],
  }
}

export const gridData:GridsType = {
  "header-mobile": {
    id: "header-mobile",
    rows: ["header-mobile-1", "header-mobile-2", "header-mobile-3", "header-mobile-4", "header-mobile-4", "header-mobile-4", "header-mobile-4"]
  },
  "header-desktop": {
    id: "header-desktop",
    rows: ["header-desktop-1", "header-desktop-2", "header-desktop-3", "header-desktop-4", "header-desktop-4", "header-desktop-4", "header-desktop-4"]
  }
}