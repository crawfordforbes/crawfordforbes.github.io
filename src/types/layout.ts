export const mediaSizes = ["mobile", "tablet", "desktop", "large", "x-large"] as const;
export type MediaSizes = typeof mediaSizes[number];

// export type MediaSizes = "mobile" | "tablet" | "desktop" | "large" | "x-large"