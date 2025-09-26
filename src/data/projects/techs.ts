import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type TechType = {
  id: string;
  title: string;
  iconClass?: [IconPrefix, IconName];
  filterable?: boolean;
}

type TechsType = {
  [key: string]: {
    id: string;
    title: string;
    iconClass?: [IconPrefix, IconName];
    filterable?: boolean;
  }
}

export const techData: TechsType = {
  "ruby": {
    id: "ruby",
    title: "Ruby",
    iconClass: ['fas', 'code'],
    filterable: true,
  },
    "sinatra": {
    id: "sinatra",
    title: "Sinatra",
    iconClass: ['fas', 'server'],
    filterable: true,
  },
}