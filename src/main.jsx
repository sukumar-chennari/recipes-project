import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Stack } from './components/stack/stack.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Stack/>
  </StrictMode>,
)
