type Stat = {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  caption: string;
};

// Honest product-truth claims (no fabricated outcome stats).
const STATS: Stat[] = [
  {
    value: 8,
    suffix: "",
    label: "Channels coordinated",
    caption: "Ads, store, SEO, AEO, creative, pricing, pages, ops",
  },
  {
    prefix: "<",
    value: 90,
    suffix: "s",
    label: "Diagnosis time per question",
    caption: "From a single question to a prioritized plan",
  },
  {
    value: 100,
    suffix: "%",
    label: "Operator-approved changes",
    caption: "Nothing ships without your sign-off",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Always-on Kortex",
    caption: "Every connected source, continuously read",
  },
];

export default function StatsSection() {
  return (
    <section
      className="relative py-20 sm:py-28 px-5 sm:px-6 overflow-hidden bg-ink"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-30"
      />

      <div className="container relative z-10 mx-auto">
        <div className="max-w-3xl mb-12 sm:mb-14 reveal-on-scroll">
          <p className="eyebrow mb-5">05 · By the numbers</p>
          <h2 className="font-sans font-semibold text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-cream">
            The honest math behind{" "}
            <span className="text-cream/40">
              one Kortex.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 reveal-on-scroll">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group relative rounded-xl border border-cream/8 bg-ink-soft p-5 sm:p-6 hover:border-cream/20 transition-colors"
            >
              <div
                className="flex items-baseline gap-1 text-cream tabular"
                data-tabular
              >
                {s.prefix && (
                  <span className="font-semibold text-acid-ink text-[clamp(1.4rem,3vw,2.2rem)] leading-none tracking-[-0.03em] mr-0.5">
                    {s.prefix}
                  </span>
                )}
                <span className="font-sans font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-none tracking-[-0.04em]">
                  {s.value}
                </span>
                <span className="font-semibold text-acid-ink text-[clamp(1.4rem,3vw,2.2rem)] leading-none tracking-[-0.03em]">
                  {s.suffix}
                </span>
              </div>
              <div className="mt-3 font-sans font-medium text-cream text-sm sm:text-base">
                {s.label}
              </div>
              <div className="mt-1.5 text-xs sm:text-[13px] text-cream/55 leading-snug text-pretty">
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
