export default function Footer() {
  return (
    <footer className="relative bg-ink-deep border-t border-cream/10 pt-14 pb-10 px-5 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand block */}
          <div className="col-span-2">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5"
              aria-label="Kortex, back to top"
            >
              <span
                aria-hidden="true"
                className="grid place-items-center h-8 w-8 rounded-md border border-acid/40 bg-acid/10 text-acid font-display italic text-lg leading-none"
              >
                K
              </span>
              <span className="font-display italic text-xl text-cream">
                Kortex
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              The AI growth command center for e-commerce and app marketers.
              Eight specialist agents, one approval queue, zero tab chaos.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "Workflow", href: "#workflow" },
              { label: "Connections", href: "#connections" },
              { label: "Agents", href: "#agents" },
              { label: "System", href: "#system" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "#" },
              { label: "Manifesto", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "mailto:hello@kortex.ai" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Security", href: "#" },
              { label: "Cookies", href: "#" },
            ]}
          />
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
            © {new Date().getFullYear()} Kortex · Built for operators.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
            Status · <span className="text-acid">cortex online</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50 mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-cream/75 hover:text-acid transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
