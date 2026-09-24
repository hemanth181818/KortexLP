import { Wordmark } from "@/components/ui/wordmark";
import {
  APP_URL,
  CONTACT_EMAIL,
  PRIVACY_URL,
  SIGN_IN_URL,
  TERMS_URL,
} from "@/lib/links";

export default function Footer() {
  return (
    <footer className="relative bg-ink-deep border-t border-cream/10 pt-14 pb-10 px-5 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand block */}
          <div className="col-span-2">
            <a href="#top" className="inline-block py-1" aria-label="Kortex, back to top">
              <Wordmark className="text-[15px]" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60 text-pretty">
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
              { label: "Get started", href: APP_URL },
              { label: "Sign in", href: SIGN_IN_URL },
              { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Privacy", href: PRIVACY_URL },
              { label: "Terms", href: TERMS_URL },
            ]}
          />
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[13px] text-cream/40">
            © {new Date().getFullYear()} Kortex · Built for operators.
          </p>
          <p className="flex items-center gap-2 text-[13px] text-cream/40">
            <span className="h-1.5 w-1.5 rounded-full bg-acid" aria-hidden="true" />
            Status · <span className="text-cream/70">Kortex online</span>
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
      <h4 className="text-[13px] font-semibold text-cream/85 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-cream/60 hover:text-acid transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
