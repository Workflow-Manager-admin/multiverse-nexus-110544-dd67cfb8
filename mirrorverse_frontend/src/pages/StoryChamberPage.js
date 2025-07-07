/**
 * Page 4: Story Chamber
 * Cinematic/immersive rendering of narrative simulation based on pre-written, modular story templates.
 */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimelineById } from "../mockdata/simMockData";
import useStoryEngine from "../hooks/useStoryEngine";
import { motion, AnimatePresence } from "framer-motion";
import BranchingTimelineFlowchart from "../components/BranchingTimelineFlowchart";
import useTheme from "../hooks/useTheme";
/** 
 * Page 4: Story Chamber, now with branching flowchart timeline builder.
 */
export default function StoryChamberPage({ onBadge }) {
  const { timelineId } = useParams();
  const nav = useNavigate();
  const [timeline, setTimeline] = useState(null);
  const [personality, setPersonality] = useState([]);

  // For badge, achievement rules
  const [finished, setFinished] = useState(false);

  // Theme control for branch-based theme changes
  const { theme, toggleTheme } = useTheme();
  const [overrideTheme, setOverrideTheme] = useState(theme);

  useEffect(() => {
    setTimeline(getTimelineById(timelineId));
    try {
      setPersonality(JSON.parse(localStorage.getItem("mirrorverse_personality") || "[]"));
    } catch (e) { setPersonality([]); }
  }, [timelineId]);

  // Provide a callback to allow the branching component to change the theme
  const handleThemeChange = t => {
    setOverrideTheme(t);
    // Force HTML theme for full app
    document.documentElement.setAttribute("data-theme", t);
  };

  // To trigger badge when simulation ends (see node end in branching component)
  // The branching component does not handle badge logic—so we subscribe here if needed
  // Could be improved to take callback from BranchingTimelineFlowchart if needed, for now simple

  return (
    <main className="main-panel story-chamber-page">
      <section className="story-chamber-glow neon-glow">
        <h2 className="panel-title neon-gradient" style={{ marginBottom: "1.2rem" }}>
          Story Chamber
        </h2>
        <BranchingTimelineFlowchart
          timeline={timeline}
          personality={personality}
          onThemeChange={handleThemeChange}
        />
        {/* Return Home button for after finish (let flowchart restart handle restart) */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button className="cta-btn neon-glow" onClick={() => nav("/")}>Return Home</button>
        </div>
      </section>
    </main>
  );
}
