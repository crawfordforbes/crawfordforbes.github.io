import Logo from "@/features/hexes/svg/logo"
import { badgeData } from "@/data/global/badges"

import type { JSX } from "react"

export type HexesType = {
  [key: string]: {
    id: string;
    type?: 'display' | 'button' | 'link'; // New field to determine wrapper type
    hexLink?: string;
    hexClass?: string;
    hexStyle?: React.CSSProperties;
    content?: string | JSX.Element;
    contentType?: 'auto' | 'image' | 'badge' | 'visual';
    onClick?: () => void;
    hexWidth?: number;
    hexMargin?: number;
    noTabIndex?: boolean;
    fullAreaContent?: boolean;
    contactId?: string;
    ariaLabel?: string;
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
    ariaLabel: "Home",
  },
  /* decorative */
  "card-border": {
    id: "card-border",
    type: "display",
    hexClass: "decorative-hex",
  },
  /* contacts */
  "contacts-email": {
    id: "contacts-email",
    contactId: "email",
    hexClass: "gradient-2-3 full-area icon-bg",
    contentType: "badge",
    ariaLabel: "Send Email",
  },
  /* nav */
  "nav-projects": {
    id: "nav-projects",
    hexClass: "gradient-2-3 full-area icon-bg",
    contentType: "badge",
    contactId: "projects-link",
    ariaLabel: "View Projects",
  },
}
