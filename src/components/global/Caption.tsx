type CaptionProps = {
  content?: string;
}

function Caption({ content }: CaptionProps) {

  return (
    <span className="caption">
      {content}
    </span>
  )
}

export default Caption
