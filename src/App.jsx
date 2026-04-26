import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appInfo from './config/AppInfo';

// Protected Route
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth")
  return isAuth ? children : <Navigate to="/" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <ToastContainer position="bottom-center" autoClose={3000} theme="colored" />

      <p className="app-version">
        {appInfo.name} Version: {appInfo.version}
      </p>
    </BrowserRouter>
  )
}

export default App