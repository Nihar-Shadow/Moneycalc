import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Award, TrendingUp } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About MoneyCalc - Our Mission & Team",
      description:
        "Learn about MoneyCalc's mission to provide free, accurate finance calculators. Meet our team and understand how our tools work.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">About</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">About MoneyCalc</h1>

      <div className="mt-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">Who We Are</h2>
          <p className="mt-3 text-muted-foreground">
            MoneyCalc is a financial education platform dedicated to making personal finance
            calculations accessible, transparent, and easy to understand. Our team consists of
            finance professionals, software engineers, and educators who believe that accurate
            financial planning should be free and available to everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground">
            To empower individuals to make informed financial decisions through free, accurate, and
            transparent calculators. We believe that understanding the mathematics behind financial
            decisions is key to achieving financial health. Every calculator we build is designed to
            not just provide answers, but to teach the principles behind them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">How Our Calculators Work</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Transparent Formulas</h3>
              <p className="mt-2 text-muted-foreground">
                Every calculation uses industry-standard formulas that you can see and verify. We
                don't hide the math behind black boxes. Each calculator displays the formula used
                and shows step-by-step how the result is calculated.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Industry-Standard Methods</h3>
              <p className="mt-2 text-muted-foreground">
                Our calculations follow the same methods used by financial institutions, accounting
                standards, and regulatory agencies. Whether it's the amortization formula for loans
                or the compound interest formula for investments, we use the exact mathematical
                approaches recommended by financial professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Real-World Assumptions</h3>
              <p className="mt-2 text-muted-foreground">
                We clearly state all assumptions behind each calculation. For example, mortgage
                calculators assume fixed rates, and investment calculators assume monthly
                compounding. We also explain when these assumptions might not hold true in
                real-world scenarios.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Why You Can Trust Our Calculations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Shield className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold">Verified Formulas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                All formulas are verified against industry-standard sources like the CFPB,
                Investopedia, and Federal Reserve publications. We cross-reference our results with
                established financial calculators.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Award className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold">Expert Reviewed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our calculations are reviewed by finance professionals. We have verified our
                methodologies against sources like Bankrate, NerdWallet, and the Consumer Financial
                Protection Bureau.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <TrendingUp className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold">Industry Standard</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We use the exact formulas recommended by financial institutions. Our mortgage
                calculator uses the same amortization formula that banks use, and our investment
                calculator uses the compound interest formula that financial advisors rely on.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Our Commitment to Accuracy</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We are committed to providing the most accurate calculations possible. Here's how we
              ensure accuracy:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Formula Verification:</strong> All formulas are verified against industry
                standards and multiple authoritative sources.
              </li>
              <li>
                <strong>Regular Updates:</strong> We regularly review and update our calculators to
                reflect current financial practices and regulations.
              </li>
              <li>
                <strong>Transparent Methodology:</strong> We show our work. Every step of the
                calculation is displayed so you can verify the logic.
              </li>
              <li>
                <strong>Community Feedback:</strong> We welcome corrections and suggestions from our
                users to improve accuracy.
              </li>
              <li>
                <strong>Professional Review:</strong> Calculations are reviewed by finance
                professionals to ensure they meet industry standards.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Content Review Process</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Our calculators undergo a rigorous review process:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Formula Selection:</strong> We use formulas from authoritative sources like
                the Federal Reserve, CFPB, and academic institutions.
              </li>
              <li>
                <strong>Implementation:</strong> Formulas are implemented by experienced developers
                following financial industry standards.
              </li>
              <li>
                <strong>Verification:</strong> Results are verified against multiple sources and
                test cases.
              </li>
              <li>
                <strong>Documentation:</strong> All assumptions, limitations, and variables are
                clearly documented.
              </li>
              <li>
                <strong>Continuous Monitoring:</strong> We monitor for any issues and update
                calculators as needed.
              </li>
            </ol>
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Last Updated</h3>
        <p className="mt-2 text-muted-foreground">
          This page was last updated on July 31, 2026. Our calculators are regularly reviewed and
          updated to ensure accuracy.
        </p>
      </div>
    </div>
  );
}
