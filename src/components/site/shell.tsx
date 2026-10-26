import type { ReactNode } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { SignupProvider, useSignup } from "@/components/signup/signup-dialog";
import { EarlyAccess, SiteFooter, SiteHeader } from "@/components/lp/site-chrome";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Inline, slugify } from "@/components/site/markup";
import { PRERENDERED } from "@/lib/prerendered";
import type { Crumb } from "@/lib/seo";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * The frame of every content page: the home page's header, a sky band with the
 * breadcrumb, heading and one-sentence answer, the page body, its questions,
 * links onward, the home page's closing ask and footer.
 *
 * When the page arrived prerendered the heading does not fade in (as on the home
 * page's hero): the words are on screen from the first paint.
 */
const fade = PRERENDERED ? "" : "animate-fade-up";

export function Shell({ path, children }: { path: string; children: ReactNode }) {
  return (
    <SignupProvider>
      <div className="min-h-[100svh] overflow-x-clip bg-ink text-cream">
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-cream px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader current={path} />
        <main id="main">{children}</main>
        <SiteFooter />
      </div>
    </SignupProvider>
  );
}

export function Hero({
  crumbs,
  eyebrow,
  title,
  lede,
  meta,
  cta = true,
  action = "ads",
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lede: string;
  meta?: ReactNode;
  cta?: boolean;
  /** What the page asks for: the free audit, or early access to the ads agent. */
  action?: Action;
}) {
  const { open } = useSignup();
  return (
    <section className="sky relative overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-14 pt-28 sm:px-6 sm:pt-32 lg:pb-20 lg:pt-40">
        <Breadcrumbs crumbs={crumbs} />
        <div className={cn("mt-8 max-w-[52rem]", fade)}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display mt-4 text-balance text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.02] tracking-[-0.02em] text-cream">{title}</h1>
          <p className="mt-6 max-w-[44rem] text-pretty text-[18px] leading-relaxed text-cream/75 sm:text-[19px]">
            <Inline text={lede} />
          </p>
          {meta && <div className="mt-4 text-[13px] text-cream/55">{meta}</div>}
          {cta && action === "audit" && (
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <AuditLink />
              <span className="text-[13px] text-cream/55">Free, one per website. Ready in about four minutes.</span>
            </div>
          )}
          {cta && action === "ads" && (
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <InteractiveHoverButton type="button" onClick={() => open()} text="Get early access" className="h-11 text-[15px]" />
              <span className="text-[13px] text-cream/55">Free during early access. We open access by hand.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-cream/55">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-cream/80">
                  {c.name}
                </span>
              ) : (
                <>
                  <a href={c.path} className="transition-colors hover:text-cream">
                    {c.name}
                  </a>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Article column with an "On this page" list beside it on wide screens. */
export function Body({ toc, children }: { toc?: Array<{ id: string; label: string }>; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20 lg:py-24">
      <div className="min-w-0 max-w-[46rem]">{children}</div>
      {toc && toc.length > 1 && (
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="eyebrow">On this page</p>
            <ul className="mt-4 space-y-2.5 border-l border-cream/10">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-cream/60 transition-colors hover:border-acid-line hover:text-cream">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}

export const h2Class = "font-display text-balance text-[clamp(1.75rem,3.2vw,2.4rem)] leading-[1.08] tracking-[-0.01em] text-cream";
export const answerClass = "mt-4 text-pretty text-[18px] font-medium leading-relaxed text-cream";
export const paraClass = "mt-4 text-pretty text-[16px] leading-[1.75] text-cream/70";

/** Questions, as native disclosure widgets: every answer is in the HTML, and they work without script. */
export function FaqBand({ faqs, title = "Frequently asked questions", id = "faq" }: { faqs: Faq[]; title?: string; id?: string }) {
  if (!faqs.length) return null;
  return (
    <section id={id} className="pastel-band pastel-alt relative px-3 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 rounded-[28px] border border-white/60 bg-ink/95 p-6 shadow-[0_30px_80px_-40px_rgba(60,50,90,0.35)] sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:p-14">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.04] tracking-[-0.01em]">{title}</h2>
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}

export function FaqList({ faqs, openFirst = true }: { faqs: Faq[]; openFirst?: boolean }) {
  return (
    <ul className="divide-y divide-cream/10 border-y border-cream/10">
      {faqs.map((f, i) => (
        <li key={f.q}>
          <details className="group" open={openFirst && i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[16.5px] font-medium text-cream transition-colors hover:text-acid-ink [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">{f.q}</h3>
              <Plus className="size-4 shrink-0 text-cream/50 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="pb-5 pr-8 text-pretty text-[15px] leading-relaxed text-cream/65">
              <Inline text={f.a} />
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export type Card = { title: string; body: string; href: string };

export function Cards({ cards, className }: { cards: Card[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
      {cards.map((c) => {
        return (
          <li key={c.href}>
            <a
              href={c.href}
              className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 transition-colors hover:border-cream/25"
            >
              <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold tracking-[-0.01em] text-cream">
                {c.title}
                <ArrowUpRight
                  className="size-4 text-acid-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1.5 text-pretty text-[14px] leading-relaxed text-cream/60">{c.body}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Links onward, at the foot of a page. */
export function ReadNext({ cards }: { cards: Card[] }) {
  if (!cards.length) return null;
  return (
    <section aria-labelledby="read-next" className="mx-auto max-w-[1240px] px-5 pb-4 pt-16 sm:px-6 lg:pt-20">
      <h2 id="read-next" className={h2Class}>
        Read next
      </h2>
      <Cards cards={cards} className="mt-8 lg:grid-cols-4" />
    </section>
  );
}

export type Action = "audit" | "ads";

export const AUDIT_URL = "https://visibility.kortexagent.co";

/** The free audit, as the home page's lime pill, but a link: it opens the audit app. */
function AuditLink() {
  return (
    <a
      href={AUDIT_URL}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-acid px-6 text-[15px] font-semibold text-on-acid transition-colors hover:bg-[var(--hb-fill)] hover:text-[var(--hb-text)]"
    >
      Run the free audit <ArrowUpRight className="size-4" aria-hidden />
    </a>
  );
}

export function Cta({ title, action = "ads" }: { title?: string; action?: Action }) {
  if (action === "ads") return <EarlyAccess title={title} />;
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1240px] px-5 py-24 text-center sm:px-6 lg:py-32">
        <h2 className="font-display mx-auto max-w-[44rem] text-balance text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1] tracking-[-0.015em]">
          {title ?? "See whether AI recommends you."}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[16px] text-cream/65">
          20 questions your customers ask, put to ChatGPT, Gemini and Claude, plus Google, and four fixes written for you. Free, one per website.
        </p>
        <div className="mt-9 flex justify-center">
          <AuditLink />
        </div>
      </div>
    </section>
  );
}

export const sectionId = slugify;
