
type BadgeProps = {
  iconClass?: string,
  link?: string,
  title?: string,
  
}

function Badge({ iconClass = "default-icon", link = "https://example.com", title = "Default Badge" }: BadgeProps) {

  return (
    <div className="badge">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <span className={`badge-icon ${iconClass}`}>{title}</span>
      </a>
    </div>
  )
}

export default Badge
