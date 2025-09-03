const Right = () => {
  return (
    <svg width="160" height="185.6" viewBox="0 0 160 185.6" xmlns="http://www.w3.org/2000/svg" className="hex-image">
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="hex-top" />
      <polygon points="80,0 160,46 120,46 80,23 40,23 80,0" className="outer-wall-top-right" />
      <polygon points="120,46 160,46 160,139 120,139 140,128 140,58 120,46" className="outer-wall-right" />
      <polygon points="120,139 160,139 80,186 40,162 80,162 120,139" className="outer-wall-bottom-right" />
      <polygon points="0,128 20,128 80,162 40,162 0,139 0,128" className="hex-wall-bottom-left" />
      <polygon points="0,58 20,58 20,128 0,128 0,58" className="hex-wall-left" />
      <polygon points="40,23 80,23 20,58 0,58 0,46 40,23" className="hex-wall-top-left" />
    </svg>
  )
}

export default Right