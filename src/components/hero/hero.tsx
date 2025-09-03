import { useCallback } from "react";
import Hex from "../../features/hexes/hex";
import TopLeft from "../../features/hexes/svg/top-left";
import TopRight from "../../features/hexes/svg/top-right";
function Hero() {
  const handleClick = useCallback(() => {
    console.log("Hex clicked!");
  }, [])
  return (
    <div className="hero">
      <div className="hex-grid">
        <div className="hex-row">
          <Hex hexSvgComponent={<TopLeft />} badge1IconClass="fas fa-info" badge1Link="/" badge1Title="Home" />
          <Hex hexImagePath={"../assets/hex/hexLeft.svg"} hexLink="/about" hexTitle="About" />
        </div>
      </div>
      <Hex hexClass='orange-pink-gradient' hexOnClick={handleClick} hexTitle="About" hexWidth={120}/>
    </div>
  )
}

export default Hero
