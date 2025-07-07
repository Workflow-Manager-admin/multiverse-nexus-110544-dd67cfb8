/**
 * Modal overlay for Timeline Vault (list, load/comparisons).
 */
import React from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function TimelineVaultModal({ open, setOpen, vault, onRemove, onLoad }) {
  const nav = useNavigate();
  function handleLoad(id) {
    // Navigation: choose, close modal
    onLoad(id);
    setOpen(false);
    nav(`/dashboard/${id}`);
  }

  return (
    <div className={`modal-overlay ${open ? "show" : ""}`}>
      <section className="vault-modal neon-glow">
        <h3 className="modal-title neon-gradient">Timeline Vault</h3>
        <ul className="vault-list">
          {vault.length === 0 &&
            <li><span className="empty-vault">No timelines saved yet.</span></li>
          }
          {vault.map(t =>
            <li key={t.id} className="vault-item">
              <span className="vault-date">{(new Date(t.saved)).toLocaleString()}</span>
              <span className="vault-title">{t.prompt}</span>
              <button className="vault-load neon-gradient-glow" onClick={() => handleLoad(t.id)}>View</button>
              <button className="vault-remove neon-glow" onClick={() => onRemove(t.id)}>Remove</button>
            </li>
          )}
        </ul>
        <button className="close-modal neon-glow" onClick={() => setOpen(false)}>Close</button>
      </section>
    </div>
  );
}
export default TimelineVaultModal;
