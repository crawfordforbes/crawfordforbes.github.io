const TopRight = () => {
  return (
    <svg width="160" height="185.6" viewBox="0 0 160 185.6" xmlns="http://www.w3.org/2000/svg" className="hex-image">
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="hex-top" />
      <polygon points="80,0 160,46 140,81 140,58 80,23 60,35 80,0" className="outer-wall-top-right" />
      <polygon points="160,46 160,139 120,162 140,128 140,81 160,46" className="outer-wall-right" />
      <polygon points="140,128 120,162 80,186 70,180 80,162 140,128" className="hex-wall-bottom-right" />
      <polygon points="20,128 80,162 70,180 10,145 20,128" className="hex-wall-bottom-left" />
      <polygon points="20,58 20,128 10,145 0,139 0,93 20,58" className="hex-wall-left" />
      <polygon points="80,0 60,35 20,58 0,93 0,46 80,0" className="outer-wall-top-left" />
    </svg>
  )
}

export default TopRight