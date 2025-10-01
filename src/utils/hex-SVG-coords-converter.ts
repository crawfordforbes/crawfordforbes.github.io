type LogoSVG = {
  yFactor: number,
  width: number,
  height: number,
  outerHex: string,
  middleHex: string,
  innerHex: string
}

const logoSVG:LogoSVG = {
  yFactor: 0.58,
  width: 160,
  height: 320,
  outerHex: "80,00 160,80 160,240 80,320 00,240 00,80",
  middleHex: "80,40 140,100 140,220 80,280 20,220 20,100",
  innerHex: "80,80 120,120 120,200 80,240 40,200 40,120",
}

type HexSVG = {
  yFactor: number,
  width: number,
  height: number,
  outerWallLeft: string,
  outerWallCenter: string,
  outerWallRight: string,
  hexTop: string,
  hexWallLeft: string,
  hexWallCenter: string,
  hexWallRight: string
};

const hexSVG:HexSVG = {
  yFactor: 0.58,
  width: 160,
  height: 320,
  outerWallLeft: "00,80 20,140 20,220 40,280 00,240 00,80",
  outerWallCenter: "80,00 100,60 80,40 20,100 20,140 00,80 80,00",
  outerWallRight: "80,00 160,80 160,160 140,100 100,60 80,00",
  hexTop: "80,40 140,100 140,220 80,280 20,220 20,100",
  hexWallLeft: "20,220 80,280 90,310 80,320 40,280 20,220",
  hexWallCenter: "140,220 150,250 90,310 80,280 140,220",
  hexWallRight: "140,100 160,160 160,240 150,250 140,220 140,100"
};

type hexSVGTableType = {
  [key: string]: {
    [key: string]: { 
      coords: string,
      className: string
    }
  }
}

const hexSVGTable: hexSVGTableType = {
  topLeft: {
    hexTop: {
      coords: hexSVG.hexTop,
      className: "hex-top"
    },
    topRight: {
      coords: hexSVG.outerWallRight,
      className: "outer-wall-top-right"
    },
    right: {
      coords: hexSVG.hexWallRight,
      className: "hex-wall-right",
    },
    bottomRight: {
      coords: hexSVG.hexWallCenter,
      className: "hex-wall-bottom-right",
    },
    bottomLeft: {
      coords: hexSVG.hexWallLeft,
      className: "hex-wall-bottom-left",
    },
    left: {
      coords: hexSVG.outerWallLeft,
      className: "outer-wall-left",
    },
    topLeft: {
      coords: hexSVG.outerWallCenter,
      className: "outer-wall-top-left",
    },
  },
  topRight: {
    hexTop: {
      coords: hexSVG.hexTop,
      className: "hex-top"
    },
    topRight: {
      coords: "80,00 160,80 140,140 140,100 80,40 60,60 80,00", 
      className: "outer-wall-top-right"
    },
    right: {
      coords: "160,80 160,240 120,280 140,220 140,140 160,80",
      className: "outer-wall-right"
    },
    bottomRight: {
      coords: "140,220 120,280 80,320 70,310 80,280 140,220",
      className: "hex-wall-bottom-right",
    },
    bottomLeft: {
      coords: "20,220 80,280 70,310 10,250 20,220",
      className: "hex-wall-bottom-left",
    },
    left: {
      coords: "20,100 20,220 10,250 00,240 00,160 20,100",
      className: "hex-wall-left",
    },
    topLeft: {
      coords: "80,00 60,60 20,100 00,160 00,80 80,00",
      className: "outer-wall-top-left",
    },
  },
  right: {
    hexTop: {
      coords: hexSVG.hexTop,
      className: "hex-top"
    },
    topRight: {
      coords: "80,00 160,80 120,80 80,40 40,40 80,00",
      className: "outer-wall-top-right"
    },
    right: {
      coords: "120,80 160,80 160,240 120,240 140,220 140,100 120,80",
      className: "outer-wall-right"
    },
    bottomRight: {
      coords: "120,240 160,240 80,320 40,280 80,280 120,240",
      className: "outer-wall-bottom-right",
    },
    bottomLeft: {
      coords: "00,220 20,220 80,280 40,280 00,240 00,220",
      className: "hex-wall-bottom-left",
    },
    left: {
      coords: "00,100 20,100 20,220 00,220 00,100",
      className: "hex-wall-left",
    },
    topLeft: {
      coords: "40,40 80,40 20,100 00,100 00,80 40,40",
      className: "hex-wall-top-left",
    },
  },
  bottomRight: {
    hexTop: {
      coords: hexSVG.hexTop,
      className: "hex-top"
    },
    topRight: {
      coords: "80,00 120,40 140,100 80,40 50,10 80,00",
      className: "hex-wall-top-right"
    },
    right: {
      coords: "120,40 160,80 160,240 140,180 140,100 120,40",
      className: "outer-wall-right"
    },
    bottomRight: {
      coords: "140,180 160,240 80,320 60,260 80,280 140,220 140,180",
      className: "outer-wall-bottom-right",
    },
    bottomLeft: {
      coords: "00,160 20,220 60,260 80,320 00,240 00,160",
      className: "outer-wall-bottom-left",
    },
    left: {
      coords: "10,70 20,100 20,220 00,160 00,80 10,70",
      className: "hex-wall-left",
    },
    topLeft: {
      coords: "70,10 80,40 20,100 10,70 70,10",
      className: "hex-wall-top-left",
    },
  },
  bottomLeft: {
    hexTop: {
      coords: hexSVG.hexTop,
      className: "hex-top"
    },
    topRight: {
      coords: "90,10 150,70 140,100 80,40 90,10",
      className: "hex-wall-top-right"
    },
    right: {
      coords: "150,70 160,80 160,160 140,220 140,100 150,70",
      className: "hex-wall-right"
    },
    bottomRight: {
      coords: "160,160 160,240 80,320 100,260 140,220 160,160",
      className: "outer-wall-bottom-right",
    },
    bottomLeft: {
      coords: "20,170 20,220 80,280 100,260 80,320 00,240 20,170",
      className: "outer-wall-bottom-left",
    },
    left: {
      coords: "40,40 20,100 20,170 00,240 00,80 40,40",
      className: "outer-wall-left",
    },
    topLeft: {
      coords: "80,00 90,10 80,40 20,100 40,40 80,00",
      className: "hex-wall-top-left",
    },
  },
  left: {
    hexTop: {
      coords: hexSVG.hexTop,
      className: "hex-top"
    },
    topRight: {
      coords: "80,40 120,40 160,80 160,100 140,100 80,40",
      className: "hex-wall-top-right"
    },
    right: {
      coords: "140,100 160,100 160,220 140,220 140,100",
      className: "hex-wall-right"
    },
    bottomRight: {
      coords: "140,220 160,220 160,240 120,280 80,280 140,220",
      className: "hex-wall-bottom-right",
    },
    bottomLeft: {
      coords: "00,240 40,240 80,280 120,280 80,320 00,240",
      className: "outer-wall-bottom-left",
    },
    left: {
      coords: "00,80 40,80 20,100 20,220 40,240 00,240 00,80",
      className: "outer-wall-left",
    },
    topLeft: {
      coords: "80,00 120,40 80,40 40,80 00,80 80,00",
      className: "outer-wall-top-left",
    },
  },
  logoSVG: {
    outerHex: {
      coords: logoSVG.outerHex,
      className: "outer-hex"
    },
    middleHex: {
      coords: logoSVG.middleHex,
      className: "middle-hex"
    },
    innerHex: {
      coords: logoSVG.innerHex,
      className: "inner-hex"
    }
  }
}





// take points from an svg polyogn, and mulitply the y coordinates by a factor to squish the hexagons
// this conerts them from isometric coords to grid coords
function convertIsometricCoordsToCartesianCoords(points: string, yFactor: number): string {
  return points.split(" ").map(point => {
    const [x, y] = point.split(",").map(Number);
    return `${x},${Math.round(y * yFactor)}`;
  }
  ).join(" ");
}

export function printAllHexSVGs() {

  const svgs:string[] = Object.keys(hexSVGTable) // [ topLeft, topRight, right, bottomRight, bottomLeft, left ]

  svgs.forEach(orientation => {
    const coordSets = hexSVGTable[orientation]; // { hexTop: { coords, className }, topRight: { coords, className } ... }
    let svgObj = {
      title: `${orientation}`,
      svg: `<svg width="${hexSVG.width}" height="${hexSVG.height * hexSVG.yFactor}" viewBox="0 0 ${hexSVG.width} ${hexSVG.height * hexSVG.yFactor}" xmlns="http://www.w3.org/2000/svg">`
    }
    Object.keys(coordSets).forEach(area => {
      const coordsSet = coordSets[area]; // { coords, className }

      svgObj.svg += `<polygon points="${convertIsometricCoordsToCartesianCoords(coordsSet.coords, hexSVG.yFactor)}" class="${coordsSet.className}" />`
    })
    svgObj.svg += `</svg>`;
    console.log(svgObj.title);
    console.log(svgObj.svg);
  })
}