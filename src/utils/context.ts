import { createContext } from "react";
import type { MediaSizes } from "@/types/layout";

export const MediaQueryContext = createContext<MediaSizes>("mobile")