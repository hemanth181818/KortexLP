import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A pill button whose label slides away on hover while a fill grows from a
 * dot to cover it, bringing the label back with an arrow. Coloured for the
 * landing page: lime at rest; the dot and its fill black on the light theme and white on the
 * dark one, with the label in the opposite colour (--hb-fill, --hb-text).
 */
interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-transparent bg-acid py-2 pl-9 pr-6 text-center font-semibold text-on-acid transition-colors delay-150 duration-150 hover:bg-[var(--hb-fill)]",
        className,
      )}
      {...props}
    >
      <span className="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">{text}</span>
      <div className="absolute inset-y-0 left-0 z-10 flex w-full translate-x-12 items-center justify-center gap-2 whitespace-nowrap text-[var(--hb-text)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="size-4" />
      </div>
      <div className="absolute left-4 top-1/2 h-2 w-2 -translate-y-1/2 scale-[1] rounded-lg bg-[#141210] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0 group-hover:scale-[1.8] group-hover:bg-[var(--hb-fill)]" />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
