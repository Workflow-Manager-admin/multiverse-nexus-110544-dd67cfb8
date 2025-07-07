 /**
  * Simple theme persist/toggle (dark, light, pastel) using localStorage.
  * Now supports a pastel theme (pastel pink and green).
  */
 import { useState } from "react";
 
 const THEME_KEY = "mirrorverse_theme";
 const THEMES = ["dark", "light", "pastel"];
 
 // PUBLIC_INTERFACE
 export default function useTheme() {
   const [theme, setTheme] = useState(() =>
     localStorage.getItem(THEME_KEY) || "dark"
   );
 
   // PUBLIC_INTERFACE
   function toggleTheme() {
     setTheme(t => {
       const index = THEMES.indexOf(t);
       const newIndex = (index + 1) % THEMES.length;
       const newTheme = THEMES[newIndex];
       localStorage.setItem(THEME_KEY, newTheme);
       return newTheme;
     });
   }
 
   return { theme, toggleTheme };
 }
