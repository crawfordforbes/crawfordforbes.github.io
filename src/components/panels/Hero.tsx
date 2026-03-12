import { badgeData } from '@/data/global/badges';
import { generateImageAlt } from '@/utils/projects'

// Hero images served from public folder
const heroDesktop = '/images/hero/hero-desktop.avif';
const heroTablet = '/images/hero/hero-tablet.avif';
const heroMobile = '/images/hero/hero-mobile.avif';

import './styles/hero.css'

function Hero() {
  return (
    <article className="hero">
      <div className="hero-bg-image">
        <picture>
          <source srcSet={heroDesktop} media="(min-width: 1200px)" type="image/webp" />
          <source srcSet={heroTablet} media="(min-width: 768px)" type="image/webp" />
          <img
            src={heroMobile}
            alt={generateImageAlt('Hero background')}
            className="image"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <section className="hero-content overlay">
        <h1 className="title glow-title" data-text={`${badgeData.fname.title} ${badgeData.lname.title}`}>{badgeData.fname.title} {badgeData.lname.title}</h1>
        <h2 className="subtitle glow-title" data-text={`${badgeData.tagline1.title} ${badgeData.tagline2.title}`}>{badgeData.tagline1.title}<br/>{badgeData.tagline2.title}</h2>
      </section>
    </article>
  )
}

export default Hero
