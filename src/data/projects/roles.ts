export type RoleType = {
  id: string;
  title: string;
  filterable?: boolean
}

type RolesType = {
  [key: string]: {
    id: string;
    title: string;
    filterable?: boolean
  }
}

export const roleData: RolesType = {
  "developer": {
    id: "developer",
    title: "Developer",
    filterable: true
  },
  "designer": {
    id: "designer",
    title: "Designer",
    filterable: true
  },
  "solo": {
    id: "solo",
    title: "Solo",
    filterable: true
  },
  "contributor": {
    id: "contributor",
    title: "Contributor",
    filterable: true
  },
  "lead": {
    id: "lead",
    title: "Lead",
    filterable: true
  }
}