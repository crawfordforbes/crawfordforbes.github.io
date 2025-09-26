import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type RoleType = {
  id: string;
  title: string;
  iconClass?: [IconPrefix, IconName];
  filterable?: boolean;
}

type RolesType = {
  [key: string]: {
    id: string;
    title: string;
    iconClass?: [IconPrefix, IconName];
    filterable?: boolean;
  }
}

export const roleData: RolesType = {
  "developer": {
    id: "developer",
    title: "Developer",
    iconClass: ['fas', 'code'],
    filterable: true,
  },
  "designer": {
    id: "designer",
    title: "Designer",
    iconClass: ['fas', 'icons'],
    filterable: true,
  },
  "solo": {
    id: "solo",
    title: "Solo",
    iconClass: ['fas', 'person'],
    filterable: true,
  },
  "contributor": {
    id: "contributor",
    title: "Contributor",
    iconClass: ['fas', 'people-group'],
    filterable: true,
  },
  "lead": {
    id: "lead",
    title: "Lead",
    iconClass: ['fas', 'people-arrows'],
    filterable: true,
  }
}