import SimpleImage from '@/components/global/OptimizedImage'

import { badgeData } from '@/data/global/badges';

import { imagePaths } from '@/utils/images'
import { generateImageAlt } from '@/utils/projects'

import './styles/hero.css'

function Hero() {
  return (
    <article className="hero">
      <div className="hero-bg-image">
        <SimpleImage
          src={imagePaths.hero.desktop}
          alt={generateImageAlt("Hero background")}
          className="image"
          priority={true} // Above-the-fold image
          loading="eager"
          objectFit="cover"
        />
      </div>
      <section className="hero-content overlay">
        <h1 className="title">{badgeData.fname.title}<br/>{badgeData.lname.title}</h1>
        <h3 className="subtitle">{badgeData.tagline1.title}<br/>{badgeData.tagline2.title}</h3>
      </section>
    </article>
  )
}

export default Hero
