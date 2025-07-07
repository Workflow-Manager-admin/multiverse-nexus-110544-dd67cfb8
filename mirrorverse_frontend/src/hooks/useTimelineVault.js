/**
 * Timeline Vault: save/load timelines in localStorage.
 */
import { useState, useEffect } from "react";
const VAULT = "mirrorverse_vault";

// PUBLIC_INTERFACE
export default function useTimelineVault() {
  const [vault, setVault] = useState([]);

  useEffect(() => {
    const v = JSON.parse(localStorage.getItem(VAULT) || "[]");
    setVault(v);
  }, []);

  function addToVault(timeline) {
    setVault(arr => {
      const updated = [...arr, timeline];
      localStorage.setItem(VAULT, JSON.stringify(updated));
      return updated;
    });
  }
  function removeFromVault(id) {
    setVault(arr => {
      const updated = arr.filter(t => t.id !== id);
      localStorage.setItem(VAULT, JSON.stringify(updated));
      return updated;
    });
  }
  function loadVaultItem(id) {
    // No-op: nav performed in modal component
  }

  return { vault, addToVault, removeFromVault, loadVaultItem };
}
