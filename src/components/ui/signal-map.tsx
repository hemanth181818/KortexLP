import { Wordmark } from "@/components/ui/wordmark";

/**
 * Every connected source, drawn as a labelled line into one Kortex hub.
 *
 * Desktop draws it as an SVG so the lines can converge; below md the same
 * sources stack as a two-column list under the hub, because SVG text scaled
 * to a phone width stops being readable.
 */

const LEFT = ["Shopify", "Meta Ads", "Google Ads", "GA4", "YouTube"];
const RIGHT = ["Search Console", "Microsoft Clarity", "Hotjar", "Creative stack"];

const W = 560;
const H = 330;
const PILL_W = 142;
const PILL_H = 32;
const HUB_W = 150;
const HUB_H = 64;
const HUB_X = (W - HUB_W) / 2;
const HUB_Y = (H - HUB_H) / 2;
const CY = H / 2;

function rows(n: number) {
  const top = 26;
  const gap = (H - top * 2 - PILL_H) / (n - 1);
  return Array.from({ length: n }, (_, i) => top + i * gap + PILL_H / 2);
}

function curve(x1: number, y1: number, x2: number, y2: number) {
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

export function SignalMap() {
  const leftY = rows(LEFT.length);
  const rightY = rows(RIGHT.length);

  const lines = [
    ...LEFT.map((label, i) => ({
      label,
      y: leftY[i],
      d: curve(PILL_W + 8, leftY[i], HUB_X, CY + (leftY[i] - CY) * 0.18),
      side: "left" as const,
    })),
    ...RIGHT.map((label, i) => ({
      label,
      y: rightY[i],
      d: curve(W - PILL_W - 8, rightY[i], HUB_X + HUB_W, CY + (rightY[i] - CY) * 0.18),
      side: "right" as const,
    })),
  ];

  return (
    <>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="hidden md:block w-full h-auto"
        role="img"
        aria-label={`Kortex reads ${[...LEFT, ...RIGHT].join(", ")}`}
      >
        {lines.map((l, i) => (
          <g key={l.label}>
            <path d={l.d} fill="none" stroke="rgba(244,240,230,0.14)" strokeWidth="1" />
            <circle r="2.4" fill="hsl(72 92% 58%)" className="signal-pulse">
              <animateMotion
                dur={`${3.2 + (i % 4) * 0.7}s`}
                begin={`${(i * 0.45).toFixed(2)}s`}
                repeatCount="indefinite"
                path={l.d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.2 1"
              />
            </circle>
            <rect
              x={l.side === "left" ? 8 : W - PILL_W - 8}
              y={l.y - PILL_H / 2}
              width={PILL_W - 8}
              height={PILL_H}
              rx={PILL_H / 2}
              transform={l.side === "left" ? undefined : `translate(8 0)`}
              fill="#121212"
              stroke="rgba(244,240,230,0.12)"
            />
            <text
              x={l.side === "left" ? 8 + (PILL_W - 8) / 2 : W - PILL_W + (PILL_W - 8) / 2}
              y={l.y + 4.5}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="500"
              fill="rgba(244,240,230,0.78)"
              fontFamily="Satoshi, ui-sans-serif, system-ui, sans-serif"
            >
              {l.label}
            </text>
          </g>
        ))}

        {/* Hub */}
        <rect
          x={HUB_X - 10}
          y={HUB_Y - 10}
          width={HUB_W + 20}
          height={HUB_H + 20}
          rx={20}
          fill="hsl(72 92% 58% / 0.06)"
        />
        <rect
          x={HUB_X}
          y={HUB_Y}
          width={HUB_W}
          height={HUB_H}
          rx={14}
          fill="#0d0d0d"
          stroke="hsl(72 92% 58% / 0.55)"
        />
        <text
          x={W / 2}
          y={CY + 5.5}
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          letterSpacing="2.4"
          fill="#F2EFE6"
          fontFamily="Geist, ui-sans-serif, system-ui, sans-serif"
        >
          KORTEX
        </text>
      </svg>

      {/* Phone: hub first, then every source, in one quiet list */}
      <div className="md:hidden">
        <div className="mx-auto w-fit rounded-2xl bg-acid/[0.06] p-2">
          <div className="rounded-xl border border-acid/50 bg-[#0d0d0d] px-7 py-4">
            <Wordmark className="text-[15px]" />
          </div>
        </div>
        <div aria-hidden="true" className="mx-auto h-6 w-px bg-cream/15" />
        <ul className="grid grid-cols-2 gap-2">
          {[...LEFT, ...RIGHT].map((s) => (
            <li
              key={s}
              className="rounded-full border border-cream/10 bg-[#121212] px-3 py-2 text-center text-[13px] font-medium text-cream/75 whitespace-nowrap"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
