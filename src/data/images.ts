type ImagesType = {
  [key:string]: {
    id: string,
    mobilePath: string,
    desktopPath?: string,
    additionalMobileStyling?: string,
    additionalDesktopStyling?: string,
  }
}

export const imageData:ImagesType = {
  "sunshine-card": {
    id: "sunshine-card",
    mobilePath: '../../src/assets/images/projects/sunshine-nights-card.png'
  },
  "sunshine-primary": {
    id: "sunshine-primary",
    mobilePath: '../../src/assets/images/projects/sunshine-nights-primary.png',
    desktopPath: '../../src/assets/images/projects/sunshine-nights-primary.png'
  },
  "sunshine-secondary": {
    id: "sunshine-secondary",
    mobilePath: '../../src/assets/images/projects/sunshine-nights-secondary.png',
    desktopPath: '../../src/assets/images/projects/sunshine-nights-secondary.png'
  }
}