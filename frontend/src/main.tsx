import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import BeloPreviewPage from './pages/BeloPreviewPage.tsx'
import './index.css'

const isBeloRoute = window.location.pathname === '/belo-preview'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isBeloRoute ? <BeloPreviewPage /> : <App />}
  </React.StrictMode>,
)
