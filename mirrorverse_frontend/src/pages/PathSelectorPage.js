/**
 * Page 2: Simulation Path Selector/Branch Builder
 * Prompts for "what if", life path, timeline events; shows branching builder.
 * Persists a timeline, returns it to Dashboard.
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimelineBuilder from "../components/TimelineBuilder";
import { mockPathScenarios } from "../mockdata/simMockData";

// PUBLIC_INTERFACE
export default function PathSelectorPage({ onBadge, onAddTimeline }) {
  const nav = useNavigate();

  // Pre-baked and build-your-own
  const [openCreate, setOpenCreate] = useState(false);
  const [customEvents, setCustomEvents] = useState([
    { label: "Graduated college", year: "2025", category: "education" }
  ]);
  const [prompt, setPrompt] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);

  function handlePreset(preset) {
    setSelectedPreset(preset);
    setPrompt(preset.title);
    setOpenCreate(false);
  }

  function handleAddEvent(event) {
    setCustomEvents(events =>
      [...events, event]
    );
  }

  function finishTimeline() {
    const id = "timeline_" + Date.now();
    const timeline = {
      id,
      prompt,
      events: selectedPreset ? selectedPreset.branch : customEvents,
      saved: Date.now()
    };
    onAddTimeline(timeline);
    nav(`/dashboard/${id}`);
    onBadge && onBadge({
      title: "New Timeline",
      desc: "You've created your first MirrorVerse timeline.",
      tier: "bronze"
    });
  }

  return (
    <main className="main-panel select-page neon-bg-panel">
      <h2 className="panel-title neon-gradient">Branch Your Destiny</h2>
      <div className="selector-content">
        <div className="presets-block">
          <h4>Quick Start: "What If..." Scenarios</h4>
          <div className="preset-scenarios">
            {mockPathScenarios.map(scenario =>
              <button
                key={scenario.id}
                className={`preset-btn neon-glow ${selectedPreset?.id === scenario.id ? "selected" : ""}`}
                onClick={() => handlePreset(scenario)}
              >
                {scenario.title}
              </button>
            )}
            <button
              className={`preset-btn custom-btn neon-glow ${openCreate ? "selected" : ""}`}
              onClick={() => {
                setOpenCreate(true);
                setSelectedPreset(null);
                setPrompt("");
                setCustomEvents([]);
              }}
            >Custom Timeline</button>
          </div>
        </div>
        {(selectedPreset || openCreate) &&
          <div className="timeline-builder-panel neon-glow">
            <h5>Customize & Branch Events</h5>
            <TimelineBuilder
              events={openCreate ? customEvents : selectedPreset.branch}
              editable={openCreate}
              onAddEvent={handleAddEvent}
              onChangePrompt={setPrompt}
              prompt={prompt}
            />
            <button
              className="cta-btn neon-gradient-glow"
              onClick={finishTimeline}
              disabled={!prompt || (openCreate && customEvents.length === 0)}
            >
              Simulate This Timeline
            </button>
          </div>
        }
      </div>
    </main>
  );
}
