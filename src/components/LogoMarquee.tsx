const SYSTEMS = [
  "Shopify",
  "Meta",
  "Google Ads",
  "GA4",
  "YouTube",
  "Search Console",
  "Microsoft Clarity",
  "Hotjar",
  "Creative stack",
  "Klaviyo",
  "Triple Whale",
];

export default function LogoMarquee() {
  // Duplicate the list for seamless loop
  const items = [...SYSTEMS, ...SYSTEMS];

  return (
    <section className="relative py-14 sm:py-16 px-5 sm:px-6 bg-ink-deep border-y border-cream/5">
      <div className="container mx-auto">
        <p className="eyebrow mb-6 text-center">
          Marketing systems Kortex coordinates
        </p>

        <div className="marquee-mask overflow-hidden">
          {/* `animation-direction: reverse` flips the scroll to right-to-left
              while keeping the keyframes shared with any other marquees. */}
          <div
            className="flex w-max animate-marquee gap-10 sm:gap-14 will-change-transform"
            style={{ animationDirection: "reverse" }}
          >
            {items.map((sys, idx) => (
              <span
                key={`${sys}-${idx}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-sm uppercase tracking-[0.22em] text-cream/40"
              >
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-cream/30"
                />
                {sys}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
