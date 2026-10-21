
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EngineLogo, ENGINE_NAME, type EngineId } from "@/components/lp/engine-logos";
import { cn } from "@/lib/utils";

/**
 * The hero's product shot: one customer question put to all four answer
 * engines at once, each column filling with the names it recommends, and the
 * visitor's own site named by only one of them. That gap is the whole pitch,
 * so the picture is built to show it at a glance. Names are made up.
 */

const QUESTION = "What's the best project management tool for a small team?";

const COLUMNS: Array<{ engine: EngineId; names: string[]; you: number | null }> = [
  { engine: "chatgpt", names: ["Taskly", "Orbitly", "Planwise"], you: null },
  { engine: "gemini", names: ["Orbitly", "yoursite.com", "Taskly"], you: 1 },
  { engine: "claude", names: ["Planwise", "Kanbo", "Taskly"], you: null },
  { engine: "google", names: ["Taskly", "Orbitly", "Kanbo"], you: null },
];

const TYPE_MS = 26;

export function EngineGrid({ className }: { className?: string }) {
  const still = useReducedMotion();
  const [typed, setTyped] = useState(still ? QUESTION.length : 0);
  const [step, setStep] = useState(still ? 5 : 0);

  useEffect(() => {
    if (still) return;
    if (typed < QUESTION.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    if (step < 5) {
      const t = setTimeout(() => setStep((n) => n + 1), step === 0 ? 400 : 520);
      return () => clearTimeout(t);
    }
  }, [still, typed, step]);

  return (
    <div className={cn("rounded-[22px] bg-gradient-to-b from-cream/25 via-cream/10 to-cream/[0.03] p-px", className)}>
      <div className="overflow-hidden rounded-[21px] bg-ink-soft">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-cream/10 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
          </span>
          <span className="mx-auto truncate font-mono text-[11.5px] text-cream/40">visibility.kortexagent.co · yoursite.com</span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        {/* The question */}
        <div className="border-b border-cream/10 px-5 py-4 sm:px-6">
          <p className="font-medium text-[13px] tracking-[0.01em] text-cream/40">Question 7 of 20</p>
          <p className="mt-1.5 min-h-[1.6em] text-[15px] font-medium text-cream sm:text-[16px]">
            {QUESTION.slice(0, typed)}
            {typed < QUESTION.length ? <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-acid" /> : null}
          </p>
        </div>

        {/* Four engines, side by side */}
        <div className="grid grid-cols-2 gap-px bg-cream/10 lg:grid-cols-4">
          {COLUMNS.map((c, ci) => {
            const shown = step > ci;
            return (
              <div key={c.engine} className="bg-ink-soft p-4 sm:p-5">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-cream">
                  <EngineLogo engine={c.engine} tone="brand" className="size-[18px]" />
                  <span className="truncate">
                    {c.engine === "google" ? (
                      <>
                        <span className="hidden sm:inline">Google </span>AI Overview
                      </>
                    ) : (
                      ENGINE_NAME[c.engine]
                    )}
                  </span>
                </p>
                <ol className="mt-3.5 space-y-1.5">
                  {c.names.map((n, i) => {
                    const isYou = c.you === i;
                    return (
                      <motion.li
                        key={n}
                        initial={false}
                        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: shown ? i * 0.08 : 0 }}
                        className={cn(
                          "flex items-baseline gap-2 rounded-md px-2.5 py-1.5 text-[13px]",
                          isYou ? "bg-acid font-semibold text-on-acid" : "bg-cream/[0.05] text-cream/85",
                        )}
                      >
                        <span className={cn("font-mono text-[11px] tabular-nums", isYou ? "text-on-acid/70" : "text-cream/40")}>{i + 1}</span>
                        <span className="truncate">{n}</span>
                      </motion.li>
                    );
                  })}
                </ol>
                <p
                  className={cn(
                    "mt-2.5 text-[11.5px] transition-opacity duration-500",
                    shown ? "opacity-100" : "opacity-0",
                    c.you === null ? "text-cream/45" : "font-medium text-acid-ink",
                  )}
                >
                  {c.you === null ? "You are not named" : `You are #${c.you + 1}`}
                </p>
              </div>
            );
          })}
        </div>

        {/* The verdict */}
        <div className={cn("flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 px-5 py-3.5 transition-opacity duration-700 sm:px-6", step >= 5 ? "opacity-100" : "opacity-0")}>
          <p className="text-[13.5px] text-cream/75">
            Named by <span className="font-semibold text-cream">1 of 4</span> engines for this question
          </p>
          <p className="font-mono text-[11.5px] text-cream/45">20 questions · 4 engines · one report</p>
        </div>
      </div>
    </div>
  );
}
