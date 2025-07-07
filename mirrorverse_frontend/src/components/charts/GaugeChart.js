/**
 * SVG gauge meter (0-100), with neon glow animation.
 */
import React from "react";

// PUBLIC_INTERFACE
function GaugeChart({ label, value }) {
  // Clamp for display
  const v = Math.max(0, Math.min(100, value));
  const angle = 240 * (v / 100) - 120;  // -120deg to +120deg arc
  // Arc calculations for SVG
  const r = 44, cx = 56, cy = 56;
  const polarToXY = (angleDeg) => {
    const rad = (angleDeg-90) * Math.PI/180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }
  const start = polarToXY(-120);
  const end = polarToXY(angle);
  const largeArc = v > 50 ? 1 : 0;

  return (
    <div className="gauge-chart neon-glow">
      <svg width={112} height={72} viewBox="0 0 112 72">
        <path
          d="
            M 12,56
            A 44,44 0 0 1 100,56
          "
          fill="none"
          stroke="#24213A"
          strokeWidth="13"
        />
        <path
          d={`
            M ${start.x},${start.y}
            A ${r},${r} 0 ${largeArc} 1 ${end.x},${end.y}
          `}
          fill="none"
          stroke="url(#neon-gradient)"
          strokeWidth="6.4"
          style={{
            filter: "drop-shadow(0 0 8px #0FFFE9)",
            transition: "stroke-dashoffset 0.7s"
          }}
        />
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0FFFE9"/>
            <stop offset="77%" stopColor="#6e32e6"/>
            <stop offset="100%" stopColor="#e840c3"/>
          </linearGradient>
        </defs>
        <circle
          cx={polarToXY(angle).x} cy={polarToXY(angle).y}
          r="7.3"
          fill="#0fffde"
          style={{
            filter: "drop-shadow(0 0 13px #0FFFE9)",
            transition: "all 0.26s"
          }}
        />
      </svg>
      <div className="gauge-label">{label}:<br/><b>{v}</b></div>
    </div>
  );
}
export default GaugeChart;
