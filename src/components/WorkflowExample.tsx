import { CheckCircle2 } from "lucide-react";

const CHAT = [
  {
    speaker: "Ishan",
    role: "Growth lead",
    body: "identify how i can possibly improve roas on my meta campaign for the new keyboards",
    side: "user" as const,
  },
  {
    speaker: "Kortex",
    role: "Command",
    body:
      "I found the ROAS drop. The issue is not only Meta. The keyboard funnel is leaking after the click.",
    side: "ai" as const,
    diagnostic: [
      { v: "3.2", note: "Current ROAS vs 4.0 median" },
      { v: "0.6%", note: "Adset CTR vs 1.1% median" },
      { v: "6.0", note: "Frequency · creative fatigue" },
    ],
  },
  {
    speaker: "Ishan",
    role: "Growth lead",
    body: "what would you change first?",
    side: "user" as const,
  },
];

const ACTIONS = [
  {
    agent: "Meta agent",
    title: "Rebalance adset budget",
    body:
      "Move 18% budget from low-intent broad adsets into the two keyboard adsets with stronger add-to-cart.",
    cta: "Allow change",
  },
  {
    agent: "SEO + AEO agent",
    title: "Add missing tags + answer pages",
    body:
      "Update meta titles for keyboard URLs and add FAQ answers for switches, latency, compatibility and setup.",
    cta: "Allow draft",
  },
  {
    agent: "Shopify conversion agent",
    title: "Move proof above the fold",
    body:
      "Place reviews, setup photos, compatibility proof and delivery confidence before spec-heavy copy on mobile.",
    cta: "Allow suggest",
  },
  {
    agent: "Creative agent",
    title: "Refresh static and video angles",
    body:
      "Brief proof-led hooks and creator-style demos for the first 3 seconds of Reels and YouTube Shorts.",
    cta: "Allow brief",
  },
];

export default function WorkflowExample() {
  return (
    <section
      id="example"
      className="relative py-24 sm:py-32 md:py-40 px-5 sm:px-6 overflow-hidden bg-ink"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-30"
      />

      <div className="container relative z-10 mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16 reveal-on-scroll">
          <p className="eyebrow mb-5">03 · Demo</p>
          <h2 className="font-sans font-semibold text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-cream">
            From one ROAS question
            <span className="block font-display italic text-cream/95">
              to four approved moves.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-cream/70">
            Watch one ROAS question become a coordinated plan across Meta,
            SEO, store and creative. Every move waits for your approval before
            it ships.
          </p>
        </div>

        {/* Terminal chat block */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-7 reveal-on-scroll">
            <div
              className="rounded-xl border border-cream/10 bg-ink-deep overflow-hidden shadow-2xl"
              role="region"
              aria-label="Example conversation between a growth lead and Kortex"
            >
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cream/10 bg-ink-soft">
                <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-acid/70" />
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
                  ask-kortex · session · 0x42c
                </span>
              </div>

              <div className="p-5 sm:p-7 space-y-4">
                {CHAT.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.side === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-lg px-4 py-3.5 ${
                        m.side === "user"
                          ? "bg-cream/[0.035] border border-cream/8"
                          : "bg-ink-soft border border-cream/12"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3 mb-1.5">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                            m.side === "user" ? "text-cream/50" : "text-acid"
                          }`}
                        >
                          {m.speaker}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/30">
                          {m.role}
                        </span>
                      </div>
                      <p
                        className={`text-sm sm:text-[15px] leading-relaxed ${
                          m.side === "user" ? "text-cream/85" : "text-cream"
                        }`}
                      >
                        {m.body}
                      </p>

                      {m.diagnostic && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {m.diagnostic.map((d) => (
                            <div
                              key={d.note}
                              className="rounded-md border border-cream/10 bg-ink-deep/80 px-3 py-2.5"
                            >
                              <div
                                className="font-mono text-base sm:text-lg text-acid tabular"
                                data-tabular
                              >
                                {d.v}
                              </div>
                              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/50 mt-0.5 leading-tight">
                                {d.note}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Final answer summary */}
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-lg px-4 py-3.5 bg-ink-soft border border-cream/12">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                        Kortex
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/30">
                        Plan
                      </span>
                    </div>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-cream">
                      Prioritize four actions in this order, all gated on your
                      approval →
                    </p>
                    <div className="mt-2 flex gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-acid/70 animate-pulse" />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-acid/70 animate-pulse"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-acid/70 animate-pulse"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approval cards */}
          <div className="lg:col-span-5 reveal-on-scroll">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
                Approval queue
              </span>
              <span className="h-px flex-1 bg-cream/10" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid tabular" data-tabular>
                04 pending
              </span>
            </div>

            <div className="space-y-3">
              {ACTIONS.map((a, idx) => (
                <article
                  key={a.title}
                  className="group relative rounded-xl border border-cream/10 bg-ink-soft p-4 sm:p-5 hover:border-cream/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                      · {a.agent}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/30 tabular" data-tabular>
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-cream text-base sm:text-lg leading-tight">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-cream/60">
                    {a.body}
                  </p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.04] px-3 py-1.5 min-h-[36px] text-xs font-mono uppercase tracking-[0.18em] text-cream/80 hover:border-acid/40 hover:bg-acid/10 hover:text-acid transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink-soft"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {a.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
