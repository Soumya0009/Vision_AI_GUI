import React, { useState } from "react";
import "../CSS/Login.css";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";

// ICONS (same as yours)
const IconPerson = () => (
  <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const IconEmail = () => (
  <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconLock = () => (
  <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

function Login() {
  const [isActive, setIsActive] = useState(false);

  //  State for login
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); //  navigation

const handleLogin = (e) => {
  e.preventDefault();

  if (!user || !password) {
    toast.error("Please enter username and password");
    return;
  }

  if (user === "soumya" && password === "Soumya@135") {
    localStorage.setItem("auth", "true");

    toast.success("Login successful");

    navigate("/home");

  } else {
    toast.error("Please enter valid credentials");
  }
};

  return (
    <div className="login-page">
      <div className={`container ${isActive ? "active" : ""}`}>

        {/* SIGN IN */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}> 
            <h1>Sign In</h1>
            <span>with your username & password</span>

            <div className="input-box">
              <IconPerson />
              <input
                type="text"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value.toLowerCase())}
                // required
              />
            </div>

            <div className="input-box">
              <IconLock />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
            </div>

            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* SIGN UP (unchanged UI) */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>

            <div className="input-box">
              <IconPerson />
              <input type="text" placeholder="Username" required />
            </div>

            <div className="input-box">
              <IconEmail />
              <input type="email" placeholder="Email" required />
            </div>

            <div className="input-box">
              <IconLock />
              <input type="password" placeholder="Password" required />
            </div>

            <div className="input-box">
              <IconLock />
              <input type="password" placeholder="Confirm Password" required />
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* TOGGLE PANEL */}
        <div className="toggle-container">
          <div className="toggle">

            <div className="toggle-panel toggle-left">
              <img src={logo} alt="logo" className="toggle-panel-img" />
              <h1>Welcome Back!</h1>
              <button type="button" onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <img src={logo} alt="logo" className="toggle-panel-img" />
              <h1>Hello, Friend!</h1>
              <button type="button" onClick={() => setIsActive(true)}>
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;