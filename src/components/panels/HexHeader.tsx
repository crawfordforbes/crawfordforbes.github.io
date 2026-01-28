import { useEffect } from "react";

import HexGridLayout from "@/features/hexes/HexGridLayout";

import { headerLayouts } from "@/data/hexes/layouts";

import './styles/hexHeader.css'

function HexHeader() {
  // once dom is loaded, remove the loading class
  useEffect(() => {
    const header = document.querySelector('.hex-header');
    if (!header) return;

    const enableAnimations = () => {
      header.classList.remove('loading');
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(enableAnimations);
    } else {
      setTimeout(enableAnimations, 0);
    }
  }, []);

  return (
    <article className="hex-header loading">
      <HexGridLayout layouts={headerLayouts} />
    </article>
  )
}

export default HexHeader
