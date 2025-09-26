import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type ContactType = {
  id: string;
  title?: string;
  url?: string;
  iconClass?: [IconPrefix, IconName]
}

type ContactsType = {
  [key: string]: {
    id: string;
    title?: string;
    url?: string;
    linktype?: string;
    iconClass?: [IconPrefix, IconName];
  }
}

export const contactData: ContactsType = {
  "name": {
    id: "name",
    title: "Crawford Forbes"
  },
  "fname" : {
    id: "fname",
    title: "Crawford"
  },
  "lname" : {
    id: "lname",
    title: "Forbes"
  },
  "tagline1": {
    id: "tagline1",
    title: "Lead + Developer"
  },
  "tagline2": {
    id: "tagline2",
    title: "Creator"
  },
  "locale": {
    id: "locale",
    title: "Remote | US Based"
  },
  /* contacts */
  "github": {
    id: "github",
    title: "Github",
    url: "https://github.com/crawfordforbes",
    iconClass: ['fab', 'github']
  },
  "linked-in": {
    id: "linked-in",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/crawfordforbes/",
    iconClass: ['fab', 'linkedin']
  },
  "email": {
    id: "email",
    title: "Email",
    url: "crawford.forbes@gmail.com",
    linktype: "email",
    iconClass: ['fas', 'envelope']
  },
    "hire": {
    id: "hire",
    title: "Let's Talk",
    url: "crawford.forbes@gmail.com",
    linktype: "email",
    iconClass: ['fas', 'envelope']
  },
  "resume": {
    id: "resume",
    title: "Resume",
    url: "/tbd",
    iconClass: ['fas', 'file-arrow-down']
  }
}