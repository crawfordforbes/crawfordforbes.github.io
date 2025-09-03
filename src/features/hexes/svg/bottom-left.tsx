const BottomLeft = () => {
  return (
    <svg width="160" height="185.6" viewBox="0 0 160 185.6" xmlns="http://www.w3.org/2000/svg" className="hex-image">
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="hex-top" />
      <polygon points="90,6 150,41 140,58 80,23 90,6" className="hex-wall-top-right" />
      <polygon points="150,41 160,46 160,93 140,128 140,58 150,41" className="hex-wall-right" />
      <polygon points="160,93 160,139 80,186 100,151 140,128 160,93" className="outer-wall-bottom-right" />
      <polygon points="20,99 20,128 80,162 100,151 80,186 0,139 20,99" className="outer-wall-bottom-left" />
      <polygon points="40,23 20,58 20,99 0,139 0,46 40,23" className="outer-wall-left" />
      <polygon points="80,0 90,6 80,23 20,58 40,23 80,0" className="hex-wall-top-left" />
    </svg>
  )
}

export default BottomLeft