/**
 * Multiverse dashboard: simulation metrics, charts, gauges.
 * Charts: simulated with mock data; uses SVG for gauges & dials.
 */
import React from "react";
import GaugeChart from "./charts/GaugeChart";
import SliderChart from "./charts/SliderChart";
import DialChart from "./charts/DialChart";

// PUBLIC_INTERFACE
function MetricsPanel({ metrics, onBadge }) {
  // Example charted metrics: fulfillment, boldness, relationship, success, chaos, harmony
  return (
    <div className="metrics-pane">
      <h4>Simulation Metrics</h4>
      <div className="gauges-row">
        <GaugeChart label="Fulfillment" value={metrics.fulfillment} />
        <GaugeChart label="Boldness" value={metrics.boldness} />
        <DialChart label="Harmony" value={metrics.harmony} />
      </div>
      <div className="sliders-row">
        <SliderChart label="Success" value={metrics.success} />
        <SliderChart label="Adventure" value={metrics.adventure} />
        <SliderChart label="Risk" value={metrics.risk} />
      </div>
      <button
        className="badges-btn neon-glow"
        onClick={() => onBadge && onBadge({ title: "Charted First Simulation", desc: "Viewed your Timeline Simulation Metrics", tier: "bronze" })}
        style={{ marginTop: "1.6rem" }}
      >View Achievement</button>
    </div>
  );
}
export default MetricsPanel;
