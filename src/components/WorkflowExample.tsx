import { Check } from "lucide-react";

import { Wordmark } from "@/components/ui/wordmark";

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
            <span className="block text-cream/40">
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
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-cream/10 bg-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-acid" aria-hidden="true" />
                <Wordmark className="text-[12px]" />
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
                          className={`text-[12.5px] font-semibold ${
                            m.side === "user" ? "text-cream/70" : "text-acid"
                          }`}
                        >
                          {m.speaker}
                        </span>
                        <span className="text-[12px] text-cream/35">
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
                              <div className="text-[11.5px] text-cream/50 mt-1 leading-snug">
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
                      <span className="text-[12.5px] font-semibold text-acid">
                        Kortex
                      </span>
                      <span className="text-[12px] text-cream/35">
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
              <span className="text-sm font-semibold text-cream/80">
                Approval queue
              </span>
              <span className="h-px flex-1 bg-cream/10" />
              <span className="rounded-full bg-acid/12 px-2.5 py-0.5 text-[12px] font-semibold text-acid tabular" data-tabular>
                04 pending
              </span>
            </div>

            <div className="space-y-3">
              {ACTIONS.map((a, idx) => (
                <article
                  key={a.title}
                  className="group relative rounded-xl border border-cream/10 bg-ink-soft p-4 sm:p-5 hover:border-cream/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="grid h-5 w-5 place-items-center rounded-full border border-cream/15 text-[11px] font-semibold text-cream/60 tabular"
                      data-tabular
                      aria-label={`Priority ${idx + 1}`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-[12.5px] text-cream/50">
                      {a.agent}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-cream text-base sm:text-lg leading-tight">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-cream/60">
                    {a.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-acid px-3.5 h-8 text-[13px] font-semibold text-ink-deep"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {a.cta}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
