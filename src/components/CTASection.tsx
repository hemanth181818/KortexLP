import { CTAButton } from "@/components/ui/cta-button";
import KortexBeamDemo from "@/components/ui/kortex-beam-demo";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative py-24 sm:py-32 md:py-40 px-5 sm:px-6 overflow-hidden bg-ink"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-acid/[0.06] blur-3xl"
      />

      <div className="container relative z-10 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 reveal-on-scroll">
          <p className="eyebrow-acid mb-5 flex items-center justify-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-acid acid-glow-soft" />
            Run growth from one cortex
          </p>
          <h2 className="font-sans font-semibold text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] tracking-[-0.03em] text-cream">
            Bring us your hardest{" "}
            <span className="font-display italic text-acid">
              growth question.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-cream/70">
            We will show you the diagnosis Kortex would draft, the four moves
            it would propose, and the approval gates between them. Built
            around your live stack, in 30 minutes.
          </p>
        </div>

        <div className="reveal-on-scroll mb-10 sm:mb-12">
          <KortexBeamDemo />
        </div>

        <div className="text-center reveal-on-scroll">
          <CTAButton text="Book a demo" href="mailto:hello@kortex.ai" />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
            30-minute walkthrough · No credit card · No long intake form
          </p>
        </div>
      </div>
    </section>
  );
}
