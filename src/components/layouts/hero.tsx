import './styles/hero.css'

function Hero() {


  return (
    <section className="hero">
      <div className="hero-bg-image">
        <picture>
          <source srcSet="https://picsum.photos/1920/1080" media="(min-width: 1024px)" />
          <source srcSet="https://picsum.photos/1024/768" media="(min-width: 640px)" />
          <img src="https://picsum.photos/360/720" alt="Hero Image" />
        </picture>
      </div>
      <section className="hero-content overlay">
        <h1 className="title">Crawford<br/>Forbes</h1>
        <h3 className="subtitle">Developer<br/>Artist</h3>
      </section>
    </section>
  )
}

export default Hero
