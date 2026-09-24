import {
  Target,
  Search,
  ShoppingBag,
  FileSearch,
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
    icon: FileSearch,
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
  return (
    <section
      id="agents"
      className="relative py-24 sm:py-32 md:py-40 overflow-hidden bg-ink-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[640px] h-[640px] rounded-full bg-acid/[0.07] blur-3xl glow-blob translate-x-1/3 translate-y-1/3"
      />

      <div className="container px-5 sm:px-6 mx-auto">
        <div className="reveal-on-scroll max-w-3xl mb-12 sm:mb-16">
          <p className="eyebrow mb-5">02 · Agents</p>
          <h2 className="font-sans font-semibold text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-cream">
            Eight specialists.
            <span className="block text-cream/40">
              One prioritized plan.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-cream/70">
            Every growth function gets a specialist agent. They feed one
            ordered queue, so you stop chasing eight chats at once.
          </p>
        </div>

        {/* All eight at once. On a phone they scroll sideways, snapping per card,
            with the next card peeking so the row reads as scrollable. */}
        <ul
          className="reveal-on-scroll -mx-5 px-5 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Kortex agents"
        >
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <li
                key={agent.name}
                className="group snap-start shrink-0 w-[78%] sm:w-auto flex flex-col rounded-xl border border-cream/10 bg-ink-soft p-5 sm:p-6 transition-colors hover:border-cream/20"
              >
                <div
                  className="grid place-items-center h-10 w-10 rounded-lg border border-cream/12 bg-cream/[0.035] mb-5"
                  aria-hidden="true"
                >
                  <Icon className="w-[18px] h-[18px] text-cream/70 group-hover:text-acid-ink transition-colors" />
                </div>
                <h3 className="font-sans font-semibold text-cream text-[17px] tracking-[-0.01em]">
                  {agent.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60 text-pretty">
                  {agent.blurb}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
