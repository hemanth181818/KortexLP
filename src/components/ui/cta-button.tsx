import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export function CTAButton({
  text = "Book a demo",
  onClick,
  href,
  className,
  variant = "default",
}: CTAButtonProps) {
  const handle = () => {
    if (onClick) return onClick();
    if (href) {
      if (href.startsWith("#")) {
        document
          .getElementById(href.slice(1))
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <Button
      onClick={handle}
      variant={variant}
      size="lg"
      className={cn("group", className)}
    >
      {text}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Button>
  );
}
