import { Card } from "@/components/ui/card";
import { SignalMap } from "@/components/ui/signal-map";

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
              <span className="block text-cream/40">
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

          </div>

          {/* Visual side */}
          <div className="lg:col-span-7 reveal-on-scroll">
            <Card className="relative px-5 py-8 sm:p-10 bg-ink-deep/80 backdrop-blur-md border-cream/10 overflow-hidden">
              <SignalMap />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
