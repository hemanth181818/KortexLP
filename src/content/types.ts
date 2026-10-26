/**
 * The shape of a content page. Strings may carry two kinds of inline markup:
 * [text](/path) for a link and **text** for emphasis; nothing else.
 */
export type Block =
  | string
  | { list: string[]; ordered?: boolean }
  | { table: { caption: string; head: string[]; rows: string[][] } }
  | { cards: Array<{ title: string; body: string; href: string }> };

export type Section = {
  /** The heading, phrased as the question people search. */
  q: string;
  /** One sentence that answers it, shown first. */
  a: string;
  body?: Block[];
};

export type Faq = { q: string; a: string };

export type ContentPage = {
  path: string;
  title: string;
  description: string;
  /** The breadcrumb name of this page. */
  crumb: string;
  /** A parent hub between Home and this page, e.g. Features. */
  parent?: { name: string; path: string };
  eyebrow: string;
  h1: string;
  /** The one-sentence definition at the top. */
  lede: string;
  /** Comparison pages: when the competitor facts were last checked. */
  lastChecked?: string;
  sections: Section[];
  faq: Faq[];
  /** Heading for this page's questions on /faq. */
  faqGroup?: string;
  related?: string[];
  /** schema.org type of the page node, WebPage unless set. */
  pageType?: string;
  /** About the product itself: the page node gets about: #app and the app node is included. */
  aboutApp?: boolean;
  /** The final ask's heading; the home page's when unset. */
  ctaTitle?: string;
  /** What the page asks for: the free audit, or early access to the ads agent (the default). */
  action?: "audit" | "ads";
};
