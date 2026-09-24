import { Wordmark } from "@/components/ui/wordmark";

/**
 * Every connected source feeding one Kortex hub, drawn as a tree rather than
 * nine crossing curves: hub, one stem, a bus, and three columns of sources.
 *
 * Columns are grouped by what the source is (paid, store and search, on-site
 * and creative) so the tidy grid also carries some meaning.
 */
const COLUMNS = [
  ["Meta Ads", "Google Ads", "YouTube"],
  ["Shopify", "GA4", "Search Console"],
  ["Microsoft Clarity", "Hotjar", "Creative stack"],
];

const LINE = "bg-cream/15";

export function SignalMap() {
  return (
    <div role="img" aria-label={`Kortex reads ${COLUMNS.flat().join(", ")}`}>
      {/* Hub */}
      <div className="mx-auto w-fit rounded-2xl bg-acid/[0.06] p-1.5">
        <div className="flex items-center gap-3 rounded-xl border border-acid/50 bg-ink-soft px-7 py-4">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-acid/60 animate-ping motion-reduce:hidden" />
            <span className="relative h-2 w-2 rounded-full bg-acid" />
          </span>
          <Wordmark className="text-[15px]" />
        </div>
      </div>

      {/* Stem, then a bus with one drop per column (desktop) */}
      <div aria-hidden="true" className={`mx-auto h-7 w-px ${LINE}`} />
      <div aria-hidden="true" className="relative hidden md:block h-6">
        <div className={`absolute top-0 left-[16.667%] right-[16.667%] h-px ${LINE}`} />
        {["16.667%", "50%", "83.333%"].map((x) => (
          <div key={x} className={`absolute top-0 h-6 w-px ${LINE}`} style={{ left: x }} />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {COLUMNS.map((col, ci) => (
          <ul key={ci} className="contents md:flex md:flex-col md:gap-2.5">
            {col.map((s) => (
              <li
                key={s}
                className="flex h-11 items-center justify-center rounded-xl border border-cream/10 bg-ink-soft px-3 text-[13.5px] font-medium text-cream/75 whitespace-nowrap"
              >
                {s}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
