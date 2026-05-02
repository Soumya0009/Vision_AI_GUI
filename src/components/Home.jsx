import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ModelMetrics from "./ModelMetrics";
import History from "./History";

function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="metrics" element={<ModelMetrics />} />
          <Route path="history" element={<History/>} />
          <Route path="images" element={<div>Total Images Page</div>} />
        </Routes>
      </div>

    </div>
  );
}

export default Home;