import { contactInfo } from "../contact";
import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type BadgeOptions = {
  [key: string]: {
    id: string,
    iconClass?: [IconPrefix, IconName];
    link?: string;
    title?: string;
    badgeOnClick?: () => void;
    extraClass?: string;
  }
}

export const badgeData:BadgeOptions = {
  "github-index": {
    id: "github-index",
    iconClass: contactInfo?.github?.iconClass || ['fab', 'github'],
    link: contactInfo?.github?.url || "https://github.com/crawfordforbes",
    title: "Find me on Github"
  }
}