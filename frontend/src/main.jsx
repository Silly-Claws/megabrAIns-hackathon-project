import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {LayerContextProvider} from "./contexts/LayerContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayerContextProvider>
      <App />
    </LayerContextProvider>
  </StrictMode>,
)
