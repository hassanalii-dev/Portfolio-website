
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/home" element={<App />} />
  <Route path="/about" element={<App />} />
  <Route path="/education" element={<App />} />
  <Route path="/skills" element={<App />} />
  <Route path="/services" element={<App />} />
  <Route path="/projects" element={<App />} />
  <Route path="/contact" element={<App />} />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

    </BrowserRouter>
  </StrictMode>,
)
