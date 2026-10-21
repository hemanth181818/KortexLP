import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's product shot: one question a customer asks, put to each engine the audit asks, and
 * whether the answer names you or someone else. The rows arrive one by one, as the audit reads them.
 * The question, the names and the numbers are made up; the engines and the fixes are the audit's own (Google's AI Overview
 * is read for searches like this one).
 */

type Row = { engine: string; named: boolean; instead: string[] };

const QUESTION = "Which accounting software should a small agency use?";

const ROWS: Row[] = [
  { engine: "ChatGPT", named: false, instead: ["Ledgerly", "Numbra", "Tallypoint"] },
  { engine: "Claude", named: false, instead: ["Numbra", "Booksy"] },
  { engine: "Google AI Overview", named: true, instead: ["Ledgerly", "Numbra"] },
];

export function AnswersBoard({ className }: { className?: string }) {
  const still = useReducedMotion();
  const [shown, setShown] = useState(still ? ROWS.length + 1 : 0);
  useEffect(() => {
    if (still || shown > ROWS.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 500 : 650);
    return () => clearTimeout(t);
  }, [still, shown]);

  return (
    <div className={cn("rounded-[22px] bg-gradient-to-b from-cream/25 via-cream/10 to-cream/[0.03] p-px", className)}>
      <div className="overflow-hidden rounded-[21px] bg-ink-soft text-left">
        <div className="flex items-center gap-3 border-b border-cream/10 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
            <span className="size-2.5 rounded-full bg-cream/15" />
          </span>
          <span className="mx-auto truncate font-mono text-[11.5px] text-cream/40">visibility.kortexagent.co</span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7">
          <p className="text-[12.5px] text-cream/45">A question your customers ask</p>
          <p className="mt-1.5 text-pretty text-[17px] font-medium leading-snug text-cream sm:text-[19px]">&ldquo;{QUESTION}&rdquo;</p>

          <ul className="mt-5 divide-y divide-cream/10 overflow-hidden rounded-2xl border border-cream/10">
            {ROWS.map((r, i) => (
              <li
                key={r.engine}
                className={cn(
                  "grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 transition-opacity duration-500 sm:grid-cols-[11rem_1fr_auto]",
                  shown > i ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="text-[14px] font-semibold text-cream">{r.engine}</span>
                <span className="col-span-2 row-start-2 truncate text-[13px] text-cream/50 sm:col-span-1 sm:row-start-auto">
                  Named {r.instead.join(", ")}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium",
                    r.named ? "bg-acid/15 text-acid-ink" : "bg-cream/[0.07] text-cream/60",
                  )}
                >
                  {r.named ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                  {r.named ? "Named you" : "Left you out"}
                </span>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream/[0.04] px-4 py-3 transition-opacity duration-500",
              shown > ROWS.length ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="text-[13.5px] text-cream/70">
              Named in <span className="font-semibold text-cream">1 of 3</span> answers
            </span>
            <span className="text-[13.5px] font-medium text-acid-ink">4 fixes written for you</span>
          </div>
        </div>
      </div>
    </div>
  );
}
