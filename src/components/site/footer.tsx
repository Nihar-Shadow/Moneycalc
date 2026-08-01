import { Link } from "@tanstack/react-router";
import { Calculator, Shield, Award, Check, Globe, ExternalLink } from "lucide-react";
import { calculators, categories } from "@/lib/calculators";
import { Newsletter } from "./newsletter";

const footerLegalLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Financial Disclaimer", to: "/disclaimer" },
  { label: "Cookie Policy", to: "/cookies" },
];

const trustIndicators = [
  {
    icon: Shield,
    text: "Privacy First",
    description: "Your data stays on your device",
  },
  {
    icon: Award,
    text: "Expert Reviewed",
    description: "Finance professionals verify our content",
  },
  {
    icon: Check,
    text: "100% Free",
    description: "No hidden fees or subscriptions",
  },
  {
    icon: Globe,
    text: "Global Sources",
    description: "Verified against official publications",
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const top = calculators.slice(0, 6);

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Calculator className="size-5" aria-hidden="true" />
              </span>
              MoneyCalc
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Free finance calculators for smarter money decisions. No sign-up, no tracking of your
              numbers, no spreadsheets.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustIndicators.map((t) => (
                <div key={t.text} className="flex items-center gap-1.5 text-xs">
                  <t.icon className="size-3 text-secondary" aria-hidden="true" />
                  <span className="text-muted-foreground">{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Popular calculators">
            <h2 className="text-sm font-semibold">Popular calculators</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {top.map((c) => (
                <li key={c.slug}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={{ to: "/calculators/$slug", params: { slug: c.slug } } as any}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Categories">
            <h2 className="text-sm font-semibold">Calculator Categories</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.name}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={{ to: "/categories/$category", params: { category: c.name.toLowerCase().replace(/ /g, "-") } } as any}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">Legal & About</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLegalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={link.to as any}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-6 text-sm font-semibold">Monthly tips</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              One short email a month with practical calculators and money guides.
            </p>
            <div className="mt-4">
              <Newsletter compact />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p>© {year} MoneyCalc. Educational estimates only, not financial advice.</p>
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/sitemap"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sitemap
                </Link>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://github.com/Kilo-Org/kilocode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </div>
            </div>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link to="/privacy-policy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Last updated: July 31, 2026</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.federalreserve.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              Federal Reserve
              <ExternalLink className="size-3" />
            </a>
            <a
              href="https://www.cfpb.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              CFPB
              <ExternalLink className="size-3" />
            </a>
            <a
              href="https://www.investopedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              Investopedia
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
