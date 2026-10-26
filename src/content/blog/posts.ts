import type { Faq } from "@/content/types";

/**
 * Blog posts. Add a post by adding an object here, newest first: the blog index,
 * the post page, the sitemap and llms.txt all read this list (the prerender step
 * finds each post through the index's links).
 *
 * body is a small Markdown subset: "## " and "### " headings, paragraphs,
 * "- " and "1. " lists, [text](href) links and **bold**. Headings should be the
 * questions people search, each section opening with a one-sentence answer.
 */
export type Post = {
  slug: string;
  /** The page heading. */
  title: string;
  /** <title>, at most 60 characters. */
  metaTitle: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  /** ISO date. */
  date: string;
  updated?: string;
  /** The one-sentence answer at the top. */
  lede: string;
  body: string;
  faq: Faq[];
  related?: string[];
  /** The closing ask: the free audit, or early access to the ads agent (the default). */
  action?: "audit" | "ads";
};

export const POSTS: Post[] = [
  {
    slug: "how-to-get-recommended-by-chatgpt",
    title: "How to get your business recommended by ChatGPT, Claude and Google's AI",
    metaTitle: "How to Get Recommended by ChatGPT and Google AI | Kortex",
    description:
      "Seven steps to get named when people ask ChatGPT, Claude, Gemini or Google's AI what to buy: check the answers, let the crawlers in, and answer on your site.",
    date: "2026-10-26",
    lede:
      "To get recommended by ChatGPT, Claude and Google's AI, first find out what they answer today for the questions your customers ask, then make sure their search crawlers can read your site, put plain answers to those questions on your own pages, and get mentioned on the sites the answers already cite.",
    body: `
## How do AI assistants decide which companies to recommend?

They search the web for the question, read a handful of pages and name the companies those pages support.

ChatGPT, Claude and Google's AI Overview all answer buying questions by retrieving pages and summarising them. Google says its AI features are [rooted in its core Search ranking and quality systems](https://developers.google.com/search/docs/appearance/ai-features). ChatGPT and Claude run their own searches with their own crawlers. So the work has two parts: your own pages have to be readable and clearly answer the question, and other sites have to say good things about you, because an assistant names companies that several sources agree on.

## Step 1: What do the engines say about you today?

Ask them the questions your customers ask, several times, and write down who is named.

- Write 10 to 20 questions the way a buyer would type them: "best accounting software for a small agency", "which running shoes are good for flat feet", not your company name.
- Ask each one in ChatGPT, Claude, Gemini and Google. Answers change from one run to the next, so ask each more than once and count how often you are named.
- Note who is named instead of you, and which pages the answers cite. Those pages are your map.

This is what the [free Kortex audit](/ai-visibility) does for you: 20 questions to ChatGPT, Gemini and Claude, Google's page one and AI Overview, and the pages cited, in about four minutes.

## Step 2: Can the AI search crawlers read your site?

Check your robots.txt and your firewall, because a blocked search crawler means your pages cannot be cited.

Each company runs separate crawlers for search and for model training, and blocking one does not block the other.

- **ChatGPT**: [OAI-SearchBot](https://developers.openai.com/api/docs/bots) decides whether your site can appear in ChatGPT's search answers. GPTBot is the training crawler, and ChatGPT-User fetches a page when a user asks.
- **Claude**: [Claude-SearchBot](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) indexes pages for Claude's search; Anthropic says blocking it may reduce your visibility in Claude's answers. ClaudeBot is for training and Claude-User fetches on request.
- **Google**: AI Overviews use the normal Google index. A page has to be indexed and eligible to show with a snippet.

If you want to be recommended, allow the search crawlers even if you choose to block training. Then check that your CDN or bot protection is not quietly returning errors to them.

## Step 3: Are your words in the page before JavaScript runs?

Make sure each important page serves its text in the HTML, because many AI crawlers do not run JavaScript.

Open your page, view the source (not the inspector) and search for a sentence from the page. If the text is missing and only appears after scripts load, an assistant may see an empty page. Server rendering or pre-rendering fixes this. This site is pre-rendered for that reason.

## Step 4: Does your site answer the questions directly?

Give each important question a page or a section whose first sentence is the answer.

- Use the buyer's question as the heading, and answer it in the first one or two sentences.
- Say plainly what you sell, who it is for, what it costs and how it compares. If your price is behind a "contact us" button, an assistant cannot quote it.
- Write comparisons and "best for" pages only where you can say something true and specific. Thin pages written only for search do not help, and Google treats mass-produced pages as spam.

## Step 5: Do you describe yourself the same way everywhere?

Use the same one-line description of your company on your site, your profiles and directory listings.

Assistants look for agreement between sources. If your site says one thing, your LinkedIn page another and an old directory listing a third, the answer will be vague or wrong. Pick one sentence that says what you do and for whom, and use it everywhere.

## Step 6: Are you on the pages the answers cite?

Get mentioned on the sites that already show up in the answers for your questions.

The pages cited in Step 1 are usually review sites, industry roundups, community threads and comparison articles. Ask to be included where you genuinely belong, collect reviews from real customers, and take part honestly in the communities your buyers use. Never post fake reviews or fake accounts.

## Step 7: Add structured data and an llms.txt

Both are small, cheap to add, and help some engines read you, but neither is required.

- Structured data (JSON-LD) states who you are and what you sell in a form machines read. Google says no special schema is needed for its AI features, and that structured data should match what the page shows.
- An llms.txt file is a short Markdown summary of your site for AI tools. See [what llms.txt is and whether you need one](/blog/what-is-llms-txt).

## How long does it take to start showing up?

Weeks to months, and it varies by engine, so check again on a schedule rather than once.

Crawlers have to revisit your pages, and the third-party pages that mention you have to be found too. OpenAI notes that robots.txt changes for its search crawler can take about 24 hours to take effect; content changes take longer to show up in answers. Run the same questions every week or two and watch the rate at which you are named, not a single answer.

## How Kortex helps

The [Kortex AI visibility audit](/ai-visibility) runs Step 1 and checks Steps 2, 3 and 7 for you, and writes four fixes: an article, an FAQ, an llms.txt file and structured data. On the [Growth plan](/pricing) Kortex checks again every week and emails you on Monday with what changed.
`,
    faq: [
      {
        q: "Can I pay to be recommended by ChatGPT?",
        a: "No. ChatGPT's answers are not sold as placements. You get named by being readable to its search crawler and being mentioned by the sources it reads.",
      },
      {
        q: "Should I block GPTBot and ClaudeBot?",
        a: "That is a choice about training, not search. OpenAI and Anthropic run separate search crawlers, OAI-SearchBot and Claude-SearchBot, so you can block training and still be found in search.",
      },
      {
        q: "Does ranking on Google mean ChatGPT will recommend me?",
        a: "Not necessarily. Google's AI Overview is built on Google's rankings, but ChatGPT and Claude run their own searches, so check each engine separately.",
      },
      {
        q: "How do I know if ChatGPT recommends my business?",
        a: "Ask it the questions your customers ask, several times each, and count how often you are named. The free Kortex audit does this across ChatGPT, Gemini and Claude.",
      },
    ],
    related: ["/ai-visibility", "/blog/what-is-llms-txt", "/pricing"],
    action: "audit",
  },
  {
    slug: "what-is-llms-txt",
    title: "What is llms.txt, and does your website need one?",
    metaTitle: "What Is llms.txt, and Does Your Site Need One? | Kortex",
    description:
      "llms.txt is a short Markdown file at your site's root that tells AI tools what your site is and where the key pages are. What goes in it, and whether it helps.",
    date: "2026-10-26",
    lede:
      "llms.txt is a short Markdown file placed at the root of a website that tells AI tools what the site is about and links to its most useful pages; it is a proposed standard, cheap to add, and helpful for some AI tools, but Google says it is not needed for its AI features.",
    body: `
## What is llms.txt?

It is a plain Markdown file at yoursite.com/llms.txt that summarises your site for large language models.

The format was [proposed by Jeremy Howard in September 2024](https://llmstxt.org/). The idea is simple: web pages are full of navigation, scripts and layout, while an AI tool with a limited context window wants the essentials. A single file that says what the site is and where the important pages are gives it that in one read.

## What goes in an llms.txt file?

A title, a one-paragraph summary, and lists of links with a note on each.

The proposal sets out this order:

1. An H1 with the name of the site or project. This is the only required part.
2. A blockquote with a short summary of what it is.
3. Optional paragraphs or lists with more detail, without headings.
4. H2 sections, each a list of Markdown links, optionally followed by a colon and a short note.

A section called "Optional" holds links an AI tool can skip when it needs less context.

## What does a good one look like?

Short, factual and current: what you do, for whom, what it costs, and links to the pages that answer common questions.

\`\`\`
# Your Company

> Your Company makes [product] for [who]. [One sentence on what makes it different].

Plans start at $X a month. [Where it is available].

## Product
- [Pricing](https://example.com/pricing): plans and what each includes
- [How it works](https://example.com/how-it-works): the main steps

## Help
- [FAQ](https://example.com/faq): answers to common questions
\`\`\`

You can see Kortex's own at [kortexagent.co/llms.txt](https://kortexagent.co/llms.txt).

## Does llms.txt help you show up in AI answers?

It can help AI tools that read it understand you, but no major engine has said it uses llms.txt for ranking, and Google says it is not needed.

Google's guidance on its AI features is direct: [you do not need to create new machine-readable files, AI text files or markup](https://developers.google.com/search/docs/appearance/ai-features) to appear in AI Overviews or AI Mode. What matters for Google is that your pages are indexed and eligible to show with a snippet.

Other tools are different. Coding assistants and AI agents often fetch llms.txt when they are pointed at a site, and a clear summary helps them describe you correctly. So treat it as a small, low-cost extra, not a ranking trick.

## What matters more than llms.txt?

Being readable by AI search crawlers, serving your words without JavaScript, and answering buyers' questions on your own pages.

If OAI-SearchBot or Claude-SearchBot is blocked, or your pages are blank until scripts run, an llms.txt file will not make up for it. Start with [the steps in our guide to getting recommended by ChatGPT](/blog/how-to-get-recommended-by-chatgpt), and add llms.txt alongside them.

## How do I add one?

Write the file, save it as llms.txt in your site's root folder, and keep it up to date when your prices or pages change.

On most hosts you upload it like robots.txt. On WordPress, a plugin or your theme's static files can serve it. The [free Kortex audit](/ai-visibility) checks whether you have one and writes one for your site from what it reads there.
`,
    faq: [
      {
        q: "Is llms.txt the same as robots.txt?",
        a: "No. robots.txt tells crawlers what they may fetch. llms.txt tells AI tools what your site is about and which pages matter. Neither replaces the other.",
      },
      {
        q: "Does Google use llms.txt?",
        a: "Google says you do not need AI text files or special markup to appear in AI Overviews or AI Mode. Its AI features rely on its normal Search index.",
      },
      {
        q: "Where do I put llms.txt?",
        a: "At the root of your site, so it loads at yoursite.com/llms.txt. The proposal also allows one under a subpath to cover that part of a site.",
      },
      {
        q: "What is llms-full.txt?",
        a: "A common companion file that holds the full text of the key pages in one Markdown file, for tools that want everything in a single fetch. It is a convention, not part of the core proposal.",
      },
    ],
    related: ["/blog/how-to-get-recommended-by-chatgpt", "/ai-visibility", "/glossary"],
    action: "audit",
  },
  {
    slug: "why-meta-roas-dropped",
    title: "Why your Meta ROAS dropped: a checklist",
    metaTitle: "Why Your Meta ROAS Dropped: A Checklist | Kortex",
    description:
      "A checklist for when Meta ads ROAS falls: tracking, attribution, CPM, creative fatigue, the learning phase, budget shifts and what happens after the click.",
    date: "2026-10-18",
    lede:
      "When Meta ROAS drops, the cause is almost always one of a short list: broken tracking, a different attribution comparison, higher auction costs, tired creative, a reset learning phase, budget drifting to weaker ad sets, or a problem after the click; this checklist goes through them in the order worth checking.",
    body: `
## Is the drop real, or is it tracking?

Check tracking first, because a broken pixel or Conversions API setup makes ROAS fall even when sales have not.

- Compare the purchases Meta reports with the orders in your store for the same days. If your store shows sales that Meta does not, the problem is measurement, not your ads.
- Open Events Manager and look for a drop in Purchase events, new warnings or duplicate events.
- Think about recent changes to your site. A new checkout, payment page, theme or app can stop the purchase event from firing.
- If many of your orders are cash on delivery, check when your purchase event fires, at order placement or later, and keep it the same across the periods you compare.

## Did the attribution setting or the comparison change?

Reported ROAS depends on the attribution window, so make sure both periods are measured the same way.

- Compare periods with the same attribution setting. Meta's default is 7 days after a click or 1 day after a view, and a report with a different setting will show a different ROAS for the same sales.
- Do not judge the last day or two against a full week. Conversions keep arriving for days after the click, so the most recent days always look worse at first.
- Compare like with like: the same campaigns, the same number of days, ideally the same days of the week.

## Have your costs gone up?

If CPM rose while your click-through and conversion rates held, ROAS falls because each sale costs more to reach, not because your ads got worse.

- Look at CPM by week for the last two to three months. A steady rise means you are paying more for the same people.
- In India, competition for attention rises around Diwali and other big sale events, when many more advertisers bid for the same audiences. A drop in ROAS in those weeks may be the market, not your account.
- If you ran ads in the same season last year, compare against that rather than against a quiet month.

## Is your creative tired?

If frequency is climbing while click-through falls on your top-spending ads, creative fatigue is the likely cause.

- Sort ads by spend and check frequency and CTR over the last two to four weeks.
- Separate ads that worked and declined from ads that never worked. The first need a rest or a fresh version; the second should usually stop.
- Have new creative ready before the old wears out, especially going into a sale. See [creative fatigue](/features/creative-fatigue).

## Did something reset the learning phase?

Large or frequent edits can push ad sets back into the learning phase, where delivery is less stable and results often look worse.

- Look for ad sets marked Learning or Learning limited in Ads Manager.
- Ask what changed recently: a big budget jump, new targeting, new ads in many ad sets at once, or an ad set paused and turned back on.
- Prefer fewer, smaller changes. The [learning phase](/glossary#learning-phase) entry in our glossary explains why.

## Did budget drift to the wrong places?

Account ROAS can fall even when your best ads are fine, if spend has shifted toward weaker campaigns or ad sets.

- For each campaign, put its share of spend next to its ROAS for this period and the last. A weaker campaign taking a bigger share pulls the average down.
- Check whether your best ad sets are capped by their budget while weaker ones spend freely.
- If you use campaign-level budgets, Meta decides how to split spend across ad sets. Check where it went. See [budget reallocation](/features/budget-reallocation).

## Is one placement or audience dragging it down?

A single placement or audience can quietly take spend without returns, so compare them inside the same ad set.

- Use the placement breakdown within one ad set, not across campaigns, so the ad and audience are the same.
- Keep the breakdown effect in mind: Meta spends where the next result is cheapest, so a placement can look worse on average and still be worth keeping.
- Small retargeting audiences run out of fresh people quickly. If one is shrinking, frequency will rise there first. See [placements and audiences](/features/placements-and-audiences).

## Is the problem after the click?

If click-through is healthy but ROAS fell, look at your landing page, price, stock and checkout.

- Are best-selling products or popular sizes out of stock?
- Did a price change, a discount end or a shipping charge appear?
- Does the page load quickly on a mid-range phone on mobile data?
- Is cash on delivery or your usual payment method still offered at checkout, and are payments failing?

## Is demand just lower right now?

Sometimes nothing is broken and fewer people are buying this week.

- After a big sale, people who bought ahead may not buy again for a while.
- Check your organic and direct sales too. If they fell by a similar amount, the drop is demand, not ads. This is where [MER](/glossary#mer) helps.

## A quick order to work through

1. Tracking: do Meta's purchases match your store's orders?
2. Attribution: are both periods measured the same way, with enough days for conversions to arrive?
3. Costs: did CPM rise?
4. Creative: is frequency up and click-through down on your main ads?
5. Learning: did recent edits reset ad sets?
6. Budget: did spend shift to weaker campaigns or ad sets?
7. Placements and audiences: is one taking spend without returns?
8. After the click: page, price, stock, checkout.
9. Demand: did all sales fall, not just ad sales?

## How Kortex helps

Kortex runs checks like these on your [Meta Ads](/meta-ads) and [Google Ads](/google-ads) accounts every day, ranks what it finds by the money at risk, and proposes the exact fix with the numbers behind it. A person approves each change before Kortex makes it, and Kortex then checks whether it worked. It is free during early access.
`,
    faq: [
      {
        q: "Why did my Meta ROAS drop suddenly overnight?",
        a: "A sudden overnight drop is most often tracking, the delay before recent conversions are reported, or a change made the day before. Check those before changing anything else.",
      },
      {
        q: "Should I pause a campaign as soon as ROAS drops?",
        a: "Not straight away. Find the cause first. Pausing and restarting ad sets can send them back into the learning phase, and the cause may be tracking or the season rather than the campaign.",
      },
      {
        q: "How long should I wait before judging a change in Meta Ads?",
        a: "Give it at least several days, since conversions keep arriving after the click and edited ad sets may relearn. Kortex judges each change on its ROAS over the following one to two weeks.",
      },
      {
        q: "Does Diwali affect Meta ad costs in India?",
        a: "Often, yes. More advertisers compete for the same audiences around Diwali and big sale events, which tends to push CPM up and can lower ROAS even when your ads are unchanged.",
      },
    ],
    related: ["/features/creative-fatigue", "/features/budget-reallocation", "/glossary", "/meta-ads"],
  },
];
