import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

import { LEADS_URL, PRIVACY_URL } from "@/lib/links";

/**
 * The sign-up form, as one dialog any button on the page can open.
 *
 * Three fields and nothing else: name, company, work email. It posts to the
 * app, which stores the request as a lead and sends the thank-you email.
 * Access is still granted by hand from the operator console; this is a
 * request, not an account.
 */

type Ctx = { open: () => void };
const SignupContext = createContext<Ctx>({ open: () => {} });

export function useSignup() {
  return useContext(SignupContext);
}

type Status = "idle" | "sending" | "done" | "error";

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Back to the button that opened it, for keyboard users.
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  return (
    <SignupContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>{isOpen && <SignupDialog onClose={close} />}</AnimatePresence>
    </SignupContext.Provider>
  );
}

function SignupDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const first = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [badField, setBadField] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState({ name: "", email: "" });

  // Focus the first field, close on Escape, and hold the page still behind it.
  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
      source: "landing",
    };
    setStatus("sending");
    setError(null);
    setBadField(null);
    try {
      const res = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; field?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Could not send that. Try again in a minute.");
        setBadField(json.field ?? null);
        return;
      }
      setSentTo({ name: body.name.trim().split(/\s+/)[0] ?? "", email: body.email.trim() });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Could not reach Kortex. Check your connection and try again.");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-ink-deep/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full sm:max-w-[440px] rounded-t-2xl sm:rounded-2xl border border-cream/10 bg-ink-soft p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-cream/50 hover:text-cream hover:bg-cream/5"
        >
          <X className="h-[18px] w-[18px]" />
        </button>

        {status === "done" ? (
          <div className="py-2">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-acid text-on-acid">
              <Check className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <h2 id={titleId} className="mt-5 text-[24px] font-semibold tracking-[-0.02em] text-cream">
              Thanks{sentTo.name ? `, ${sentTo.name}` : ""}. You&apos;re on the list.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-cream/65">
              We&apos;ll be in touch at <span className="text-cream">{sentTo.email}</span> within a
              couple of days.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 h-11 w-full rounded-full border border-cream/15 text-sm font-semibold text-cream hover:bg-cream/5"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className="pr-10 text-[24px] font-semibold tracking-[-0.02em] text-cream">
              Sign up for Kortex
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-cream/60">
              Tell us who you are and we&apos;ll get you set up.
            </p>

            <form className="mt-6 flex flex-col gap-3.5" onSubmit={submit} noValidate={false}>
              <Field label="Name" name="name" autoComplete="name" inputRef={first} invalid={badField === "name"} />
              <Field label="Company" name="company" autoComplete="organization" invalid={badField === "company"} />
              <Field
                label="Work email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                invalid={badField === "email"}
              />

              {/* Honeypot. Off-screen and out of the tab order; people never
                  see it, and form-filling bots do. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label>
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {error ? (
                <p role="alert" className="text-[13.5px] text-[hsl(0_75%_62%)] [[data-theme=light]_&]:text-[hsl(0_70%_42%)]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1.5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-acid text-[15px] font-semibold text-on-acid hover:bg-acid-glow transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Sign up"}
                {status !== "sending" && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>

              <p className="text-center text-[12.5px] text-cream/45">
                We only use this to get in touch about Kortex.{" "}
                <a href={PRIVACY_URL} className="underline underline-offset-2 hover:text-cream">
                  Privacy
                </a>
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  inputRef,
  invalid,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
  inputRef?: React.Ref<HTMLInputElement>;
  invalid?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-cream/75">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        required
        maxLength={name === "email" ? 254 : name === "company" ? 160 : 120}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={invalid || undefined}
        className="h-12 rounded-xl border border-cream/12 bg-ink px-4 text-[15px] text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-cream/35 aria-[invalid]:border-[hsl(0_70%_55%)]"
      />
    </div>
  );
}
