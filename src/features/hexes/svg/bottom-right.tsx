const BottomRight = () => {
  return (
    <svg width="160" height="185.6" viewBox="0 0 160 185.6" xmlns="http://www.w3.org/2000/svg" className="hex-image">
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="hex-top" />
      <polygon points="80,0 120,23 140,58 80,23 50,6 80,0" className="hex-wall-top-right" />
      <polygon points="120,23 160,46 160,139 140,104 140,58 120,23" className="outer-wall-right" />
      <polygon points="140,104 160,139 80,186 60,151 80,162 140,128 140,104" className="outer-wall-bottom-right" />
      <polygon points="0,93 20,128 60,151 80,186 0,139 0,93" className="outer-wall-bottom-left" />
      <polygon points="10,41 20,58 20,128 0,93 0,46 10,41" className="hex-wall-left" />
      <polygon points="70,6 80,23 20,58 10,41 70,6" className="hex-wall-top-left" />
    </svg>
  )
}

export default BottomRight