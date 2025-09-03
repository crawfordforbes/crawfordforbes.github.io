import type { ReactNode } from 'react'

type ContentPanelProps = {
  children: ReactNode
}
function ContentPanel({ children }: ContentPanelProps) {

  return (
    <div className="content-panel">
      {children}
    </div>
  )
}

export default ContentPanel
