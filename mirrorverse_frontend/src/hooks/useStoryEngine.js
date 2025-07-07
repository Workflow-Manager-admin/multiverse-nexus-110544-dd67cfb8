import { useState, useEffect } from "react";

// PUBLIC_INTERFACE
export default function useStoryEngine({ timeline, personality }) {
  /**
   * Returns the story state object and navigation methods:
   * { node, history, advance(choiceIdx), reset() }
   * - `node`: current story node (template with title/body/choices)
   * - `history`: list of previous nodes
   * - `advance(choiceIdx)`: advances story tree by user choice
   * - `reset()`: restarts at beginning node
   */
  const [storyData, setStoryData] = useState(null);
  const [node, setNode] = useState(null);
  const [history, setHistory] = useState([]);

  // Utility: Pick the main tag for template selection based on timeline prompt/personality
  function selectPrimaryTag() {
    // In production, more sophisticated NLP/tag-matching
    // Here: if timeline.prompt contains a keyword, use that tag
    const lowerPrompt = (timeline?.prompt || "").toLowerCase();
    if (lowerPrompt.includes("hermit") || lowerPrompt.includes("solitude"))
      return "peaceful_hermit_life";
    if (lowerPrompt.includes("love") || lowerPrompt.includes("romance"))
      return "romantic_arc";
    if (
      lowerPrompt.includes("career") ||
      lowerPrompt.includes("startup") ||
      lowerPrompt.includes("quit") ||
      lowerPrompt.includes("rebellious")
    ) return "rebellious_career_shift";
    // Fallback by personality
    if (personality?.includes("Adventurous"))
      return "rebellious_career_shift";
    if (personality?.includes("Empathetic"))
      return "romantic_arc";
    if (personality?.includes("Steadfast"))
      return "peaceful_hermit_life";
    // Default
    return "rebellious_career_shift";
  }

  useEffect(() => {
    async function loadTemplates() {
      const resp = await fetch("/src/mockdata/storyTemplates.json");
      const data = await resp.json();
      setStoryData(data);
    }
    loadTemplates();
  }, []);

  // Find the first node for simulation path
  useEffect(() => {
    if (!storyData) return;
    const tag = selectPrimaryTag();
    const arr = storyData[tag] || [];
    if (arr.length === 0) return;
    setNode(arr[0]);
    setHistory([]);
    // eslint-disable-next-line
  }, [storyData, timeline]);

  const advance = idx => {
    if (!node || !storyData) return;
    // End if no more choices
    if (!node.choices || node.choices.length === 0) return;
    const tag = selectPrimaryTag();
    const arr = storyData[tag] || [];
    const nextId = node.choices[idx]?.next;
    const nextNode = arr.find(t => t.id === nextId);

    if (nextNode) {
      setHistory(his => [...his, node]);
      setNode(nextNode);
    }
  };

  const reset = () => {
    if (!storyData) return;
    const tag = selectPrimaryTag();
    const arr = storyData[tag] || [];
    if (arr.length === 0) return;
    setNode(arr[0]);
    setHistory([]);
  };

  return { node, history, advance, reset, loaded: !!storyData };
}
