type ImagesType = {
  [key:string]: {
    id: string,
    fileName: string,
    alt?: string;
  }
}

export const imageData:ImagesType = {
  "sunshine-nights-primary": {
    id: "sunshine-nights-primary",
    fileName: 'sunshine-nights-primary.png',
    alt: "SunshineNights.com Homepage"
  },
  "sunshine-nights-secondary": {
    id: "sunshine-nights-secondary",
    fileName: 'sunshine-nights-secondary.png',
    alt: "SunshineNights.com Video Page"
  },
  "sunshine-nights-tertiary": {
    id: "sunshine-nights-tertiary",
    fileName: 'sunshine-nights-tertiary.png',
    alt: "SunshineNights.com Layout"
  }
}