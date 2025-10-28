type ImagesType = {
  [key:string]: {
    id: string,
    alt?: string;
  }
}

export const imageData:ImagesType = {
  "sun-desktop": {
    id: "sun-desktop",
    alt: "SunshineNights.com Desktop Layout"
  },
  "sun-mobile": {
    id: "sun-mobile",
    alt: "SunshineNights.com Mobile Layout"
  },
  "sun-press-page": {
    id: "sun-press-page",
    alt: "SunshineNights.com Press Page"
  }
}