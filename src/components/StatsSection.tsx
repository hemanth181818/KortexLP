"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  caption: string;
  duration: number;
};

// Honest product-truth claims (no fabricated outcome stats).
const STATS: Stat[] = [
  {
    value: 8,
    suffix: "",
    label: "Channels coordinated",
    caption: "Ads, store, SEO, AEO, creative, pricing, pages, ops",
    duration: 1000,
  },
  {
    prefix: "<",
    value: 90,
    suffix: "s",
    label: "Diagnosis time per question",
    caption: "From a single question to a prioritized plan",
    duration: 1400,
  },
  {
    value: 100,
    suffix: "%",
    label: "Operator-approved changes",
    caption: "Nothing ships without your sign-off",
    duration: 1500,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Always-on cortex",
    caption: "Every connected source, continuously read",
    duration: 1100,
  },
];

function Counter({
  target,
  duration,
  isVisible,
}: {
  target: number;
  duration: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(target);
      return;
    }

    let raf: number;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, 250);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, isVisible]);

  return <span>{count}</span>;
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
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
            <span className="font-display italic text-cream/95">
              one cortex.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 reveal-on-scroll">
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              className="group relative rounded-xl border border-cream/8 bg-ink-soft p-5 sm:p-6 hover:border-cream/20 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/35">
                K-{String(idx + 1).padStart(2, "0")}
              </span>
              <div
                className="mt-3 flex items-baseline gap-1 text-cream tabular"
                data-tabular
              >
                {s.prefix && (
                  <span className="font-display italic text-acid text-[clamp(1.4rem,3vw,2.2rem)] leading-none mr-0.5">
                    {s.prefix}
                  </span>
                )}
                <span className="font-sans font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-none tracking-[-0.04em]">
                  <Counter
                    target={s.value}
                    duration={s.duration}
                    isVisible={visible}
                  />
                </span>
                <span className="font-display italic text-acid text-[clamp(1.4rem,3vw,2.2rem)] leading-none">
                  {s.suffix}
                </span>
              </div>
              <div className="mt-3 font-sans font-medium text-cream text-sm sm:text-base">
                {s.label}
              </div>
              <div className="mt-1.5 text-xs sm:text-[13px] text-cream/55 leading-snug">
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
