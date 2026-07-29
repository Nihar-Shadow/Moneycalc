import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { calculators, categories } from "@/lib/calculators";
import { Newsletter } from "./newsletter";

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
            <h2 className="text-sm font-semibold">Categories</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.name}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={{ to: "/calculators", search: { category: c.name } } as any}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">Money tips, monthly</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              One short email a month with practical calculators and money guides.
            </p>
            <div className="mt-4">
              <Newsletter compact />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} MoneyCalc. Educational estimates only, not financial advice.</p>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={"/privacy-policy" as any}
                className="hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={"/terms" as any}
                className="hover:text-foreground"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={"/disclaimer" as any}
                className="hover:text-foreground"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
