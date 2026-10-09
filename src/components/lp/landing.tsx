import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { ChecksBoard } from "@/components/lp/checks-board";
import { PlatformLogo, PLATFORM_NAME, type PlatformId } from "@/components/lp/platform-logos";
import { LogoMark } from "@/components/lp/logo-mark";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useSignup } from "@/components/signup/signup-dialog";
import { CONTACT_EMAIL, PRIVACY_URL, TERMS_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * kortexagent.co, on the same system as the Kortex lead-magnet sites
 * (visibility.kortexagent.co): light first, a sky hero with a glass pill and a
 * serif headline, pastel bands behind How it works and the FAQ only, the real
 * objections, an ink footer.
 *
 * One job: get an advertiser onto the early-access list. AIDA for cold
 * visitors: the hero shows a morning's checks waiting for approval; then how a
 * change is made and bounded; what Kortex checks each day; how it works; the
 * free tools to try today; the objections; the ask again.
 *
 * Every claim is what the product does today (checked against Kortex Pilot,
 * 2026-10-09; the platform list is Hemanth's call): Meta and Google Ads live,
 * Shopify, TikTok and ChatGPT ads shown as coming soon,
 * every change approved by a person, daily checks, no pricing yet, and no
 * customer results to quote, so there are none on the page. Names and numbers
 * in the examples are made up and say so.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Landing() {
  const { open } = useSignup();
  return (
    <div className="min-h-[100svh] overflow-x-clip bg-ink text-cream">
      <Header />
      <Hero />
      <Approval />
      <DailyChecks />
      <How />
      <FreeTools />
      <Faq />
      <FinalAsk />
      <Footer onSignup={() => open()} />
    </div>
  );
}

/* ---------- Header: the mark and the theme switch ---------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled ? "glass-bar" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-6">
        <a href="#top" aria-label="Kortex, back to top" className="py-2">
          <Wordmark />
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */

const LIVE: PlatformId[] = ["meta", "googleads"];
const SOON: PlatformId[] = ["shopify", "tiktok", "chatgpt"];

function Hero() {
  return (
    <section id="top" className="sky relative overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:pb-28 lg:pt-44">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium text-cream/75"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-acid" />
            </span>
            <span>
              AI Agent For High Frequency ROAS Optimization
            </span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="font-display mt-7 text-balance text-[clamp(3rem,7.4vw,6.2rem)] leading-[0.98] tracking-[-0.02em] text-cream"
          >
            Your ad account, <span className="italic">optimized</span> for ROAS every day.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mt-6 max-w-[38rem] text-pretty text-[17px] leading-relaxed text-cream/65 sm:text-[18px]"
          >
            Kortex reads your Meta and Google ads, finds where ROAS is leaking and proposes the exact fix. You approve it, Kortex makes the change, then
            checks whether it worked.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="mt-9 w-full">
            <EmailBox id="email-hero" />
            <p className="mt-3 text-[13px] text-cream/50">We open access by hand and email you when it is your turn.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            <Rail label="Works on" items={LIVE} />
            <Rail label="Coming soon" items={SOON} soon />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }} className="relative mx-auto mt-16 max-w-[1000px] lg:mt-20">
          <ChecksBoard className="relative shadow-[0_40px_120px_-50px_rgb(0_0_0/0.55)]" />
          <p className="mt-4 text-center text-[12px] text-cream/40">An example morning. Names and numbers are made up.</p>
        </motion.div>
      </div>
    </section>
  );
}

/** A labelled row of platform marks: where Kortex works today, or is coming next. */
function Rail({ label, items, soon = false }: { label: string; items: PlatformId[]; soon?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5", soon ? "text-cream/40" : "text-cream/60")}>
      <span className={cn("text-[12.5px]", soon ? "rounded-full border border-cream/15 px-2 py-0.5 text-cream/45" : "text-cream/40")}>{label}</span>
      {items.map((p) => (
        <span key={p} className="flex items-center gap-2 text-[14px] font-medium">
          <PlatformLogo platform={p} className="size-[18px]" />
          {PLATFORM_NAME[p]}
        </span>
      ))}
    </div>
  );
}

/** The email box: what they type goes straight into the sign-up form. */
function EmailBox({ id }: { id: string }) {
  const { open } = useSignup();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    open(email);
  };
  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-[34rem] items-center gap-1.5 rounded-full border border-cream/15 bg-ink-soft/90 p-1.5 transition-colors focus-within:border-acid/60"
    >
      <label htmlFor={id} className="sr-only">
        Work email
      </label>
      <input
        id={id}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@company.com"
        maxLength={254}
        className="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-cream outline-none placeholder:text-cream/35 focus-visible:outline-none"
      />
      <InteractiveHoverButton type="submit" text="Get early access" className="h-11 shrink-0 text-[15px]" />
    </form>
  );
}

/* ---------- How a change is made ---------- */

function Approval() {
  return (
    <section id="approval">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow">Nothing changes without you</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
            You approve every change. Kortex shows its working first.
          </h2>
          <p className="mt-5 max-w-[30rem] text-pretty text-[16px] leading-relaxed text-cream/65">
            Each proposal says what Kortex saw, what it wants to change, and the numbers before and after. You approve it in the chat or in your
            queue, and Kortex makes the change in your ad account.
          </p>
          <p className="mt-4 max-w-[30rem] text-pretty text-[16px] leading-relaxed text-cream/65">
            Limits sit underneath every proposal. A budget can at most double or halve in one step. An ad set Kortex just changed is left alone
            for a few days so the result can show. A proposal you ignore expires.
          </p>
        </div>

        <div className="rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 sm:p-7">
          <p className="text-[12px] font-medium text-acid-ink">Proposed change</p>
          <p className="mt-2 text-[18px] font-semibold tracking-[-0.01em] text-cream">Halve the daily budget on Prospecting, broad</p>
          <p className="mt-2 text-[14px] leading-relaxed text-cream/60">
            It spent ₹18,400 in two days at 0.9 ROAS, against 2.8 for the rest of the account.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10">
            {[
              ["Daily budget now", "₹9,000"],
              ["After the change", "₹4,500"],
              ["ROAS, last 2 days", "0.9"],
              ["Account ROAS", "2.8"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-soft px-4 py-3">
                <dt className="text-[12px] text-cream/50">{k}</dt>
                <dd className="mt-0.5 font-mono text-[20px] font-semibold tabular-nums text-cream">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex h-10 items-center rounded-full bg-cream px-5 text-[14px] font-semibold text-ink">Approve</span>
            <span className="inline-flex h-10 items-center rounded-full border border-cream/15 px-5 text-[14px] text-cream/70">Skip</span>
            <span className="ml-auto text-[12px] text-cream/45">Expires in 2 days</span>
          </div>
          <p className="mt-5 border-t border-cream/10 pt-4 text-[12.5px] text-cream/45">An example proposal. Names and numbers are made up.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- What it checks ---------- */

const CHECKS = [
  { title: "Money going where it should not", body: "Spend shifting toward ads whose ROAS is falling, ranked by the money at risk rather than the worst ratio." },
  { title: "Winners held back", body: "Ads beating your account's ROAS while a budget cap holds them flat and weaker ones spend more." },
  { title: "Creative wearing out", body: "Frequency rising while click-through falls, told apart from an ad that never worked." },
  { title: "Budget on the wrong placement", body: "Placements compared inside the same ad set, so the only difference is where the ad ran." },
  { title: "Audiences you own and don't use", body: "Saved audiences worth excluding or testing, tested as a copy of the ad set so the result is clean." },
  { title: "Clicks that don't convert", body: "Strong click-through with weak ROAS, which points at the page, price or stock rather than the ad." },
];

function DailyChecks() {
  return (
    <section id="checks">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
        <ul className="order-2 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:order-1">
          {CHECKS.map((c) => (
            <li key={c.title} className="bg-ink-soft p-5 sm:p-6">
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-cream">{c.title}</h3>
              <p className="mt-1.5 text-pretty text-[14px] leading-relaxed text-cream/60">{c.body}</p>
            </li>
          ))}
        </ul>
        <div className="order-1 lg:order-2">
          <p className="eyebrow">What it looks for</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
            The leaks you would catch yourself, if you had the time.
          </h2>
          <p className="mt-5 max-w-[30rem] text-pretty text-[16px] leading-relaxed text-cream/65">
            Each day Kortex reads your ad accounts and runs its checks. What it finds lands in Needs attention with a proposed fix, so your
            morning starts with a short list instead of a dashboard.
          </p>
          <p className="mt-4 max-w-[30rem] text-pretty text-[16px] leading-relaxed text-cream/65">
            You can also ask it anything about the account in plain words, such as why ROAS fell last week or which ads to retire.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

const STEPS = [
  { title: "Connect your ad accounts", body: "Sign in through Meta's or Google's own screen. Kortex reads your last 30 days and suggests its first three changes." },
  { title: "Read the morning list", body: "Each day's findings, each with a proposed fix and the numbers behind it. Ask follow-up questions in the chat." },
  { title: "Approve what makes sense", body: "Kortex makes the change in your ad account. New ads and ad sets it creates start paused, for you to switch on." },
  { title: "See whether it worked", body: "Every change is judged on its ROAS over the following one to two weeks, and the next proposals learn from it." },
];

function How() {
  return (
    <section id="how" className="pastel-band pastel-three relative px-3 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px] rounded-[28px] border border-white/60 bg-ink/95 p-6 shadow-[0_30px_80px_-40px_rgba(60,50,90,0.35)] sm:p-10 lg:p-14">
        <p className="eyebrow">How it works</p>
        <h2 className="font-display mt-4 max-w-[44rem] text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
          Connect once. Then a short list to approve each day.
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

/* ---------- The free tools, on the one pastel band ---------- */

const TOOLS: Array<{ name: string; href: string; title: string; body: string; cta: string; art: ReactNode }> = [
  {
    name: "Visibility",
    href: "https://visibility.kortexagent.co",
    title: "Does AI recommend you?",
    body: "See whether ChatGPT, Gemini, Claude and Google name you when your customers ask, who they name instead, and what to fix.",
    cta: "Get my free audit",
    art: <ToolBars rows={[["ChatGPT", 20], ["Gemini", 70], ["Claude", 8], ["Google", 30]]} />,
  },
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
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:py-28">
        <p className="eyebrow">Free to use today</p>
        <h2 className="font-display mt-4 max-w-[44rem] text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">
          Waiting for access? Three Kortex tools are open now.
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
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

const FAQ = [
  {
    q: "Which ad platforms does it work with?",
    a: "Meta Ads, which covers Facebook and Instagram, and Google Ads. Shopify, TikTok Ads and ChatGPT Ads are coming soon.",
  },
  {
    q: "Will it change my ads without asking?",
    a: "No. Kortex proposes, and a person on your team approves each change before it happens. Proposals nobody approves expire, and anything new Kortex creates in Meta starts paused.",
  },
  {
    q: "What can it change?",
    a: "Pause and resume ads, ad sets and campaigns, change budgets, adjust placements and audiences, and launch new ad sets and ads. A single budget change can at most double or halve.",
  },
  {
    q: "How does it connect to my account?",
    a: "Through Meta's and Google's own sign-in screens. You never give Kortex your password.",
  },
  {
    q: "Does it make ads too?",
    a: "Yes. Kortex can make image ads in your colours and type from your products, and launch them paused for you to review.",
  },
  {
    q: "How do I get access?",
    a: "Leave your work email. We open access by hand and email you when it is your turn. Until then, the three free tools above are open to everyone.",
  },
];

function Faq() {
  const [openIdx, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="pastel-band pastel-alt relative px-3 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 rounded-[28px] border border-white/60 bg-ink/95 p-6 shadow-[0_30px_80px_-40px_rgba(60,50,90,0.35)] sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:p-14">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.01em]">Before you connect anything</h2>
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
          Start each day with the fixes, not the dashboard.
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[16px] text-cream/65">Leave your work email and we will let you know when your access is ready.</p>
        <div className="mt-9">
          <EmailBox id="email-final" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer({ onSignup }: { onSignup: () => void }) {
  return (
    <footer data-theme="dark" className="footer-block relative px-5 pb-10 pt-16 text-cream sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <a href="#top" className="inline-block py-1" aria-label="Kortex, back to top">
              <Wordmark />
            </a>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-cream/60">Kortex, the AI agent for high frequency ROAS optimization.</p>
          </div>
          <FooterCol
            title="Product"
            links={[
              { label: "Get early access", onClick: onSignup },
              { label: "Sign in", href: "https://app.kortexagent.co/login" },
            ]}
          />
          <FooterCol
            title="Free tools"
            links={[
              { label: "Visibility", href: "https://visibility.kortexagent.co" },
              { label: "Compete", href: "https://compete.kortexagent.co" },
              { label: "Creators", href: "https://creators.kortexagent.co" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
              { label: "Privacy", href: PRIVACY_URL },
              { label: "Terms", href: TERMS_URL },
            ]}
          />
        </div>
        <div className="flex flex-col gap-3 border-t border-cream/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-cream/40">© {new Date().getFullYear()} Kortex · Built for operators.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[13px] text-cream/50 hover:text-cream">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; href?: string; onClick?: () => void }> }) {
  return (
    <div>
      <h4 className="mb-4 text-[13px] font-semibold text-cream/85">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.onClick ? (
              <button type="button" onClick={l.onClick} className="text-sm text-cream/60 transition-colors hover:text-acid-ink">
                {l.label}
              </button>
            ) : (
              <a href={l.href} className="text-sm text-cream/60 transition-colors hover:text-acid-ink">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
