import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type TechType = {
  id: string;
  title: string;
  iconClass?: [IconPrefix, IconName];
  filterable?: boolean;
}

export const techData: Record<string, TechType> = {
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
    filterable: false,
  },
  "activerecord": {
    id: "activerecord",
    title: "Active Record",
    iconClass: ['fas', 'database'],
    filterable: false,
  },
  "bcrypt": {
    id: "bcrypt",
    title: "Bcrypt",
    iconClass: ['fas', 'lock'],
    filterable: false,
  },
  "react": {
    id: "react",
    title: "React",
    iconClass: ['fab', 'react'],
    filterable: true,
  },
  "vanillajs": {
    id: "vanillajs",
    title: "Vanilla JS",
    iconClass: ['fas', 'code'],
    filterable: true,
  },
  "webpack": {
    id: "webpack",
    title: "Webpack",
    iconClass: ['fas', 'cubes'],
    filterable: false,
  },
  "nodejs": {
    id: "nodejs",
    title: "Node.js",
    iconClass: ['fab', 'node-js'],
    filterable: true,
  },
  "babel": {
    id: "babel",
    title: "Babel",
    iconClass: ['fas', 'code'],
    filterable: false,
  },
  "redux": {
    id: "redux",
    title: "Redux",
    iconClass: ['fas', 'code'],
    filterable: false,
  },
  "highcharts": {
    id: "highcharts",
    title: "Highcharts",
    iconClass: ['fas', 'chart-line'],
    filterable: false,
  },
}