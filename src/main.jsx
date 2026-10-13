import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { IntegrationProvider } from './context/IntegrationContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IntegrationProvider>
      <App />
    </IntegrationProvider>
  </StrictMode>
)
