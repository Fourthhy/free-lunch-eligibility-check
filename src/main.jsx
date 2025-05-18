import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeConfig } from "flowbite-react";
import './index.css'
import App from './routes/AppRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeConfig dark={false} />
    <App />
  </StrictMode>,
)
