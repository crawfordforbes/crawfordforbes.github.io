import Page from '../components/layouts/page'

import './styles/index.css'

function App() {
  const theme = "base-theme"
  // const theme = "outdoors-theme"
  // const theme = "magic-escape"
  // const theme = "mystic-depths"
  return (
    <div className={theme}>
      <Page />
    </div>
  )
}

export default App
