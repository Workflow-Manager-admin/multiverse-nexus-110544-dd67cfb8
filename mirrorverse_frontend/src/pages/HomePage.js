/**
 * MirrorVerse landing: cinematic intro, CTA, and personality prompt
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tagline = "What if you could explore every version of yourself?";
const heroDesc =
  "MirrorVerse is a cinematic journey through infinite what-ifs. Branch and shape your unique timeline, unearth possibilities, and reveal stories of the multiverse based on your choices.";

const personalityTraits = [
  "Curious", "Brave", "Cautious", "Creative", "Empathetic", "Analytical", "Adventurous", "Steadfast"
];

// PUBLIC_INTERFACE
export default function HomePage() {
  const nav = useNavigate();
  const [selected, setSelected] = React.useState([]);

  function toggleTrait(trait) {
    setSelected(arr =>
      arr.includes(trait)
        ? arr.filter(t => t !== trait)
        : (arr.length < 3 ? [...arr, trait] : arr)
    );
  }

  function startExperience() {
    // Persist personality (simulate), move to path selector
    localStorage.setItem("mirrorverse_personality", JSON.stringify(selected));
    nav("/select");
  }

  return (
    <main className="main-panel home-page">
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
        className="cinematic-hero"
      >
        <h1 className="neon-gradient" style={{ fontSize: "3.2rem", margin: "1.2rem 0" }}>
          MirrorVerse
        </h1>
        <h2 className="tagline">{tagline}</h2>
        <p className="desc">{heroDesc}</p>
        <div className="personality-prompt-card neon-glow">
          <div>
            <strong>Choose your 3 strongest traits:</strong>
          </div>
          <div className="traits-list">
            {personalityTraits.map(trait =>
              <button
                key={trait}
                className={`trait-btn neon-glow ${selected.includes(trait) ? "selected" : ""}`}
                onClick={() => toggleTrait(trait)}
                disabled={!selected.includes(trait) && selected.length === 3}
                style={{ margin: "0.3rem" }}
              >
                {trait}
              </button>
            )}
          </div>
          <button
            className="cta-btn neon-gradient-glow"
            onClick={startExperience}
            disabled={selected.length < 3}
            style={{ marginTop: "1.1rem", fontSize: "1.18rem" }}
          >
            Begin Your Journey
          </button>
        </div>
        <div className="footer-credits">
          <small>© 2024 MirrorVerse &mdash; Your journey, endlessly branching.</small>
        </div>
      </motion.div>
    </main>
  );
}
