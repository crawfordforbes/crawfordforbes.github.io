const Left = () => {
  return (
    <svg width="160" height="185.6" viewBox="0 0 160 185.6" xmlns="http://www.w3.org/2000/svg" className="hex-image">
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="hex-top" />
      <polygon points="80,23 120,23 160,46 160,58 140,58 80,23" className="hex-wall-top-right" />
      <polygon points="140,58 160,58 160,128 140,128 140,58" className="hex-wall-right" />
      <polygon points="140,128 160,128 160,139 120,162 80,162 140,128" className="hex-wall-bottom-right" />
      <polygon points="0,139 40,139 80,162 120,162 80,186 0,139" className="outer-wall-bottom-left" />
      <polygon points="0,46 40,46 20,58 20,128 40,139 0,139 0,46" className="outer-wall-left" />
      <polygon points="80,0 120,23 80,23 40,46 0,46 80,0" className="outer-wall-top-left" />
    </svg>
  )
}

export default Left