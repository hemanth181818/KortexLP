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
};

export const POSTS: Post[] = [
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
