import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'

const normalizeStartupUrl = () => {
  if (typeof window === 'undefined') return
  const { pathname, search, hash } = window.location
  const hasModalParams = new URLSearchParams(search).has('patient') || new URLSearchParams(search).has('media')
  const missingHomeHash = hash === '' || hash === '#'

  if (pathname !== '/' || hasModalParams || missingHomeHash) {
    window.history.replaceState({}, '', '/#home')
  }
}

const removeBootSplash = () => {
  const splash = document.getElementById('app-boot-splash')
  if (splash) splash.remove()
}

normalizeStartupUrl()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

requestAnimationFrame(removeBootSplash)
