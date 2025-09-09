import './styles/hero.css'

function Hero() {


  return (
    <div className="hero">
      <div className="hero-bg-image">
        <picture>
          <source srcSet="https://picsum.photos/1920/1080" media="(min-width: 1024px)" />
          <source srcSet="https://picsum.photos/1024/768" media="(min-width: 640px)" />
          <img src="https://picsum.photos/360/720" alt="Hero Image" />
        </picture>
      </div>
      <div className="text-area-gradient">
        <h1 className="my-name">Crawford Forbes</h1>
        <h3 className="my-titles">Developer, Artist, Person with qualities you like!</h3>
      </div>
    </div>
  )
}

export default Hero
