// Pre-render every page so crawlers that do not run JavaScript (most AI crawlers) read its words.
//
// Serves dist/ with `vite preview`, renders the home page and then every page reachable from it by
// internal links in Chrome, and writes each one's rendered #root and its own head (title,
// description, canonical, Open Graph, JSON-LD) into its own file:
//
//   /            -> dist/index.html
//   /meta-ads    -> dist/meta-ads/index.html
//   /blog/<slug> -> dist/blog/<slug>/index.html
//
// React's createRoot replaces #root on load, so visitors see the same page as before. The script also
// writes sitemap.xml and the page list in llms.txt (to dist/ and back to public/ so they stay in git),
// and fails the build on a page that is unlinked, broken, mis-sized in its head, or carries banned words.
import { execSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { chromium } from "playwright-core";

const PORT = 4179;
const ORIGIN = `http://localhost:${PORT}`;
const SITE = "https://kortexagent.co";
/** Paths served by something else on kortexagent.co: linked to, never rendered here. */
const ELSEWHERE = ["/privacy", "/terms", "/data-deletion"];
// Never Gemini as Kortex's own model provider (Hemanth, 2026-09-24). Naming it as one of the engines the
// audit asks is fine (since 2026-10-21, the visibility-first home page), so only provider claims are banned.
const BANNED = [/(built|runs|running|powered|based)\s+(on|by|with)\s+(Google\s+)?Gemini/i, /Gemini\s+(API|model|models)\b/i, /Kreo Tech/i, /\u2014/];

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
const template = readFileSync("dist/index.html", "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("dist/index.html has no empty #root to fill");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ldScript = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const fileFor = (path) => (path === "/" ? "dist/index.html" : `dist${path}/index.html`);
const words = (html) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const rootOf = (html) => html.slice(html.indexOf('<div id="root">'));

function replaceOnce(html, re, replacement, what) {
  const hits = html.match(new RegExp(re.source, "g"));
  if (!hits || hits.length !== 1) throw new Error(`expected one ${what} in the template, found ${hits?.length ?? 0}`);
  return html.replace(re, replacement);
}

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key.replace(/[.:]/g, "\\$&")}" content=")[^"]*(")`);
  return replaceOnce(html, re, `$1${esc(value)}$2`, `meta ${key}`);
}

/** The template's head, rewritten for one page. */
function withHead(page) {
  const canonical = page.path === "/" ? `${SITE}/` : `${SITE}${page.path}`;
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`, "title");
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:type", page.ogType ?? "website");
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`, "canonical");
  html = replaceOnce(html, /<!-- Who Kortex is[^>]*-->\s*/, "", "structured data comment");
  html = replaceOnce(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, ldScript(page.graph), "JSON-LD block");
  if (page.noindex) html = html.replace("</head>", `    <meta name="robots" content="noindex" />\n  </head>`);
  return html;
}

function check(path, html, head) {
  const problems = [];
  for (const re of BANNED) if (re.test(html)) problems.push(`contains ${re}`);
  // The home page has no head object: its title is read from the HTML itself, and held to the same limit.
  const title = head?.title ?? html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  if (!head && title.length > 60) problems.push(`title is ${title.length} characters (max 60): ${title}`);
  if (head) {
    if (head.title.length > 60) problems.push(`title is ${head.title.length} characters (max 60): ${head.title}`);
    const d = head.description.length;
    if (d < 140 || d > 160) problems.push(`description is ${d} characters (want 140 to 160): ${head.description}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      problems.push(`JSON-LD does not parse: ${e.message}`);
    }
  }
  const n = words(rootOf(html));
  if (n < 150) problems.push(`only ${n} words rendered; the page did not render`);
  return problems.map((p) => `${path}: ${p}`);
}

try {
  for (let i = 0; i < 60; i++) {
    const up = await fetch(`${ORIGIN}/`).then((r) => r.ok).catch(() => false);
    if (up) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  const internalLinks = () =>
    page.$$eval("#root a[href]", (as) => as.map((a) => a.getAttribute("href")).filter((h) => h.startsWith("/") && !h.startsWith("//")));
  const clean = (href) => href.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";

  // The home page, as before: rendered after a scroll through, its head left as index.html has it.
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const homeRoot = await page.$eval("#root", (el) => el.innerHTML);
  const faq = JSON.parse(readFileSync("src/content/faq.json", "utf8"));
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  // The home page's own WebPage node, dated the day its files last changed in git (as vite.config.ts does).
  const homeUpdated = (() => {
    try {
      return execSync("git log -1 --format=%cs -- index.html src/pages/Landing.tsx src/components/lp src/content/faq.json", { encoding: "utf8" }).trim();
    } catch {
      return "";
    }
  })() || new Date().toISOString().slice(0, 10);
  const homeLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/#webpage`,
    url: `${SITE}/`,
    name: template.match(/<title>([^<]*)<\/title>/)?.[1] ?? "Kortex",
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#app` },
    inLanguage: "en",
    dateModified: homeUpdated,
  };
  const out = new Map();
  out.set("/", {
    html: template.replace('<div id="root"></div>', `<div id="root">${homeRoot}</div>`).replace("</head>", `    ${ldScript(homeLd)}\n    ${ldScript(faqLd)}\n  </head>`),
    head: null,
  });

  // Every page reachable from the home page.
  const queue = [...new Set((await internalLinks()).map(clean))];
  const seen = new Set(["/"]);
  let registered = null;
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path) || ELSEWHERE.includes(path)) continue;
    seen.add(path);
    await page.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__KORTEX_PAGE__ && document.getElementById("root").childElementCount > 0);
    await page.waitForTimeout(150);
    const head = await page.evaluate(() => window.__KORTEX_PAGE__);
    registered ??= await page.evaluate(() => window.__KORTEX_ROUTES__);
    if (head.noindex) throw new Error(`${path} is linked from a page but there is no such page`);
    const root = await page.$eval("#root", (el) => el.innerHTML);
    for (const l of await internalLinks()) {
      const p = clean(l);
      if (!seen.has(p) && !queue.includes(p)) queue.push(p);
    }
    out.set(path, { html: withHead(head).replace('<div id="root"></div>', `<div id="root">${root}</div>`), head });
  }
  await browser.close();

  const orphans = (registered ?? []).filter((p) => !out.has(p));
  if (orphans.length) throw new Error(`pages nothing links to: ${orphans.join(", ")}`);
  const problems = [...out].flatMap(([path, { html, head }]) => check(path, html, head));
  if (problems.length) throw new Error(`\n${problems.join("\n")}`);

  // Write the pages, then the sitemap and llms.txt.
  for (const [path, { html }] of out) {
    const file = fileFor(path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerendered ${String(words(rootOf(html))).padStart(5)} words into ${file}`);
  }

  const pages = [...out.keys()].filter((p) => p !== "/").sort();
  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url><loc>${SITE}/</loc><lastmod>${homeUpdated}</lastmod></url>`,
    ...pages.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${out.get(p).head.lastmod}</lastmod></url>`),
    ...ELSEWHERE.map((p) => `  <url><loc>${SITE}${p}</loc></url>`),
    `</urlset>`,
    ``,
  ].join("\n");
  for (const f of ["dist/sitemap.xml", "public/sitemap.xml"]) writeFileSync(f, sitemap);

  // llms.txt: the hand-written parts stay; the "## Pages" section is regenerated from the pages.
  const llms = readFileSync("public/llms.txt", "utf8");
  const start = llms.indexOf("## Pages\n");
  if (start < 0) throw new Error('public/llms.txt has no "## Pages" section');
  const after = llms.indexOf("\n## ", start + 1);
  const section = ["## Pages", "", ...pages.map((p) => `- [${out.get(p).head.title}](${SITE}${p}): ${out.get(p).head.description}`), ""].join("\n");
  const updated = llms.slice(0, start) + section + (after >= 0 ? llms.slice(after) : "");
  for (const f of ["dist/llms.txt", "public/llms.txt"]) writeFileSync(f, updated);
  console.log(`sitemap.xml: ${pages.length + 1 + ELSEWHERE.length} URLs; llms.txt: ${pages.length} pages`);
} finally {
  server.kill();
}
