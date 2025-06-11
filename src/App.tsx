import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/app/Login";
import Main from "./pages/app/Main";
import MyPage from "./pages/app/MyPage";

function App() {
  return (
    <div className="w-[370px] h-screen mx-auto relative flex">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
