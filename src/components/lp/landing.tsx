import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import { AnswersBoard } from "@/components/lp/answers-board";
import { LogoMark } from "@/components/lp/logo-mark";
import { SiteFooter, SiteHeader } from "@/components/lp/site-chrome";
import { cn } from "@/lib/utils";
import { PRERENDERED } from "@/lib/prerendered";
import faq from "@/content/faq.json";

/**
 * kortexagent.co, visibility first (Hemanth, 2026-10-21: "turn the main landing page to visibility
 * focused for now"). One job: get a cold visitor to run the free SEO and AI visibility audit on
 * visibility.kortexagent.co. The hero shows one customer question and which AI answers leave them
 * out; then what the audit shows, what the agent does after it, how it works, the other free tools,
 * the objections, the ask again. One call to action on the page: the audit.
 *
 * Every claim is what Kortex Visibility does today (checked 2026-10-21): 20 questions put to
 * ChatGPT, Claude and other AI assistants, Google's page one and AI Overview for searches, site checks, four
 * written fixes (an article, an FAQ, llms.txt, structured data), about four minutes, one free audit
 * per website; then Ask Kortex with 50 free credits. Names and numbers in the examples are made up.
 * Copy rule: "you", "your website", "company", never "brand" or "buyers".
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const AUDIT = "https://visibility.kortexagent.co";

export default function Landing() {
  return (
    <div className="min-h-[100svh] overflow-x-clip bg-ink text-cream">
      <SiteHeader home />
      <Hero />
      <WhatItShows />
      <TheAgent />
      <How />
      <FreeTools />
      <Faq />
      <FinalAsk />
      <SiteFooter home />
    </div>
  );
}

/** The website box: what they type opens the audit on visibility.kortexagent.co, already filled in. */
function WebsiteBox({ id }: { id: string }) {
  const [site, setSite] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const s = site.trim().slice(0, 200);
    window.location.assign(`${AUDIT}/${s ? `?site=${encodeURIComponent(s)}` : ""}`);
  };
  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-[34rem] items-center gap-1.5 rounded-full border border-cream/15 bg-ink-soft/90 p-1.5 transition-colors focus-within:border-acid/60"
    >
      <label htmlFor={id} className="sr-only">
        Your website
      </label>
      <input
        id={id}
        value={site}
        onChange={(e) => setSite(e.target.value)}
        inputMode="url"
        autoComplete="url"
        placeholder="Your website"
        maxLength={200}
        className="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-cream outline-none placeholder:text-cream/35 focus-visible:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-acid px-5 text-[15px] font-semibold text-on-acid transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Get my free audit <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="sky relative overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:pb-28 lg:pt-44">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <motion.p
            initial={PRERENDERED ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium text-cream/75"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-acid" />
            </span>
            <span>Free Audit Then an Agent that Fixes it</span>
          </motion.p>
          <motion.h1
            initial={PRERENDERED ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="font-display mt-7 text-balance text-[clamp(3rem,7.4vw,6.2rem)] leading-[0.98] tracking-[-0.02em] text-cream"
          >
            Does AI <span className="italic">recommend</span> you?
          </motion.h1>
          <motion.p
            initial={PRERENDERED ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mt-6 max-w-[40rem] text-pretty text-[17px] leading-relaxed text-cream/65 sm:text-[18px]"
          >
            Kortex asks ChatGPT, Claude and Google the questions your customers ask, shows who they name instead of you, and writes the
            fixes. Then its agent helps you get named.
          </motion.p>
          <motion.div initial={PRERENDERED ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="mt-9 w-full">
            <WebsiteBox id="site-hero" />
            <p className="mt-3 text-[13px] text-cream/50">Free, one audit per website. About four minutes. No card.</p>
          </motion.div>
        </div>

        <motion.div initial={PRERENDERED ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }} className="relative mx-auto mt-16 max-w-[860px] lg:mt-20">
          <AnswersBoard className="relative shadow-[0_40px_120px_-50px_rgb(0_0_0/0.55)]" />
          <p className="mt-4 text-center text-[12px] text-cream/40">An example question. Names and numbers are made up.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- What the audit shows ---------- */

const SHOWS: Array<{ title: string; body: string }> = [
  {
    title: "Where AI names you",
    body: "20 questions your customers ask, put to ChatGPT, Claude and other AI assistants. How often each one names you, and where you rank when it does.",
  },
  {
    title: "Who it names instead",
    body: "Everyone named in those answers, ranked, so you can see which companies the engines reach for when they leave you out.",
  },
  {
    title: "The pages AI trusts",
    body: "The sites the answers cite most, and Google's page one and AI Overview for your searches: where to get mentioned next.",
  },
  {
    title: "Your fixes, written",
    body: "An article that answers the question you miss most, an FAQ, an llms.txt and structured data for your site, plus a check of the site itself.",
  },
];

function WhatItShows() {
  return (
    <section id="audit">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:py-28">
        <p className="eyebrow">The free audit</p>
        <h2 className="font-display mt-4 max-w-[46rem] text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
          See what AI says about you, and what to change.
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
          {SHOWS.map((s) => (
            <li key={s.title} className="bg-ink-soft p-6 sm:p-8">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-cream">{s.title}</h3>
              <p className="mt-2 max-w-[30rem] text-pretty text-[15px] leading-relaxed text-cream/60">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Then the agent ---------- */

const DOES: Array<{ title: string; body: string }> = [
  { title: "Answers about your report", body: "Ask what it means and what to fix first. Two questions are free on the report itself." },
  { title: "Checks again, live", body: "Asks ChatGPT, Claude and other AI assistants a new question, or reads Google's page one, while you watch." },
  { title: "Writes what gets you named", body: "Blog posts that answer what your customers ask, and the Medium, LinkedIn and Reddit posts to go with them." },
  { title: "Watches every week", body: "Asks the engines again each Monday and emails you what changed." },
  { title: "Works in your own AI tool", body: "Connect Claude, ChatGPT or Cursor and they can read your report and apply the fixes in your site's code." },
  { title: "Remembers your business", body: "What you sell, who you compete with and how you talk, kept across chats so you never repeat it." },
];

function TheAgent() {
  return (
    <section id="agent" className="pastel-band pastel-three relative px-3 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px] rounded-[28px] border border-white/60 bg-ink/95 p-6 shadow-[0_30px_80px_-40px_rgba(60,50,90,0.35)] sm:p-10 lg:p-14">
        <p className="eyebrow">Then an agent that fixes it</p>
        <h2 className="font-display mt-4 max-w-[46rem] text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
          Ask Kortex, and it does the work.
        </h2>
        <p className="mt-5 max-w-[36rem] text-pretty text-[16px] leading-relaxed text-cream/65">
          After your audit, chat with Kortex. Every account starts with 50 free credits.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {DOES.map((d) => (
            <li key={d.title} className="bg-ink-soft p-6">
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-cream">{d.title}</h3>
              <p className="mt-2 text-pretty text-[14px] leading-relaxed text-cream/60">{d.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

const STEPS = [
  { title: "Enter your website", body: "And your work email. We send a six-digit code to confirm it is you." },
  { title: "Kortex runs the audit", body: "About four minutes: the AI engines, Google and your site. You can leave, we email you the link." },
  { title: "Read your report", body: "Where you are named, who is named instead, the pages to get onto, and your fixes, written." },
  { title: "Ask Kortex to fix it", body: "Sign in with Google for 50 free credits and keep going in the chat." },
];

function How() {
  return (
    <section id="how">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:py-28">
        <p className="eyebrow">How it works</p>
        <h2 className="font-display mt-4 max-w-[44rem] text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
          Your website in. Your report in four minutes.
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-ink-soft p-6">
              <span className="text-[13px] font-medium text-acid-ink">Step {i + 1}</span>
              <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-cream">{s.title}</h3>
              <p className="mt-2 text-pretty text-[14px] leading-relaxed text-cream/60">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- The other free tools ---------- */

const TOOLS: Array<{ name: string; href: string; title: string; body: string; cta: string; art: ReactNode }> = [
  {
    name: "Compete",
    href: "https://compete.kortexagent.co",
    title: "See the ads your competitors keep running",
    body: "Every ad four of your competitors run on Facebook and Instagram, which ones they keep, and five new ads made for you.",
    cta: "Get my free report",
    art: <ToolBars rows={[["Kept 30+ days", 62], ["Video", 45], ["Creator", 28], ["Catalogue", 54]]} />,
  },
  {
    name: "Creators",
    href: "https://creators.kortexagent.co",
    title: "Find Instagram creators who fit what you sell",
    body: "Describe who you want in plain words and get creators whose own posts fit you, with their views and audience.",
    cta: "Find my creators",
    art: <ToolBars rows={[["Median views", 66], ["Hook rate", 41], ["Women 18 to 24", 52], ["Fits you", 80]]} />,
  },
];

function FreeTools() {
  return (
    <section id="free">
      <div className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-6 lg:pb-28">
        <p className="eyebrow">Also free</p>
        <h2 className="font-display mt-4 max-w-[44rem] text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
          Two more Kortex tools, open to everyone.
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.name}>
              <a
                href={t.href}
                className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 transition-colors hover:border-cream/25 sm:p-6"
              >
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-cream">
                  <LogoMark className="size-[20px]" />
                  Kortex <span className="bracket-tag font-medium text-cream/70">{t.name}</span>
                </span>
                <div className="mt-5 min-h-[5.5rem]" aria-hidden="true">
                  {t.art}
                </div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-cream">{t.title}</h3>
                <p className="mt-1.5 flex-1 text-pretty text-[14px] leading-relaxed text-cream/60">{t.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-acid-ink">
                  {t.cta} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ToolBars({ rows }: { rows: Array<[string, number]> }) {
  return (
    <ul className="space-y-2">
      {rows.map(([k, v], i) => (
        <li key={k} className="flex items-center gap-3 text-[12px]">
          <span className="w-24 shrink-0 truncate text-cream/55">{k}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/[0.07]">
            <span className={cn("block h-full rounded-full", i === 0 ? "bg-acid" : "bg-cream/40")} style={{ width: `${v}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- FAQ: the real objections ---------- */

// Also read by scripts/prerender.mjs, which writes the same questions into the FAQPage structured data.
const FAQ: Array<{ q: string; a: string }> = faq;

function Faq() {
  const [openIdx, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="pastel-band pastel-alt relative px-3 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 rounded-[28px] border border-white/60 bg-ink/95 p-6 shadow-[0_30px_80px_-40px_rgba(60,50,90,0.35)] sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:p-14">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">Before you run your audit</h2>
        </div>
        <ul className="divide-y divide-cream/10 border-y border-cream/10">
          {FAQ.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16.5px] font-medium text-cream transition-colors hover:text-acid-ink"
                >
                  {f.q}
                  {isOpen ? <Minus className="size-4 shrink-0 text-cream/50" /> : <Plus className="size-4 shrink-0 text-cream/50" />}
                </button>
                <div id={`faq-${i}`} hidden={!isOpen} className="pb-5 pr-8 text-pretty text-[15px] leading-relaxed text-cream/65">
                  {f.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- The ask, again ---------- */

function FinalAsk() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1240px] px-5 py-24 text-center sm:px-6 lg:py-32">
        <h2 className="font-display mx-auto max-w-[44rem] text-balance text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1] tracking-[-0.015em]">
          Find out what AI tells your customers.
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[16px] text-cream/65">Free, about four minutes, and the fixes are written for you.</p>
        <div className="mt-9">
          <WebsiteBox id="site-final" />
        </div>
      </div>
    </section>
  );
}

