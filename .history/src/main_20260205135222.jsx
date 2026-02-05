import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import B

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowerRouter>
    <App />
    </BrowerRouter>
  </StrictMode>,
)
