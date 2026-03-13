import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type RoleType = {
  id: string;
  title: string;
  iconClass?: [IconPrefix, IconName];
  filterable?: boolean;
}

export const roleData: Record<string, RoleType> = {
  "lead": {
    id: "lead",
    title: "Lead",
    iconClass: ['fas', 'people-arrows'],
    filterable: true,
  },
  "architect": {
    id: "architect",
    title: "Architect",
    iconClass: ['fas', 'code'],
    filterable: true,
  },

  "developer": {
    id: "developer",
    title: "Developer",
    iconClass: ['fas', 'code'],
    filterable: false,
  },
  "designer": {
    id: "designer",
    title: "Designer",
    iconClass: ['fas', 'icons'],
    filterable: false,
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

}