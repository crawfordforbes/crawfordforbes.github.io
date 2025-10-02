import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type BadgesType = {
  [key: string]: {
    id: string,
    iconClass?: [IconPrefix, IconName];
    link?: string;
    title?: string;
    badgeOnClick?: () => void;
    extraClass?: string;
    linktype?: string;
  }
}

export const utilsData:BadgesType = {
  "toggle-open": {
    id: "toggle-open",
    iconClass: ['fas', 'xmark'],
    title: "Close"
  },
  "toggle-close": {
    id: "toggle-close",
    iconClass: ['fas', 'bars'],
    title: "Menu"
  },
  "more-projects": {
    id: "more-projects",
    iconClass: ['fas', 'code'],
    title: "More Projects"
  }
}

