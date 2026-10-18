# Kortex — Landing Page

The AI growth command center for e-commerce and app marketers.

Rebuilt as a Vite + React + TypeScript + Tailwind + shadcn/ui stack, with
distinctive components ported and rethemed from a React reference repo
(VexosWebsite) — recolored from a generic dark-AI-purple palette to Kortex's
own **acid-lime-on-ink** signature.

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS** with custom Kortex tokens (ink / acid / cream / ash)
- **shadcn/ui** primitives (button, card, badge, carousel)
- **framer-motion** for headline rotation, nav cursor and beam gradients
- **three.js** for the hero shader aurora (lime-tinted)
- **embla-carousel-react** for the agents carousel
- **lucide-react** icons (no emoji)

## Design direction

- **Aesthetic**: operator's terminal × editorial spread
- **Type**: Instrument Serif (italic display) · Satoshi (UI sans) · JetBrains Mono (data, eyebrows)
- **Palette**: ink `hsl(0 0% 3.5%)`, acid `hsl(75 100% 60%)`, cream `hsl(44 33% 92%)`
- **Motion**: scroll-revealed sections, animated beam, looping shader, all honoring `prefers-reduced-motion`

## Sections

1. **Hero** — rotating headline, shader background, 3-step Connect/Ask/Approve strip
2. **Connections** — sources list + Kortex Cortex SVG hub
3. **Agents** — auto-cycling carousel of 8 specialist agents
4. **Live Example** — terminal-style chat + 4-card approval queue
5. **System Bento** — 6 differentiators in an asymmetric grid
6. **Operator Metrics** — 4 animated counters
7. **Logo Marquee** — connected systems
8. **Pull Quote** — large editorial testimonial
9. **CTA** — animated beam converging on the K cortex + request access

## Scripts

```bash
npm install      # install deps
npm run dev      # vite dev server (http://localhost:3010)
npm run build    # production build → dist/
npm run preview  # preview the prod build
```

## Deployment

`vercel.json` ships with the Vite framework preset and a SPA rewrite, so the
default Vercel detection works out of the box.

## Content pages and prerendering (2026-10-18)

Besides the home page, the site has answer-first content pages (`/meta-ads`, `/google-ads`,
`/features/*`, `/pricing`, `/faq`, `/about`, `/security`, `/compare/*`, `/vs-media-buyer`,
`/glossary`, `/blog`, `/blog/<slug>`). Their words live in `src/content/` (pages in
`src/content/pages/*.ts`, blog posts in `src/content/blog/posts.ts`); `src/pages/site.tsx` maps each
path to its head and element.

`npm run build` runs `scripts/prerender.mjs`, which crawls every page linked from the home page
in Chrome and writes each to `dist/<path>/index.html` with its own title, description, canonical,
Open Graph tags and JSON-LD. It also regenerates `sitemap.xml` and the "Pages" section of
`llms.txt` (in `dist/` and `public/`), and fails the build on an unlinked page, a broken internal
link, a title over 60 characters, a description outside 140 to 160 characters, JSON-LD that does
not parse, or the words "Gemini", "Kreo Tech" or an em dash.

Deploy: the canonical URLs have no trailing slash (`https://kortexagent.co/meta-ads`). Upload each
`dist/<path>/index.html` as the extensionless object `<path>` (as `data-deletion` already is), with
`Content-Type: text/html; charset=utf-8`:

```
cd dist && for f in $(find . -name index.html ! -path ./index.html); do
  p=${f#./}; p=${p%/index.html}
  gcloud storage cp "$f" "gs://kortexagent-landing/$p" --content-type="text/html; charset=utf-8" --cache-control="no-cache"
done
```
