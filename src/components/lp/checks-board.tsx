import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's product shot: the morning's checks on a Meta account, each one a
 * finding with the exact change Kortex proposes, waiting for approval. One is
 * approved as you watch. Names and numbers are made up; the change types and
 * limits are the product's own (a budget can at most double or halve).
 */

type Item = { check: string; finding: string; change: string; detail: string };

const ITEMS: Item[] = [
  {
    check: "Spend running away",
    finding: "Prospecting, broad spent ₹18,400 in two days at 0.9 ROAS",
    change: "Halve its daily budget",
    detail: "₹9,000 → ₹4,500 a day",
  },
  {
    check: "Creative fatigue",
    finding: "3 ads past a frequency of 4.2, click-through down 38% in a week",
    change: "Pause 3 ads",
    detail: "Keeps the 2 still above your target",
  },
  {
    check: "Winner short of budget",
    finding: "Retargeting, 7 days returns 4.6 ROAS on ₹1,200 a day",
    change: "Raise its daily budget",
    detail: "₹1,200 → ₹2,000 a day",
  },
];

export function ChecksBoard({ className }: { className?: string }) {
  const still = useReducedMotion();
  // Steps: each finding in turn, then the first approved.
  const [step, setStep] = useState(still ? ITEMS.length + 1 : 0);
  useEffect(() => {
    if (still || step > ITEMS.length) return;
    const t = setTimeout(() => setStep((n) => n + 1), step === 0 ? 500 : step < ITEMS.length ? 650 : 1400);
    return () => clearTimeout(t);
  }, [still, step]);
  const approved = step > ITEMS.length;

  return (
    <div className={cn("rounded-[22px] bg-gradient-to-b from-cream/25 via-cream/10 to-cream/[0.03] p-px", className)}>
      <div className="overflow-hidden rounded-[21px] bg-ink-soft text-left">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-cream/10 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
          </span>
          <span className="mx-auto truncate font-mono text-[11.5px] text-cream/40">app.kortexagent.co</span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cream/10 px-5 py-3.5 sm:px-6">
          <p className="text-[14px] font-semibold text-cream">Needs attention</p>
          <p className="text-[12px] text-cream/50">This morning&rsquo;s checks · 3 need you</p>
        </div>

        <ul className="divide-y divide-cream/10">
          {ITEMS.map((it, i) => {
            const shown = step > i;
            const done = approved && i === 0;
            return (
              <motion.li
                key={it.check}
                initial={false}
                animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:px-6"
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-acid-ink">{it.check}</p>
                  <p className="mt-1 text-[14px] text-cream">{it.finding}</p>
                  <p className="mt-1.5 text-[13px] text-cream/60">
                    <span className="font-medium text-cream/85">{it.change}</span> · <span className="font-mono tabular-nums">{it.detail}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {done ? (
                    <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-acid px-4 text-[13px] font-semibold text-on-acid">
                      <Check className="size-3.5" strokeWidth={3} /> Approved
                    </span>
                  ) : (
                    <>
                      <span className="inline-flex h-9 items-center rounded-full bg-cream px-4 text-[13px] font-semibold text-ink">Approve</span>
                      <span className="inline-flex h-9 items-center rounded-full border border-cream/15 px-4 text-[13px] text-cream/70">Skip</span>
                    </>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>

        <div className={cn("flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 px-5 py-3.5 transition-opacity duration-700 sm:px-6", approved ? "opacity-100" : "opacity-0")}>
          <p className="text-[13.5px] text-cream/75">
            <span className="font-semibold text-cream">Budget halved in Meta.</span> Kortex checks the result over the next week.
          </p>
          <p className="font-mono text-[11.5px] text-cream/45">nothing changes until you approve</p>
        </div>
      </div>
    </div>
  );
}
