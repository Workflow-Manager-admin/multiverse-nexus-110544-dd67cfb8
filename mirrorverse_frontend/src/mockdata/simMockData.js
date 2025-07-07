/**
 * Mock data and simulation generators for MirrorVerse
 */

// PUBLIC_INTERFACE
export const mockPathScenarios = [
  {
    id: "s1",
    title: "What if I started a new career abroad?",
    branch: [
      { label: "Applied for overseas job", year: "2024", category: "career" },
      { label: "Relocated to Japan", year: "2025", category: "life" },
      { label: "Learned Japanese", year: "2026", category: "education" },
      { label: "Started new friend circle", year: "2027", category: "relationship" }
    ]
  },
  {
    id: "s2",
    title: "What if I became an artist?",
    branch: [
      { label: "Discovered passion for art", year: "2024", category: "life" },
      { label: "Took intensive art courses", year: "2025", category: "education" },
      { label: "Held first gallery show", year: "2026", category: "career" },
      { label: "Won an art award", year: "2027", category: "success" }
    ]
  },
  {
    id: "s3",
    title: "What if I launched a startup with friends?",
    branch: [
      { label: "Met co-founder group", year: "2023", category: "relationship" },
      { label: "Brainstormed ideas", year: "2024", category: "life" },
      { label: "Pitched to investors", year: "2025", category: "career" },
      { label: "Product launch day", year: "2026", category: "success" }
    ]
  }
];

function makeId() {
  return "timeline_" + String(Math.floor(Math.random() * 1000000));
}

// PUBLIC_INTERFACE
export function getTimelineById(id) {
  // Try local vault
  const vault = JSON.parse(localStorage.getItem("mirrorverse_vault") || "[]");
  if (!vault.length) return null;
  return vault.find(t => String(t.id) === String(id)) || vault[0];
}

// PUBLIC_INTERFACE
export function mockMetricsForTimeline(id) {
  // Deterministic mock
  let n = 0;
  for (let i = 0; i < id.length; i++)
    n += id.charCodeAt(i);
  return {
    fulfillment: 65 + (n % 33),
    boldness: 62 + ((n * 3) % 24),
    harmony: 72 + ((n * 7) % 16),
    success: 42 + ((n * 5) % 41),
    adventure: 58 + ((n * 2) % 32),
    risk: 39 + ((n * 4) % 47)
  };
}

// PUBLIC_INTERFACE
export function mockStoryForTimeline(timeline) {
  if (!timeline) return { paragraphs: [], badges: [] };
  const events = timeline.events || [];
  // Simple dynamic story template
  let ps = [
    `In the MirrorVerse, one choice branches into infinite outcomes. Your journey begins with: "${timeline.prompt}".`,
    `Key moments shape this path: ${events.slice(0,3).map(e => `"${e.label}" (${e.year})`).join(", ")}.`,
    `Where others saw boundaries, you followed curiosity and discovered unexpected possibilities.`
  ];
  if (events.length > 3)
    ps.push("Your resilience and insight have unlocked a unique outcome, rarely seen by most travelers in the MirrorVerse.");

  const badgeRand = (events.length + (timeline.prompt || "").length) % 3;
  const badgeTiers = ["bronze", "silver", "gold"];
  return {
    paragraphs: ps,
    badges: [{
      title: badgeTiers[badgeRand].toUpperCase() + " Explorer",
      desc: "For venturing into new branches of the MirrorVerse.",
      tier: badgeTiers[badgeRand],
      icon: badgeRand === 2 ? "🏆" : badgeRand === 1 ? "⭐" : "🔗"
    }]
  };
}
