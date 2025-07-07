/**
 * StorybookNarrativeDisplay
 * Visually presents the user's story path as a cinematic, animated storybook.
 * Integrates with modular timeline/story engine; renders dynamically per user decisions.
 *
 * Props:
 *   path: Array of story nodes (the sequential path taken)
 *   current: The current story node (for animated focus)
 *   theme: Current theme (for dynamic backgrounds)
 *   onRestart: (optional) handler to restart the story
 *
 * Uses Framer Motion and CSS for smooth transitions/immersive effects.
 */
// PUBLIC_INTERFACE
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mapping of story tags or keywords to optional illustrations/icons.
const ICONS = {
  romantic: "💖",
  rebellious: "⚡",
  hermit: "🌲",
  solitude: "🌙",
  relationship: "🤝",
  career: "🏢",
  peaceful: "🪷",
  adventure: "🚀",
  decision: "🔀",
  default: "📖",
};

function getSectionIcon(node) {
  if (!node) return ICONS.default;
  if (node.tags && node.tags.length) {
    for (const tag of node.tags) {
      if (ICONS[tag]) return ICONS[tag];
    }
  }
  if (node.title && node.title.toLowerCase().includes("romanc")) return ICONS.romantic;
  if (node.title && node.title.toLowerCase().includes("hermit")) return ICONS.hermit;
  return ICONS.default;
}

/**
 * Main narrative renderer: each fragment/chapter animated in.
 */
export default function StorybookNarrativeDisplay({ path, current, theme, onRestart }) {
  // Compose the full sequence: history path + current node (distinct styling)
  const fullPath = [...(path || []), current].filter(Boolean);

  // Pick background class by theme (or use soft overlays)
  const themeBg = theme === "pastel"
    ? "storybook-bg-pastel"
    : theme === "light"
    ? "storybook-bg-light"
    : "storybook-bg-dark";

  return (
    <section
      className={`storybook-narrative neon-glow ${themeBg}`}
      style={{
        borderRadius: "2em",
        background: "var(--panel-bg)",
        boxShadow: "0 0 52px 0 var(--panel-glow), 0 0 0 13px #0fffe903",
        overflow: "hidden",
        margin: "2em 0 1.5em 0",
        maxWidth: 700,
        width: "100%"
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {fullPath.map((node, idx) => (
          <motion.div
            key={node?.id || "chapter_" + idx}
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.47, 0, 0.12, 1] } }}
            exit={{ opacity: 0, y: -55, scale: 0.97, transition: { duration: 0.4 } }}
            className={`storybook-chapter ${idx === fullPath.length - 1 ? "active" : ""}`}
            style={{
              padding: "2.1em 1.5em 1.8em 1.5em",
              position: "relative",
              minHeight: 120,
              zIndex: 2,
              background:
                idx === fullPath.length - 1
                  ? "var(--panel-bg)"
                  : "rgba(45,30,70,0.21)",
              marginBottom: idx !== fullPath.length - 1 ? "1.8em" : 0,
              borderLeft: `8px solid var(--neon-accent2, #e840c3)`
            }}
          >
            {/* Storybook "chapter" header */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <span
                className="storybook-chapter-icon"
                style={{
                  fontSize: "2.5em",
                  marginRight: "0.7em",
                  filter: idx === fullPath.length - 1 ? "drop-shadow(0 0 14px var(--neon-accent2))" : undefined,
                  transition: "filter 0.34s"
                }}
              >
                {getSectionIcon(node)}
              </span>
              <span
                className={`storybook-chapter-title neon-gradient`}
                style={{
                  fontSize: "1.44em",
                  fontWeight: 700,
                  letterSpacing: "0.02em"
                }}
              >
                {node?.title || `Chapter ${idx + 1}`}
              </span>
              {idx === fullPath.length - 1 && (
                <span
                  className="storybook-chapter-label"
                  style={{
                    background: "var(--gradient-accent)",
                    color: "#1e1033",
                    borderRadius: "0.8em",
                    padding: "0.26em 0.76em",
                    marginLeft: 18,
                    fontSize: "1.05em"
                  }}
                >
                  Current
                </span>
              )}
            </div>
            {node?.intro && (
              <div
                className="storybook-chapter-intro"
                style={{
                  fontSize: "1.14em",
                  opacity: 0.8,
                  fontStyle: "italic",
                  marginBottom: 5
                }}
              >
                {node.intro}
              </div>
            )}
            <div
              className="storybook-chapter-body"
              style={{
                fontSize: "1.29em",
                fontFamily: "'Georgia', serif",
                color: "var(--text-main)",
                marginBottom: 10,
                transition: "color 0.34s"
              }}
            >
              {node.body || node.decision}
            </div>
            {/* Visual separator */}
            {idx !== fullPath.length - 1 && (
              <motion.hr
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, transition: { delay: 0.17, duration: 0.7 } }}
                exit={{ scaleX: 0, transition: { duration: 0.23 } }}
                style={{
                  border: 0,
                  height: 3,
                  width: "92%",
                  background:
                    "linear-gradient(90deg, var(--neon-accent) 3%, var(--neon-accent2) 77%, #6e32e6 100%)",
                  borderRadius: 3.5,
                  margin: "2.1em auto 0.6em auto",
                  boxShadow: "0 0 22px var(--neon-accent2), 0 0 8px #ff2bc388"
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Restart storybook option when at the end */}
      {current && current.choices?.length === 0 && onRestart && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: 42, transition: { duration: 0.2 } }}
          style={{ textAlign: "center", margin: "2.7em 0 1.1em 0" }}
        >
          <button className="cta-btn neon-gradient-glow" onClick={onRestart}>
            📖 Restart Storybook
          </button>
        </motion.div>
      )}
    </section>
  );
}

/* CSS (inline or append to App.css):

.storybook-narrative {
  background: var(--panel-bg);
  box-shadow: 0 0 44px var(--panel-glow);
  border-radius: 2.7em;
  padding: 0;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  overflow: hidden;
  min-width: 320px;
}

.storybook-chapter {
  transition: background 0.45s, border-left 0.28s;
}
.storybook-chapter.active {
  background: var(--panel-bg);
  border-left: 12px solid var(--neon-accent2);
  filter: drop-shadow(0 0 18px var(--neon-accent2));
}
.storybook-bg-pastel { background: linear-gradient(120deg, #ffd1eb33, #c6ffd155); }
.storybook-bg-light { background: linear-gradient(99deg, #e4e2ff55, #fff7fc44); }
.storybook-bg-dark { background: linear-gradient(140deg, #23133f99, #0fffe91c 65%, #e840c344); }
*/

