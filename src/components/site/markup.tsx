import { Fragment, type ReactNode } from "react";

/**
 * The two inline marks content strings may use, [text](href) and **bold**, and a
 * small Markdown subset for blog bodies. Rendered as React elements, never as raw
 * HTML, so content can not inject markup.
 */

export const linkClass =
  "font-medium text-cream underline decoration-acid-line decoration-1 underline-offset-[3px] transition-colors hover:text-acid-ink";

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[1]) {
      out.push(
        <a key={i} href={m[2]} className={linkClass}>
          {m[1]}
        </a>,
      );
    } else {
      out.push(
        <strong key={i} className="font-semibold text-cream">
          {m[3]}
        </strong>,
      );
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, i) => (typeof n === "string" ? <Fragment key={`t${i}`}>{n}</Fragment> : n))}</>;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type MdBlock =
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string; id: string }
  | { kind: "p"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

/** Parse the blog's Markdown subset into blocks. */
export function parseMarkdown(src: string): MdBlock[] {
  const blocks: MdBlock[] = [];
  let para: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (para.length) blocks.push({ kind: "p", text: para.join(" ") });
    para = [];
    if (list) blocks.push(list);
    list = null;
  };
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const h = /^(#{2,3}) (.+)$/.exec(line);
    const ul = /^- (.+)$/.exec(line);
    const ol = /^\d+\. (.+)$/.exec(line);
    if (h) {
      flush();
      blocks.push({ kind: h[1].length === 2 ? "h2" : "h3", text: h[2], id: slugify(h[2]) } as MdBlock);
    } else if (ul || ol) {
      const kind = ul ? "ul" : "ol";
      if (para.length) flush();
      if (list && list.kind !== kind) flush();
      if (!list) list = { kind, items: [] };
      list.items.push((ul ?? ol)![1]);
    } else {
      if (list) flush();
      para.push(line);
    }
  }
  flush();
  return blocks;
}
