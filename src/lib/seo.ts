/**
 * Each page's head: title, description, canonical and structured data. The page
 * modules build it next to the words it describes; scripts/prerender.mjs reads
 * it from window.__KORTEX_PAGE__ after rendering and writes it into that page's
 * HTML file, so the head and the body always come from the same source.
 */
export const SITE = "https://kortexagent.co";
export const OG_IMAGE = `${SITE}/og.png`;
declare const __CONTENT_UPDATED__: string;
declare const __HOME_UPDATED__: string;
/** The day the content pages last changed in git (vite.config.ts), for dateModified and the sitemap. */
export const UPDATED: string = __CONTENT_UPDATED__;
/** The day the home page last changed in git. */
export const HOME_UPDATED: string = __HOME_UPDATED__;

export type Crumb = { name: string; path: string };
export type JsonLd = Record<string, unknown>;

export type PageHead = {
  path: string;
  /** <title>, at most 60 characters. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  ogType?: "website" | "article";
  /** Home first, this page last. */
  crumbs: Crumb[];
  /** Page-specific nodes; the Organization, WebSite and BreadcrumbList are added here. */
  jsonLd: JsonLd[];
  lastmod: string;
  noindex?: boolean;
};

declare global {
  interface Window {
    __KORTEX_PAGE__?: PageHead & { graph: JsonLd };
    __KORTEX_ROUTES__?: string[];
  }
}

export const url = (path: string) => (path === "/" ? `${SITE}/` : `${SITE}${path}`);

export const ORG: JsonLd = {
  "@type": "Organization",
  "@id": `${SITE}/#org`,
  name: "Kortex",
  url: `${SITE}/`,
  email: "human@kortexagent.co",
  logo: { "@type": "ImageObject", url: `${SITE}/logo-mark.png`, width: 512, height: 512 },
  description: "A free SEO and AI visibility audit, and AI agents that fix what it finds and run Meta and Google ads.",
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "human@kortexagent.co" },
};

export const WEBSITE: JsonLd = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "Kortex",
  url: `${SITE}/`,
  inLanguage: "en",
  publisher: { "@id": `${SITE}/#org` },
};

/**
 * The product. The home page (index.html) carries the same node with the same @id, so every page
 * describes one Kortex: keep the two in step.
 */
export const APP_REF = { "@id": `${SITE}/#app` };
export const APP: JsonLd = {
  "@type": "SoftwareApplication",
  "@id": `${SITE}/#app`,
  name: "Kortex",
  url: "https://visibility.kortexagent.co/",
  image: OG_IMAGE,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "SEO and AI visibility",
  operatingSystem: "Web",
  publisher: { "@id": `${SITE}/#org` },
  description:
    "A free audit that puts 20 questions your customers ask to ChatGPT, Gemini and Claude, reads Google's page one and AI Overview, shows who is named instead of you and writes the fixes. Then an AI agent that helps you get named, and an ads agent for Meta and Google Ads in early access.",
  featureList: [
    "How often ChatGPT, Gemini and Claude name you for the questions your customers ask",
    "Who is named instead, and the sites the answers cite",
    "Google page one and AI Overview for your searches",
    "Written fixes: an article, an FAQ, llms.txt and structured data",
    "An AI agent that runs live checks, writes posts and checks again every week",
    "Competitor ad reports and new image ads made from your products",
    "An ads agent for Meta Ads and Google Ads that proposes fixes a person approves (early access)",
  ],
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "One free audit per website, with the written fixes, and 50 free credits for the agent." },
    {
      "@type": "Offer",
      name: "Growth",
      price: "50",
      priceCurrency: "USD",
      description: "Weekly checks with a Monday email, live checks, posts, competitor ads and new ads, with a monthly usage allowance.",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "50", priceCurrency: "USD", billingDuration: "P1M" },
    },
    {
      "@type": "Offer",
      name: "Growth (India)",
      price: "4999",
      priceCurrency: "INR",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "4999", priceCurrency: "INR", billingDuration: "P1M" },
    },
  ],
};

export function breadcrumbLd(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url(crumbs[crumbs.length - 1].path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: url(c.path) })),
  };
}

export function faqLd(path: string, faqs: Array<{ q: string; a: string }>): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${url(path)}#faq`,
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: plain(f.q), acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
  };
}

/** The WebPage node every page has, tied to the site and its breadcrumb. */
export function webPageLd(head: Pick<PageHead, "path" | "title" | "description" | "lastmod">, type = "WebPage", extra: JsonLd = {}): JsonLd {
  return {
    "@type": type,
    "@id": `${url(head.path)}#webpage`,
    url: url(head.path),
    name: head.title,
    description: head.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE}/#website` },
    breadcrumb: { "@id": `${url(head.path)}#breadcrumb` },
    dateModified: head.lastmod,
    ...extra,
  };
}

/** The whole @graph for a page. */
export function graph(head: PageHead): JsonLd {
  return { "@context": "https://schema.org", "@graph": [ORG, WEBSITE, breadcrumbLd(head.crumbs), ...head.jsonLd] };
}

/** Inline markup ([text](href), **bold**) stripped to plain text, for structured data and meta. */
export function plain(s: string): string {
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}
