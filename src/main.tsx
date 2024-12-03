import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp.tsx'
import SignIn from './components/SignIn.tsx'
import Shared from './components/Shared.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/shared/:hash" element={<Shared />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
