import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

type ContactsType = {
  [key: string]: {
    id: string;
    title?: string;
    url?: string;
    iconClass?: [IconPrefix, IconName]
  }
}

export const contactData: ContactsType = {
  "name": {
    "id": "name",
    "title": "Crawford Forbes"
  },
  "github": {
    "id": "github",
    "title": "Github",
    "url": "https://github.com/crawfordforbes",
    "iconClass": ['fab', 'github']
  },
  "linkedIn": {
    "id": "linkedIn",
    "title": "LinkedIn",
    "url": "https://www.linkedin.com/in/crawfordforbes/",
    "iconClass": ['fab', 'linkedin']
  },
  "email": {
    "id": "email",
    "title": "Email",
    "url": "crawford.forbes@gmail.com",
    "iconClass": ['fas', 'envelope']
  }
}