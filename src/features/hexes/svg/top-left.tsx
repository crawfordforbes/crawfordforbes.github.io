const TopLeft = () => {
  return (
    <svg width="160" height="185.6" viewBox="0 0 160 185.6" xmlns="http://www.w3.org/2000/svg" className="hex-image">
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="hex-top" />
      <polygon points="80,0 160,46 160,93 140,58 100,35 80,0" className="outer-wall-top-right" />
      <polygon points="140,58 160,93 160,139 150,145 140,128 140,58" className="hex-wall-right" />
      <polygon points="140,128 150,145 90,180 80,162 140,128" className="hex-wall-bottom-right" />
      <polygon points="20,128 80,162 90,180 80,186 40,162 20,128" className="hex-wall-bottom-left" />
      <polygon points="0,46 20,81 20,128 40,162 0,139 0,46" className="outer-wall-left" />
      <polygon points="80,0 100,35 80,23 20,58 20,81 0,46 80,0" className="outer-wall-top-left" />
    </svg>
  )
}

export default TopLeft