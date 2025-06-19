import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/app/Login'
import Main from './pages/app/Main'
import MyPage from './pages/app/MyPage'
import { useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false)
    }, 1500)
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          showSplashScreen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <SplashScreen />
      </div>
      <div
        className={`relative mx-auto flex h-screen w-[370px] transition-opacity duration-500 ${
          showSplashScreen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </>
  )
}

export default App
