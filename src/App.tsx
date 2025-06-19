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
    }, 2000)
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
          showSplashScreen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <SplashScreen />
      </div>
      <div
        className={`relative mx-auto flex h-screen w-[370px] transition-opacity duration-1000 ${
          showSplashScreen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
