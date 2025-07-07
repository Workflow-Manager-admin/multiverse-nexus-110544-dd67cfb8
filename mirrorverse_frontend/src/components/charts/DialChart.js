/**
 * Circular indicator "dial" chart, glowing arc (0-100).
 */
import React from "react";

// PUBLIC_INTERFACE
function DialChart({ label, value }) {
  const v = Math.max(0, Math.min(100, value));
  const angle = 360 * (v / 100);
  return (
    <div className="dial-chart neon-glow">
      <svg width={66} height={66}>
        <circle
          cx={33} cy={33} r={27}
          fill="none"
          stroke="#212144"
          strokeWidth="11"
        />
        <circle
          cx={33} cy={33} r={27}
          fill="none"
          stroke="url(#dial-grad)"
          strokeWidth="5.2"
          strokeDasharray={2 * Math.PI * 27}
          strokeDashoffset={2 * Math.PI * 27 * (1-v/100)}
          style={{
            transition: "stroke-dashoffset 0.65s",
            filter: "drop-shadow(0 0 13px #0FFFE9)"
          }}
        />
        <defs>
          <linearGradient id="dial-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0FFFE9"/>
            <stop offset="80%" stopColor="#e840c3"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="dial-label">{label}<br/><b>{v}</b></div>
    </div>
  );
}

export default DialChart;
