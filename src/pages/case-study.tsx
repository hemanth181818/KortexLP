import { Body, Cards, Cta, Hero, ReadNext, Shell, answerClass, h2Class, paraClass } from "@/components/site/shell";
import { slugify } from "@/components/site/markup";
import { AssistantBars, EngineBars, KindBars, WeekChart } from "@/components/lp/case-study";
import { KREO, PERIOD, RESULTS, rupees, times } from "@/content/case-studies/kreo";
import { UPDATED, url, webPageLd, type Crumb, type PageHead } from "@/lib/seo";

/**
 * /case-studies and /case-studies/kreo. The numbers and their source are in content/case-studies/kreo.ts.
 */

const HOME: Crumb = { name: "Home", path: "/" };
const HUB: Crumb = { name: "Case studies", path: "/case-studies" };
const KREO_PATH = "/case-studies/kreo";

const HUB_META = {
  title: "Kortex Case Studies: AI Visibility Results",
  description:
    "Companies running Kortex, with numbers from their own Search Console and Google Analytics: visits from AI assistants, Google rankings, clicks and orders.",
};

const KREO_META = {
  title: "Kreo Case Study: 7x the Visits from AI Assistants",
  description:
    "Kreo runs Kortex in-house. August to October 2026 against 2025: visits from ChatGPT and other AI assistants up 7x, and orders from Google search up 2.2x.",
};


/* ---------- /case-studies ---------- */

export function CaseStudiesView() {
  return (
    <Shell path={HUB.path}>
      <Hero
        crumbs={[HOME, HUB]}
        eyebrow="Case studies"
        title="What Kortex found, company by company"
        lede="Each case study is a company running Kortex, with its numbers straight from its own Google Search Console and Google Analytics."
        action="audit"
      />
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-6 lg:py-24">
        <h2 className={h2Class}>Case studies</h2>
        <Cards
          className="mt-8"
          cards={[
            {
              title: "Kreo: 7 times the visits from AI assistants",
              body: "A gaming and creator gear company in India. Visits from ChatGPT and other assistants up from 959 to 7,047 in 13 weeks, and orders from Google search up 2.2 times.",
              href: KREO_PATH,
            },
          ]}
        />
      </div>
      <Cta action="audit" title="See where your company stands." />
    </Shell>
  );
}

export function caseStudiesHead(): PageHead {
  const head = { path: HUB.path, ...HUB_META, lastmod: UPDATED };
  return {
    ...head,
    crumbs: [HOME, HUB],
    jsonLd: [webPageLd(head, "CollectionPage", { hasPart: [{ "@id": `${url(KREO_PATH)}#article` }] })],
  };
}

/* ---------- /case-studies/kreo ---------- */

const R = RESULTS;
const fmt = (n: number) => n.toLocaleString("en-IN");

const STATS: Array<{ value: string; label: string }> = [
  { value: times(R.aiVisits.before, R.aiVisits.after), label: `visits from AI assistants: ${fmt(R.aiVisits.before)} to ${fmt(R.aiVisits.after)}` },
  { value: fmt(R.aiOrders.after), label: `orders from AI assistant visits, from ${R.aiOrders.before} a year before` },
  { value: times(R.searchOrders.before, R.searchOrders.after), label: `orders from Google search: ${fmt(R.searchOrders.before)} to ${fmt(R.searchOrders.after)}` },
  { value: `${R.position.after}`, label: `average position on Google, up from ${R.position.before}` },
];

const SECTIONS = ["Visits from AI assistants", "Google search", "Where Kortex fits", "Where AI still leaves Kreo out", "How we measured"];


export function KreoCaseStudyView() {
  const crumbs = [HOME, HUB, { name: "Kreo", path: KREO_PATH }];
  const [ai, search, fits, gap, measured] = SECTIONS;
  return (
    <Shell path={KREO_PATH}>
      <Hero
        crumbs={crumbs}
        eyebrow="Case study"
        title="How Kreo got 7 times the visits from AI assistants"
        lede={`Kreo sells ${KREO.sells}, and runs Kortex in-house. From ${PERIOD.label}, against ${PERIOD.compare}, visits from ChatGPT and other AI assistants went from ${fmt(R.aiVisits.before)} to ${fmt(R.aiVisits.after)}, and orders from Google search more than doubled.`}
        meta={<>From Kreo&rsquo;s own Google Search Console and Google Analytics, read 26 October 2026</>}
        action="audit"
      />

      <section aria-label="The numbers" className="mx-auto max-w-[1240px] px-5 pt-14 sm:px-6 lg:pt-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink-soft p-5 sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display block text-[clamp(2.2rem,4.4vw,3.4rem)] leading-none text-cream">{s.value}</span>
                <span className="mt-3 block text-pretty text-[13.5px] leading-snug text-cream/60">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[12.5px] text-cream/45">
          {PERIOD.label}, against {PERIOD.compare}.
        </p>
      </section>

      <Body toc={SECTIONS.map((s) => ({ id: slugify(s), label: s }))}>
        <div className="space-y-16">
          <section id={slugify(ai)}>
            <h2 className={h2Class}>{ai}</h2>
            <p className={answerClass}>
              {fmt(R.aiVisits.after)} visits in 13 weeks, up from {fmt(R.aiVisits.before)}, and {R.aiOrders.after} orders worth {rupees(R.aiRevenue.after)}, up from{" "}
              {R.aiOrders.before} orders worth {rupees(R.aiRevenue.before)}.
            </p>
            <p className={paraClass}>
              These are people who asked an AI assistant what to buy, saw Kreo in the answer and clicked through. A year ago that was under 120 a
              week. In the last week of October it was 862. Almost all of it comes from ChatGPT.
            </p>
            <WeekChart metric="ai" title="Visits from AI assistants, per week" className="mt-8" />
            <AssistantBars className="mt-4" />
          </section>

          <section id={slugify(search)}>
            <h2 className={h2Class}>{search}</h2>
            <p className={answerClass}>
              Kreo&rsquo;s average position on Google went from {R.position.before} to {R.position.after}, and orders from search went from {fmt(R.searchOrders.before)} to{" "}
              {fmt(R.searchOrders.after)}.
            </p>
            <p className={paraClass}>
              Revenue from Google search rose from {rupees(R.searchRevenue.before)} to {rupees(R.searchRevenue.after)} over the 13 weeks. Kreo shows up for fewer searches
              than a year ago, but far higher in the ones it does, so clicks rose by {Math.round((R.clicks.after / R.clicks.before - 1) * 100)}%. In the festive
              weeks of 1 to 25 October, clicks went from {fmt(R.octoberClicks.before)} to {fmt(R.octoberClicks.after)}.
            </p>
            <WeekChart metric="clicks" title="Clicks from Google search, per week" className="mt-8" />
          </section>

          <section id={slugify(fits)}>
            <h2 className={h2Class}>{fits}</h2>
            <p className={answerClass}>Kreo&rsquo;s team reads all of this in Kortex, and asks Kortex what to do next.</p>
            <p className={paraClass}>
              Kortex reads Kreo&rsquo;s Search Console and Google Analytics, asks ChatGPT, Gemini and Claude the questions Kreo&rsquo;s customers ask, and puts
              it on one page: which searches are slipping, which are close to page one, which AI assistants send visits, and which posts it
              wrote are working. Then it writes the next fix.
            </p>
          </section>

          <section id={slugify(gap)}>
            <h2 className={h2Class}>{gap}</h2>
            <p className={answerClass}>
              In Kreo&rsquo;s audit on 8 October, AI named Kreo in {KREO.named} of {KREO.answers} answers. That is the next growth.
            </p>
            <p className={paraClass}>
              Kreo is named for mechanical keyboards and little else. None of the 22 answers about what to use, or how to fix a problem, named it,
              and neither did the answers about headsets under ₹3,000 or microphones under ₹5,000, though Kreo sells both. Kortex has written the
              articles, the FAQ and the structured data for those questions.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4">
              <EngineBars />
              <KindBars />
            </div>
          </section>

          <section id={slugify(measured)}>
            <h2 className={h2Class}>{measured}</h2>
            <p className={answerClass}>Straight from Kreo&rsquo;s Google accounts, the same 13 weeks a year apart.</p>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[16px] leading-[1.7] text-cream/70 marker:text-acid-ink">
              <li className="pl-1">Weeks start on Monday: 27 July to 25 October 2026, against 28 July to 26 October 2025.</li>
              <li className="pl-1">Clicks and average position are from Google Search Console for kreo-tech.com.</li>
              <li className="pl-1">
                Visits from AI assistants are Google Analytics sessions that came from ChatGPT, Gemini, Claude, Perplexity, Copilot or Meta AI.
              </li>
              <li className="pl-1">Orders and revenue are Google Analytics purchases, for those visits and for the Organic Search channel.</li>
            </ul>
          </section>
        </div>
      </Body>
      <ReadNext
        cards={[
          { title: "AI visibility audit", body: "What the free audit checks, and what it writes for you.", href: "/ai-visibility" },
          { title: "Get recommended by ChatGPT", body: "What makes an AI answer name a company, and what to change.", href: "/blog/how-to-get-recommended-by-chatgpt" },
          { title: "What is llms.txt", body: "The file that tells AI what your site is about.", href: "/blog/what-is-llms-txt" },
          { title: "Pricing", body: "Start free. Growth checks your website every week.", href: "/pricing" },
        ]}
      />
      <Cta action="audit" title="See how often AI names you." />
    </Shell>
  );
}

export function kreoCaseStudyHead(): PageHead {
  const head = { path: KREO_PATH, ...KREO_META, lastmod: UPDATED };
  return {
    ...head,
    ogType: "article",
    crumbs: [HOME, HUB, { name: "Kreo", path: KREO_PATH }],
    jsonLd: [
      webPageLd(head, "WebPage", { mainEntity: { "@id": `${url(KREO_PATH)}#article` } }),
      {
        "@type": "Article",
        "@id": `${url(KREO_PATH)}#article`,
        headline: "How Kreo got 7 times the visits from AI assistants",
        description: KREO_META.description,
        datePublished: UPDATED,
        dateModified: UPDATED,
        inLanguage: "en",
        url: url(KREO_PATH),
        about: { "@type": "Organization", name: "Kreo", url: `https://${KREO.site}` },
        author: { "@id": "https://kortexagent.co/#org" },
        publisher: { "@id": "https://kortexagent.co/#org" },
      },
    ],
  };
}
