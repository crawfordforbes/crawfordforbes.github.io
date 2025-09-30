import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type ContactType = {
  id: string;
  title?: string;
  link?: string;
  iconClass?: [IconPrefix, IconName]
}

type ContactsType = {
  [key: string]: {
    id: string;
    title?: string;
    link?: string;
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
  "github-index": {
    id: "github-index",
    title: "Github",
    link: "https://github.com/crawfordforbes",
    iconClass: ['fab', 'github']
  },
  "linked-in": {
    id: "linked-in",
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/crawfordforbes/",
    iconClass: ['fab', 'linkedin']
  },
  "email": {
    id: "email",
    title: "Email",
    link: "mailto:crawford.forbes@gmail.com",
    iconClass: ['fas', 'envelope']
  },
  "hire": {
    id: "hire",
    title: "Let's Talk",
    link: "mailto:crawford.forbes@gmail.com",
    iconClass: ['fas', 'envelope']
  },
  "resume": {
    id: "resume",
    title: "Resume",
    link: "/tbd",
    iconClass: ['fas', 'file-arrow-down']
  },
  'projects-link': {
    id: 'projects-link',
    iconClass: ['fas', 'code'],
    link: '#projects',
    title: 'Projects' 
  },
}