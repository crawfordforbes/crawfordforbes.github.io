import { contactData } from '@/data/contacts'
import './styles/hero.css'

function Hero() {


  return (
    <article className="hero">
      <div className="hero-bg-image">
        <picture>
          <source srcSet="https://picsum.photos/1920/1080" media="(min-width: 1024px)" />
          <source srcSet="https://picsum.photos/1024/768" media="(min-width: 640px)" />
          <img src="https://picsum.photos/360/720" alt="Hero Image" />
        </picture>
      </div>
      <section className="hero-content overlay">
        <h1 className="title">{contactData.fname.title}<br/>{contactData.lname.title}</h1>
        <h3 className="subtitle">{contactData.tagline1.title}<br/>{contactData.tagline2.title}</h3>
      </section>
    </article>
  )
}

export default Hero
