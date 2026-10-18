// Renders public/og.png (1200x630), the card Slack, LinkedIn, X and WhatsApp show for a kortexagent.co link.
// Run by hand when the headline changes: node scripts/og-image.mjs
import { chromium } from "playwright-core";
const MARK = `<svg viewBox="0 0 1024 1024" width="64" height="64"><rect width="1024" height="1024" rx="230" fill="#C4F33B"/><path d="M512 286V738M286 512H738M352 352L672 672M672 352L352 672" stroke="#0B0B0B" stroke-width="62" stroke-linecap="round" fill="none"/></svg>`;
const b = await chromium.launch({ channel: "chrome" });
const page = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=block" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=block" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#0B0B0B;color:#F2EFE6;font-family:Satoshi,sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;
background-image:radial-gradient(900px 420px at 85% 110%,rgba(196,243,59,.16),transparent 70%)}
.top{display:flex;align-items:center;gap:18px;font-weight:700;font-size:40px;letter-spacing:-.01em}
h1{font-family:Newsreader,serif;font-weight:400;font-size:84px;line-height:1;letter-spacing:-.02em;max-width:980px}
h1 i{color:#C4F33B}
.sub{font-size:28px;font-weight:500;color:rgba(242,239,230,.62);display:flex;justify-content:space-between;align-items:flex-end}
.sub b{font-weight:500;color:rgba(242,239,230,.85)}</style></head><body>
<div class="top">${MARK}Kortex</div>
<h1>Your ad account, <i>optimized</i> for high ROAS every day.</h1>
<div class="sub"><span>AI ad agent for Meta and Google Ads</span><b>kortexagent.co</b></div>
</body></html>`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png", type: "png" });
await b.close();
console.log("wrote public/og.png");
