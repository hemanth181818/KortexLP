import type { ReactElement } from "react";
import { Body, Cards, Cta, FaqBand, FaqList, Hero, ReadNext, Shell, answerClass, h2Class, paraClass, type Card } from "@/components/site/shell";
import { Inline, parseMarkdown, slugify } from "@/components/site/markup";
import type { Block, ContentPage, Faq } from "@/content/types";
import { about, aiVisibility, compareHub, featuresHub, googleAds, metaAds, pricing, security } from "@/content/pages/product";
import { adCreation, approvals, budgetReallocation, creativeFatigue, placementsAudiences } from "@/content/pages/features";
import { madgicx, revealbot, smartly, vsMediaBuyer } from "@/content/pages/compare";
import { GLOSSARY_FAQ, GLOSSARY_META, TERMS } from "@/content/pages/glossary";
import { POSTS, type Post } from "@/content/blog/posts";
import homeFaq from "@/content/faq.json";
import { APP, APP_REF, OG_IMAGE, UPDATED, faqLd, plain, url, webPageLd, type Crumb, type PageHead } from "@/lib/seo";

/**
 * Every page except the home page: path to head and element. main.tsx renders
 * the one for the current path; scripts/prerender.mjs renders each into its own
 * HTML file, taking the head from window.__KORTEX_PAGE__.
 */

const HOME: Crumb = { name: "Home", path: "/" };

const CONTENT: ContentPage[] = [
  aiVisibility,
  metaAds,
  googleAds,
  featuresHub,
  budgetReallocation,
  creativeFatigue,
  placementsAudiences,
  approvals,
  adCreation,
  pricing,
  security,
  about,
  compareHub,
  madgicx,
  revealbot,
  smartly,
  vsMediaBuyer,
];

const FAQ_META = {
  path: "/faq",
  title: "Kortex FAQ: AI Visibility Audit, Pricing and Ads Agent",
  description:
    "Answers about Kortex: the free AI visibility audit, the agent and Growth plan, the ads agent for Meta and Google Ads, approvals, security and the free tools.",
};

const BLOG_META = {
  path: "/blog",
  title: "Kortex Blog: AI Visibility, SEO and Ads Guides",
  description:
    "Practical guides from Kortex: how to get recommended by ChatGPT and Google's AI, what llms.txt is, and why Meta and Google Ads ROAS changes and what to fix.",
};

/** Titles and one-liners for "Read next" cards. */
function cardFor(path: string): Card {
  const page = CONTENT.find((p) => p.path === path);
  if (page) return { title: page.crumb, body: page.description, href: path };
  const post = POSTS.find((p) => `/blog/${p.slug}` === path);
  if (post) return { title: post.title, body: post.description, href: path };
  if (path === "/glossary") return { title: "Ads glossary", body: "ROAS, MER, CPA, frequency, the learning phase and more, in plain words.", href: path };
  if (path === "/faq") return { title: "FAQ", body: "Every question about Kortex, in one place.", href: path };
  if (path === "/blog") return { title: "Blog", body: "Guides to AI visibility, SEO and ad ROAS.", href: path };
  throw new Error(`No card for ${path}`);
}

function crumbsFor(page: { crumb: string; path: string; parent?: Crumb }): Crumb[] {
  return [HOME, ...(page.parent ? [page.parent] : []), { name: page.crumb, path: page.path }];
}

/* ---------- Generic content page ---------- */

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string")
    return (
      <p className={paraClass}>
        <Inline text={block} />
      </p>
    );
  if ("list" in block) {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag className={`mt-4 space-y-2.5 pl-5 text-[16px] leading-[1.7] text-cream/70 marker:text-acid-ink ${block.ordered ? "list-decimal" : "list-disc"}`}>
        {block.list.map((item) => (
          <li key={item} className="pl-1">
            <Inline text={item} />
          </li>
        ))}
      </Tag>
    );
  }
  if ("table" in block) {
    const t = block.table;
    return (
      <figure className="mt-6">
        {/* Phones: one card per row, every column labelled. */}
        <dl className="divide-y divide-cream/10 overflow-hidden rounded-2xl border border-cream/10 sm:hidden">
          {t.rows.map((r) => (
            <div key={r[0]} className="bg-ink-soft/60 px-4 py-3.5">
              <dt className="text-[14px] font-semibold text-cream">{r[0]}</dt>
              {r.slice(1).map((c, i) => (
                <dd key={i} className="mt-1.5 text-[14.5px] leading-relaxed text-cream/70">
                  {t.head.length > 2 && <span className="font-medium text-cream/85">{t.head[i + 1]}: </span>}
                  <Inline text={c} />
                </dd>
              ))}
            </div>
          ))}
        </dl>
        <div className="hidden overflow-x-auto rounded-2xl border border-cream/10 sm:block">
          <table className="w-full border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="bg-ink-soft">
                {t.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-semibold text-cream">
                    {h || <span className="sr-only">Item</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r) => (
                <tr key={r[0]} className="border-t border-cream/10 align-top">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-medium text-cream/85">
                        {c}
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-cream/70">
                        <Inline text={c} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-3 text-[12.5px] text-cream/50">{t.caption}</figcaption>
      </figure>
    );
  }
  return <Cards cards={block.cards} className="mt-6" />;
}

function ContentView({ page }: { page: ContentPage }) {
  const toc = page.sections.map((s) => ({ id: slugify(s.q), label: s.q }));
  return (
    <Shell path={page.path}>
      <Hero
        crumbs={crumbsFor(page)}
        eyebrow={page.eyebrow}
        title={page.h1}
        lede={page.lede}
        meta={page.lastChecked ? <>Last checked {page.lastChecked}</> : undefined}
        action={page.action}
      />
      <Body toc={toc}>
        <div className="space-y-16">
          {page.sections.map((s) => (
            <section key={s.q} id={slugify(s.q)}>
              <h2 className={h2Class}>{s.q}</h2>
              <p className={answerClass}>
                <Inline text={s.a} />
              </p>
              {s.body?.map((b, i) => <BlockView key={i} block={b} />)}
            </section>
          ))}
        </div>
      </Body>
      <FaqBand faqs={page.faq} />
      <ReadNext cards={(page.related ?? []).map(cardFor)} />
      <Cta title={page.ctaTitle} action={page.action} />
    </Shell>
  );
}

function contentHead(page: ContentPage): PageHead {
  const head = { path: page.path, title: page.title, description: page.description, lastmod: UPDATED };
  const extra = page.aboutApp ? { about: APP_REF, mainEntity: APP_REF } : {};
  return {
    ...head,
    crumbs: crumbsFor(page),
    jsonLd: [
      webPageLd(head, page.pageType ?? "WebPage", { ...extra, ...(page.lastChecked ? { lastReviewed: UPDATED } : {}) }),
      ...(page.aboutApp ? [APP] : []),
      ...(page.faq.length ? [faqLd(page.path, page.faq)] : []),
    ],
  };
}

/* ---------- /faq: every question, grouped ---------- */

function faqGroups(): Array<{ title: string; faqs: Faq[] }> {
  const groups = [{ title: "Kortex", faqs: homeFaq as Faq[] }];
  for (const p of CONTENT) if (p.faqGroup && p.faq.length) groups.push({ title: p.faqGroup, faqs: p.faq });
  groups.push({ title: "Ad terms", faqs: GLOSSARY_FAQ });
  for (const post of POSTS) groups.push({ title: post.title, faqs: post.faq });
  return groups;
}

function FaqView() {
  const groups = faqGroups();
  const crumbs = [HOME, { name: "FAQ", path: FAQ_META.path }];
  return (
    <Shell path={FAQ_META.path}>
      <Hero
        crumbs={crumbs}
        eyebrow="FAQ"
        title="Questions about Kortex"
        lede="Kortex is an AI ad agent for Meta Ads and Google Ads that checks your accounts every day and proposes fixes a person approves; these are the questions people ask about it, grouped by topic."
      />
      <Body toc={groups.map((g) => ({ id: slugify(g.title), label: g.title }))}>
        <div className="space-y-14">
          {groups.map((g) => (
            <section key={g.title} id={slugify(g.title)}>
              <h2 className={h2Class}>{g.title}</h2>
              <div className="mt-6">
                <FaqList faqs={g.faqs} openFirst={false} />
              </div>
            </section>
          ))}
        </div>
      </Body>
      <ReadNext cards={["/meta-ads", "/security", "/pricing", "/glossary"].map(cardFor)} />
      <Cta />
    </Shell>
  );
}

function faqHead(): PageHead {
  const all = faqGroups().flatMap((g) => g.faqs);
  const seen = new Set<string>();
  const unique = all.filter((f) => !seen.has(f.q) && seen.add(f.q));
  const head = { ...FAQ_META, lastmod: UPDATED };
  return {
    ...head,
    crumbs: [HOME, { name: "FAQ", path: FAQ_META.path }],
    jsonLd: [webPageLd(head, "WebPage", { about: APP_REF }), faqLd(FAQ_META.path, unique)],
  };
}

/* ---------- /glossary ---------- */

function GlossaryView() {
  const crumbs = [HOME, { name: "Glossary", path: GLOSSARY_META.path }];
  return (
    <Shell path={GLOSSARY_META.path}>
      <Hero crumbs={crumbs} eyebrow="Glossary" title={GLOSSARY_META.h1} lede={GLOSSARY_META.lede} cta={false} />
      <Body toc={TERMS.map((t) => ({ id: t.id, label: t.term }))}>
        <nav aria-label="Terms" className="mb-12">
          <ul className="flex flex-wrap gap-2">
            {TERMS.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="inline-flex rounded-full border border-cream/15 px-3 py-1.5 text-[13.5px] font-medium text-cream/75 transition-colors hover:border-cream/35 hover:text-cream">
                  {t.term}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <dl className="space-y-12">
          {TERMS.map((t) => (
            <div key={t.id} id={t.id} className="scroll-mt-28">
              <dt>
                <h2 className={h2Class}>
                  {t.term}
                  {t.alt && <span className="ml-3 align-middle font-sans text-[15px] font-medium tracking-normal text-cream/50">{t.alt}</span>}
                </h2>
              </dt>
              <dd>
                <p className={answerClass}>{t.definition}</p>
                <p className={paraClass}>
                  <Inline text={t.more} />
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </Body>
      <FaqBand faqs={GLOSSARY_FAQ} />
      <ReadNext cards={["/blog/why-meta-roas-dropped", "/features/creative-fatigue", "/features/placements-and-audiences", "/meta-ads"].map(cardFor)} />
      <Cta />
    </Shell>
  );
}

function glossaryHead(): PageHead {
  const head = { path: GLOSSARY_META.path, title: GLOSSARY_META.title, description: GLOSSARY_META.description, lastmod: UPDATED };
  const setId = `${url(GLOSSARY_META.path)}#terms`;
  return {
    ...head,
    crumbs: [HOME, { name: "Glossary", path: GLOSSARY_META.path }],
    jsonLd: [
      webPageLd(head, "WebPage", { mainEntity: { "@id": setId } }),
      {
        "@type": "DefinedTermSet",
        "@id": setId,
        name: "Kortex ads glossary",
        description: GLOSSARY_META.lede,
        url: url(GLOSSARY_META.path),
        inLanguage: "en",
        hasDefinedTerm: TERMS.map((t) => ({
          "@type": "DefinedTerm",
          "@id": `${url(GLOSSARY_META.path)}#${t.id}`,
          name: t.term,
          ...(t.alt ? { alternateName: t.alt } : {}),
          description: `${t.definition} ${plain(t.more)}`,
          url: `${url(GLOSSARY_META.path)}#${t.id}`,
          inDefinedTermSet: { "@id": setId },
        })),
      },
      faqLd(GLOSSARY_META.path, GLOSSARY_FAQ),
    ],
  };
}

/* ---------- /blog and posts ---------- */

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function BlogIndexView() {
  const crumbs = [HOME, { name: "Blog", path: BLOG_META.path }];
  return (
    <Shell path={BLOG_META.path}>
      <Hero
        crumbs={crumbs}
        eyebrow="Blog"
        title="The Kortex blog"
        lede="The Kortex blog publishes practical guides for marketers and founders: how to get named by ChatGPT, Claude and Google's AI, what to put on your site, and why Meta and Google Ads ROAS moves and what to fix first."
        cta={false}
      />
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-6 lg:py-24">
        <h2 className={h2Class}>Latest posts</h2>
        {POSTS.length === 0 ? (
          <p className={paraClass}>No posts yet. The first guides are on their way.</p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {POSTS.map((p) => (
              <li key={p.slug}>
                <a href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-ink-soft/70 p-6 transition-colors hover:border-cream/25">
                  <time dateTime={p.date} className="text-[13px] text-cream/50">
                    {formatDate(p.date)}
                  </time>
                  <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.02em] text-cream group-hover:text-acid-ink">{p.title}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-cream/60">{p.description}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Cta />
    </Shell>
  );
}

function blogIndexHead(): PageHead {
  const head = { ...BLOG_META, lastmod: POSTS[0]?.updated ?? POSTS[0]?.date ?? UPDATED };
  return {
    ...head,
    crumbs: [HOME, { name: "Blog", path: BLOG_META.path }],
    jsonLd: [
      webPageLd(head, "CollectionPage", { mainEntity: { "@id": `${url(BLOG_META.path)}#blog` } }),
      {
        "@type": "Blog",
        "@id": `${url(BLOG_META.path)}#blog`,
        name: "The Kortex blog",
        url: url(BLOG_META.path),
        publisher: { "@id": "https://kortexagent.co/#org" },
        blogPost: POSTS.map((p) => ({ "@id": `${url(`/blog/${p.slug}`)}#article` })),
      },
    ],
  };
}

function PostView({ post }: { post: Post }) {
  const path = `/blog/${post.slug}`;
  const blocks = parseMarkdown(post.body);
  const crumbs = [HOME, { name: "Blog", path: "/blog" }, { name: post.title, path }];
  return (
    <Shell path={path}>
      <Hero
        crumbs={crumbs}
        eyebrow="Blog"
        title={post.title}
        lede={post.lede}
        meta={
          <>
            By Kortex · <time dateTime={post.date}>{formatDate(post.date)}</time>
          </>
        }
        cta={false}
      />
      <Body toc={blocks.filter((b) => b.kind === "h2").map((b) => ({ id: (b as { id: string }).id, label: (b as { text: string }).text }))}>
        <article>
          {blocks.map((b, i) => {
            if (b.kind === "h2")
              return (
                <h2 key={i} id={b.id} className={`${h2Class} scroll-mt-28 ${i === 0 ? "" : "mt-14"}`}>
                  {b.text}
                </h2>
              );
            if (b.kind === "h3")
              return (
                <h3 key={i} id={b.id} className="mt-8 scroll-mt-28 text-[20px] font-semibold tracking-[-0.01em] text-cream">
                  {b.text}
                </h3>
              );
            if (b.kind === "p") {
              const first = blocks[i - 1]?.kind === "h2";
              return (
                <p key={i} className={first ? answerClass : paraClass}>
                  <Inline text={b.text} />
                </p>
              );
            }
            if (b.kind === "code")
              return (
                <pre key={i} className="mt-5 overflow-x-auto rounded-xl border border-cream/10 bg-cream/[0.04] p-4 font-mono text-[13px] leading-[1.65] text-cream/80">
                  <code>{b.text}</code>
                </pre>
              );
            const Tag = b.kind;
            return (
              <Tag key={i} className={`mt-4 space-y-2.5 pl-5 text-[16px] leading-[1.7] text-cream/70 marker:text-acid-ink ${Tag === "ol" ? "list-decimal" : "list-disc"}`}>
                {b.items.map((item) => (
                  <li key={item} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </Tag>
            );
          })}
        </article>
      </Body>
      <FaqBand faqs={post.faq} />
      <ReadNext cards={(post.related ?? []).map(cardFor)} />
      <Cta action={post.action} />
    </Shell>
  );
}

function postHead(post: Post): PageHead {
  const path = `/blog/${post.slug}`;
  const head = { path, title: post.metaTitle, description: post.description, lastmod: post.updated ?? post.date };
  return {
    ...head,
    ogType: "article",
    crumbs: [HOME, { name: "Blog", path: "/blog" }, { name: post.title, path }],
    jsonLd: [
      webPageLd(head, "WebPage", { mainEntity: { "@id": `${url(path)}#article` } }),
      {
        "@type": "BlogPosting",
        "@id": `${url(path)}#article`,
        headline: post.title,
        description: post.description,
        abstract: post.lede,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "en",
        image: OG_IMAGE,
        url: url(path),
        mainEntityOfPage: { "@id": `${url(path)}#webpage` },
        author: { "@id": "https://kortexagent.co/#org" },
        publisher: { "@id": "https://kortexagent.co/#org" },
        isPartOf: { "@id": `${url("/blog")}#blog` },
      },
      faqLd(path, post.faq),
    ],
  };
}

/* ---------- Not found (dev and any host without 404.html) ---------- */

function NotFoundView({ path }: { path: string }) {
  return (
    <Shell path={path}>
      <Hero
        crumbs={[HOME, { name: "Not found", path }]}
        eyebrow="404"
        title="That page isn't here."
        lede="The link may be old or mistyped. Kortex shows whether ChatGPT, Gemini, Claude and Google recommend you, and fixes it; the [home page](/) explains how."
        cta={false}
      />
      <Cta />
    </Shell>
  );
}

/* ---------- The table ---------- */

type Route = { head: () => PageHead; element: () => ReactElement };

const ROUTES: Record<string, Route> = {
  ...Object.fromEntries(CONTENT.map((p) => [p.path, { head: () => contentHead(p), element: () => <ContentView page={p} /> }])),
  "/faq": { head: faqHead, element: () => <FaqView /> },
  "/glossary": { head: glossaryHead, element: () => <GlossaryView /> },
  "/blog": { head: blogIndexHead, element: () => <BlogIndexView /> },
  ...Object.fromEntries(POSTS.map((p) => [`/blog/${p.slug}`, { head: () => postHead(p), element: () => <PostView post={p} /> }])),
};

export const ROUTE_PATHS = Object.keys(ROUTES);

export function resolveRoute(path: string): { head: PageHead; element: ReactElement } {
  const route = ROUTES[path];
  if (route) return { head: route.head(), element: route.element() };
  return {
    head: {
      path,
      title: "Page not found · Kortex",
      description: "That page isn't here.",
      crumbs: [HOME, { name: "Not found", path }],
      jsonLd: [],
      lastmod: UPDATED,
      noindex: true,
    },
    element: <NotFoundView path={path} />,
  };
}
