import { useState } from "react";
import "../CSS/Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

// ─── mock data ────────────────────────────────────────────────────────────────

const accuracyData = [
  { date: "May 13", accuracy: 92.1 },
  { date: "May 14", accuracy: 95.4 },
  { date: "May 15", accuracy: 95.8 },
  { date: "May 16", accuracy: 94.2 },
  { date: "May 17", accuracy: 96.8 },
  { date: "May 18", accuracy: 95.1 },
  { date: "May 19", accuracy: 97.23 },
];

const recentUploads = [
  {
    id: 1,
    label: "Car",
    confidence: 96,
    color: "#6366f1",
    bg: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=140&fit=crop",
  },
  {
    id: 2,
    label: "Dog",
    confidence: 94,
    color: "#f59e0b",
    bg: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=200&h=140&fit=crop",
  },
  {
    id: 3,
    label: "Person",
    confidence: 98,
    color: "#10b981",
    bg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=140&fit=crop",
  },
  {
    id: 4,
    label: "Bus",
    confidence: 98,
    color: "#3b82f6",
    bg: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=200&h=140&fit=crop",
  },
  {
    id: 5,
    label: "Cat",
    confidence: 97,
    color: "#f59e0b",
    bg: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=140&fit=crop",
  },
  {
    id: 6,
    label: "Stop Sign",
    confidence: 97,
    color: "#ef4444",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=140&fit=crop",
  },
  {
    id: 7,
    label: "Mountain",
    confidence: 91,
    color: "#06b6d4",
    bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=140&fit=crop",
  },
  {
    id: 8,
    label: "Car",
    confidence: 96,
    color: "#6366f1",
    bg: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=140&fit=crop",
  },
];

const recentActivity = [
  {
    icon: "bi-cloud-upload",
    color: "#6366f1",
    bg: "#ede9fe",
    title: "12 images uploaded",
    sub: "Traffic_Images.zip",
    time: "10:21 AM",
  },
  {
    icon: "bi-cpu",
    color: "#10b981",
    bg: "#d1fae5",
    title: "Model ResNet50 processed 24 images",
    sub: "",
    time: "10:20 AM",
  },
  {
    icon: "bi-check-circle",
    color: "#3b82f6",
    bg: "#dbeafe",
    title: "New prediction completed",
    sub: "Car (96%)",
    time: "10:18 AM",
  },
  {
    icon: "bi-graph-up",
    color: "#8b5cf6",
    bg: "#ede9fe",
    title: "Model metrics updated",
    sub: "Accuracy improved to 97.23%",
    time: "10:15 AM",
  },
  {
    icon: "bi-person-check",
    color: "#6366f1",
    bg: "#ede9fe",
    title: "User logged in",
    sub: "Soumya",
    time: "10:10 AM",
  },
];

const topPredictions = [
  { label: "Car", count: 320, pct: 25.81, trend: "+8.2%", up: true },
  { label: "Person", count: 270, pct: 21.77, trend: "+5.6%", up: true },
  { label: "Dog", count: 180, pct: 14.52, trend: "+3.1%", up: true },
  { label: "Bus", count: 120, pct: 9.68, trend: "-1.2%", up: false },
  { label: "Cat", count: 110, pct: 8.87, trend: "+0.9%", up: true },
];

// ─── custom tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div
        className="custom-tooltip shadow-sm"
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 13,
        }}
      >
        <div className="fw-semibold text-secondary mb-1">{label}</div>
        <div style={{ color: "#3b82f6", fontWeight: 700 }}>
          {payload[0].value}%
        </div>
      </div>
    );
  }
  return null;
};

// ─── stat card ────────────────────────────────────────────────────────────────

const StatCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  delta,
  deltaText,
  extra,
}) => (
  <div className="col-md-6 col-xl-3">
    <div className="card border-0 shadow-sm h-100 stat-card">
      <div className="card-body d-flex align-items-start gap-3 p-4">
        <div
          className="stat-icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: 48, height: 48, background: iconBg }}
        >
          <i className={`bi ${icon} fs-5`} style={{ color: iconColor }} />
        </div>
        <div className="flex-grow-1">
          <div className="text-muted small mb-1">{label}</div>
          <div className="stat-value fw-bold">{value}</div>
          {delta && (
            <div className="mt-1 small" style={{ color: "#10b981" }}>
              <i className="bi bi-arrow-up-short" />
              {delta} {deltaText}
            </div>
          )}
          {extra}
        </div>
      </div>
    </div>
  </div>
);

// ─── main component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [perfRange, setPerfRange] = useState("Last 7 Days");

  return (
    <div className="dashboard-wrapper d-flex justify-content-center align-items-start py-4">
      {/* Main Dashboard Card */}
      <div className="card dashboard-main-card shadow-lg border-0">
        {/* Scrollable Body */}
        <div className="dashboard-scrollable">
          <div className="dashboard-root p-4">
            {/* Header */}
            <div className="d-flex align-items-start justify-content-between mb-4 flex-wrap gap-3">
              <div>
                <h1
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.9rem", letterSpacing: "-.5px" }}
                >
                  Dashboard
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: 14 }}>
                  Welcome back! Here's what's happening with your AI model
                  today.
                </p>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="row g-3 mb-4">
              <StatCard
                icon="bi-images"
                iconBg="#ede9fe"
                iconColor="#6366f1"
                label="Total Images"
                value="1,240"
                delta="18.6%"
                deltaText="vs last 7 days"
              />
              
              <StatCard
                icon="bi-graph-up-arrow"
                iconBg="#d1fae5"
                iconColor="#10b981"
                label="Processed Images"
                value="1,180"
                delta="15.3%"
                deltaText="vs last 7 days"
              />
              <StatCard
                icon="bi-check2-circle"
                iconBg="#ede9fe"
                iconColor="#8b5cf6"
                label="Model Accuracy"
                value="97.23%"
                delta="2.1%"
                deltaText="vs last 7 days"
              />
              <StatCard
                icon="bi-lightning-charge"
                iconBg="#fef3c7"
                iconColor="#f59e0b"
                label="Active Model"
                value="ResNet50"
                extra={
                  <span className="live-badge mt-2 d-inline-block">Live</span>
                }
              />
            </div>

            {/* Middle Row */}
            <div className="row g-3 mb-4">
              {/* Recent Uploads */}
              <div className="col-lg-7">
                <div className="card section-card h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="section-title">Recent Uploads</span>
                      <a className="view-all-link">View All</a>
                    </div>

                    {/* Scrollable uploads */}
                    <div className="uploads-scroll">
                      <div className="row g-2">
                        {recentUploads.map((item) => (
                          <div className="col-6 col-sm-3" key={item.id}>
                            <div className="upload-thumb">
                              <img
                                src={item.bg}
                                alt={item.label}
                                loading="lazy"
                              />
                              <span className="thumb-badge">
                                {item.confidence}%
                              </span>
                              <span
                                className="thumb-label"
                                style={{ background: item.color }}
                              >
                                {item.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p
                      className="text-muted mt-3 mb-0"
                      style={{ fontSize: 12.5 }}
                    >
                      Showing latest 8 images
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="col-lg-5">
                <div className="card section-card h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="section-title">
                        Model Performance (Accuracy)
                      </span>
                      <select
                        className="range-select"
                        value={perfRange}
                        onChange={(e) => setPerfRange(e.target.value)}
                      >
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                      </select>
                    </div>

                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart
                        data={accuracyData}
                        margin={{ top: 8, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: "#9ca3af" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          domain={[80, 100]}
                          tickCount={6}
                          tick={{ fontSize: 11, fill: "#9ca3af" }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `${v}%`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#3b82f6"
                          strokeWidth={2.5}
                          dot={{
                            r: 4,
                            fill: "#3b82f6",
                            strokeWidth: 0,
                          }}
                          activeDot={{ r: 6, fill: "#3b82f6" }}
                        />
                        <ReferenceDot
                          x="May 19"
                          y={97.23}
                          r={5}
                          fill="#3b82f6"
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="row g-3">
              {/* Recent Activity */}
              <div className="col-lg-7">
                <div className="card section-card">
                  <div className="card-body p-4">
                    <span className="section-title">Recent Activity</span>

                    <div className="activity-scroll mt-3">
                      <div className="d-flex flex-column gap-3">
                        {recentActivity.map((act, i) => (
                          <div
                            key={i}
                            className="d-flex align-items-center gap-3"
                          >
                            <div
                              className="activity-icon"
                              style={{ background: act.bg }}
                            >
                              <i
                                className={`bi ${act.icon}`}
                                style={{
                                  color: act.color,
                                  fontSize: 15,
                                }}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div
                                style={{
                                  fontSize: 13.5,
                                  fontWeight: 500,
                                }}
                              >
                                {act.title}
                              </div>
                              {act.sub && (
                                <div
                                  className="text-muted"
                                  style={{ fontSize: 12 }}
                                >
                                  {act.sub}
                                </div>
                              )}
                            </div>
                            <div
                              className="text-muted"
                              style={{
                                fontSize: 12,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {act.time}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Predictions */}
              <div className="col-lg-5">
                <div className="card section-card">
                  <div className="card-body p-4">
                    <span className="section-title">Top Predictions</span>

                    <div className="table-scroll mt-3">
                      <table className="table pred-table mb-0 w-100">
                        <thead>
                          <tr>
                            <th>Label</th>
                            <th>Count</th>
                            <th>Percentage</th>
                            <th>Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topPredictions.map((p) => (
                            <tr key={p.label}>
                              <td>{p.label}</td>
                              <td>{p.count}</td>
                              <td>{p.pct}%</td>
                              <td>{p.trend}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
