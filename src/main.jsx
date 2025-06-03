import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeConfig } from "flowbite-react";
import './index.css'
import App from './routes/AppRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeConfig dark={false} />
     <AuthProvider> {/* Wrap your App (or AppRoute) with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
