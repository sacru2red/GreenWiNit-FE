import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/app/Login'
import Main from './pages/app/Main'
import MyPage from './pages/app/MyPage'

function App() {
  return (
    <div className="relative mx-auto flex h-screen w-[370px]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </div>
  )
}

export default App
