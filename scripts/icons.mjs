import { createRequire } from "node:module";
const sharp = createRequire(process.env.SHARP_FROM ?? import.meta.url)("sharp");
import { writeFileSync } from "node:fs";
const out = process.argv[2];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><rect width="1024" height="1024" rx="230" fill="#0F1012"/><path d="M512 286V738M286 512H738M352 352L672 672M672 352L352 672" stroke="#CCF235" stroke-width="62" stroke-linecap="round" fill="none"/></svg>`;
// Square, no rounded corners, for the logo Google shows in results and knowledge panels.
const square = svg.replace('rx="230"', 'rx="0"');
writeFileSync(`${out}/favicon.svg`, svg);
const png = (s, size) => sharp(Buffer.from(s)).resize(size, size).png().toBuffer();
for (const [name, size] of [["favicon-48x48.png", 48], ["favicon-96x96.png", 96], ["icon-192.png", 192], ["icon-512.png", 512]]) writeFileSync(`${out}/${name}`, await png(svg, size));
writeFileSync(`${out}/apple-touch-icon.png`, await png(square, 180));
writeFileSync(`${out}/logo-mark.png`, await png(square, 512));
// favicon.ico: one 48x48 PNG inside an ICO container (PNG-in-ICO, supported everywhere current).
const p48 = await png(svg, 48);
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(48, 6); head.writeUInt8(48, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(p48.length, 14); head.writeUInt32LE(22, 18);
writeFileSync(`${out}/favicon.ico`, Buffer.concat([head, p48]));
