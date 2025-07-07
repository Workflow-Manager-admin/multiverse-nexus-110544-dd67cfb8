/**
 * Modal overlay to show achievement badge(s).
 */
import React from "react";

// PUBLIC_INTERFACE
function BadgeModal({ badge, onClose }) {
  // Badge: {title, desc, tier}
  return (
    <div className="modal-overlay show">
      <section className="badge-modal neon-glow">
        <h3 className="modal-title neon-gradient">Badge Unlocked</h3>
        <div className={`badge-icon badge-${badge.tier}`}>{getBadgeIcon(badge.tier)}</div>
        <div className="badge-title">{badge.title}</div>
        <div className="badge-desc">{badge.desc}</div>
        <button className="close-modal neon-glow" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}
function getBadgeIcon(tier) {
  switch (tier) {
    case "gold": return "🏆";
    case "silver": return "⭐";
    case "bronze": return "🔗";
    default: return "🎉";
  }
}
export default BadgeModal;
