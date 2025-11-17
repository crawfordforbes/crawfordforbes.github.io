import { useState } from "react";
import Badge from "@/components/global/Badge";
import { textPanelContent } from "@/data/content/textPanel";
import './styles/textPanel.css';

type TextPanelProps = {
  textPanelId: string;
  toggleReadMore?: boolean;
}

function TextPanel({textPanelId, toggleReadMore = false}: TextPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = textPanelContent[textPanelId];
  
  if (!content.description) {
    return <></>;
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="text-panel">
      <div className={`expandable-container ${toggleReadMore && !isExpanded ? 'hidden' : ''}`}>
        {content.description && (
          <div className="description text-content" dangerouslySetInnerHTML={{ __html: content.description || '' }} />
        )}
      </div>
      {toggleReadMore && (
        <div className="read-more-wrapper">
          <Badge
            title={isExpanded ? "Show Less" : "Read More"}
            iconClass={isExpanded ? ['fas', 'angle-up'] : ['fas', 'angle-down']}
            extraClass="pill secondary read-more-btn"
            badgeOnClick={handleToggle}
          />
        </div>
      )}
    </article>
  )
}

export default TextPanel