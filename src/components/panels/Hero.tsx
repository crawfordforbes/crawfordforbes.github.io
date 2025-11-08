import { badgeData } from '@/data/global/badges';
import { generateImageAlt } from '@/utils/projects'

import heroDesktop from '@/assets/images/hero/hero-desktop.webp';
import heroTablet from '@/assets/images/hero/hero-tablet.webp';
import heroMobile from '@/assets/images/hero/hero-mobile.webp';
import heroFull from '@/assets/images/hero/hero-full.jpeg';

import './styles/hero.css'

function Hero() {
  return (
    <article className="hero">
      <div className="hero-bg-image">
        {/*
          One-off responsive hero image. This intentionally does not use the
          OptimizedImage component or the images pipeline. It uses the original
          source assets and falls back to the full-size JPEG.
        */}
        <picture>
          {/* prefer webp for different breakpoints */}
          <source srcSet={heroDesktop} media="(min-width: 1200px)" type="image/webp" />
          <source srcSet={heroTablet} media="(min-width: 768px)" type="image/webp" />
          <source srcSet={heroMobile} media="(max-width: 767px)" type="image/webp" />
          {/* fallback to the full JPEG for older browsers */}
          <img
            src={heroFull}
            alt={generateImageAlt('Hero background')}
            className="image"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      <section className="hero-content overlay">
        <h1 className="title">{badgeData.fname.title} {badgeData.lname.title}</h1>
        <h2 className="subtitle">{badgeData.tagline1.title}<br/>{badgeData.tagline2.title}</h2>
      </section>
    </article>
  )
}

export default Hero
