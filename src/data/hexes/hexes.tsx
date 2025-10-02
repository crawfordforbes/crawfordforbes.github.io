import Logo from "@/features/hexes/svg/logo"

import { contactData } from "../global/contacts"

import type { JSX } from "react"

export type HexesType = {
  [key: string]: {
    id: string,
    type?: 'display' | 'button' | 'link', // New field to determine wrapper type
    hexLink?: string,
    hexClass?: string,
    hexStyle?: React.CSSProperties,
    content?: string | JSX.Element,
    contentType?: 'auto' | 'image' | 'badge' | 'visual',
    hexOnClick?: () => void,
    hexWidth?: number,
    hexMargin?: number,
    noTabIndex?: boolean,
    fullAreaContent?: boolean
  }
}

export const hexData:HexesType = {
  /* logo */
  "logo": {
    id: "logo",
    type: "link",
    content: <Logo />,
    hexLink: "/",
    hexClass: "logo",
  },
  /* decorative */
  "card-border": {
    id: "card-border",
    type: "display",
    hexClass: "decorative-hex",
  },
  /* contacts */
  "contacts-github-index": {
    id: "contacts-github-index",
    type: "display",
    content: "github-index",
    hexClass: "gradient-2-3 full-area",
  },
  "contacts-email": {
    id: "contacts-email",
    type: "display",
    content: "email",
    hexClass: "gradient-2-3 full-area icon-bg",
  },
  "contacts-linked-in": {
    id: "contacts-linked-in",
    type: "link",
    hexLink: contactData?.["linked-in"]?.link || "https://www.linkedin.com/in/crawfordforbes/",
    content: "linked-in"
  },
  "contacts-resume": {
    id: "contacts-resume",
    type: "link",
    hexLink: contactData?.["resume"]?.link || "/tbd",
    content: "resume"
  },
  /* nav */
  "nav-projects": {
    id: "nav-projects",
    type: "display",
    content: "projects-link",
    hexClass: "gradient-2-3 full-area icon-bg",
  },
}
