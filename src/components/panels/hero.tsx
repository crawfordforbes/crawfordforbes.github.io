import { contactData } from '@/data/global/contacts'
import './styles/hero.css'
import OptimizedImage from '../global/OptimizedImage'
import { imagePaths, getImgUrl } from '@/utils/images'
import { generateImageAlt } from '@/utils/projectUtilities'

function Hero() {
  // Define responsive image sources for hero
  const heroSources = [
    {
      src: getImgUrl(imagePaths.hero.desktop),
      media: '(min-width: 1024px)',
      type: 'image/webp'
    },
    {
      src: getImgUrl(imagePaths.hero.tablet),
      media: '(min-width: 640px)',
      type: 'image/webp'
    },
    {
      src: getImgUrl(imagePaths.hero.mobile),
      type: 'image/webp'
    }
  ];

  return (
    <article className="hero">
      <div className="hero-bg-image">
        <OptimizedImage
          src={getImgUrl(imagePaths.hero.mobile)}
          alt={generateImageAlt("Hero background")}
          sources={heroSources}
          fallbackSrc={getImgUrl(imagePaths.hero.full)}
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
