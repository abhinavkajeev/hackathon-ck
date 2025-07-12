import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './LandingPage.jsx'
import StartInterview from './StartInterview.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<StartInterview />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)