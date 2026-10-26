import { useState } from "react";
import { EngineLogo } from "@/components/lp/engine-logos";
import { AI_BY_ASSISTANT, BY_ENGINE, BY_KIND, WEEKS } from "@/content/case-studies/kreo";
import { cn } from "@/lib/utils";

/**
 * The charts of Kreo's case study, on the case study page and in the home page's proof section. No chart
 * library: the weekly chart is one SVG with this year in lime and last year in grey, a legend, the last
 * values labelled at the line ends, and the week's numbers on hover or focus; the bars carry their counts
 * in text beside them, so nothing is read from colour or length alone.
 */

const fmt = (n: number) => n.toLocaleString("en-IN");
const dayMonth = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });

/** A clean top for the y axis: 1, 2 or 5 times a power of ten, at or above the largest value. */
function niceMax(v: number): number {
  const p = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 2.5, 5, 10].map((m) => m * p).find((m) => m >= v) ?? 10 * p;
}

export function WeekChart({ metric, title, className }: { metric: "ai" | "clicks"; title: string; className?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const now = WEEKS.map((w) => (metric === "ai" ? w.ai : w.clicks));
  const then = WEEKS.map((w) => (metric === "ai" ? w.aiLastYear : w.clicksLastYear));
  const W = 640;
  const H = 240;
  const pad = { l: 44, r: 16, t: 14, b: 26 };
  const max = niceMax(Math.max(...now, ...then));
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (WEEKS.length - 1);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const path = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const ticks = [0, max / 2, max];
  const h = hover ?? WEEKS.length - 1;
  return (
    <figure className={cn("rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <figcaption className="text-[14px] font-semibold text-cream">{title}</figcaption>
        <ul className="flex items-center gap-4 text-[12.5px] text-cream/60" aria-label="Legend">
          <li className="flex items-center gap-1.5">
            <span className="h-[3px] w-4 rounded-full bg-acid-line" aria-hidden="true" />
            2026
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-[3px] w-4 rounded-full bg-cream/35" aria-hidden="true" />
            Same week, 2025
          </li>
        </ul>
      </div>
      <p className="mt-2 text-[13px] text-cream/60" aria-live="polite">
        Week of {dayMonth(WEEKS[h].week)}: <span className="font-semibold text-cream">{fmt(now[h])}</span> against {fmt(then[h])} a year before
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 block h-auto w-full" role="img" aria-label={`${title}, weekly, 2026 against 2025`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="stroke-cream/10" strokeWidth={1} />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="fill-cream/45 text-[11px]">
              {t >= 1000 ? `${t / 1000}k` : t}
            </text>
          </g>
        ))}
        {[0, 5, 10].map((i) => (
          <text key={i} x={x(i)} y={H - 6} textAnchor={i ? "middle" : "start"} className="fill-cream/45 text-[11px]">
            {dayMonth(WEEKS[i].week)}
          </text>
        ))}
        <line x1={x(h)} x2={x(h)} y1={pad.t} y2={H - pad.b} className="stroke-cream/20" strokeWidth={1} />
        <path d={path(then)} fill="none" className="stroke-cream/35" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <path d={path(now)} fill="none" className="stroke-acid-line" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(h)} cy={y(then[h])} r={4} className="fill-ink-soft stroke-cream/50" strokeWidth={2} />
        <circle cx={x(h)} cy={y(now[h])} r={4.5} className="fill-ink-soft stroke-acid-line" strokeWidth={2.5} />
        {WEEKS.map((w, i) => (
          <rect
            key={w.week}
            x={x(i) - (W - pad.l - pad.r) / (WEEKS.length - 1) / 2}
            y={pad.t}
            width={(W - pad.l - pad.r) / (WEEKS.length - 1)}
            height={H - pad.t - pad.b}
            fill="transparent"
            tabIndex={0}
            aria-label={`Week of ${dayMonth(w.week)}: ${fmt(now[i])}, against ${fmt(then[i])} in 2025`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onBlur={() => setHover(null)}
            className="cursor-crosshair outline-none"
          />
        ))}
      </svg>
    </figure>
  );
}

function Bar({ value, of, muted }: { value: number; of: number; muted?: boolean }) {
  return (
    <span className="relative block h-2 flex-1 overflow-hidden rounded-full bg-cream/[0.08]" title={`${fmt(value)} of ${fmt(of)}`}>
      <span
        className={cn("absolute inset-y-0 left-0 rounded-full", muted ? "bg-cream/40" : "bg-acid-line")}
        style={{ width: `${Math.max((value / of) * 100, value ? 1.5 : 0)}%` }}
      />
    </span>
  );
}

/** Visits from AI assistants in the 13 weeks, by assistant. */
export function AssistantBars({ className }: { className?: string }) {
  const top = AI_BY_ASSISTANT[0].visits;
  return (
    <figure className={cn("rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 sm:p-6", className)}>
      <figcaption className="text-[14px] font-semibold text-cream">Visits by assistant, 27 July to 25 October</figcaption>
      <ul className="mt-5 space-y-4">
        {AI_BY_ASSISTANT.map((a) => (
          <li key={a.label} className="flex items-center gap-3 sm:gap-4">
            <span className="w-[6.5rem] shrink-0 text-[14px] font-medium text-cream/85">{a.label}</span>
            <Bar value={a.visits} of={top} />
            <span className="w-[3.5rem] shrink-0 text-right font-mono text-[13.5px] tabular-nums text-cream/80">{fmt(a.visits)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Answers that name Kreo, per engine, in the 2026-10-08 audit. */
export function EngineBars({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 sm:p-6", className)}>
      <figcaption className="text-[14px] font-semibold text-cream">Answers that name Kreo, by engine</figcaption>
      <ul className="mt-5 space-y-4">
        {BY_ENGINE.map((e) => (
          <li key={e.engine} className="flex items-center gap-3 sm:gap-4">
            <span className="flex w-[9.5rem] shrink-0 items-center gap-2 text-[14px] font-medium text-cream/85 sm:w-[11rem]">
              <EngineLogo engine={e.engine} tone="brand" className="size-[17px]" />
              {e.label}
            </span>
            <Bar value={e.named} of={e.of} muted />
            <span className="w-[4.5rem] shrink-0 text-right font-mono text-[13.5px] tabular-nums text-cream/80">
              {e.named} of {e.of}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Answers that name Kreo, per kind of question, in the 2026-10-08 audit. */
export function KindBars({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-2xl border border-cream/10 bg-ink-soft/70 p-5 sm:p-6", className)}>
      <figcaption className="text-[14px] font-semibold text-cream">Answers that name Kreo, by the kind of question</figcaption>
      <ul className="mt-5 space-y-4">
        {BY_KIND.map((k) => (
          <li key={k.kind}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="w-[7.5rem] shrink-0 text-[14px] font-medium text-cream/85">{k.kind}</span>
              <Bar value={k.named} of={k.of} muted />
              <span className="w-[4.5rem] shrink-0 text-right font-mono text-[13.5px] tabular-nums text-cream/80">
                {k.named} of {k.of}
              </span>
            </div>
            <p className="mt-1 pl-[8.25rem] text-[12.5px] text-cream/45 sm:pl-[8.5rem]">{k.example}</p>
          </li>
        ))}
      </ul>
    </figure>
  );
}
