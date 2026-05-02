import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  BarChart2,
  Clock,
  Images,
  LogOut,
  Menu,
  X,
  ImagePlus,
  Upload,
} from "lucide-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/home/dashboard" },
  { name: "Model Metrics", icon: BarChart2, path: "/home/metrics" },
  { name: "History", icon: Clock, path: "/home/history" },
  { name: "Total Images", icon: Images, path: "/home/images" },
];

const models = [
  { name: "ResNet18", accuracy: 94 },
  { name: "ResNet50", accuracy: 97 },
];

// Generates a consistent blue-family color from the first char of the username
function avatarColor(name = "") {
  const palette = ["#3b82f6", "#6366f1", "#0ea5e9", "#8b5cf6", "#14b8a6"];
  const idx = (name.charCodeAt(0) || 0) % palette.length;
  return palette[idx];
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read logged-in username from localStorage
  const username = localStorage.getItem("username") || "User";
  const initials = username.slice(0, 2).toUpperCase();
  const displayName =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});

  const handleModelChange = (e) => {
    const found = models.find((m) => m.name === e.target.value);
    setSelectedModel(found);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setLoadedImages({});
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    toast.success("Logout successful");
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 500);
  };

  return (
    <div className="d-flex">
      {/* ── Mobile Header ── */}
      <div className="mobile-header d-md-none d-flex justify-content-between align-items-center p-2 border-bottom">
        <button className="btn" onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
        <img src={logo} alt="logo" width="90" />
      </div>

      {/* ── Overlay ── */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      {/* ── Sidebar ── */}
      <div
        className={`sidebar bg-white border-end d-flex flex-column ${isOpen ? "open" : ""}`}
      >
        {/* Close (mobile) */}
        <div className="d-md-none text-end p-2">
          <button className="btn" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Logo */}
        <div className="d-flex align-items-center gap-2 p-3 border-bottom">
          <img src={logo} alt="logo" width="90" />
          <div>
            <h6 className="mb-0 fw-bold">Intelligent Vision</h6>
            <small className="text-muted">Real-Time Insights</small>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 mt-3">
          <small className="text-uppercase text-muted fw-semibold">
            Navigation
          </small>
        </div>

        <div className="nav flex-column mt-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  navigate(item.path);
                }}
                className={`nav-link d-flex align-items-center gap-2 rounded px-3 py-2 text-start ${
                  isActive ? "active-item" : ""
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Active Model */}
        <div className="p-3 mt-3">
          <small className="text-uppercase text-muted fw-semibold">
            Active Model
          </small>

          <select
            className="form-select mt-2"
            value={selectedModel.name}
            onChange={handleModelChange}
          >
            {models.map((m) => (
              <option key={m.name}>{m.name}</option>
            ))}
          </select>

          <div className="card mt-3 p-2 shadow-sm">
            <div className="d-flex justify-content-between">
              <div>
                <small className="fw-bold text-primary">
                  {selectedModel.name}
                </small>
                <div className="text-muted small">
                  {selectedModel.accuracy}% accuracy
                </div>
              </div>
              <span className="badge bg-success">Live</span>
            </div>
            <div className="progress mt-2" style={{ height: "6px" }}>
              <div
                className="progress-bar"
                style={{ width: `${selectedModel.accuracy}%` }}
              />
            </div>
          </div>
        </div>

        {/* Upload Images */}
        <div className="p-3">
          <small className="text-uppercase text-muted fw-semibold">
            Upload Images
          </small>

          <input
            type="file"
            multiple
            accept="image/*"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <label htmlFor="imageUpload" className="upload-box mt-2">
            <ImagePlus size={28} />
            <span className="mt-1 small">Select Images</span>
          </label>

          {images.length > 0 && (
            <div className="mt-2 d-flex flex-wrap gap-2">
              {images.map((img, index) => {
                const isLoaded = loadedImages[index];
                return (
                  <div
                    key={index}
                    style={{ width: 50, height: 50, position: "relative" }}
                  >
                    {!isLoaded && <div className="skeleton-box" />}
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      width="50"
                      height="50"
                      style={{
                        objectFit: "cover",
                        borderRadius: "6px",
                        display: isLoaded ? "block" : "none",
                      }}
                      onLoad={() =>
                        setLoadedImages((prev) => ({ ...prev, [index]: true }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Apply Button */}
        {images.length > 0 && (
          <div className="px-3">
            <button
              onClick={() => toast.success("Processing started")}
              className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2"
            >
              <Upload size={14} />
              Apply
            </button>
          </div>
        )}

        {/* ── Profile + Logout Card ── */}
        <div className="mt-auto p-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "10px 12px",
            }}
          >
            {/* Avatar circle with initials */}
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: avatarColor(username),
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
                flexShrink: 0,
                letterSpacing: "0.5px",
                userSelect: "none",
              }}
            >
              {initials}
            </div>

            {/* Name + status */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#0f172a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {displayName}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "1px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Online
                </span>
              </div>
            </div>

            {/* Logout icon button */}
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "transparent",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "6px 8px",
                cursor: "pointer",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fef2f2";
                e.currentTarget.style.borderColor = "#f87171";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#fecaca";
              }}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}