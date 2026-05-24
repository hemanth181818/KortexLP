"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Search,
  ShoppingBag,
  Sparkles,
  PenTool,
  Camera,
  Banknote,
  Gauge,
} from "lucide-react";

const AGENTS = [
  {
    icon: Target,
    name: "Meta agent",
    blurb:
      "Catches creative fatigue, rebalances adset budgets, and surfaces the exact ROAS leak before you open Ads Manager.",
  },
  {
    icon: Search,
    name: "Google agent",
    blurb:
      "Watches Search, Shopping and YouTube. Surfaces which keywords burn budget and which intent you are missing.",
  },
  {
    icon: ShoppingBag,
    name: "Shopify conversion agent",
    blurb:
      "Finds the friction killing add-to-cart. Drafts the fix across checkout, trust blocks, mobile load and offer clarity.",
  },
  {
    icon: Sparkles,
    name: "SEO + AEO agent",
    blurb:
      "Finds the rankings you almost have, the AI answers you should own, and the schema gaps competitors are using.",
  },
  {
    icon: PenTool,
    name: "Creative agent",
    blurb:
      "Drafts the next round of hooks, statics and creator briefs, based on what your data says is fatiguing this week.",
  },
  {
    icon: Camera,
    name: "Visual DNA tagger",
    blurb:
      "Tags every static and video by pattern. The next brief is informed by what actually worked, not by vibes.",
  },
  {
    icon: Banknote,
    name: "Pricing agent",
    blurb:
      "Models margin, bundles, discounts and competitor prices before you change a single SKU.",
  },
  {
    icon: Gauge,
    name: "Page performance agent",
    blurb:
      "Reads Clarity, Hotjar and Core Web Vitals. Tells you which page is leaking conversion and exactly where.",
  },
];

export default function AgentsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const timeout = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3200);

    return () => clearTimeout(timeout);
  }, [api, current]);

  return (
    <section
      id="agents"
      className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-ink-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[640px] h-[640px] rounded-full bg-acid/[0.07] blur-3xl translate-x-1/3 translate-y-1/3"
      />

      <div className="container px-5 sm:px-6 mx-auto">
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <p className="eyebrow mb-5">02 · Agents</p>
          <h2 className="font-sans font-semibold text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-cream">
            Eight specialists.{" "}
            <span className="font-display italic text-cream/95">
              One prioritized plan.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-cream/70">
            Every growth function gets a specialist agent. They feed one
            ordered queue, so you stop chasing eight chats at once.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full reveal-on-scroll"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-4">
            {AGENTS.map((agent, idx) => {
              const Icon = agent.icon;
              return (
                <CarouselItem
                  key={agent.name}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="group h-full bg-ink-soft border-cream/10 hover:border-cream/20 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className="grid place-items-center h-11 w-11 rounded-lg border border-cream/12 bg-cream/[0.035]"
                          aria-hidden="true"
                        >
                          <Icon className="w-5 h-5 text-cream/75 group-hover:text-acid transition-colors" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/35">
                          agent · {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <CardTitle className="font-display italic text-cream text-2xl">
                        {agent.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-cream/60">
                        {agent.blurb}
                      </p>
                      <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40 group-hover:text-cream/60 transition-colors">
                        <span className="h-px w-6 bg-cream/20 group-hover:bg-acid/60 transition-colors" />
                        Owns this workflow
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Pagination dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {AGENTS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to agent ${idx + 1}`}
              onClick={() => {
                api?.scrollTo(idx);
                setCurrent(idx);
              }}
              className={`h-1.5 rounded-full transition-all min-h-[24px] min-w-[24px] grid place-items-center`}
            >
              <span
                className={`block h-1 rounded-full transition-all ${
                  current === idx ? "w-8 bg-acid" : "w-3 bg-cream/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
