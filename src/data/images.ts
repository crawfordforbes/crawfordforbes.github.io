type ImagesType = {
  [key:string]: {
    id: string,
    fileName: string,
    desktopPath?: string,
    additionalMobileStyling?: string,
    additionalDesktopStyling?: string,
  }
}

export const imagePath: string = '../../src/assets/images/';

export const imageData:ImagesType = {
  "sunshine-primary": {
    id: "sunshine-primary",
    fileName: 'sunshine-nights-primary.png'
  },
  "sunshine-secondary": {
    id: "sunshine-secondary",
    fileName: 'sunshine-nights-secondary.png'
  },
  "sunshine-tertiary": {
    id: "sunshine-tertiary",
    fileName: 'sunshine-nights-tertiary.png'
  }
}