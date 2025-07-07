/**
 * Visualization of the timeline as a branching tree.
 * Simple custom SVG, supports main line and one branch off.
 */
import React from "react";

// PUBLIC_INTERFACE
function TimelineFlowchart({ events }) {
  // Simple vertical column of events; if an event is 'branch', fork out
  // For mock: all in one path for visual effect
  return (
    <div className="timeline-flowchart neon-glow">
      <svg width="260" height={Math.max(120, 64 + 60 * events.length)}>
        <defs>
          <linearGradient id="branch-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0FFFE9"/>
            <stop offset="90%" stopColor="#ff2bc3"/>
          </linearGradient>
        </defs>
        {events.map((ev, idx) =>
          <g key={idx}>
            {idx > 0 && (
              <line
                x1="130"
                y1={40 + 60 * (idx - 1) + 15}
                x2="130"
                y2={40 + 60 * idx - 15}
                stroke="url(#branch-gradient)"
                strokeWidth="6"
                style={{ filter: "drop-shadow(0 0 7px #0FFFE9)" }}
              />
            )}
            <circle
              cx="130"
              cy={40 + 60 * idx}
              r="19"
              fill="#120b2c"
              stroke="url(#branch-gradient)"
              strokeWidth="5"
              style={{ filter: "drop-shadow(0 0 8px #0FFFE9)" }}
            />
            <text
              x="130"
              y={40 + 60 * idx}
              textAnchor="middle"
              alignmentBaseline="central"
              fill="#fff"
              style={{ fontFamily: "monospace", fontSize: "0.85rem", pointerEvents: "none" }}
            >
              {ev.year || "?"}
            </text>
          </g>
        )}
      </svg>
      <div className="timeline-events-descs">
        {events.map((ev, idx) =>
          <div className="timeline-event-desc" key={idx}>
            <span className="event-title">{ev.label || "Undecided event"}</span>
            <span className="event-category">[{ev.category}]</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default TimelineFlowchart;
