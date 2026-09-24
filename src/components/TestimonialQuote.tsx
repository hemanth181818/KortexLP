/**
 * Editorial scenario block. Not a fabricated testimonial.
 * This is the explicit product promise framed as a morning narrative
 * so readers can picture their own day on Kortex.
 */
export default function TestimonialQuote() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-6 overflow-hidden bg-ink-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full bg-acid/[0.06] blur-3xl -translate-x-1/3 translate-y-1/3"
      />

      <div className="container relative z-10 mx-auto">
        <figure className="max-w-4xl mx-auto text-center reveal-on-scroll">
          <p className="eyebrow mb-6">The Kortex morning</p>
          <blockquote className="font-sans font-semibold text-cream text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.2] tracking-[-0.025em] text-balance">
            <span className="block">
              At 9am, one question. By 9:03, a diagnosis across Meta, SEO and
              the store.
            </span>
            <span className="block mt-3 text-cream/40">
              By 10am, an approved plan. The growth meeting is now a{" "}
              <span className="whitespace-nowrap">15-minute review.</span>
            </span>
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cream/20" />
            <span className="text-[13px] text-cream/55">
              How Kortex teams run growth
            </span>
            <span className="h-px w-10 bg-cream/20" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
