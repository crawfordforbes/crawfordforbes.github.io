type CaptionProps = {
  content?: string;
}

function Caption({ content }: CaptionProps) {

  return (
    <div className="caption">
      {content}
    </div>
  )
}

export default Caption
