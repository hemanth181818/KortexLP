"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Wordmark } from "@/components/ui/wordmark";
import { APP_URL, SIGN_IN_URL } from "@/lib/links";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet closes on Escape and never outlives a resize to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        solid
          ? "bg-ink/80 backdrop-blur-xl border-b border-cream/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-5 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        <a href="#top" aria-label="Kortex home" className="py-2" onClick={() => setOpen(false)}>
          <Wordmark className="text-[15px]" />
        </a>

        {/* Section links: desktop */}
        <ul
          className="hidden md:flex relative items-center gap-0.5 rounded-full border border-cream/10 bg-ink-soft/50 backdrop-blur-xl p-1"
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
          {links.map((l) => (
            <Tab key={l.href} setPosition={setPosition} href={l.href}>
              {l.label}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={SIGN_IN_URL}
            className="hidden sm:inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-cream/70 hover:text-cream transition-colors"
          >
            Sign in
          </a>
          <a
            href={APP_URL}
            className="inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-full bg-acid pl-4 pr-3.5 text-sm font-semibold text-ink-deep hover:bg-acid-glow transition-colors"
          >
            Get started
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-cream/80 hover:text-cream hover:bg-cream/5"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-cream/10"
          >
            <ul className="container mx-auto px-5 py-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center border-b border-cream/[0.06] text-[17px] font-medium text-cream/85 hover:text-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SIGN_IN_URL}
                  className="flex h-12 items-center text-[17px] font-medium text-cream/60 hover:text-cream"
                >
                  Sign in
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
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
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block"
    >
      <a
        href={href}
        className="block rounded-full px-4 py-1.5 text-[13.5px] font-medium text-cream/65 hover:text-cream transition-colors"
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
      aria-hidden="true"
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="absolute z-0 top-1 bottom-1 rounded-full bg-cream/[0.07]"
    />
  );
};
