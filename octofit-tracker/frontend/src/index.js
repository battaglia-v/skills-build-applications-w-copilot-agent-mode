import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

function getApiBase() {
  const name = process.env.REACT_APP_CODESPACE_NAME || ''
  if (!name) return 'http://localhost:8000/api'
  return `https://${name}-8000.app.github.dev/api`
}

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App getApiBase={getApiBase} />
    </BrowserRouter>
  </React.StrictMode>
)
