import { useCallback, useContext } from "react";
import Hex from "@/features/hexes/hex";
import TopLeft from "@/features/hexes/svg/top-left";
import Right from "@/features/hexes/svg/right";
import Badge from "@/components/global/badge";
import { IsDesktopContext } from "@/utils/context";

import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

import './styles/hero.css'

function Hero() {
  const isDesktop = useContext(IsDesktopContext);

  const handleClick = useCallback(() => {
    console.log("Hex clicked!");
  }, []);

  
  function renderHexes() {
    if (isDesktop) {
      const hexWidth = 170;
      return (
        <div className="hex-grid top">
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />

          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />

            <Hex 
              hexSvgComponent={<TopLeft />} 
              hexWidth={hexWidth} 
              badge1={
                <Badge 
                  iconClass={['fab', 'github'] as [IconPrefix, IconName]} 
                  title="Find it on " 
                  link="https://github.com"
                  extraClass="find-it-on-github-badge"
                />
              }
            />
            <Hex 
              hexSvgComponent={<Right />} 
              hexLink="/#projects-filter-wrapper" 
              hexTitle="Projects" 
              hexWidth={hexWidth} 
            />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
        </div>
      )
    } else {
      const hexWidth = 122;
      return (
        <div className="hex-grid top">
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />

          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />

            <Hex 
              hexSvgComponent={<TopLeft />} 
              hexWidth={hexWidth} 
              badge1={
                <Badge 
                  iconClass={['fab', 'github'] as [IconPrefix, IconName]} 
                  title="Find it on " 
                  link="https://github.com"
                  extraClass="find-it-on-github-badge"
                />
              }
            />
            <Hex 
              hexSvgComponent={<Right />} 
              hexLink="/#projects-filter-wrapper" 
              hexTitle="Projects" 
              hexWidth={hexWidth} 
            />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="orange-pink-gradient" hexWidth={hexWidth} />
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
          <div className="hex-row">
            <Hex hexClass="blue-cyan-teal-green-gradient" hexWidth={hexWidth} />
          </div>
        </div>
      )
    }
  }
  return (
    <div className="hero">
      {renderHexes()}
      <div className="hero-bg-image">
        <picture>
          <source srcSet="https://picsum.photos/1920/1080" media="(min-width: 1024px)" />
          <source srcSet="https://picsum.photos/1024/768" media="(min-width: 640px)" />
          <img src="https://picsum.photos/360/720" alt="Hero Image" />
        </picture>
      </div>
      <div className="content">
        <h1 className="my-name">Crawford Forbes</h1>
        <h3 className="my-titles">Developer, Artist, Person with qualities you like!</h3>
      </div>

    </div>
  )
}

export default Hero
