# kortexagent.co: SEO and AI visibility plan

Audit date: 2026-10-26. Branch: `seo/ai-visibility`. Source: this repo's code and a full local build (`npm run build`, 24 pages before, 27 after).

## Not measured yet: what the AI engines answer

The Kortex Visibility audit of kortexagent.co was not run for this pass. Running it locally costs about $1.40 in engine calls, and Hemanth chose to skip it for now. So this plan does not yet say which buying questions name Kortex, who is named instead, or which pages the answers cite. That is the most important missing input. Run it before the next content round:

- Run the free audit on https://visibility.kortexagent.co for kortexagent.co, or start a report through Kortex's `lib/ext/visibility/run.ts`.
- From the report, list the questions where Kortex is not named, the competitors named instead, and the cited pages. Those decide the next pages (section 4) and the third-party work (section 5).
- Run it again 4 to 6 weeks after this deploys, to see whether the rate of being named moves.

Note: the Google part of the audit reads Google through Kortex's reader VM, which is reachable only from Cloud Run. A local run may report Google as not checked.

## 1. What was already good

The site's technical base is strong; most of the work is positioning and content, not plumbing.

- Every page is pre-rendered to HTML (`scripts/prerender.mjs`), so crawlers that do not run JavaScript, including most AI crawlers, read the words.
- Each page has its own title, description, canonical, Open Graph, Twitter card, BreadcrumbList and WebPage JSON-LD. The build fails on a title over 60 characters, a description outside 140 to 160, unparseable JSON-LD, a page nothing links to, or banned words (an em dash, the old company name, Gemini named as a provider).
- `robots.txt` allows every crawler, including OAI-SearchBot, Claude-SearchBot, PerplexityBot and Googlebot.
- `sitemap.xml` and the page list in `llms.txt` are generated from the rendered pages, so they cannot drift.
- Content pages already follow an answer-first pattern: question headings, a one-sentence answer, then detail, with a FAQ per page.

## 2. What the audit found

### The site's inner pages describe a different product from the home page (high)

Since 2026-10-21 the home page leads with the free SEO and AI visibility audit. Every inner page (features, compare, FAQ, about, blog, 404) still described Kortex only as an AI ad agent for Meta and Google Ads.

- No page on the site explained the audit, AI visibility, or the Growth plan apart from the pricing page. The core offer had no page that could rank or be cited for "AI visibility audit", "does ChatGPT recommend my business" or similar questions.
- The blog had one post, about Meta ROAS. Nothing answered the questions people ask AI about AI visibility.
- The FAQ and blog index titles and descriptions were ads-only.
- The 404 page and the footer line on every page called Kortex "AI agents for high frequency ROAS optimization".

### Two different products under one schema id (high)

The home page's JSON-LD described `#app` as "Kortex Visibility" with Free and Growth offers in USD and INR. Every inner page described the same `#app` id as an ads agent with a single offer of ₹0, `PreOrder`, "free during early access". Search engines merge nodes by `@id`, so they saw contradictory prices and descriptions for one entity. The Organization node also differed (description and logo) between the home page and the rest.

### Stale pricing statements (medium)

- `llms.txt` said "Prices are in Indian rupees" and called the agent "Ask Kortex".
- Compare pages said Kortex pricing is "rupees" and that "paid plans will be priced in rupees".
- The about page said "Amounts are in rupees".
- There was no plain-text pricing file for AI agents that compare tools.

### Smaller items (low)

- `og:image:alt` on the home page described the old ads positioning.
- `inLanguage` was `en-IN` and `og:locale` `en_IN` everywhere, while prices lead in USD and the audience is not only India.
- Inner pages' only call to action was "Get early access" for the ads agent, including on the pricing page, whose subject is the free audit and Growth.
- The blog's Markdown subset had no code blocks.

### Checked and fine

- Titles: every page at 60 characters or fewer. Descriptions: every page between 140 and 160.
- One H1 per page, breadcrumbs on every inner page, canonical URLs absolute and self-referencing.
- Internal links: every page reachable from the home page (the build enforces it).
- FAQPage markup is only on pages whose FAQ is visible on the page. Note Google no longer shows FAQ rich results; the markup stays because it matches visible content and some other engines read it.

## 3. What this branch changes

| Change | Why |
|---|---|
| New page `/ai-visibility`: what AI visibility is, what the audit checks (the 20 questions, the three engines, Google page one and AI Overview, the six site checks), the four fixes, how to run it, what comes after, price, FAQ | The core offer had no page of its own. Every statement is taken from the audit's code (`lib/ext/visibility/run.ts`, `site.ts`) and the existing pricing page. |
| New post `/blog/how-to-get-recommended-by-chatgpt`: seven steps, answer-first, citing OpenAI's and Anthropic's crawler docs and Google's AI features guide | Answers the main question buyers ask AI in this category. No statistics or claims without a linked primary source. |
| New post `/blog/what-is-llms-txt`: what it is, the format, an example, what Google says, what matters more | A common question with a short, checkable answer; the audit writes an llms.txt, so it supports the product honestly. |
| One `#app` and one `#org` on every page: Kortex, with the audit, the agent, the ads agent in early access, and Free / Growth $50 / Growth ₹4,999 offers | Removes the contradiction between the home page and inner pages. |
| `llms.txt`: "Ask Kortex" removed, rupees line replaced, a Pricing section added | Matches the current offer and house naming. |
| New `/pricing.md` | Plain pricing for AI agents that compare tools; linked from `llms.txt`. |
| Compare and about pages: rupee pricing claims replaced with the ads agent being free in early access and Growth at $50 (₹4,999 in India) | Stale facts. |
| FAQ and blog index titles and descriptions, blog lede, 404 text, footer line | Describe the whole product, not only ads. |
| Audit call to action ("Run the free audit") on `/ai-visibility`, `/pricing` and the two new posts; the ads pages keep "Get early access" | Each page asks for the thing it is about. |
| Footer: "AI visibility audit" under Product; the two new posts under Learn | Internal links to the new pages from every page. |
| `inLanguage` `en`, `og:locale` `en_US`, home `og:image:alt` | Small consistency fixes. |
| Blog Markdown: fenced code blocks | Needed for the llms.txt example. |

## 4. Next, in order

1. **Run the audit of kortexagent.co** (section above). Everything below should be re-ranked by its answers.
2. **Request indexing** of `/ai-visibility` and the two posts in Google Search Console and Bing Webmaster Tools after deploy, and run `node scripts/indexnow.mjs`.
3. **One page per question Kortex is missing**, only where Kortex has something true and specific to say. Likely candidates once the audit confirms them: "how to check if ChatGPT mentions my brand" (the audit's own method, as a how-to), "AI visibility for Shopify stores", "AI visibility for SaaS".
4. **Comparison pages for AI visibility tools**, only after each competitor fact is checked on its own site and dated, as the existing ads compare pages do. Do not publish claims about other products that cannot be sourced.
5. **Glossary**: add AI search terms (AI visibility, AI Overview, AI Mode, llms.txt, OAI-SearchBot, Claude-SearchBot, GEO) to `/glossary`, and broaden its title from ads only.
6. **Original data**: once there are enough audits, publish aggregate findings (for example, how often sites block AI search crawlers, or how many lack an llms.txt) with the method stated. Original data is the content most often cited. Needs Hemanth's decision on what aggregate data may be published.
7. **Home page link**: a visible link from the home page body to `/ai-visibility` (today it is linked from the footer on every page).

## 5. Off-site work (needs Hemanth)

AI assistants recommend companies that several independent sources agree on. Nothing on kortexagent.co can substitute for this.

- Use the same one-line description everywhere: LinkedIn company page, Product Hunt, G2 or Capterra listings, Crunchbase, X. Suggested: "Kortex shows whether ChatGPT, Gemini, Claude and Google recommend your business, and fixes it."
- Ask real users for reviews on one review site.
- Get included, where it genuinely fits, in the roundups and threads that the audit shows the engines citing.
- Never post fake reviews or use accounts that hide who is posting.

## 6. Deploy steps

Hemanth deploys. Same order as the README and earlier deploys, from a clean checkout of the merged `main` in `~/Desktop/Kreo/KortexLP`:

```bash
npm ci && npm run build

# 1. Hashed assets, cached for a year (old assets stay for cached clients)
gcloud storage cp -r dist/assets gs://kortexagent-landing/ --cache-control="public, max-age=31536000, immutable"

# 2. Discovery files
gcloud storage cp dist/robots.txt dist/llms.txt gs://kortexagent-landing/ --content-type="text/plain; charset=utf-8" --cache-control="public, max-age=3600"
gcloud storage cp dist/sitemap.xml gs://kortexagent-landing/ --content-type="application/xml" --cache-control="public, max-age=3600"
gcloud storage cp dist/pricing.md gs://kortexagent-landing/ --content-type="text/markdown; charset=utf-8" --cache-control="public, max-age=3600"

# 3. Every page except the home page, as an extensionless object
cd dist && for f in $(find . -name index.html ! -path ./index.html); do
  p=${f#./}; p=${p%/index.html}
  gcloud storage cp "$f" "gs://kortexagent-landing/$p" --content-type="text/html; charset=utf-8" --cache-control="no-cache"
done; cd ..

# 4. The home page last
gcloud storage cp dist/index.html gs://kortexagent-landing/index.html --content-type="text/html; charset=utf-8" --cache-control="no-cache"

# 5. CDN, then search engines
gcloud compute url-maps invalidate-cdn-cache kortex-pilot-urlmap --host kortexagent.co --path "/*" --project kortex-pilot
node scripts/indexnow.mjs
```

Do not delete anything in the bucket: the `data-deletion` object and older assets must stay.

Then check that https://kortexagent.co/ai-visibility, https://kortexagent.co/pricing.md and https://kortexagent.co/llms.txt load, and view the source of one new page to confirm the pre-rendered text and JSON-LD are in it.
