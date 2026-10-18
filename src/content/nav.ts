import { CONTACT_EMAIL, PRIVACY_URL, TERMS_URL } from "@/lib/links";

/**
 * The site's own links, shared by the header and footer on every page. Anchors
 * say what is behind them ("AI agent for Meta Ads", not "Meta"), which is what
 * search engines and assistants read as the page's topic.
 */
export type NavLink = { label: string; href: string };

/** The header row, from md up. Phones get the full list in the footer. */
export const HEADER_LINKS: NavLink[] = [
  { label: "Meta Ads", href: "/meta-ads" },
  { label: "Google Ads", href: "/google-ads" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export const FOOTER_COLUMNS: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Product",
    links: [
      { label: "AI agent for Meta Ads", href: "/meta-ads" },
      { label: "AI agent for Google Ads", href: "/google-ads" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security and access", href: "/security" },
      { label: "Sign in", href: "https://app.kortexagent.co/login" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Budget reallocation", href: "/features/budget-reallocation" },
      { label: "Creative fatigue", href: "/features/creative-fatigue" },
      { label: "Placements and audiences", href: "/features/placements-and-audiences" },
      { label: "Approvals and guardrails", href: "/features/approvals-and-guardrails" },
      { label: "Ad creation", href: "/features/ad-creation" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "Kortex vs Madgicx", href: "/compare/madgicx" },
      { label: "Kortex vs Revealbot", href: "/compare/revealbot" },
      { label: "Kortex vs Smartly", href: "/compare/smartly" },
      { label: "Kortex vs a media buyer", href: "/vs-media-buyer" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Ads glossary", href: "/glossary" },
      { label: "Blog", href: "/blog" },
      { label: "About Kortex", href: "/about" },
    ],
  },
  {
    title: "Free tools",
    links: [
      { label: "Visibility", href: "https://visibility.kortexagent.co" },
      { label: "Compete", href: "https://compete.kortexagent.co" },
      { label: "Creators", href: "https://creators.kortexagent.co" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
      { label: "Privacy", href: PRIVACY_URL },
      { label: "Terms", href: TERMS_URL },
      { label: "Data deletion", href: "/data-deletion" },
    ],
  },
];
