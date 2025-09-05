import { useContext } from "react";
import Hex from '@/features/hexes/hex'
import Badge from "@/components/global/badge"
import { IsDesktopContext } from "@/utils/context";
import TopLeft from "@/features/hexes/svg/top-left"
import TopRight from "@/features/hexes/svg/top-right";
import Left from "@/features/hexes/svg/left";
import Right from "@/features/hexes/svg/right";
import BottomLeft from "@/features/hexes/svg/bottom-left";
import BottomRight from "@/features/hexes/svg/bottom-right";

import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core"

import './styles/introPanel.css'

function IntroPanel() {
  const isDesktop = useContext(IsDesktopContext);

  const hexWidth = isDesktop ? 170 : 122;

  // TODO: replace with hexGridLayout, remove most of the imports.
  return (
    <div className="intro-panel two-col content">
      <div className="left-col col">
        <div className="hex-grid shifted-up">
          <div className="hex-row"></div>
          <div className="hex-row">
            <Hex 
              hexSvgComponent={<TopRight />} 
              hexWidth={hexWidth} 

            />
            <Hex 
              hexSvgComponent={<TopLeft />} 
              hexWidth={hexWidth} 
              badge1Id={"github-index"}
            />
          </div>
          <div className="hex-row">
            
            <Hex
              hexWidth={hexWidth}  
            />
 
          </div>
          <div className="hex-row">

            <Hex 
              hexSvgComponent={<BottomLeft />} 
              hexWidth={hexWidth} 
              badge1Id={"github-index"}
            />
          </div>
        </div>
      </div>
      <div className="right-col col">
        <div className="text-area">
          <h2>intro blurb</h2>
          <p>"this is a smart quote about how art and code are one and the same" - someone, probably</p>
          <p>
            Crawford Forbes is an alien who came to earth not in peace but in a space ship. The ship had many things such as a transmogrifier, a helping friendly book, and a blue ring that turned the wearer white. Most importantly though, it included a poster that taught him all the things he needed to survive in an oxygen based atmosphere, as well as smart tips and trips on how to WOW lesser beings. He then built this very website because even alien beings need an income. And now, perhaps the most incredible part of this whole journey is happening, as you, are main character, are reading this blurb!
          </p>
        </div>
      </div>
    </div>

  )
}

export default IntroPanel
