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
    hexSvgComponent: <TopRight />,
    hexLink: contactData?.["github"]?.url || "https://github.com/crawfordforbes",
    badge1Id: "github-index"
  },
  "contacts-email": {
    id: "contacts-email",
    hexSvgComponent: <Left />,
    hexLink: contactData?.["email"]?.url || "crawford.forbes@gmail.com",
    badge1Id: "email"
  },
  "logo": {
    id: "logo",
    hexLink: "/",
    hexTitle: "Crawford Forbes"
  },
  "contacts-linked-in": {
    id: "contacts-linked-in",
    hexSvgComponent: <Right />,
    hexLink: contactData?.["linked-in"]?.url || "https://www.linkedin.com/in/crawfordforbes/",
    badge1Id: "linked-in"
  },
  "contacts-resume": {
    id: "contacts-resume",
    hexSvgComponent: <BottomLeft />,
    hexLink: contactData?.["resume"]?.url || "/tbd",
    badge1Id: "resume"
  },
  /* nav */
  "nav-projects": {
    id: "nav-projects",
    hexSvgComponent: <Right />,
    hexLink: "/#projects-filter-wrapper",
    hexTitle: "Projects"
  },

}