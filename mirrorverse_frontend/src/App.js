/**
 * MirrorVerse: Cinematic Multiverse Timeline Simulator
 * The root shell app for routing, theming, effects, and layout.
 */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import StarfieldBackground from "./components/StarfieldBackground";
import ParticleOverlay from "./components/ParticleOverlay";
import ThemeToggle from "./components/ThemeToggle";
import AmbientAudioToggle from "./components/AmbientAudioToggle";
import HomePage from "./pages/HomePage";
import PathSelectorPage from "./pages/PathSelectorPage";
import DashboardPage from "./pages/DashboardPage";
import StoryChamberPage from "./pages/StoryChamberPage";
import TimelineVaultModal from "./components/TimelineVaultModal";
import BadgeModal from "./components/BadgeModal";
import useTimelineVault from "./hooks/useTimelineVault";
import useTheme from "./hooks/useTheme";
import "./App.css";

// PUBLIC_INTERFACE
export default function App() {
  // Theme & ambient audio
  const { theme, toggleTheme } = useTheme();
  const [audioOn, setAudioOn] = useState(false);

  // Modal vault & badge UI
  const [vaultOpen, setVaultOpen] = useState(false);
  const [badgeInfo, setBadgeInfo] = useState(null);

  // Timeline data shared for vault, dashboard, story
  const { vault, addToVault, removeFromVault, loadVaultItem } = useTimelineVault();

  // Sync theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Framer AnimatePresence for page transitions
  return (
    <Router>
      <div className="MirrorVerseApp">
        <StarfieldBackground />
        <ParticleOverlay />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <AmbientAudioToggle audioOn={audioOn} setAudioOn={setAudioOn} />
        <div className="nav-fab-panel">
          <button className="vault-btn neon-glow" onClick={() => setVaultOpen(true)}>
            Timeline Vault
          </button>
        </div>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <MotionPage key="home">
                <HomePage />
              </MotionPage>
            } />
            <Route path="/select" element={
              <MotionPage key="select">
                <PathSelectorPage onBadge={setBadgeInfo} onAddTimeline={addToVault} />
              </MotionPage>
            } />
            <Route path="/dashboard/:timelineId" element={
              <MotionPage key="dashboard">
                <DashboardPage onBadge={setBadgeInfo} />
              </MotionPage>
            } />
            <Route path="/story/:timelineId" element={
              <MotionPage key="story">
                <StoryChamberPage onBadge={setBadgeInfo} />
              </MotionPage>
            } />
            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        {vaultOpen &&
          <TimelineVaultModal
            open={vaultOpen}
            setOpen={setVaultOpen}
            vault={vault}
            onRemove={removeFromVault}
            onLoad={loadVaultItem}
          />
        }
        {badgeInfo &&
          <BadgeModal
            badge={badgeInfo}
            onClose={() => setBadgeInfo(null)}
          />
        }
      </div>
    </Router>
  );
}

// Page transition wrapper
function MotionPage({ children, key }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.55, 0, 0.1, 1] } }}
      exit={{ opacity: 0, y: -60, transition: { duration: 0.35 } }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}
