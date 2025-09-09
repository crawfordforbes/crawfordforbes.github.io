export type CategoryType = {
  id: string;
  title: string;
  filterable?: boolean
}

type CategoriesType = {
  [key: string]: {
    id: string;
    title: string;
    filterable?: boolean
  }
}

export const categoryData: CategoriesType = {
  "developer": {
    "id": "developer",
    "title": "Developer",
    "filterable": true
  },
  "designer": {
    "id": "designer",
    "title": "Designer",
    "filterable": true
  },
  "solo": {
    "id": "solo",
    "title": "Solo",
    "filterable": true
  },
  "contributor": {
    "id": "contributor",
    "title": "Contributor",
    "filterable": true
  },
  "lead": {
    "id": "lead",
    "title": "Lead",
    "filterable": true
  }
}