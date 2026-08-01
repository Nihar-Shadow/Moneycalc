import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { AdSlot } from "@/components/site/ad-slot";
import { calculators, categories, searchCalculators, calculatorMap } from "@/lib/calculators";
import { breadcrumbSchema, faqSchema, jsonLdScript, pageMeta, SITE } from "@/lib/seo";

export const Route = createFileRoute("/calculators/")({
  head: () =>
    pageMeta({
      title: "All Finance Calculators — Loans, Mortgages, Investing | MoneyCalc",
      description:
        "Browse every free MoneyCalc finance calculator: loans, mortgages, credit cards, debt payoff, compound interest, investing, savings, retirement and inflation. Calculate monthly payments and project growth.",
      path: "/calculators",
    }),
  component: CalculatorsIndex,
});

function CalculatorsIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const base = query.trim() ? searchCalculators(query) : calculators;
    return category === "All" ? base : base.filter((c) => c.category === category);
  }, [query, category]);

  const popularCalcs = calculators.filter((c) => c.popular).slice(0, 6);

  const breadcrumbData = jsonLdScript(
    breadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Calculators", item: "/calculators" },
    ])
  );

  const faqData = jsonLdScript(faqSchema([
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and on the accumulated interest from previous periods. It grows exponentially over time, which is why starting to save and invest early has such powerful effects." },
    { question: "How do I calculate a mortgage payment?", answer: "Use the mortgage calculator on this page or apply the formula M = P × r / (1 − (1 + r)⁻ⁿ), where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments." },
    { question: "Is it better to pay extra on my mortgage?", answer: "Paying extra principal can significantly reduce total interest costs. However, compare the return from extra mortgage payments to potential investment returns or other financial priorities." },
    { question: "How much should I save for retirement?", answer: "Financial experts recommend saving 15% of your income for retirement, starting as early as possible. Use the retirement calculators to project your specific timeline and contribution needs." },
    { question: "What's the difference between a 401k and an IRA?", answer: "A 401(k) is employer-sponsored with higher contribution limits. An IRA is individually managed with more investment flexibility. Both can offer tax advantages for retirement savings." },
  ]));

  const calculatorsSchema = jsonLdScript({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "MoneyCalc Financial Calculators",
    "description": "Free online calculators for loans, mortgages, investments, retirement, savings and debt management",
    "url": `${SITE.url}/calculators`,
    "hasPart": calculators.map((c) => ({
      "@type": "WebApplication",
      "name": c.name,
      "description": c.description,
      "url": `${SITE.url}/calculators/${c.slug}`,
    }))
  });

  function calculatorsByCategory(categoryName: string) {
    return calculators.filter((c) => c.category === categoryName);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbData }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqData }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: calculatorsSchema }} />

      <h1 className="text-3xl font-extrabold sm:text-4xl">All finance calculators</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {calculators.length} free calculators covering borrowing, investing, saving and planning. No sign-up, instant results, private by design.
      </p>

      <div className="mt-8">
        <label htmlFor="calculator-filter" className="sr-only">
          Search calculators
        </label>
        <Input
          id="calculator-filter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search calculators…"
          className="h-12 max-w-md rounded-xl"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...categories.map((c) => c.name)].map((name) => (
          <Button
            key={name}
            size="sm"
            variant={category === name ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory(name)}
          >
            {name} {name !== "All" && `(${calculatorsByCategory(name).length})`}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <div key={c.slug} data-calculator-category={c.category}>
            <CalculatorCard calculator={c} />
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">
          No calculator matches that search.{" "}
          <Link to="/calculators" className="text-primary underline">
            Clear filters
          </Link>
          .
        </p>
      )}

      <div className="mt-12">
        <AdSlot placement="above-footer" />
      </div>
    </div>
  );
}

export function getCalculatorsBySlug(slug: string) {
  return calculatorMap.get(slug);
}