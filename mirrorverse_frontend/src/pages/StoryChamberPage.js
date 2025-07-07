/**
 * Page 4: Story Chamber
 * Cinematic/immersive rendering of narrative simulation based on pre-written, modular story templates.
 */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimelineById } from "../mockdata/simMockData";
import useStoryEngine from "../hooks/useStoryEngine";
import { motion, AnimatePresence } from "framer-motion";

// PUBLIC_INTERFACE
export default function StoryChamberPage({ onBadge }) {
  const { timelineId } = useParams();
  const nav = useNavigate();
  const [timeline, setTimeline] = useState(null);
  const [personality, setPersonality] = useState([]);
  // For badge, simple achievement rules
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setTimeline(getTimelineById(timelineId));
    try {
      setPersonality(JSON.parse(localStorage.getItem("mirrorverse_personality") || "[]"));
    } catch (e) { setPersonality([]); }
  }, [timelineId]);

  // Use new story template logic (modular JSON, decision tree)
  const { node, history, advance, reset, loaded } = useStoryEngine({ timeline, personality });

  // Achievement: award when finishing final node (no choices)
  useEffect(() => {
    if (!node || (node.choices && node.choices.length > 0)) return;
    setFinished(true);
    onBadge && onBadge({
      title: "Reflection Awakened",
      desc: "You've completed a MirrorVerse simulation.",
      tier: "silver"
    });
    // eslint-disable-next-line
  }, [node]);

  if (!loaded)
    return <div className="main-panel loading-panel">Loading narrative…</div>;

  if (!timeline || !node)
    return <div className="main-panel loading-panel">Simulating story…</div>;

  function handleRestart() {
    reset();
    setFinished(false);
  }
  function handleReturnHome() {
    nav("/");
  }

  // Animation for transitions: fade/slide
  const variants = {
    initial: { opacity: 0, y: 42 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.32 } }
  };

  return (
    <main className="main-panel story-chamber-page">
      <AnimatePresence mode="wait">
        <motion.section
          className="story-chamber-glow neon-glow"
          key={node.id}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          style={{ minHeight: 350 }}
        >
          <h2 className="panel-title neon-gradient" style={{ marginBottom: "1.2rem" }}>Story Chamber</h2>
          <div className="chamber-narrative">
            {node.title && (
              <motion.h3
                key={node.title}
                className="story-title"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.35 } }}
                style={{ marginBottom: "0.9em" }}
              >
                {node.title}
              </motion.h3>
            )}
            {node.intro && (
              <motion.p
                key={node.intro}
                className="story-paragraph"
                initial={{ opacity: 0, y: 21 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                exit={{ opacity: 0, y: 80, transition: { duration: 0.38 } }}
              >
                {node.intro}
              </motion.p>
            )}
            {node.body && (
              <motion.p
                key={node.body}
                className="story-paragraph"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.33 } }}
              >
                {node.body}
              </motion.p>
            )}
            {node.decision && !!node.choices?.length && (
              <motion.div
                className="story-decision"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.23 } }}
                style={{ margin: "1.3em 0 1em" }}
              >
                <b>{node.decision}</b>
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: "0.6em" }}>
                  {node.choices.map((ch, idx) =>
                    <button
                      key={ch.text}
                      className="cta-btn neon-gradient-glow"
                      onClick={() => advance(idx)}
                    >
                      {ch.text}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          {finished && (
            <motion.div
              className="story-extras"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.9 } }}
              style={{ marginTop: "2rem" }}
            >
              <div className="badges-earned">
                <h4>Achievements</h4>
                <ul>
                  <li key="simulation-complete">
                    <span className={`badge-icon badge-silver`}>⭐</span> <span className="badge-title">Simulation Complete</span>
                  </li>
                </ul>
                <div style={{ marginTop: "1.6em" }}>
                  <button className="cta-btn neon-gradient-glow" onClick={handleRestart}>Restart This Story</button>{" "}
                  <button className="cta-btn neon-glow" onClick={handleReturnHome}>Return Home</button>
                </div>
              </div>
            </motion.div>
          )}
          {!finished && !node.choices?.length && (
            <button className="cta-btn neon-gradient-glow" onClick={handleReturnHome}>Return Home</button>
          )}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
