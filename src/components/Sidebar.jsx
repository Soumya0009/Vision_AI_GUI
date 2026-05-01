import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Model Metrics", icon: BarChart2 },
  { name: "History", icon: Clock },
  { name: "Total Images", icon: Images },
];

const models = [
  { name: "ResNet18", accuracy: 94 },
  { name: "ResNet50", accuracy: 97 },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const navigate = useNavigate();

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

    toast.success("Logout successful");
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 500);
  };
  return (
    <div className="d-flex">
      {/* Mobile Top Bar */}
      <div className="mobile-header d-md-none d-flex justify-content-between align-items-center p-2 border-bottom">
        <button className="btn" onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
        <img src={logo} alt="logo" width="90" />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar bg-white border-end ${isOpen ? "open" : ""}`}>
        {/* Close button (mobile) */}
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
            const isActive = active === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false); // auto close on mobile
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

        {/* Model */}
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
              ></div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <small className="text-uppercase text-muted fw-semibold">
            Upload Images
          </small>

          {/* Hidden Input */}
          <input
            type="file"
            multiple
            accept="image/*"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          {/* Square Upload Box */}
          <label htmlFor="imageUpload" className="upload-box mt-2">
            <ImagePlus size={28} />
            <span className="mt-1 small">Select Images</span>
          </label>

          {/* Preview */}
          {images.length > 0 && (
            <div className="mt-2 d-flex flex-wrap gap-2">
              {images.map((img, index) => {
                const isLoaded = loadedImages[index];

                return (
                  <div
                    key={index}
                    style={{ width: 50, height: 50, position: "relative" }}
                  >
                    {/* Skeleton */}
                    {!isLoaded && <div className="skeleton-box"></div>}

                    {/* Image */}
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
                        setLoadedImages((prev) => ({
                          ...prev,
                          [index]: true,
                        }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-auto p-3">
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
