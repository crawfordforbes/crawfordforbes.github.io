import TopLeft from "@/features/hexes/svg/top-left"
import TopRight from "@/features/hexes/svg/top-right"
import Left from "@/features/hexes/svg/left"
import Right from "@/features/hexes/svg/right"
import BottomLeft from "@/features/hexes/svg/bottom-left"
import BottomRight from "@/features/hexes/svg/bottom-right"

import { contactData } from "../global/contacts"

import type { JSX } from "react"

export type HexesType = {
  [key: string]: {
    id: string,
    hexLink?: string,
    hexTitle?: string,
    hexClass?: string,
    hexStyle?: React.CSSProperties,
    hexImagePath?: string,
    hexSvgComponent?: JSX.Element,
    hexOnClick?: () => void,
    hexWidth?: number,
    hexMargin?: number,
    badge1Id?: string,
    badge2Id?: string,
    noTabIndex?: boolean,
    fullAreaContent?: boolean
  }
}

export const hexData:HexesType = {
  /* decorative */
  "card-border": {
    id: "card-border",
    hexClass: "decorative-hex",
  },
  /* contacts */
  "contacts-github-index": {
    id: "contacts-github-index",
    badge1Id: "github-index",
    hexClass: "gradient-2-3 full-area",
  },
  "contacts-email": {
    id: "contacts-email",
    badge1Id: "email",
    hexClass: "gradient-2-3 full-area",
  },
  "logo": {
    id: "logo",
    hexLink: "/",
    hexTitle: "Crawford Forbes"
  },
  "contacts-linked-in": {
    id: "contacts-linked-in",
    hexSvgComponent: <Right />,
    hexLink: contactData?.["linked-in"]?.link || "https://www.linkedin.com/in/crawfordforbes/",
    badge1Id: "linked-in"
  },
  "contacts-resume": {
    id: "contacts-resume",
    hexSvgComponent: <BottomLeft />,
    hexLink: contactData?.["resume"]?.link || "/tbd",
    badge1Id: "resume"
  },
  /* nav */
  "nav-projects": {
    id: "nav-projects",
    badge1Id: "projects-link",
    hexClass: "gradient-2-3 full-area",
  },
}