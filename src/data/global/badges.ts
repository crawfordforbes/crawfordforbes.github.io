import { contactData } from "../contacts";

import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type BadgesType = {
  [key: string]: {
    id: string,
    iconClass?: [IconPrefix, IconName];
    link?: string;
    title?: string;
    badgeOnClick?: () => void;
    extraClass?: string;
  }
}

export const badgeData:BadgesType = {
  "github-index": {
    id: "github-index",
    iconClass: contactData?.github?.iconClass || ['fab', 'github'],
    link: contactData?.github?.url || "https://github.com/crawfordforbes",
    title: "Find me on Github"
  },
  "fullstack": {
    id: "fullstack",
    title: "Fullstack"
  },
  "designer": {
    id: "designer",
    title: "Designer"
  },
  "solo": {
    id: "solo",
    title: "Solo Dev"
  }
}