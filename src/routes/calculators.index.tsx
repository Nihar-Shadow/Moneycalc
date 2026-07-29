import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { AdSlot } from "@/components/site/ad-slot";
import { calculators, categories, searchCalculators } from "@/lib/calculators";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/calculators/")({
  head: () =>
    pageMeta({
      title: "All Finance Calculators — Loans, Mortgages, Investing | MoneyCalc",
      description:
        "Browse every free MoneyCalc finance calculator: loans, mortgages, credit cards, debt payoff, compound interest, investing, savings, retirement and inflation.",
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">All finance calculators</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {calculators.length} free calculators covering borrowing, investing, saving and planning. No
        sign-up, instant results, private by design.
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
            {name}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <CalculatorCard key={c.slug} calculator={c} />
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
