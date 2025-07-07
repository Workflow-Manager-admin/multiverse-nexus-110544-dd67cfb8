/**
 * Public interface for audio toggle.
 * Only UI; actual audio is not played (spec calls for "toggle UI only")
 */
import React from "react";

// PUBLIC_INTERFACE
function AmbientAudioToggle({ audioOn, setAudioOn }) {
  return (
    <button className="audio-toggle neon-glow" onClick={() => setAudioOn(a => !a)} aria-label="Toggle ambient audio">
      {audioOn ? "🔊 Ambient On" : "🔇 Audio Off"}
    </button>
  );
}

export default AmbientAudioToggle;
