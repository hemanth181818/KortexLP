import { APP_URL } from "@/lib/links";

/**
 * One page view per load, sent to the app (the operator console's Analytics
 * tab). The page is static, so the browser sends it itself, as a beacon with
 * a text/plain body: no preflight, and it still goes if the person leaves.
 *
 * The visitor is the same random browser id the sign-up form sends
 * (signup-dialog.tsx), which is how a waitlist sign-up is matched to the
 * visits before it. A session ends after 30 minutes without a view. Browser
 * storage can be blocked (private windows): then nothing is sent.
 */
export const TRACK_URL = import.meta.env.VITE_TRACK_URL || `${APP_URL}/api/ext/track/landing`;
const VISITOR_KEY = "kortex:signup-session";
const SESSION_KEY = "kortex:visit";
const SESSION_MS = 30 * 60_000;

const newId = () => crypto.randomUUID().replace(/-/g, "");

export function trackView(): void {
  try {
    let visitor = localStorage.getItem(VISITOR_KEY);
    if (!visitor) {
      visitor = newId();
      localStorage.setItem(VISITOR_KEY, visitor);
    }
    const now = Date.now();
    const last = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null") as { id: string; at: number } | null;
    const session = last && now - last.at < SESSION_MS ? last.id : newId();
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: session, at: now }));
    const params = new URLSearchParams(location.search);
    const body = JSON.stringify({
      path: location.pathname,
      referrer: document.referrer || null,
      source: params.get("utm_source") ?? params.get("ref"),
      visitor,
      session,
    });
    navigator.sendBeacon?.(TRACK_URL, new Blob([body], { type: "text/plain" }));
  } catch {
    // Storage blocked or no beacon: the view is not counted.
  }
}
