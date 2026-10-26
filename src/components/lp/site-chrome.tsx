import { useEffect, useState, type FormEvent } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useSignup } from "@/components/signup/signup-dialog";
import { CONTACT_EMAIL } from "@/lib/links";
import { FOOTER_COLUMNS, HEADER_LINKS } from "@/content/nav";
import { cn } from "@/lib/utils";

/**
 * The header, email box and footer every page shares, so the content pages are
 * the same site as the home page. `home` keeps the home page's in-page anchors
 * (#top); elsewhere the wordmark goes home.
 */

export function SiteHeader({ home = false, current }: { home?: boolean; current?: string }) {
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
      className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled ? "glass-bar" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-6">
        <a href={home ? "#top" : "/"} aria-label={home ? "Kortex, back to top" : "Kortex home"} className="py-2">
          <Wordmark />
        </a>
        <div className="flex items-center gap-1">
          {/* The home page keeps its header bare: one thing to do there, the audit (Hemanth, 2026-10-21). */}
          <ul className={cn("mr-2 hidden items-center gap-1", !home && "md:flex")}>
            {HEADER_LINKS.map((l) => {
              const active = current === l.href || (current?.startsWith(l.href + "/") ?? false);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-[14px] font-medium transition-colors hover:text-cream",
                      active ? "text-cream" : "text-cream/65",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

/** The email box: what they type goes straight into the sign-up form. */
export function EmailBox({ id }: { id: string }) {
  const { open } = useSignup();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    open(email);
  };
  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-[34rem] items-center gap-1.5 rounded-full border border-cream/15 bg-ink-soft/90 p-1.5 transition-colors focus-within:border-acid/60"
    >
      <label htmlFor={id} className="sr-only">
        Work email
      </label>
      <input
        id={id}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@company.com"
        maxLength={254}
        className="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-cream outline-none placeholder:text-cream/35 focus-visible:outline-none"
      />
      <InteractiveHoverButton type="submit" text="Get early access" className="h-11 shrink-0 text-[15px]" />
    </form>
  );
}

/** The closing ask, as at the foot of the home page. */
export function EarlyAccess({
  id = "email-final",
  title = "Start each day with the fixes, not the dashboard.",
}: {
  id?: string;
  title?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1240px] px-5 py-24 text-center sm:px-6 lg:py-32">
        <h2 className="font-display mx-auto max-w-[44rem] text-balance text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1] tracking-[-0.015em]">{title}</h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[16px] text-cream/65">Leave your work email and we will let you know when your access is ready.</p>
        <div className="mt-9">
          <EmailBox id={id} />
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ home = false }: { home?: boolean }) {
  const { open } = useSignup();
  return (
    <footer data-theme="dark" className="footer-block relative px-5 pb-10 pt-16 text-cream sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href={home ? "#top" : "/"} className="inline-block py-1" aria-label={home ? "Kortex, back to top" : "Kortex home"}>
              <Wordmark />
            </a>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-cream/60">Kortex shows whether AI recommends you, then helps you get named and runs your ads.</p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[13px] font-semibold text-cream/85">{col.title}</h4>
              <ul className="space-y-2.5">
                {/* Not on the home page: there the one thing to do is the audit. */}
                {col.title === "Product" && !home && (
                  <li>
                    <button type="button" onClick={() => open()} className="text-left text-sm text-cream/60 transition-colors hover:text-acid-ink">
                      Get early access
                    </button>
                  </li>
                )}
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-cream/60 transition-colors hover:text-acid-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-cream/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-cream/40">© {new Date().getFullYear()} Kortex · Built for operators.</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[13px] text-cream/50 hover:text-cream">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
