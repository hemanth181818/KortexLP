/**
 * Kreo's case study (Hemanth, 2026-10-26: Kreo has run Kortex in-house; "pull the direct numbers from
 * Kreo's Search Console and GA4"). Two sources, both read 2026-10-26 through Kreo's own Google connection:
 *
 * Results: Search Console (https://kreo-tech.com/, all search types, dataState all) and GA4 property
 * "Kreotech". The period is ISO weeks 31 to 43 of 2026 (27 July to 25 October) against the same weeks of
 * 2025. "Visits from AI assistants" are GA4 sessions whose source matches Kortex's AI_SOURCES list
 * (lib/ext/google-data.ts in Kortex-Pilot: chatgpt.com, openai, perplexity, gemini.google.com, claude.ai,
 * copilot, meta.ai), as on Kortex's Progress page. Revenue is GA4 purchaseRevenue, in rupees.
 *
 * Audit: Kreo's Kortex Visibility audit of kreo-tech.com, finished 2026-10-08 (visibility_reports
 * 90770c4a): an answer "names" Kreo when the engine's answer lists it. 72 answers: 20 each from ChatGPT,
 * Gemini and Claude, and 12 Google AI Overviews.
 * Companies are counted once per answer, names compared without case or punctuation ("Logitech G" is Logitech).
 * Other companies are never named (Visibility copy rule): they are described by what they are.
 */

/* ---------- The audit, 2026-10-08 ---------- */

export const KREO = {
  site: "kreo-tech.com",
  auditDate: "2026-10-08",
  sells: "gaming peripherals and creator gear in India: keyboards, mice, headsets, microphones and streaming kit",
  answers: 72,
  named: 10,
  companiesNamed: 116,
  rank: 10,
  questions: 20,
  questionsNamed: 6,
  pageOneSearches: 5,
  pageOneOwn: 0,
};

/** Answers that name Kreo, by engine. */
export const BY_ENGINE: Array<{ engine: "chatgpt" | "gemini" | "claude" | "google"; label: string; named: number; of: number }> = [
  { engine: "gemini", label: "Gemini", named: 4, of: 20 },
  { engine: "claude", label: "Claude", named: 3, of: 20 },
  { engine: "google", label: "Google AI Overview", named: 2, of: 12 },
  { engine: "chatgpt", label: "ChatGPT", named: 1, of: 20 },
];

/** Answers that name Kreo, by the kind of question asked. */
export const BY_KIND: Array<{ kind: string; example: string; named: number; of: number }> = [
  { kind: "Best of", example: "the best gaming peripheral brands in India", named: 4, of: 20 },
  { kind: "On a budget", example: "hot-swap keyboards under ₹4,000", named: 3, of: 12 },
  { kind: "Alternatives", example: "better value than a big global mouse brand", named: 2, of: 8 },
  { kind: "Comparisons", example: "membrane or mechanical for long hours", named: 1, of: 10 },
  { kind: "What to use", example: "a beginner streamer's setup for YouTube", named: 0, of: 12 },
  { kind: "Problems", example: "how to stop keyboard clicks on Discord", named: 0, of: 10 },
];

/* ---------- Results: Search Console and GA4 ---------- */

export const PERIOD = { label: "27 July to 25 October 2026", short: "Aug to Oct", compare: "the same 13 weeks of 2025" };

export const RESULTS = {
  aiVisits: { before: 959, after: 7047 },
  aiOrders: { before: 7, after: 138 },
  aiRevenue: { before: 22342, after: 374462 },
  searchOrders: { before: 1433, after: 3155 },
  searchRevenue: { before: 5369905, after: 9771979 },
  searchVisits: { before: 164315, after: 230815 },
  clicks: { before: 142391, after: 174563 },
  position: { before: 20.8, after: 6.3 },
  /** 1 to 25 October, the festive weeks, year on year. */
  octoberClicks: { before: 45869, after: 83482 },
};

/** Visits from AI assistants in the 13 weeks, by assistant. */
export const AI_BY_ASSISTANT: Array<{ label: string; visits: number }> = [
  { label: "ChatGPT", visits: 6904 },
  { label: "Gemini", visits: 109 },
  { label: "Perplexity", visits: 21 },
  { label: "Claude", visits: 10 },
  { label: "Meta AI", visits: 3 },
];

/** Week by week (weeks start on Monday): visits from AI assistants and Google clicks, this year and last. */
export const WEEKS: Array<{ week: string; ai: number; aiLastYear: number; clicks: number; clicksLastYear: number }> = [
  { week: "2026-07-27", ai: 343, aiLastYear: 102, clicks: 9074, clicksLastYear: 14546 },
  { week: "2026-08-03", ai: 429, aiLastYear: 67, clicks: 10175, clicksLastYear: 12505 },
  { week: "2026-08-10", ai: 440, aiLastYear: 69, clicks: 9785, clicksLastYear: 11083 },
  { week: "2026-08-17", ai: 487, aiLastYear: 70, clicks: 10078, clicksLastYear: 9497 },
  { week: "2026-08-24", ai: 503, aiLastYear: 45, clicks: 10021, clicksLastYear: 8356 },
  { week: "2026-08-31", ai: 556, aiLastYear: 64, clicks: 10487, clicksLastYear: 8328 },
  { week: "2026-09-07", ai: 548, aiLastYear: 71, clicks: 9405, clicksLastYear: 7778 },
  { week: "2026-09-14", ai: 474, aiLastYear: 47, clicks: 8375, clicksLastYear: 8147 },
  { week: "2026-09-21", ai: 493, aiLastYear: 103, clicks: 8594, clicksLastYear: 11187 },
  { week: "2026-09-28", ai: 565, aiLastYear: 86, clicks: 15400, clicksLastYear: 9863 },
  { week: "2026-10-05", ai: 774, aiLastYear: 116, clicks: 33601, clicksLastYear: 18497 },
  { week: "2026-10-12", ai: 573, aiLastYear: 59, clicks: 24548, clicksLastYear: 11560 },
  { week: "2026-10-19", ai: 862, aiLastYear: 60, clicks: 15020, clicksLastYear: 11044 },
];

/** Rupees the Indian way: ₹3.74 lakh, ₹97.7 lakh, ₹22,342. */
export function rupees(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n >= 1000000 ? 1 : 2)} lakh`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export const times = (a: number, b: number) => `${(b / a).toFixed(1).replace(/\.0$/, "")}x`;
