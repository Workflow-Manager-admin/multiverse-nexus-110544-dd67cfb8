/**
 * Interactive timeline event builder (branch points)
 * Editable branch with drag/add/remove (if editable).
 */
import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function TimelineBuilder({ events, editable, onAddEvent, onChangePrompt, prompt }) {
  const [evs, setEvs] = useState(events);

  function handleAdd() {
    // Add empty event line
    const newEvent = { label: "", year: "", category: "life" };
    setEvs(arr => [...arr, newEvent]);
    onAddEvent && onAddEvent(newEvent);
  }
  function handleEdit(idx, field, value) {
    const arr = evs.map((ev, i) =>
      i === idx ? { ...ev, [field]: value } : ev
    );
    setEvs(arr);
    // Optionally propagate onAddEvent but only for full add
  }
  function removeEvent(idx) {
    setEvs(arr => arr.filter((_, i) => i !== idx));
  }

  return (
    <div className="timeline-builder">
      <label htmlFor="branchPrompt">Timeline Prompt / Title:</label>
      <input
        id="branchPrompt"
        className="timeline-prompt neon-glow"
        placeholder="Describe this timeline's core event(s)…"
        value={prompt || ""}
        onChange={e => onChangePrompt && onChangePrompt(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1.1rem",
          fontSize: "1.1em"
        }}
      />
      <div className="timeline-events">
        {evs.map((ev, idx) =>
          <div className="timeline-event neon-glow" key={idx}>
            {editable ? (
              <>
                <input className="event-label" placeholder="New Event" value={ev.label}
                  onChange={e => handleEdit(idx, "label", e.target.value)} />
                <input className="event-year" placeholder="Year" value={ev.year}
                  onChange={e => handleEdit(idx, "year", e.target.value)} style={{width: 65}} />
                <select value={ev.category} onChange={e => handleEdit(idx, "category", e.target.value)}>
                  <option value="life">Life</option>
                  <option value="career">Career</option>
                  <option value="relationship">Relationship</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
                <button className="event-remove neon-glow" onClick={() => removeEvent(idx)}>✕</button>
              </>
            ) : (
              <>
                <span className="ev-label">{ev.label}</span>
                <span className="ev-year">{ev.year && <>({ev.year})</>}</span>
                <span className={`ev-category cat-${ev.category}`}>[{ev.category}]</span>
              </>
            )}
          </div>
        )}
      </div>
      {editable &&
        <button className="event-add neon-gradient-glow" onClick={handleAdd}>+ Add Branch Event</button>
      }
    </div>
  );
}
