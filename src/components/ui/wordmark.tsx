import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/lp/logo-mark";

/** The Kortex wordmark: the mark, then "Kortex" in the page's own sans, sentence case, as on the lead-magnet sites. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-sans text-[17px] font-bold leading-none tracking-[-0.01em] text-cream">Kortex</span>
    </span>
  );
}
