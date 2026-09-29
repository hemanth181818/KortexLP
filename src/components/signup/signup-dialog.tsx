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

type Status = "idle" | "sending" | "done" | "already" | "error";

/**
 * One sign-up per browser.
 *
 * SESSION_KEY is a random id sent with the form; the app refuses a second
 * sign-up from the same id under a different address (and caps sign-ups per
 * network), so clearing this only moves the refusal to the server. DONE_KEY
 * remembers who signed up here, so the dialog says "already on the list"
 * instead of offering the form again. Browser storage can be missing or
 * blocked (private windows), so every access is guarded.
 */
const SESSION_KEY = "kortex:signup-session";
const DONE_KEY = "kortex:signed-up";

function sessionId(): string | undefined {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID().replace(/-/g, "");
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function signedUpHere(): { name: string; email: string } | null {
  try {
    const raw = localStorage.getItem(DONE_KEY);
    return raw ? (JSON.parse(raw) as { name: string; email: string }) : null;
  } catch {
    return null;
  }
}

function rememberSignup(who: { name: string; email: string }) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(who));
  } catch {
    // Nothing to do: the server still refuses a repeat.
  }
}

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
  const earlier = signedUpHere();
  const [status, setStatus] = useState<Status>(earlier ? "already" : "idle");
  const [error, setError] = useState<string | null>(null);
  const [badField, setBadField] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState(earlier ?? { name: "", email: "" });
  // "Did you mean": the address the app suggested, and the one typed.
  const [suggestion, setSuggestion] = useState<{ suggested: string; typed: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const send = async (confirmEmail = false) => {
    const el = formRef.current;
    if (!el) return;
    const form = new FormData(el);
    const body = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
      source: "landing",
      sessionId: sessionId(),
      ...(confirmEmail ? { confirmEmail: true } : {}),
    };
    setStatus("sending");
    setError(null);
    setBadField(null);
    setSuggestion(null);
    try {
      const res = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        field?: string;
        suggestion?: string | null;
        code?: string;
      };
      if (json.code === "already_signed_up") {
        const who = signedUpHere() ?? { name: body.name.trim().split(/\s+/)[0] ?? "", email: "" };
        setSentTo(who);
        setStatus("already");
        return;
      }
      if (json.suggestion) {
        setStatus("error");
        setBadField("email");
        setSuggestion({ suggested: json.suggestion, typed: body.email.trim() });
        return;
      }
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Could not send that. Try again in a minute.");
        setBadField(json.field ?? null);
        return;
      }
      const who = { name: body.name.trim().split(/\s+/)[0] ?? "", email: body.email.trim() };
      rememberSignup(who);
      setSentTo(who);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Could not reach Kortex. Check your connection and try again.");
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send();
  };

  /** Take the suggested address into the field and send. */
  const takeSuggestion = () => {
    const input = formRef.current?.elements.namedItem("email") as HTMLInputElement | null;
    if (input && suggestion) input.value = suggestion.suggested;
    void send();
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

        {status === "already" ? (
          <div className="py-2">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-acid text-on-acid">
              <Check className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <h2 id={titleId} className="mt-5 text-[24px] font-semibold tracking-[-0.02em] text-cream">
              You&apos;re already on the list{sentTo.name ? `, ${sentTo.name}` : ""}.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-cream/65">
              {sentTo.email ? (
                <>
                  We&apos;ll be in touch at <span className="text-cream">{sentTo.email}</span>.
                </>
              ) : (
                <>We&apos;ll be in touch soon.</>
              )}{" "}
              Need to change something? Email{" "}
              <a href="mailto:human@kortexagent.co" className="text-cream underline underline-offset-2">
                human@kortexagent.co
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 h-11 w-full rounded-full border border-cream/15 text-sm font-semibold text-cream hover:bg-cream/5"
            >
              Done
            </button>
          </div>
        ) : status === "done" ? (
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

            <form ref={formRef} className="mt-6 flex flex-col gap-3.5" onSubmit={submit} noValidate={false}>
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

              {suggestion ? (
                <div role="alert" className="flex flex-col gap-2 text-[13.5px] text-cream/80">
                  <p>
                    Did you mean <span className="font-semibold text-cream">{suggestion.suggested}</span>?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={takeSuggestion}
                      className="h-9 rounded-full bg-cream/10 px-3.5 text-[13px] font-semibold text-cream hover:bg-cream/15"
                    >
                      Use {suggestion.suggested.split("@")[1]}
                    </button>
                    <button
                      type="button"
                      onClick={() => void send(true)}
                      className="h-9 rounded-full px-3.5 text-[13px] text-cream/65 underline-offset-2 hover:text-cream hover:underline"
                    >
                      Keep {suggestion.typed.split("@")[1]}
                    </button>
                  </div>
                </div>
              ) : null}

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
