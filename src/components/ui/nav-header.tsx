"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Approach", href: "#workflow" },
  { label: "Stack", href: "#connections" },
  { label: "Agents", href: "#agents" },
  { label: "Demo", href: "#example" },
  { label: "Edge", href: "#system" },
];

export function NavHeader() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-xl border-b border-cream/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label="Kortex home"
          >
            <span
              aria-hidden="true"
              className="grid place-items-center h-8 w-8 rounded-md border border-acid/40 bg-acid/10 text-acid font-display italic text-lg leading-none acid-glow-soft"
            >
              K
            </span>
            <span className="font-display italic text-xl text-cream group-hover:text-acid transition-colors">
              Kortex
            </span>
          </a>

          {/* Pill nav: desktop */}
          <div className="hidden md:block">
            <ul
              className="relative flex items-center gap-1 rounded-full border border-cream/15 bg-ink-soft/60 backdrop-blur-xl px-2 py-1.5"
              onMouseLeave={() =>
                setPosition((pv) => ({ ...pv, opacity: 0 }))
              }
            >
              {links.map((l) => (
                <Tab key={l.href} setPosition={setPosition} href={l.href}>
                  {l.label}
                </Tab>
              ))}
              <Cursor position={position} />
            </ul>
          </div>

          {/* Mobile: horizontal scroll list */}
          <div className="md:hidden flex-1 overflow-x-auto -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex items-center gap-1 whitespace-nowrap">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block px-3 py-2 text-xs font-mono uppercase tracking-[0.16em] text-cream/65 hover:text-cream min-h-[44px] flex items-center"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <a
        href={href}
        className="block px-4 py-2 text-xs sm:text-[13px] font-mono uppercase tracking-[0.16em] text-cream/65 hover:text-cream transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="absolute z-0 h-[34px] rounded-full bg-acid/15 border border-acid/40"
    />
  );
};
