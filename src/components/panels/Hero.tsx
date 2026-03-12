import { badgeData } from '@/data/global/badges';
import { generateImageAlt } from '@/utils/projects'

// Hero images served from public folder
const hero = '/images/hero/hero.avif';

import './styles/hero.css'

function Hero() {
  return (
    <article className="hero">
      <div className="hero-bg-image">
        <img
          src={hero}
          alt={generateImageAlt('Hero background')}
          className="image"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <section className="hero-content overlay">
        <h1 className="title glow-title" data-text={`${badgeData.fname.title} ${badgeData.lname.title}`}>{badgeData.fname.title} {badgeData.lname.title}</h1>
        <h2 className="subtitle glow-title" data-text={`${badgeData.tagline1.title} ${badgeData.tagline2.title}`}>{badgeData.tagline1.title}<br/>{badgeData.tagline2.title}</h2>
      </section>
    </article>
  )
}

export default Hero
