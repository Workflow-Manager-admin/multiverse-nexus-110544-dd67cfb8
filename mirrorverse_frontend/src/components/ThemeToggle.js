/**
 * Toggle between dark and (neon-accented) light modes.
 */
import React from "react";

// PUBLIC_INTERFACE
function ThemeToggle({ theme, toggleTheme }) {
  let label = "";
  if (theme === "dark") {
    label = "☀️ Light";
  } else if (theme === "light") {
    label = "🌸 Pastel";
  } else if (theme === "pastel") {
    label = "🌚 Dark";
  }

  return (
    <button className="theme-toggle neon-glow" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "pastel" ? <span aria-label="Pastel" title="Pastel">🧁</span> : null} {label}
    </button>
  );
}

export default ThemeToggle;
