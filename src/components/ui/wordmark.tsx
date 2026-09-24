import { cn } from "@/lib/utils";

/** The Kortex wordmark: Geist 600, uppercase, wide tracking. No tile, no glyph. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-brand font-semibold uppercase tracking-[0.15em] text-cream leading-none",
        className
      )}
    >
      Kortex
    </span>
  );
}
