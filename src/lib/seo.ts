/**
 * Each page's head: title, description, canonical and structured data. The page
 * modules build it next to the words it describes; scripts/prerender.mjs reads
 * it from window.__KORTEX_PAGE__ after rendering and writes it into that page's
 * HTML file, so the head and the body always come from the same source.
 */
export const SITE = "https://kortexagent.co";
export const OG_IMAGE = `${SITE}/og.png`;
/** The date the content pages were written or last checked. */
export const UPDATED = "2026-10-18";

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
  logo: { "@type": "ImageObject", url: `${SITE}/logo.png`, width: 1038, height: 360 },
  description: "AI agents for high frequency ROAS optimization on Meta and Google ads.",
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "human@kortexagent.co" },
};

export const WEBSITE: JsonLd = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "Kortex",
  url: `${SITE}/`,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE}/#org` },
};

/** The product, as on the home page. Pages that are about the product refer to it by @id. */
export const APP_REF = { "@id": `${SITE}/#app` };
export const APP: JsonLd = {
  "@type": "SoftwareApplication",
  "@id": `${SITE}/#app`,
  name: "Kortex",
  url: `${SITE}/`,
  image: OG_IMAGE,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Advertising optimization",
  operatingSystem: "Web",
  publisher: { "@id": `${SITE}/#org` },
  description:
    "Kortex is an AI ad agent for Meta Ads (Facebook and Instagram) and Google Ads. It checks the ad account every day, finds where return on ad spend is leaking and proposes the exact fix. A person approves each change; Kortex makes it, then checks whether it worked.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/PreOrder",
    description: "Free during early access. Access is opened by hand.",
  },
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
    inLanguage: "en-IN",
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
