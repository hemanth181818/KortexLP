// Pre-render the built page so crawlers that do not run JavaScript (most AI crawlers) read its words.
// Serves dist/ with `vite preview`, renders it once in Chrome, and writes the rendered #root into
// dist/index.html. React's createRoot then replaces it on load, so visitors see the same page as before.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const PORT = 4179;
const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore" });
const url = `http://localhost:${PORT}/`;
try {
  for (let i = 0; i < 60; i++) {
    const up = await fetch(url).then((r) => r.ok).catch(() => false);
    if (up) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  // Scroll through once so sections that render on view are in the page.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const root = await page.$eval("#root", (el) => el.innerHTML);
  await browser.close();
  const file = "dist/index.html";
  const html = readFileSync(file, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error("dist/index.html has no empty #root to fill");
  writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${root}</div>`));
  const words = root.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`prerendered ${words} words into ${file}`);
  if (words < 200) throw new Error(`only ${words} words rendered; the page did not render`);
} finally {
  server.kill();
}
