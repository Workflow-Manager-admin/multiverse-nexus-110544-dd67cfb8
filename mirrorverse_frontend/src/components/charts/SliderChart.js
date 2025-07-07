/**
 * Simple custom slider gauge, visually glowing
 */
import React from "react";

// PUBLIC_INTERFACE
function SliderChart({ label, value }) {
  // Clamp
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="slider-chart neon-glow">
      <div className="slider-chart-label">{label}: <b>{v}</b></div>
      <div className="slider-track" style={{ background: "rgba(50,250,230,0.13)", borderRadius: 7 }}>
        <div className="slider-fill" style={{
          width: `${v}%`,
          background: "linear-gradient(90deg, #0FFFE9 0%, #e840c3 100%)",
          boxShadow: "0 0 8px #0FFFE9",
          height: 18, borderRadius: 7
        }} />
      </div>
    </div>
  );
}
export default SliderChart;
