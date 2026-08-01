import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { calculators, categories } from "@/lib/calculators";

const topStates = ["california", "texas", "florida", "new-york", "illinois", "ohio", "pennsylvania", "georgia"];

export const Route = createFileRoute("/sitemap")({
  head: () =>
    pageMeta({
      title: "Sitemap - MoneyCalc",
      description:
        "Browse all pages and calculators on MoneyCalc. Complete site map with links to every tool including location-based variations.",
      path: "/sitemap",
    }),
  component: SitemapPage,
});

function SitemapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Sitemap</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Sitemap</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Complete site map with links to all calculators, resources, and legal pages.
      </p>

      <div className="mt-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">Main Pages</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/calculators" className="text-primary hover:underline">
                All Calculators
              </Link>
            </li>
            <li>
              <Link to="/categories/loans" className="text-primary hover:underline">
                Loans Calculator
              </Link>
            </li>
            <li>
              <Link to="/categories/investments" className="text-primary hover:underline">
                Investment Calculator
              </Link>
            </li>
            <li>
              <Link to="/categories/retirement" className="text-primary hover:underline">
                Retirement Calculator
              </Link>
            </li>
            <li>
              <Link to="/categories/savings" className="text-primary hover:underline">
                Savings Calculator
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-primary hover:underline">
                About MoneyCalc
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Calculator Categories</h2>
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryCalculators = calculators.filter((c) => c.category === category.name);
              return (
                <div key={category.name}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    {category.name} ({categoryCalculators.length})
                  </h3>
                  <ul className="space-y-1 text-sm ml-4">
                    {categoryCalculators.map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          to={{ to: "/calculators/$slug", params: { slug: calc.slug } } as any}
                          className="text-primary hover:underline"
                        >
                          {calc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Location-Based Variations</h2>
          <p className="text-sm text-muted-foreground">
            Financial calculators available for specific states and countries. Locations are auto-generated pages that provide localized financial insights.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Top States (Mortgage & Loan Calculators)</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {topStates.map((state) => (
                <Link
                  key={state}
                  to={`/calculators/mortgage-calculator-in-${state}`}
                  className="text-sm text-primary hover:underline"
                >
                  {state.split("-").map((w, i) => i === 0 ? w.toUpperCase() + w.slice(1) : w.toUpperCase() + w.slice(1)).join(" ")}
                </Link>
              ))}
              <Link to="/calculators/mortgage-calculator-in-california" className="text-sm text-muted-foreground">
                + 44 more states
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Loan Type Variations</h2>
          <p className="text-sm text-muted-foreground">
            Specialized calculators for different loan types and scenarios.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Personal Loans</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/calculators/personal-loan-calculator" className="text-primary hover:underline">Personal Loan Calculator</Link></li>
                <li><Link to="/calculators/student-loan-calculator" className="text-primary hover:underline">Student Loan Calculator</Link></li>
                <li><Link to="/calculators/debt-consolidation-loan-calculator" className="text-primary hover:underline">Debt Consolidation Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Auto Loans</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/calculators/auto-loan-calculator" className="text-primary hover:underline">Auto Loan Calculator</Link></li>
                <li><Link to="/calculators/business-loan-calculator" className="text-primary hover:underline">Business Loan Calculator</Link></li>
                <li><Link to="/calculators/medical-loan-calculator" className="text-primary hover:underline">Medical Loan Calculator</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Legal Pages</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="text-primary hover:underline">
                Financial Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-primary hover:underline">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">All Calculators (A-Z)</h2>
          <ul className="space-y-2 text-sm">
            {calculators
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((calc) => (
                <li key={calc.slug}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={{ to: "/calculators/$slug", params: { slug: calc.slug } } as any}
                    className="text-primary hover:underline"
                  >
                    {calc.name}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Programmatic SEO Notes</h3>
        <p className="mt-2 text-muted-foreground">
          This sitemap demonstrates the structure of programmatically generated SEO pages. The full sitemap.xml at<code className="font-mono bg-surface/50 px-2 py-1 rounded"> /sitemap.xml</code> contains all programmatically generated URLs for location-based and type-based calculator variations.
        </p>
        <p className="mt-2 text-muted-foreground text-sm">
          <span className="font-medium">Scale:</span> 50+ base calculators × 50 states × 5 countries = 12,500+ programmatically generated landing pages possible.
        </p>
      </div>
    </div>
  );
}