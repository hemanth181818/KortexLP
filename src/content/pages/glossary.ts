import type { Faq } from "@/content/types";

/** The ads glossary. Plain definitions, no numbers that are not general industry knowledge. */
export type Term = { id: string; term: string; alt?: string; definition: string; more: string };

export const GLOSSARY_META = {
  path: "/glossary",
  title: "Meta and Google Ads Glossary: ROAS, MER, CPA | Kortex",
  description:
    "Plain definitions of the ad terms performance marketers use: ROAS, MER, CPA, CTR, CPM, frequency, creative fatigue, learning phase, Advantage+ and more.",
  h1: "Ads glossary",
  lede: "A plain-language glossary of the terms performance marketers use when running Meta Ads and Google Ads, from ROAS and MER to the learning phase and the breakdown effect.",
};

export const TERMS: Term[] = [
  {
    id: "roas",
    term: "ROAS",
    alt: "Return on ad spend",
    definition: "ROAS is the revenue your ads bring in divided by what you spent on them.",
    more: "If you spend ₹10,000 and attributed sales are ₹30,000, ROAS is 3. It is the main number [Kortex](/meta-ads) protects, and it depends on how the ad platform attributes sales, so the same ads can show different ROAS under different attribution windows.",
  },
  {
    id: "mer",
    term: "MER",
    alt: "Marketing efficiency ratio",
    definition: "MER is your total revenue divided by your total marketing spend, across every channel.",
    more: "Unlike ROAS, MER does not rely on any ad platform's attribution, so it is a useful check when Meta and Google each claim credit for the same sale.",
  },
  {
    id: "cpa",
    term: "CPA",
    alt: "Cost per acquisition",
    definition: "CPA is what you pay in ad spend, on average, for each conversion such as a purchase or a sign-up.",
    more: "A good CPA depends on your margins and how much a customer is worth to you over time.",
  },
  {
    id: "ctr",
    term: "CTR",
    alt: "Click-through rate",
    definition: "CTR is the share of people who saw an ad and clicked it: clicks divided by impressions.",
    more: "A falling CTR alongside rising frequency is a sign of [creative fatigue](/features/creative-fatigue). A strong CTR with weak ROAS usually points at the landing page, price or stock rather than the ad.",
  },
  {
    id: "cpm",
    term: "CPM",
    alt: "Cost per mille",
    definition: "CPM is the cost of showing an ad one thousand times.",
    more: "CPM rises when more advertisers compete for the same people, which is common in India around Diwali and big sale events.",
  },
  {
    id: "frequency",
    term: "Frequency",
    definition: "Frequency is the average number of times each person has seen your ad over a period.",
    more: "There is no single right number. What matters is the trend: frequency rising while CTR falls means people are tiring of the ad.",
  },
  {
    id: "creative-fatigue",
    term: "Creative fatigue",
    definition: "Creative fatigue is the drop in response that comes from showing the same ad to the same people too often.",
    more: "It is different from an ad that never worked: a fatigued ad used to perform and has declined. See [creative fatigue in Kortex](/features/creative-fatigue).",
  },
  {
    id: "learning-phase",
    term: "Learning phase",
    definition: "The learning phase is the period after an ad set launches or is significantly edited, while Meta's delivery system works out how best to show it.",
    more: "Meta says an ad set generally needs about 50 optimization events in the week after its last significant edit to leave learning. Frequent large edits can restart it, which is one reason [Kortex keeps changes bounded](/features/approvals-and-guardrails) and leaves a changed ad set alone for a few days. Google Ads has a similar learning period for automated bidding.",
  },
  {
    id: "advantage-plus",
    term: "Advantage+",
    definition: "Advantage+ is Meta's name for its automated campaign and ad options, in which Meta's system decides more of the targeting, placements, budget or creative.",
    more: "Examples include Advantage+ shopping campaigns and Advantage+ placements. They hand decisions inside a campaign to Meta; they do not review your whole account.",
  },
  {
    id: "broad-targeting",
    term: "Broad targeting",
    definition: "Broad targeting means giving the ad platform few or no audience limits beyond basics such as location and age, and letting its system find buyers.",
    more: "It relies on the platform's delivery system and on clear conversion data, so tracking matters more when you target broadly.",
  },
  {
    id: "breakdown-effect",
    term: "Breakdown effect",
    definition: "The breakdown effect is Meta's term for why a placement or audience can look worse on average yet still be the right place for the system to spend.",
    more: "Meta's system moves spend to where the next result is cheapest, not where the average looks best. That is why [Kortex compares placements inside the same ad set](/features/placements-and-audiences) and only proposes a change when the gap is clear.",
  },
  {
    id: "attribution-window",
    term: "Attribution window",
    definition: "An attribution window is the time after someone clicks or views an ad during which a purchase is credited to that ad.",
    more: "Meta's default is 7 days after a click or 1 day after a view. Changing the window changes reported ROAS without changing real sales, so compare like with like.",
  },
  {
    id: "incrementality",
    term: "Incrementality",
    definition: "Incrementality is the share of sales your ads actually caused, as opposed to sales that would have happened anyway.",
    more: "Attributed results include some people who would have bought regardless. Incrementality is measured with holdout or lift tests that compare people who saw ads with people who did not.",
  },
];

export const GLOSSARY_FAQ: Faq[] = [
  {
    q: "What is a good ROAS?",
    a: "It depends on your margins. A business with high margins can be profitable at a lower ROAS than one with thin margins, so work out the ROAS at which you break even first.",
  },
  {
    q: "What is the difference between ROAS and MER?",
    a: "ROAS measures the revenue an ad platform attributes to its ads against what you spent there. MER divides your total revenue by your total marketing spend, with no attribution involved.",
  },
  {
    q: "Why did my ad set go back into the learning phase?",
    a: "Significant edits, such as large budget changes or new targeting, can restart the learning phase. Smaller, less frequent changes help an ad set stay out of it.",
  },
];
