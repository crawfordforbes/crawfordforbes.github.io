import { contactData } from '@/data/global/contacts'
import './styles/hero.css'
import SimpleImage from '../global/OptimizedImage'
import { imagePaths } from '@/utils/images'
import { generateImageAlt } from '@/utils/projects'

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
        <h1 className="title">{contactData.fname.title}<br/>{contactData.lname.title}</h1>
        <h3 className="subtitle">{contactData.tagline1.title}<br/>{contactData.tagline2.title}</h3>
      </section>
    </article>
  )
}

export default Hero
