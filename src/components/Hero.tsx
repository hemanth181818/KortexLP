import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import KortexAurora from "@/components/ui/animated-shader-background";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";

// Rotating word completes the static line: "Run growth from one cortex, not from ___"
// Each word names a real operator pain so readers recognize their own day.
const ROTATING = [
  "nine dashboards",
  "nine tabs",
  "nine standups",
  "nine spreadsheets",
];

export default function Hero() {
  const [i, setI] = useState(0);
  const titles = useMemo(() => ROTATING, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setI((prev) => (prev + 1) % titles.length);
    }, 2400);
    return () => clearTimeout(t);
  }, [i, titles.length]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-start justify-center overflow-hidden"
    >
      {/* Shader aurora */}
      <KortexAurora />

      {/* Atmosphere: only two quiet layers now */}
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-blueprint opacity-40"
        aria-hidden="true"
      />
      {/* Vignette: stronger at edges to focus attention */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(11,11,11,0.92) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 px-5 sm:px-6 pt-32 pb-20 sm:pt-36 md:pt-44 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow-acid mb-6 sm:mb-8 flex items-center justify-center gap-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-acid acid-glow-soft" />
            <span className="hidden sm:inline">AI command center · e-commerce growth</span>
            <span className="sm:hidden">AI command center</span>
          </motion.p>

          {/* Display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-center text-cream"
          >
            <span className="block font-sans font-semibold text-[clamp(1.9rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.03em]">
              Run growth from
            </span>
            <span className="block mt-1.5 font-sans font-semibold text-[clamp(1.9rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.03em]">
              one cortex, not from
            </span>
            <span
              aria-live="polite"
              className="relative block w-full overflow-hidden mt-4 min-h-[3.2rem] sm:min-h-[4.2rem] md:min-h-[5.6rem] lg:min-h-[6.4rem]"
            >
              {titles.map((title, idx) => (
                <motion.span
                  key={title}
                  className="absolute inset-0 flex items-center justify-center font-display italic text-acid text-[clamp(2.2rem,6.6vw,5rem)] leading-[1.08] tracking-[-0.015em] whitespace-nowrap px-2"
                  initial={{ y: "100%", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 16,
                  }}
                  animate={
                    i === idx
                      ? { y: "0%", opacity: 1 }
                      : { y: i > idx ? "-110%" : "110%", opacity: 0 }
                  }
                >
                  {title}.
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-8 sm:mt-10 max-w-2xl mx-auto text-center text-[15px] sm:text-lg leading-relaxed text-cream/70 px-2"
          >
            Kortex reads your ads, store, SEO, creative and pages. Eight
            specialist agents diagnose what&apos;s broken and draft the next
            moves across your stack. Nothing ships without your approval.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <CTAButton text="Book a demo" href="#cta" />
            <Button
              variant="ghost"
              size="lg"
              onClick={() =>
                document
                  .getElementById("example")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="text-cream/75"
            >
              See a live ROAS fix <ArrowDown className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Process strip: Connect / Ask / Approve */}
          <motion.div
            id="workflow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
            aria-label="How Kortex works"
          >
            {[
              {
                step: "01",
                title: "Connect",
                body: "Ads, analytics, store, search, creative, heatmaps and growth data flow into one cortex.",
              },
              {
                step: "02",
                title: "Ask",
                body: "A marketer asks the exact growth question they are trying to answer.",
              },
              {
                step: "03",
                title: "Approve",
                body: "Kortex proposes channel actions and waits for your approval before changing anything.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative rounded-xl border border-cream/10 bg-ink-soft/70 backdrop-blur-md p-5 sm:p-6 hover:border-cream/20 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45 tabular" data-tabular>
                    {item.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cream/15 group-hover:bg-acid transition-colors" />
                </div>
                <h3 className="font-display italic text-2xl sm:text-3xl text-cream mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream/60">
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
