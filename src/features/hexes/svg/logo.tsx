const Logo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="185.6"
      viewBox="0 0 160 185.6"
      className="hex-image logo-svg"
    >
      <polygon points="80,0 160,46 160,139 80,186 0,139 0,46" className="outer-hex" />
      <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="middle-hex" />
      <polygon points="80,46 120,70 120,116 80,139 40,116 40,70" className="inner-hex" />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="logo-text title">CF</text>
    </svg>
  )
}

export default Logo