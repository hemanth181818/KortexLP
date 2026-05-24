import { Card } from "@/components/ui/card";
import { KortexCortex } from "@/components/ui/ai-architecture";

const SOURCES = [
  "Shopify",
  "Meta Ads",
  "Google Ads",
  "GA4",
  "YouTube",
  "Search Console",
  "Microsoft Clarity",
  "Hotjar",
  "Creative stack",
];

export default function ConnectionsSection() {
  return (
    <section
      id="connections"
      className="relative py-24 sm:py-32 md:py-40 px-5 sm:px-6 overflow-hidden bg-ink"
    >
      {/* Soft acid glow upper-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full bg-acid/[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-40"
      />

      <div className="container relative z-10 mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Copy side */}
          <div className="lg:col-span-5 reveal-on-scroll">
            <p className="eyebrow mb-5">01 · Stack</p>
            <h2 className="font-sans font-semibold text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-cream">
              Every signal in
              <span className="block font-display italic text-cream/95">
                one cortex.
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-cream/70">
              Most growth teams live in nine tabs, three spreadsheets and a
              Monday standup. Kortex reads the whole stack across paid,
              organic, store, creative and page. Then routes each signal to
              the specialist agent that owns it.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/55">
              No raw dashboards. No tab-switching. One context graph that
              knows what your funnel looks like right now, and what just
              changed.
            </p>

            {/* Sources list */}
            <ul
              className="mt-8 flex flex-wrap gap-2"
              aria-label="Connected sources"
            >
              {SOURCES.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/[0.03] px-3 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-cream/65"
                >
                  <span className="h-1 w-1 rounded-full bg-cream/40" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual side */}
          <div className="lg:col-span-7 reveal-on-scroll">
            <Card className="relative p-5 sm:p-8 md:p-10 bg-ink-deep/80 backdrop-blur-md border-cream/10 overflow-hidden">
              {/* Card label */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
                  ./kortex/context-graph
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-acid acid-glow-soft" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                    live
                  </span>
                </span>
              </div>

              <KortexCortex className="w-full h-auto" />

              {/* Corner ticks */}
              <span className="absolute top-3 left-3 h-2 w-2 border-l border-t border-acid/50" />
              <span className="absolute top-3 right-3 h-2 w-2 border-r border-t border-acid/50" />
              <span className="absolute bottom-3 left-3 h-2 w-2 border-l border-b border-acid/50" />
              <span className="absolute bottom-3 right-3 h-2 w-2 border-r border-b border-acid/50" />
            </Card>

            {/* Caption */}
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/45 text-right">
              Eight signal streams · One cortex hub
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
