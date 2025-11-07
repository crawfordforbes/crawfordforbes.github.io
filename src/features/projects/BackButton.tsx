import { memo } from "react";
import { Link } from "react-router";

import Hex from "@/features/hexes/Hex";

type BackButtonProps = {
  onBack: () => void
}

/**
 * Reusable back button component for project navigation
 */
function BackButton({ onBack }: BackButtonProps) {
  return (
    <Link to="/projects" role="button" className="back-link" aria-label="Back to Projects List" tabIndex={0}>
      <Hex 
        hexClass="back-button hex-button icon-bg" 
        content="more-projects"
        contentType="badge"
        hexWidth={80} 
        onClick={onBack} 
      />
    </Link>
  )
}

export default memo(BackButton)