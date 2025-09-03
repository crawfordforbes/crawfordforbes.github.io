import { useCallback } from "react";
import Hex from "@/features/hexes/hex";
import TopLeft from "@/features/hexes/svg/top-left";
import Right from "@/features/hexes/svg/right";
import Badge from "@/components/global/badge";
import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

function Hero() {
  const handleClick = useCallback(() => {
    console.log("Hex clicked!");
  }, [])
  return (
    <div className="hero">
      <div className="hex-grid">
        <div className="hex-row">
          <Hex 
            hexSvgComponent={<TopLeft />} 
            badge1={
              <Badge 
                iconClass={['fab', 'github'] as [IconPrefix, IconName]} 
                title="Find it on " 
                link="https://github.com"
                extraClass="find-it-on-github-badge"
              />}
            />
          <Hex 
            hexSvgComponent={<Right />} 
            hexLink="/about" 
            hexTitle="About" />
        </div>
      </div>
      <Hex 
        hexClass='orange-pink-gradient' 
        hexOnClick={handleClick} 
        hexTitle="About" 
        hexWidth={120}
      />
    </div>
  )
}

export default Hero
