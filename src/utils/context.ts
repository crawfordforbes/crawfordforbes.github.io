import { createContext } from "react";
import type { MediaSizes } from "@/types/layout";

// Context for media query (screen size)
export const MediaQueryContext = createContext<MediaSizes>("mobile");