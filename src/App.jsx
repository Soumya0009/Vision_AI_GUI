import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appInfo from "./config/AppInfo";
import ProtectedRoute from "../Router/ProtectedRoute";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("auth") === "true" ? (
              <Navigate to="/home" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
      />

      <p className="app-version">
        <span className="app-name">{appInfo.name}</span>
        <span className="app-separator">•</span>
        <span className="app-ver">v{appInfo.version}</span>
      </p>
    </BrowserRouter>
  );
}

export default App;
