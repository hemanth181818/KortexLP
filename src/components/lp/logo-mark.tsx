import { cn } from "@/lib/utils";

/**
 * The Kortex mark, shared by every Kortex product (from Hemanth, 2026-10-09):
 * an eight-point asterisk with round ends on a rounded square. Lime on ink on
 * the dark theme, ink on lime on the light one.
 */
const SPOKES = "M512 286V738M286 512H738M352 352L672 672M672 352L352 672";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" className={cn("logo-mark size-[24px] shrink-0", className)}>
      <rect width="1024" height="1024" rx="230" className="logo-mark-ground" />
      <path d={SPOKES} strokeWidth="62" strokeLinecap="round" fill="none" className="logo-mark-spokes" />
    </svg>
  );
}
