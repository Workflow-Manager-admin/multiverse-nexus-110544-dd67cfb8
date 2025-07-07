/**
 * Page 3: Multiverse Dashboard
 * Shows metrics (gauges, sliders, charts), timeline branching graph, badges.
 * "Continue to Story" CTA at bottom.
 */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetricsPanel from "../components/MetricsPanel";
import TimelineFlowchart from "../components/TimelineFlowchart";
import { getTimelineById, mockMetricsForTimeline } from "../mockdata/simMockData";

// PUBLIC_INTERFACE
export default function DashboardPage({ onBadge }) {
  const { timelineId } = useParams();
  const nav = useNavigate();
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    setTimeline(getTimelineById(timelineId));
  }, [timelineId]);

  if (!timeline) return <div className="main-panel loading-panel">Loading…</div>;

  return (
    <main className="main-panel dashboard-page neon-glow-panel">
      <h2 className="panel-title neon-gradient">
        Multiverse Dashboard
      </h2>
      <div className="dashboard-body">
        <TimelineFlowchart events={timeline.events} />
        <MetricsPanel metrics={mockMetricsForTimeline(timeline.id)} onBadge={onBadge} />
      </div>
      <button
        className="cta-btn neon-gradient-glow"
        onClick={() => nav(`/story/${timelineId}`)}
      >Continue to Story Chamber</button>
    </main>
  );
}
