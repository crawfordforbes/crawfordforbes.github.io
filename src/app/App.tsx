import Page from '../components/layouts/page'

import './styles/index.css'

function App() {
  let theme = "base-theme"
  // theme = "outdoors-theme"
  // theme = "magic-escape"
  // theme = "mystic-depths"
  return (
    <div className={theme}>
      <Page />
    </div>
  )
}

export default App
