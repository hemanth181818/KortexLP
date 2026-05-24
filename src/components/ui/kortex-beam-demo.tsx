"use client";

import { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

/**
 * Round node that hosts a brand mark.
 * Cream surface so brand-colored logos read clearly.
 */
const Node = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => {
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border border-cream/15 bg-cream text-ink-deep shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Node.displayName = "Node";

/**
 * Six marketing platforms converging on the Kortex cortex.
 * Brand marks are original simplified SVGs using each platform's
 * distinctive silhouette and signature color.
 */
export default function KortexBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const meta = useRef<HTMLDivElement>(null);
  const google = useRef<HTMLDivElement>(null);
  const shopify = useRef<HTMLDivElement>(null);
  const ga4 = useRef<HTMLDivElement>(null);
  const klaviyo = useRef<HTMLDivElement>(null);
  const tiktok = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[360px] sm:h-[400px] w-full max-w-3xl mx-auto items-center justify-center overflow-hidden rounded-xl border border-cream/10 bg-ink-soft/80 backdrop-blur-md p-6 sm:p-8 shadow-2xl"
    >
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint opacity-40"
      />

      <div className="relative flex h-full w-full max-h-[240px] max-w-md flex-col items-stretch justify-between gap-8">
        <div className="flex flex-row items-center justify-between">
          <Node ref={meta} label="Meta Ads">
            <Logo.Meta />
          </Node>
          <Node ref={ga4} label="GA4">
            <Logo.GA4 />
          </Node>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Node ref={google} label="Google Ads">
            <Logo.GoogleAds />
          </Node>
          <Node
            ref={core}
            label="Kortex"
            className="size-20 bg-ink-deep border-acid/50 acid-glow-soft text-acid"
          >
            <span className="font-display italic text-3xl leading-none">K</span>
          </Node>
          <Node ref={klaviyo} label="Klaviyo">
            <Logo.Klaviyo />
          </Node>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Node ref={shopify} label="Shopify">
            <Logo.Shopify />
          </Node>
          <Node ref={tiktok} label="TikTok">
            <Logo.TikTok />
          </Node>
        </div>
      </div>

      {/* Beams converging on the K core */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={meta}
        toRef={core}
        curvature={-70}
        endYOffset={-10}
      />
      <AnimatedBeam containerRef={containerRef} fromRef={google} toRef={core} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={shopify}
        toRef={core}
        curvature={70}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={ga4}
        toRef={core}
        curvature={-70}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={klaviyo}
        toRef={core}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tiktok}
        toRef={core}
        curvature={70}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand marks                                                        */
/*  Original simplified SVGs. Each captures the platform's distinctive */
/*  silhouette and uses its signature brand color(s).                  */
/* ------------------------------------------------------------------ */
const Logo = {
  // Meta: two interlocking loops in Meta blue gradient (infinity / Möbius mark)
  Meta: () => (
    <svg
      viewBox="0 0 36 20"
      className="h-6 w-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="meta-grad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#0064E1" />
          <stop offset="55%" stopColor="#0073EE" />
          <stop offset="100%" stopColor="#0082FB" />
        </linearGradient>
      </defs>
      {/* Left loop */}
      <ellipse
        cx="11"
        cy="10"
        rx="8"
        ry="6.5"
        fill="none"
        stroke="url(#meta-grad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Right loop */}
      <ellipse
        cx="25"
        cy="10"
        rx="8"
        ry="6.5"
        fill="none"
        stroke="url(#meta-grad)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  ),

  // Google Ads: stylized G in Google's four brand colors
  GoogleAds: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
      {/* Blue arc (right) */}
      <path
        d="M22.5 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      {/* Green arc (bottom) */}
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.85 0-5.27-1.93-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      {/* Yellow arc (bottom-left) */}
      <path
        d="M5.87 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.69-2.84z"
        fill="#FBBC04"
      />
      {/* Red arc (top) */}
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.69 2.84C6.74 7.3 9.15 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  ),

  // Shopify: green shopping bag silhouette with white S inside
  Shopify: () => (
    <svg viewBox="0 0 24 26" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
      {/* Bag body */}
      <path
        d="M5.6 5.4c.3-2.4 2-4.4 4.3-4.4 1.7 0 2.8.9 3.4 2.3.4-.2.9-.3 1.4-.3 1.8 0 3.1 1.5 3.6 3.5l2.6.6c.5.1.8.4.8.9l1.3 15.4c0 .5-.3 1-.8 1.1L12 25.5l-10.4-1c-.5-.1-.8-.5-.8-1L2.1 8c0-.5.4-.9.9-1L5.6 5.4zm2.3.4l3.1-.7c-.2-1.4-.8-2.3-1.7-2.3-.7 0-1.3.7-1.4 3zm5-.4l2-.4c-.3-1.1-.9-1.7-1.6-1.7-.4 0-.8.3-1 .8.3.4.4.8.6 1.3z"
        fill="#95BF47"
      />
      {/* Right-side darker accent */}
      <path
        d="M19.3 5.5l-2.6-.6c-.5-2-1.8-3.5-3.6-3.5l.1 24.2 8.7-1.1c.5-.1.8-.6.8-1.1L21.4 8c0-.5-.4-.9-.9-1z"
        fill="#5E8E3E"
      />
      {/* White S */}
      <path
        d="M13.5 9.5c-.6-.3-1.4-.5-2.3-.5-2 .1-3.4 1.4-3.3 3 .1 1.7 2.1 2.3 2.7 4 .2.6.1 1.3-.5 1.7-.6.4-1.4.3-2 0-.7-.3-1.4-.7-1.4-.7l-.3 1.5s1.4 1.1 3.3 1c2.2-.1 3.5-1.6 3.4-3.5-.1-2.4-3-2.9-2.9-4.1 0-.5.5-.8 1.2-.8.7 0 1.4.3 1.7.5l.4-2.1z"
        fill="#fff"
      />
    </svg>
  ),

  // GA4: three orange elements (tall bar + medium bar + circle)
  GA4: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="2" width="6" height="20" rx="3" fill="#F9AB00" />
      <rect x="9" y="9" width="6" height="13" rx="3" fill="#E37400" />
      <circle cx="5" cy="19" r="3" fill="#E37400" />
    </svg>
  ),

  // Klaviyo: two stacked curves forming the K mark
  Klaviyo: () => (
    <svg viewBox="0 0 24 18" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
      {/* Outer arched curve */}
      <path
        d="M12 6c-3.4 0-6.6 1.4-9 3.8L0 6.6C3.2 3 7.5 1 12 1s8.8 2 12 5.6L21 9.8C18.6 7.4 15.4 6 12 6z"
        fill="#1A1A1A"
      />
      {/* Inner dot for the K's pivot */}
      <circle cx="12" cy="11.5" r="3" fill="#1A1A1A" />
    </svg>
  ),

  // TikTok: eighth-note silhouette with red and cyan offset layers
  TikTok: () => (
    <svg viewBox="0 0 24 28" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
      {/* Cyan offset (left) */}
      <path
        d="M14.5 2.5c.3 2.3 1.8 4.1 4 4.9V11c-1.6 0-3.1-.5-4.3-1.4v6.9c0 3.5-2.8 6.3-6.3 6.3-1.3 0-2.5-.4-3.5-1.1.9.4 1.9.6 2.9.6 3.4 0 6.1-2.7 6.2-6V2.5h1z"
        fill="#25F4EE"
        transform="translate(-1.3,0)"
      />
      {/* Red offset (right) */}
      <path
        d="M14.5 2.5c.3 2.3 1.8 4.1 4 4.9V11c-1.6 0-3.1-.5-4.3-1.4v6.9c0 3.5-2.8 6.3-6.3 6.3-1.3 0-2.5-.4-3.5-1.1.9.4 1.9.6 2.9.6 3.4 0 6.1-2.7 6.2-6V2.5h1z"
        fill="#FE2C55"
        transform="translate(1.3,0)"
      />
      {/* Main black note on top */}
      <path
        d="M14.5 2.5c.3 2.3 1.8 4.1 4 4.9V11c-1.6 0-3.1-.5-4.3-1.4v6.9c0 3.5-2.8 6.3-6.3 6.3s-6.3-2.8-6.3-6.3 2.8-6.3 6.3-6.3c.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.1-.9-.1-1.7 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3V2.5h3.6z"
        fill="#0F0F0F"
      />
    </svg>
  ),
};
