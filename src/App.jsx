import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import ResumeTool from "./pages/ResumeTool";
import Login from "./pages/Login";
import logo from "./assets/icon.png";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-bg">
        <nav className="nav">
          <div className="nav-left">
          <div className="nav-left">
          <img src={logo} alt="SkillSync Logo" className="logo-img" />
          <span className="logo-text">SkillSync</span>
</div>
          </div>

          <div className="nav-right">
            <Link className="nav-link" to="/">Resume Tool</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </div>
        </nav>

        <main className="page">
          <Routes>
            <Route path="/" element={<ResumeTool />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}