"use client";

import React from "react";
import {
  GitBranch,
  ShieldCheck,
  Activity,
  Layers,
  Workflow,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tile = {
  eyebrow: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string }>;
  span: string;
  featured?: boolean;
};

const TILES: Tile[] = [
  {
    eyebrow: "Command board",
    title: "One queue. Eight specialists. Zero tab chaos.",
    body:
      "Every agent's recommendation lands in one ordered queue, with approval gates and a full diff before anything changes in your tools.",
    Icon: Workflow,
    span: "lg:col-span-5 lg:row-span-2",
    featured: true,
  },
  {
    eyebrow: "Approval gates",
    title: "Human in the loop, by default.",
    body:
      "Nothing auto-ships. Kortex drafts the change and waits for a marketer to approve it.",
    Icon: ShieldCheck,
    span: "lg:col-span-3",
  },
  {
    eyebrow: "Diagnostics",
    title: "Funnel readouts in seconds.",
    body:
      "ROAS, CTR, frequency, LCP and scroll depth, explained as one cohesive story instead of nine charts.",
    Icon: Activity,
    span: "lg:col-span-4",
  },
  {
    eyebrow: "Visual DNA",
    title: "Creative trained by proof.",
    body:
      "Tags winning and losing patterns across statics and videos. Every next brief is informed by what actually worked.",
    Icon: Eye,
    span: "lg:col-span-4",
  },
  {
    eyebrow: "Connected stack",
    title: "Reads the whole growth surface.",
    body:
      "Meta, Google, Shopify, GA4, Search Console, Clarity, Hotjar, YouTube, and your creative tools. All in one cortex.",
    Icon: Layers,
    span: "lg:col-span-4",
  },
  {
    eyebrow: "Operator-first",
    title: "Built for the person who runs growth.",
    body:
      "Ask the question you would ask in standup. Get an answer that respects budget, brand and timing.",
    Icon: GitBranch,
    span: "lg:col-span-4",
  },
];

export default function SystemBento() {
  return (
    <section
      id="system"
      className="relative py-24 sm:py-32 md:py-40 px-5 sm:px-6 overflow-hidden bg-ink-deep"
    >
      {/* Dotted background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(244,240,230,0.06) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-acid/[0.06] blur-3xl translate-x-1/3 -translate-y-1/2"
      />

      <div className="container relative z-10 mx-auto">
        <div className="max-w-3xl mb-12 sm:mb-16 reveal-on-scroll">
          <p className="eyebrow mb-5">04 · Why Kortex</p>
          <h2 className="font-sans font-semibold text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-cream">
            What makes Kortex
            <span className="block font-display italic text-cream/95">
              different.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-cream/70">
            Not a chatbot bolted onto a dashboard. A coordinated layer above
            the marketing stack, designed for operators who ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 reveal-on-scroll">
          {TILES.map((t) => {
            const Icon = t.Icon;
            return (
              <article
                key={t.title}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-cream/8 bg-ink-soft p-6 sm:p-7 transition-colors hover:border-cream/20",
                  t.featured && "border-cream/12 hover:border-acid/30",
                  t.span
                )}
              >
                {/* Featured atmospheric layer */}
                {t.featured && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-acid/[0.08] blur-3xl"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(244,240,230,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,240,230,0.04) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={cn(
                        "grid place-items-center rounded-lg border h-11 w-11",
                        t.featured
                          ? "border-acid/40 bg-acid/12"
                          : "border-cream/12 bg-cream/[0.035]"
                      )}
                      aria-hidden="true"
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          t.featured ? "text-acid" : "text-cream/75"
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.22em]",
                        t.featured ? "text-acid/85" : "text-cream/45"
                      )}
                    >
                      {t.eyebrow}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "leading-[1.1] tracking-[-0.02em]",
                      t.featured
                        ? "font-sans font-semibold text-cream text-[clamp(1.6rem,3vw,2.4rem)]"
                        : "font-sans font-semibold text-cream text-lg sm:text-xl"
                    )}
                  >
                    {t.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-3 leading-relaxed text-cream/60",
                      t.featured ? "text-base sm:text-lg" : "text-sm"
                    )}
                  >
                    {t.body}
                  </p>

                  {t.featured && (
                    <div className="mt-auto pt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-acid">
                      <span className="h-px w-8 bg-acid/60" />
                      Always under operator control
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
