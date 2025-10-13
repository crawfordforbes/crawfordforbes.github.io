import { memo } from "react";
import Hex from "@/features/hexes/HexSimple";
import { Link } from "react-router";

type BackButtonProps = {
  onBack: () => void
}

/**
 * Reusable back button component for project navigation
 */
function BackButton({ onBack }: BackButtonProps) {
  return (
    <Link to="/portfolio" role="button" className="back-link" aria-label="Back to Projects List" tabIndex={0}>
      <Hex 
        hexClass="back-button hex-button mobile" 
        content="more-projects"
        hexWidth={64} 
        onClick={onBack} 
      />
      <Hex 
        hexClass="back-button hex-button desktop" 
        content="more-projects"
        hexWidth={96} 
        onClick={onBack} 
      />
    </Link>
  )
}

export default memo(BackButton)