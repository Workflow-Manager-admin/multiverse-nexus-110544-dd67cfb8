/**
 * Simple theme persist/toggle (light/dark) using localStorage.
 */
import { useState } from "react";

const THEME_KEY = "mirrorverse_theme";

// PUBLIC_INTERFACE
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem(THEME_KEY) || "dark"
  );

  function toggleTheme() {
    setTheme(t => {
      const newTheme = t === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, newTheme);
      return newTheme;
    });
  }

  return { theme, toggleTheme };
}
