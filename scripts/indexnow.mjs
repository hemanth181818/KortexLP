// Tell Bing (and the other IndexNow engines: Yandex, Seznam, Naver) about every page in the sitemap at once.
// ChatGPT search reads Bing's index, so a new or changed page is found in minutes instead of weeks.
// The key is the public/<key>.txt file the site serves; IndexNow checks it before taking the list.
// Run after a deploy: node scripts/indexnow.mjs
import { readFileSync, readdirSync } from "node:fs";

const HOST = "kortexagent.co";
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("no IndexNow key file in public/");
const key = keyFile.replace(/\.txt$/, "");
const urlList = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) process.exitCode = 1;
