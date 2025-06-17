import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Admin from './pages/Admin.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="*" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
)
