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
  /* contacts */
  "github-index": {
    id: "github-index",
    iconClass: contactData?.["github"]?.iconClass || ['fab', 'github'],
    link: contactData?.["github"]?.url || "https://github.com/crawfordforbes",
    title: contactData?.["github"]?.title || "Github"
  },
  "linked-in": {
    id: "linked-in",
    iconClass: contactData?.["linked-in"]?.iconClass || ['fab', 'linkedin'],
    link: contactData?.["linked-in"]?.url || "https://www.linkedin.com/in/crawfordforbes/",
    title: contactData?.["linked-in"]?.title || "LinkedIn"
  },
  "email": {
    id: "email",
    iconClass: contactData?.["email"]?.iconClass || ['fas', 'envelope'],
    link: contactData?.["email"]?.url || "crawford.forbes@gmail.com",
    title: contactData?.["email"]?.title || "Email"
  },
  "resume": {
    id: "resume",
    iconClass: contactData?.["resume"]?.iconClass || ['fas', 'file-arrow-down'],
    link: contactData?.["resume"]?.url || "/tbd",
    title: contactData?.["resume"]?.title || "Resume"
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