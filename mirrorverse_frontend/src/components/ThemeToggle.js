/**
 * Toggle between dark and (neon-accented) light modes.
 */
import React from "react";

// PUBLIC_INTERFACE
function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle neon-glow" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;
