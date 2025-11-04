import { scrollToTarget } from '@/utils/site';

import type { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

export type BadgeRecord = {
  id: string;
  title?: string;
  link?: string;
  iconClass?: [IconPrefix, IconName];
  badgeOnClick?: () => void;
  extraClass?: string;
  linktype?: string;
}

export const badgeData: Record<string, BadgeRecord> = {
  // meta
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
    link: "/downloads/Crawford-Forbes-Resume.pdf",
    iconClass: ['fas', 'file-arrow-down']
  },
  'projects-link': {
    id: 'projects-link',
    iconClass: ['fas', 'code'],
    title: 'Projects',
    badgeOnClick: () => { scrollToTarget("projects"); }
  },

  // Utils / UI badges
  'toggle-open': {
    id: 'toggle-open',
    iconClass: ['fas', 'xmark'],
    title: 'Close'
  },
  'toggle-close': {
    id: 'toggle-close',
    iconClass: ['fas', 'bars'],
    title: 'Menu'
  },
  'toggle-filter-open': {
    id: 'toggle-filter-open',
    iconClass: ['fas', 'xmark'],
    title: 'Hide Filters'
  },
  'toggle-filter-close': {
    id: 'toggle-filter-close',
    iconClass: ['fas', 'bars'],
    title: 'Show Filters',
  },
  'more-projects': {
    id: 'more-projects',
    iconClass: ['fas', 'code'],
    title: 'More Projects',
  }
} as const;

export default badgeData;
