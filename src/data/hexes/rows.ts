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
  /* header */
  /* mobile */
  "header-mobile-1": {
    id: "header-mobile-1",
    hexes: [{id:"gradient-1-2", repeat: 6}]
  },
  "header-mobile-2": {
    id: "header-mobile-2",
    hexes: [{id:"contacts-email"}, {id:"contacts-github-index"}, {id:"nav-projects"}, {id:"gradient-2-4", repeat: 1} ]
  },
  "header-mobile-3": {
    id: "header-mobile-3",
    hexes: [{id:"gradient-4-5", repeat: 1}]
  },
  "header-mobile-4": {
    id: "header-mobile-4",
    hexes: [{id:""}]
  },
  "header-mobile-5": {
    id: "header-mobile-5",
    hexes: [{id:"gradient-8-9", repeat: 1}, ]
  },
  "header-mobile-6": {
    id: "header-mobile-6",
    hexes: [{id:"gradient-9-10"}, ]
  },
  "header-mobile-7": {
    id: "header-mobile-7",
    hexes: [{id:"gradient-10-body-bg"}, ]
  },
  /* tablet */
  "header-tablet-1": {
    id: "header-tablet-1",
    hexes: [{id:"gradient-1-2", repeat: 10}]
  },
  "header-tablet-2": {
    id: "header-tablet-2",
    hexes: [{id:"gradient-2-4", repeat: 2}, {id:"contacts-email"}, {id:"contacts-github-index"}, {id:"nav-projects"}]
  },
  "header-tablet-3": {
    id: "header-tablet-3",
    hexes: [{id:"gradient-4-5", repeat: 2}]
  },
  "header-tablet-4": {
    id: "header-tablet-4",
    hexes: [{id:"gradient-5-8", repeat: 2}, ]
  },
  "header-tablet-5": {
    id: "header-tablet-5",
    hexes: [{id:"gradient-8-9", repeat: 2}, ]
  },
  "header-tablet-6": {
    id: "header-tablet-6",
    hexes: [{id:"gradient-9-10", repeat: 1}, ]
  },
  "header-tablet-7": {
    id: "header-tablet-7",
    hexes: [{id:"gradient-10-body-bg", repeat: 1}, ]
  },
  /* desktop */
  "header-desktop-1": {
    id: "header-desktop-1",
    hexes: [{id:"gradient-1-2", repeat: 16}]
  },
  "header-desktop-2": {
    id: "header-desktop-2",
    hexes: [{id:"gradient-2-3", repeat: 5}, {id:"contacts-email"}, {id:"contacts-github-index"}, {id:"nav-projects"}]
  },
  "header-desktop-3": {
    id: "header-desktop-3",
    hexes: [{id:"gradient-3-4", repeat: 3}]
  },
  "header-desktop-4": {
    id: "header-desktop-4",
    hexes: [{id:"gradient-4-6", repeat: 2}, ]
  },
  "header-desktop-5": {
    id: "header-desktop-5",
    hexes: [{id:"gradient-6-8", repeat: 3}, ]
  },
  "header-desktop-6": {
    id: "header-desktop-6",
    hexes: [{id:"gradient-8-10", repeat: 2}, ]
  },
  "header-desktop-7": {
    id: "header-desktop-7",
    hexes: [{id:"gradient-10-11", repeat: 2}, ]
  },
  "header-desktop-8": {
    id: "header-desktop-8",
    hexes: [{id:"gradient-11-body-bg", repeat: 1}, ]
  },
  /* === */
  "header-desktop-9": {
    id: "header-desktop-9",
    hexes: [{id:"gradient-11-body-bg", repeat: 2}, ]
  },
  "header-desktop-10": {
    id: "header-desktop-10",
    hexes: [{id:"gradient-10-11", repeat: 1}, ]
  },
  "header-desktop-11": {
    id: "header-desktop-11",
    hexes: [{id:"gradient-8-10", repeat: 2}, ]
  },
  "header-desktop-12": {
    id: "header-desktop-12",
    hexes: [{id:"gradient-6-8", repeat: 1}, ]
  },
  "header-desktop-13": {
    id: "header-desktop-13",
    hexes: [{id:"gradient-4-6", repeat: 2}, ]
  },
  "header-desktop-14": {
    id: "header-desktop-14",
    hexes: [{id:"gradient-3-4", repeat: 1}]
  },
  "header-desktop-15": {
    id: "header-desktop-15",
    hexes: [{id:"gradient-2-3", repeat: 2}]
  },
  "header-desktop-16": {
    id: "header-desktop-16",
    hexes: [{id:"gradient-1-2", repeat: 1}]
  },
  "header-desktop-17": {
    id: "header-desktop-17",
    hexes: [{id:"gradient-1-body-bg", repeat: 2}]
  },
    /* large */
  "header-large-1": {
    id: "header-large-1",
    hexes: [{id:"gradient-1-2", repeat: 16}]
  },
  "header-large-2": {
    id: "header-large-2",
    hexes: [{id:"gradient-2-3", repeat: 4}, {id:"contacts-email"}, {id:"contacts-github-index"}, {id:"nav-projects"}]
  },
  "header-large-3": {
    id: "header-large-3",
    hexes: [{id:"gradient-3-4", repeat: 4}]
  },
  "header-large-4": {
    id: "header-large-4",
    hexes: [{id:"gradient-4-5", repeat: 3}, ]
  },
  "header-large-5": {
    id: "header-large-5",
    hexes: [{id:"gradient-5-6", repeat: 4}, ]
  },
  "header-large-6": {
    id: "header-large-6",
    hexes: [{id:"gradient-6-7", repeat: 3}, ]
  },
  "header-large-7": {
    id: "header-large-7",
    hexes: [{id:"gradient-7-8", repeat: 3}, ]
  },
  "header-large-8": {
    id: "header-large-8",
    hexes: [{id:"gradient-8-9", repeat: 2}, ]
  },
  "header-large-9": {
    id: "header-large-9",
    hexes: [{id:"gradient-9-10", repeat: 3}, ]
  },
  "header-large-10": {
    id: "header-large-10",
    hexes: [{id:"gradient-10-11", repeat: 2}, ]
  },
  "header-large-11": {
    id: "header-large-11",
    hexes: [{id:"gradient-11-body-bg", repeat: 2}, ]
  },
  /* === */
  "header-large-12": {
    id: "header-large-12",
    hexes: [{id:"gradient-11-body-bg", repeat: 2}, ]
  },
  "header-large-13": {
    id: "header-large-13",
    hexes: [{id:"gradient-10-11", repeat: 2}, ]
  },
  "header-large-14": {
    id: "header-large-14",
    hexes: [{id:"gradient-9-10", repeat: 2}, ]
  },
  "header-large-15": {
    id: "header-large-8",
    hexes: [{id:"gradient-8-9", repeat: 2}, ]
  },
    "header-large-16": {
    id: "header-large-16",
    hexes: [{id:"gradient-7-8", repeat: 2}, ]
  },
    "header-large-17": {
    id: "header-large-17",
    hexes: [{id:"gradient-6-7", repeat: 2}, ]
  },
    "header-large-18": {
    id: "header-large-18",
    hexes: [{id:"gradient-5-6", repeat: 2}, ]
  },
  "header-large-19": {
    id: "header-large-19",
    hexes: [{id:"gradient-4-5", repeat: 2}, ]
  },
  "header-large-20": {
    id: "header-large-20",
    hexes: [{id:"gradient-3-4", repeat: 2}]
  },
  "header-large-21": {
    id: "header-large-21",
    hexes: [{id:"gradient-2-3", repeat: 2}]
  },
    "header-large-22": {
    id: "header-large-22",
    hexes: [{id:"gradient-1-2", repeat: 2}]
  },
    "header-large-23": {
    id: "header-large-23",
    hexes: [{id:"gradient-1-body-bg", repeat: 2}]
  },
      /* x-large */
  "header-x-large-1": {
    id: "header-x-large-1",
    hexes: [{id:"gradient-1", repeat: 21}]
  },
  "header-x-large-2": {
    id: "header-x-large-2",
    hexes: [{id:"gradient-1-2", repeat: 4}, {id:"contacts-email"}, {id:"contacts-github-index"}, {id:"nav-projects"}]
  },
  "header-x-large-3": {
    id: "header-x-large-3",
    hexes: [{id:"gradient-2-3", repeat: 5}]
  },
  "header-x-large-4": {
    id: "header-x-large-4",
    hexes: [{id:"gradient-3-4", repeat: 4}, ]
  },
  "header-x-large-5": {
    id: "header-x-large-5",
    hexes: [{id:"gradient-4", repeat: 5}, ]
  },
  "header-x-large-6": {
    id: "header-x-large-6",
    hexes: [{id:"gradient-4-5", repeat: 4}, ]
  },
  "header-x-large-7": {
    id: "header-x-large-7",
    hexes: [{id:"gradient-5-6", repeat: 3}, ]
  },
  "header-x-large-8": {
    id: "header-x-large-8",
    hexes: [{id:"gradient-6-7", repeat: 2}, ]
  },
  "header-x-large-9": {
    id: "header-x-large-9",
    hexes: [{id:"gradient-7-8", repeat: 3}, ]
  },
  "header-x-large-10": {
    id: "header-x-large-10",
    hexes: [{id:"gradient-8", repeat: 2}, ]
  },
  "header-x-large-11": {
    id: "header-x-large-11",
    hexes: [{id:"gradient-8-9", repeat: 2}, ]
  },
  "header-x-large-12": {
    id: "header-x-large-12",
    hexes: [{id:"gradient-9-10", repeat: 2}, ]
  },
    "header-x-large-13": {
    id: "header-x-large-13",
    hexes: [{id:"gradient-10-11", repeat: 2}, ]
  },
  "header-x-large-14": {
    id: "header-x-large-14",
    hexes: [{id:"gradient-11-body-bg", repeat: 2}, ]
  },
  /* === */
  "header-x-large-15": {
    id: "header-x-large-15",
    hexes: [{id:"gradient-11-body-bg", repeat: 2}, ]
  },
    "header-x-large-16": {
    id: "header-x-large-16",
    hexes: [{id:"gradient-10-11", repeat: 2}, ]
  },
    "header-x-large-17": {
    id: "header-x-large-17",
    hexes: [{id:"gradient-9-10", repeat: 2}, ]
  },
    "header-x-large-18": {
    id: "header-x-large-18",
    hexes: [{id:"gradient-8-9", repeat: 2}, ]
  },
    "header-x-large-19": {
    id: "header-x-large-19",
    hexes: [{id:"gradient-7-8", repeat: 2}, ]
  },
    "header-x-large-20": {
    id: "header-x-large-20",
    hexes: [{id:"gradient-6-7", repeat: 2}, ]
  },
    "header-x-large-21": {
    id: "header-x-large-21",
    hexes: [{id:"gradient-5-6", repeat: 2}, ]
  },
    "header-x-large-22": {
    id: "header-x-large-22",
    hexes: [{id:"gradient-4-5", repeat: 2}, ]
  },
    "header-x-large-23": {
    id: "header-x-large-23",
    hexes: [{id:"gradient-3-4", repeat: 2}]
  },
    "header-x-large-24": {
    id: "header-x-large-24",
    hexes: [{id:"gradient-2-3", repeat: 2}]
  },
    "header-x-large-25": {
    id: "header-x-large-25",
    hexes: [{id:"gradient-1-2", repeat: 2}]
  },
    "header-x-large-26": {
    id: "header-x-large-26",
    hexes: [{id:"gradient-1-body-bg", repeat: 2}]
  },
  /* intro panel */
  "intro-panel-1": {
    id: "intro-panel-1",
    hexes: [{id:"contacts-github-index"}]
  },
  "intro-panel-2": {
    id: "intro-panel-2",
    hexes: [{id:"contacts-email"},{id:"contacts-linked-in"}]
  },
  "intro-panel-3": {
    id: "intro-panel-3",
    hexes: [{id:"contacts-resume"}]
  },
  /* project index */
  "project-index-backdrop-mobile": {
    id: "project-index-backdrop-mobile",
    hexes: [{id:"random", repeat: 12}]
  },
  /* project detail */
  "project-detail-header-left-mobile-1": {
    id: "project-detail-header-left-mobile-1",
    hexes: [{id:"gradient-orange-pink", repeat: 2}]
  },

  /* card border */
  "card-border": {
    id: "card-border",
    hexes: [{id:"card-border", repeat: 48}]
  }

}