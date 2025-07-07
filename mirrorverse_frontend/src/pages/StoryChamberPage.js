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
import StorybookNarrativeDisplay from "../components/StorybookNarrativeDisplay";
import useTheme from "../hooks/useTheme";
/** 
 * Page 4: Story Chamber, now with branching flowchart timeline builder and storybook narrative.
 */
export default function StoryChamberPage({ onBadge }) {
  const { timelineId } = useParams();
  const nav = useNavigate();
  const [timeline, setTimeline] = useState(null);
  const [personality, setPersonality] = useState([]);

  // Theme control for branch-based theme changes
  const { theme, toggleTheme } = useTheme();
  const [overrideTheme, setOverrideTheme] = useState(theme);

  // Story engine: expose node, history, advance, reset, loaded
  const storyEngine = useStoryEngine({ timeline, personality });

  useEffect(() => {
    setTimeline(getTimelineById(timelineId));
    try {
      setPersonality(JSON.parse(localStorage.getItem("mirrorverse_personality") || "[]"));
    } catch (e) { setPersonality([]); }
  }, [timelineId]);

  // Supply theme switching callback (BranchingTimelineFlowchart)
  const handleThemeChange = t => {
    setOverrideTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  };

  // If story ends (node.choices.length===0), enable restart badge for demonstration (optional)
  // (Extra achievement hooks could be added here)

  // Compose the UI: Show storybook path, then branch flowchart (controls choices/advance)
  return (
    <main className="main-panel story-chamber-page">
      <section className="story-chamber-glow neon-glow">
        <h2 className="panel-title neon-gradient" style={{ marginBottom: "1.2rem" }}>
          Story Chamber
        </h2>
        <StorybookNarrativeDisplay
          path={storyEngine.history}
          current={storyEngine.node}
          theme={overrideTheme}
          onRestart={storyEngine.reset}
        />
        <BranchingTimelineFlowchart
          timeline={timeline}
          personality={personality}
          onThemeChange={handleThemeChange}
        />
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button className="cta-btn neon-glow" onClick={() => nav("/")}>Return Home</button>
        </div>
      </section>
    </main>
  );
}
