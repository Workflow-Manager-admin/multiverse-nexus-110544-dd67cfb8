import React, { useState, useEffect } from "react";
import useStoryEngine from "../hooks/useStoryEngine";
import useTheme from "../hooks/useTheme";

// Mapping from story "branch/theme" keywords to app theme names, SVG node colors, or style classes.
const BRANCH_THEME_MAP = {
  "rebellious": { theme: "dark", node: "#0FFFE9" },
  "romantic": { theme: "pastel", node: "#F679BA" },
  "hermit": { theme: "light", node: "#6e32e6" }
};
const DEFAULT_NODE_COLOR = "#0FFFE9";

/**
 * BranchingTimelineFlowchart
 * Visualizes and manages timeline as an interactive branching flowchart.
 * At each fork, presents available user options (from story tree), advances on choice,
 * applies the outcome and dynamic visual theme per branch.
 * Integrates with modular story engine and global theme system.
 *
 * Props:
 *   - timeline: {id, prompt, ...} (base timeline model)
 *   - personality: user's selected traits
 *   - onThemeChange: fn(themeName) [optional] allows parent to dynamically update theme
 */
export default function BranchingTimelineFlowchart({ timeline, personality, onThemeChange }) {
  // Modular story engine (returns: current node, history, advance(), etc)
  const { node, history, advance, reset, loaded } = useStoryEngine({ timeline, personality });
  // Theme hook (to force theme change if needed)
  const { theme, toggleTheme } = useTheme();

  // Visual/theming: track applied branch theme per node in history
  const [nodeThemes, setNodeThemes] = useState([]);

  // On every advance, update nodeThemes with newly chosen theme
  useEffect(() => {
    if (!node) return;
    let branchTheme = guessNodeTheme(node);
    setNodeThemes(arr => [...arr, branchTheme]);
    // Apply branch theme to app if different
    if (branchTheme && branchTheme.theme && onThemeChange) {
      onThemeChange(branchTheme.theme);
    }
    // eslint-disable-next-line
  }, [node]);

  // Helper to guess theme info based on node tags/fields
  function guessNodeTheme(storyNode) {
    if (!storyNode) return {};
    let allTags = [];
    if (Array.isArray(storyNode.tags)) allTags = [...storyNode.tags];
    if (storyNode.id && storyNode.id.toLowerCase().includes("romantic")) allTags.push("romantic");
    if (storyNode.id && storyNode.id.toLowerCase().includes("hermit")) allTags.push("hermit");
    // Pick most theme-relevant tag
    const tag = allTags.find(t => BRANCH_THEME_MAP[t]);
    return tag ? BRANCH_THEME_MAP[tag] : { node: DEFAULT_NODE_COLOR, theme: theme };
  }

  // Build the flowchart data: node history + current node = visual path
  const flowPath = [...history, node].filter(Boolean);

  // Handler for choice selection: advances story and flowchart
  function handleChoice(idx) {
    advance(idx);
  }

  // Reset handler resets both engine/story and theming
  function handleRestart() {
    reset();
    setNodeThemes([]);
    if (onThemeChange) onThemeChange("dark");
  }

  // --- Render ---
  if (!loaded || !node)
    return <div className="timeline-flowchart neon-glow">Loading branching timeline…</div>;

  // SVG layout: basic vertical with fork coloring per-node, simple left branching for history
  return (
    <div className="timeline-flowchart neon-glow branching-flowchart" style={{ padding: 16 }}>
      {/* Branching Graph SVG */}
      <svg width={330} height={Math.max(160, 85 + 70 * (flowPath.length - 1))}>
        <defs>
          <linearGradient id="branch-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0FFFE9"/>
            <stop offset="90%" stopColor="#e840c3"/>
          </linearGradient>
        </defs>
        {flowPath.map((ev, idx) => {
          // Pick color by node theme
          const clr = nodeThemes[idx]?.node || DEFAULT_NODE_COLOR;
          // Node position
          const y = 55 + 65 * idx;
          return (
            <g key={idx}>
              {idx > 0 && (
                <line
                  x1="165"
                  y1={y - 53}
                  x2="165"
                  y2={y - 20}
                  stroke={clr}
                  strokeWidth="6"
                  style={{ filter: "drop-shadow(0 0 7px " + clr + ")" }}
                />
              )}
              <circle
                cx="165"
                cy={y}
                r="23"
                fill="#140c23"
                stroke={clr}
                strokeWidth="7"
                style={{ filter: "drop-shadow(0 0 8px " + clr + ")" }}
              />
              <text
                x="165" y={y+3}
                textAnchor="middle"
                alignmentBaseline="central"
                fill="#fff"
                style={{
                  fontFamily: "monospace",
                  fontSize: "1.04rem",
                  pointerEvents: "none",
                  letterSpacing: "0.01em"
                }}
              >
                {ev.title || ev.label || ev.body?.slice(0, 10) || "Start"}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Outcome text & Narrative for current node */}
      <div className="timeline-event-desc" style={{ margin: "2em 0 1.5em 0" }}>
        {node.title && <div className="event-title neon-gradient">{node.title}</div>}
        {node.intro && (
          <div className="event-category" style={{ fontSize: "1.05em" }}>{node.intro}</div>
        )}
        {node.body && (
          <div className="event-category" style={{ fontSize: "1.13em" }}>{node.body}</div>
        )}
      </div>
      {/* User options for branching decisions */}
      {node.decision && !!node.choices?.length && (
        <div className="timeline-branch-choices" style={{ margin: "1.1em 0 1.8em 0" }}>
          <b>{node.decision}</b>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: "0.7em" }}>
            {node.choices.map((ch, idx) => (
              <button
                key={ch.text}
                className="cta-btn neon-gradient-glow"
                onClick={() => handleChoice(idx)}
              >
                {ch.text}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* End node: Restart option */}
      {!node.choices?.length &&
        <button className="cta-btn neon-gradient-glow" onClick={handleRestart}>
          Restart Timeline Path
        </button>
      }
    </div>
  );
}
