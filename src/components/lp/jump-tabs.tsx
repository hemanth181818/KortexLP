import { useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The home page's jump bar: one glass pill of links to the page's own sections, with a highlight that
 * slides to the link under the pointer. It is the section bar from kortexagent.co's first header
 * (src/components/ui/nav-header.tsx before 43685bd), moved into the hero (Hemanth, 2026-10-26: "add
 * buttons which redirect to the exact part of the page so it pushes the user without deep scrolling").
 * On phones the pill wraps instead of sliding.
 */

type Pos = { left: number; top: number; width: number; height: number; opacity: number };

export function JumpTabs({ links, className }: { links: Array<{ label: string; href: string }>; className?: string }) {
  const [pos, setPos] = useState<Pos>({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  return (
    <nav aria-label="On this page" className={className}>
      <ul
        className="glass relative mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-0.5 rounded-[22px] p-1 sm:rounded-full"
        onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
      >
        {links.map((l) => (
          <Tab key={l.href} href={l.href} setPos={setPos}>
            {l.label}
          </Tab>
        ))}
        <motion.li aria-hidden="true" animate={pos} transition={{ type: "spring", stiffness: 350, damping: 30 }} className="absolute z-0 rounded-full bg-cream/[0.09]" />
      </ul>
    </nav>
  );
}

function Tab({ href, setPos, children }: { href: string; setPos: Dispatch<SetStateAction<Pos>>; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const hover = () => {
    const el = ref.current;
    if (!el) return;
    setPos({ left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight, opacity: 1 });
  };
  return (
    <li ref={ref} onMouseEnter={hover} className="relative z-10 block">
      <a
        href={href}
        onFocus={hover}
        className={cn("block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-cream/70 transition-colors hover:text-cream sm:px-4")}
      >
        {children}
      </a>
    </li>
  );
}
