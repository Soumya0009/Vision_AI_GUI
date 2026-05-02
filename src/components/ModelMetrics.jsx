import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const performanceData = [
  { date: "May 13", Accuracy: 95.2, Precision: 93.1, Recall: 88.5, "F1 Score": 90.7 },
  { date: "May 14", Accuracy: 95.8, Precision: 93.5, Recall: 89.2, "F1 Score": 91.2 },
  { date: "May 15", Accuracy: 96.1, Precision: 94.0, Recall: 89.8, "F1 Score": 91.8 },
  { date: "May 16", Accuracy: 96.4, Precision: 94.3, Recall: 90.2, "F1 Score": 92.2 },
  { date: "May 17", Accuracy: 96.7, Precision: 94.6, Recall: 90.9, "F1 Score": 92.7 },
  { date: "May 18", Accuracy: 96.9, Precision: 94.9, Recall: 91.5, "F1 Score": 93.1 },
  { date: "May 19", Accuracy: 97.0, Precision: 95.2, Recall: 92.4, "F1 Score": 93.79 },
];

const sparkData = [
  [{ v: 94.5 }, { v: 94.8 }, { v: 95.2 }, { v: 95.8 }, { v: 96.1 }, { v: 96.7 }, { v: 97.0 }],
  [{ v: 93.0 }, { v: 93.3 }, { v: 93.6 }, { v: 94.0 }, { v: 94.5 }, { v: 94.8 }, { v: 95.2 }],
  [{ v: 88.5 }, { v: 89.2 }, { v: 89.8 }, { v: 90.2 }, { v: 90.9 }, { v: 91.5 }, { v: 92.4 }],
  [{ v: 90.7 }, { v: 91.2 }, { v: 91.8 }, { v: 92.2 }, { v: 92.7 }, { v: 93.1 }, { v: 93.79 }],
];

const confusionMatrix = [
  [482, 12, 6, 3],
  [15, 468, 7, 5],
  [8, 10, 491, 6],
  [4, 6, 9, 489],
];
const cmLabels = ["Cat", "Dog", "Vehicle", "Person"];

const perClassData = [
  { cls: "Cat",     icon: "🐱", precision: "96.40%", recall: "96.00%", f1: "96.19%", support: 503 },
  { cls: "Dog",     icon: "🐶", precision: "95.88%", recall: "93.60%", f1: "94.73%", support: 495 },
  { cls: "Vehicle", icon: "🚗", precision: "95.91%", recall: "96.27%", f1: "96.09%", support: 515 },
  { cls: "Person",  icon: "👤", precision: "96.06%", recall: "95.31%", f1: "95.68%", support: 508 },
];

// ─── Metric Cards Config ──────────────────────────────────────────────────────

const AccuracyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const PrecisionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const RecallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const F1Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const metrics = [
  { title: "Accuracy",  value: "97.00%", change: "2.1%", color: "#3b82f6", bgColor: "#eff6ff", sparkIdx: 0, Icon: AccuracyIcon },
  { title: "Precision", value: "95.20%", change: "1.8%", color: "#22c55e", bgColor: "#f0fdf4", sparkIdx: 1, Icon: PrecisionIcon },
  { title: "Recall",    value: "92.40%", change: "3.2%", color: "#f59e0b", bgColor: "#fffbeb", sparkIdx: 2, Icon: RecallIcon },
  { title: "F1 Score",  value: "93.79%", change: "2.5%", color: "#8b5cf6", bgColor: "#f5f3ff", sparkIdx: 3, Icon: F1Icon },
];

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Calendar Icon ────────────────────────────────────────────────────────────

const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChevronDown = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ModelMetrics() {
  const [, setHovered] = useState(null);

  return (
    <div style={{ background: "#f8fafc", height: "100vh", overflowY: "auto", padding: "28px 28px", scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>

      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-1" style={{ fontSize: "22px", color: "#0f172a" }}>
            Model Metrics
          </h4>
          <p className="mb-0" style={{ fontSize: "13px", color: "#94a3b8" }}>
            Detailed performance evaluation of the selected model.
          </p>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <button
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "13px", color: "#374151", background: "white",
              border: "1px solid #e2e8f0", borderRadius: "8px",
              padding: "7px 12px", cursor: "pointer", fontWeight: 500,
            }}
          >
            <CalIcon /> Last 7 Days <ChevronDown />
          </button>

          <button
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "13px", color: "#3b82f6", background: "white",
              border: "1px solid #bfdbfe", borderRadius: "8px",
              padding: "7px 14px", cursor: "pointer", fontWeight: 500,
            }}
          >
            <DownloadIcon /> Export Report
          </button>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="row g-3 mb-4">
        {metrics.map(({ title, value, change, color, bgColor, sparkIdx, Icon }, i) => (
          <div className="col-md-3" key={i}>
            <div
              style={{
                background: "white",
                borderRadius: "14px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                padding: "18px 18px 0",
                overflow: "hidden",
              }}
            >
              {/* Icon + label */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    background: bgColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon />
                </div>
                <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{title}</span>
              </div>

              {/* Value */}
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", lineHeight: 1, marginBottom: "6px" }}>
                {value}
              </div>

              {/* Change badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 700 }}>↑ {change}</span>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>vs last 7 days</span>
              </div>

              {/* Sparkline */}
              <div style={{ marginLeft: "-18px", marginRight: "-18px" }}>
                <Sparkline data={sparkData[sparkIdx]} color={color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Middle Row: Chart + Confusion Matrix ── */}
      <div className="row g-3 mb-4">

        {/* Performance Over Time */}
        <div className="col-lg-8">
          <div
            style={{
              background: "white", borderRadius: "14px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              padding: "20px",
            }}
          >
            <h6 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "16px" }}>
              Performance Over Time
            </h6>

            <ResponsiveContainer width="100%" height={265}>
              <LineChart data={performanceData} margin={{ top: 5, right: 10, bottom: 0, left: -4 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 100]}
                  ticks={[50, 60, 70, 80, 90, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  width={42}
                />
                <Tooltip
                  formatter={(v, name) => [`${v.toFixed(2)}%`, name]}
                  contentStyle={{
                    fontSize: 12, borderRadius: 8,
                    border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, paddingTop: "8px" }}
                />
                <Line type="monotone" dataKey="Accuracy"  stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3.5, fill: "#3b82f6" }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Precision" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3.5, fill: "#22c55e" }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="Recall"    stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3.5, fill: "#f59e0b" }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="F1 Score"  stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3.5, fill: "#8b5cf6" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="col-lg-4">
          <div
            style={{
              background: "white", borderRadius: "14px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              padding: "20px", height: "100%",
              display: "flex", flexDirection: "column",
            }}
          >
            <h6 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "14px" }}>
              Confusion Matrix
            </h6>

            {/* "Predicted" header label */}
            <div style={{ paddingLeft: "52px", marginBottom: "2px" }}>
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 600, color: "#64748b" }}>
                Predicted
              </div>
            </div>

            <div style={{ display: "flex", flex: 1 }}>
              {/* "Actual" rotated label */}
              <div
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "16px",
                  marginRight: "4px",
                }}
              >
                Actual
              </div>

              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "3px", fontSize: "12px" }}>
                <thead>
                  <tr>
                    <th style={{ width: "46px" }} />
                    {cmLabels.map((l) => (
                      <th
                        key={l}
                        style={{ textAlign: "center", fontSize: "11px", color: "#475569", fontWeight: 600, paddingBottom: "4px" }}
                      >
                        {l}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {confusionMatrix.map((row, ri) => (
                    <tr key={ri}>
                      <td
                        style={{
                          textAlign: "right", paddingRight: "8px",
                          fontSize: "11px", color: "#475569", fontWeight: 600, whiteSpace: "nowrap",
                        }}
                      >
                        {cmLabels[ri]}
                      </td>
                      {row.map((val, ci) => (
                        <td
                          key={ci}
                          onMouseEnter={() => setHovered(`${ri}-${ci}`)}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            textAlign: "center",
                            padding: "7px 4px",
                            borderRadius: "5px",
                            background: ri === ci ? "#dcfce7" : "#f8fafc",
                            color: ri === ci ? "#166534" : "#334155",
                            fontWeight: ri === ci ? 700 : 400,
                            border: "1px solid #f1f5f9",
                            transition: "background 0.15s",
                            cursor: "default",
                          }}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex", justifyContent: "space-between",
                marginTop: "14px", paddingTop: "12px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Total Images: <strong style={{ color: "#0f172a" }}>1,517</strong>
              </span>
              <span style={{ fontSize: "12px", color: "#3b82f6", fontWeight: 700 }}>
                Accuracy: 97.00%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Per-Class Metrics ── */}
      <div
        style={{
          background: "white", borderRadius: "14px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          padding: "20px",
        }}
      >
        <h6 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "16px" }}>
          Per-Class Metrics
        </h6>

        <style>{`
          .per-class-scroll::-webkit-scrollbar { width: 5px; }
          .per-class-scroll::-webkit-scrollbar-track { background: #f8fafc; border-radius: 99px; }
          .per-class-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
          .per-class-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          .per-class-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 #f8fafc; }
          .per-class-row:hover td { background: #f8fafc !important; }
        `}</style>

        <div
          className="per-class-scroll"
          style={{ maxHeight: "230px", overflowY: "auto", borderRadius: "8px", border: "1px solid #f1f5f9" }}
        >
          <table className="table mb-0" style={{ fontSize: "13px", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                {["Class", "Precision", "Recall", "F1 Score", "Support"].map((h) => (
                  <th
                    key={h}
                    style={{
                      color: "#94a3b8", fontWeight: 500,
                      fontSize: "12px", padding: "10px 8px",
                      borderBottom: "1px solid #e2e8f0",
                      background: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perClassData.map((row, i) => (
                <tr
                  key={i}
                  className="per-class-row"
                  style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.15s" }}
                >
                  <td style={{ border: "none", borderBottom: "1px solid #f1f5f9", padding: "12px 8px 12px 8px", background: "white" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "17px", lineHeight: 1 }}>{row.icon}</span>
                      <span style={{ fontWeight: 500, color: "#0f172a" }}>{row.cls}</span>
                    </div>
                  </td>
                  <td style={{ color: "#22c55e", fontWeight: 600, border: "none", borderBottom: "1px solid #f1f5f9", padding: "12px 8px", background: "white" }}>{row.precision}</td>
                  <td style={{ color: "#f59e0b", fontWeight: 600, border: "none", borderBottom: "1px solid #f1f5f9", padding: "12px 8px", background: "white" }}>{row.recall}</td>
                  <td style={{ color: "#8b5cf6", fontWeight: 600, border: "none", borderBottom: "1px solid #f1f5f9", padding: "12px 8px", background: "white" }}>{row.f1}</td>
                  <td style={{ color: "#64748b", border: "none", borderBottom: "1px solid #f1f5f9", padding: "12px 8px", background: "white" }}>{row.support}</td>
                </tr>
              ))}

              {/* Overall / Macro Avg — sticky at bottom */}
              <tr style={{ background: "#f8fafc" }}>
                <td style={{ color: "#94a3b8", border: "none", padding: "12px 8px", fontStyle: "italic", background: "#f8fafc", position: "sticky", bottom: 0, borderTop: "2px solid #e2e8f0" }}>
                  Overall / Macro Avg
                </td>
                <td style={{ color: "#22c55e", fontWeight: 600, border: "none", padding: "12px 8px", background: "#f8fafc", position: "sticky", bottom: 0, borderTop: "2px solid #e2e8f0" }}>95.56%</td>
                <td style={{ color: "#f59e0b", fontWeight: 600, border: "none", padding: "12px 8px", background: "#f8fafc", position: "sticky", bottom: 0, borderTop: "2px solid #e2e8f0" }}>95.30%</td>
                <td style={{ color: "#8b5cf6", fontWeight: 600, border: "none", padding: "12px 8px", background: "#f8fafc", position: "sticky", bottom: 0, borderTop: "2px solid #e2e8f0" }}>95.67%</td>
                <td style={{ fontWeight: 700, color: "#0f172a", border: "none", padding: "12px 8px", background: "#f8fafc", position: "sticky", bottom: 0, borderTop: "2px solid #e2e8f0" }}>2,021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}