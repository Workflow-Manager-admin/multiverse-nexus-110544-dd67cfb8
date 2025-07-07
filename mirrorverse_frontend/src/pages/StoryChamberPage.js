/**
 * Page 4: Story Chamber
 * Cinematic/immersive rendering of narrative simulation based on prior steps.
 * Uses mock story templates populated with personality/timeline events.
 */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockStoryForTimeline, getTimelineById } from "../mockdata/simMockData";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
export default function StoryChamberPage({ onBadge }) {
  const { timelineId } = useParams();
  const nav = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const t = getTimelineById(timelineId);
    setStory(mockStoryForTimeline(t));
  }, [timelineId]);

  if (!story) return <div className="main-panel loading-panel">Simulating story…</div>;

  function handleBadgeReveal() {
    onBadge && onBadge({
      title: "Reflection Awakened",
      desc: "You've completed a MirrorVerse simulation.",
      tier: "silver"
    });
  }

  return (
    <main className="main-panel story-chamber-page">
      <motion.section
        className="story-chamber-glow neon-glow"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1.5 } }}
      >
        <h2 className="panel-title neon-gradient" style={{ marginBottom: "1.2rem" }}>Story Chamber</h2>
        <div className="chamber-narrative">
          {story.paragraphs.map((txt, idx) =>
            <motion.p
              key={idx}
              className="story-paragraph"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.4 } }}
            >
              {txt}
            </motion.p>
          )}
        </div>
        <div className="story-extras">
          <div className="badges-earned">
            <h4>Achievements</h4>
            <ul>
              {story.badges.map(b =>
                <li key={b.title}>
                  <span className={`badge-icon badge-${b.tier}`}>{b.icon}</span> <span className="badge-title">{b.title}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <button
          className="cta-btn neon-gradient-glow"
          onClick={() => { handleBadgeReveal(); nav("/"); }}
        >Return Home</button>
      </motion.section>
    </main>
  );
}
