import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalculatorWidget } from "@/components/calculator/calculator-widget";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { AdSlot } from "@/components/site/ad-slot";
import { getCalculator, calculators } from "@/lib/calculators";
import {
  breadcrumbSchema,
  calculatorSchema,
  faqSchema,
  generateDescription,
  generateTitle,
  jsonLdScript,
  pageMeta,
  SITE,
} from "@/lib/seo";

export const Route = createFileRoute("/calculators/$slug")({
  loader: ({ params }) => {
    const calculator = getCalculator(params.slug);
    if (!calculator) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const c = getCalculator(params.slug);
    if (!c) {
      return {
        meta: [
          { title: "Calculator not found - MoneyCalc" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = generateTitle(c.name);
    const description = generateDescription(c.name);
    return pageMeta({
      title,
      description,
      path: `/calculators/${c.slug}`,
      image: `${SITE.url}/og-image.svg`,
    });
  },
  component: CalculatorPage,
});

function CalculatorPage() {
  const { slug } = Route.useLoaderData();
  const calculator = getCalculator(slug)!;
  const related = calculators
    .filter((c) => c.slug !== calculator.slug && c.category === calculator.category)
    .slice(0, 3);

  const breadcrumbData = jsonLdScript(
    breadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Calculators", item: "/calculators" },
      { name: calculator.name, item: `${SITE.url}/calculators/${calculator.slug}` },
    ]),
  );

  const faqData = jsonLdScript(faqSchema(calculator.faqs));

  const calcSchemaData = jsonLdScript(calculatorSchema(calculator));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbData,
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqData }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: calcSchemaData }} />

      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <Link to="/calculators" className="hover:text-foreground">
          Calculators
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{calculator.name}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{calculator.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{calculator.description}</p>

      <div className="mt-8">
        <CalculatorWidget calculator={calculator} />
      </div>

      <div className="mt-10">
        <AdSlot placement="in-content" />
      </div>

      <article className="prose-content mt-10 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">How this calculator works</h2>
          <p className="mt-3 text-muted-foreground">
            {calculator.content.howWorks || calculator.content.what}
          </p>
          <h3 className="mt-6 text-lg font-semibold">When to use it</h3>
          <p className="mt-2 text-muted-foreground">{getUseCaseText(calculator.name)}</p>
          <h3 className="mt-4 text-lg font-semibold">Who should use it</h3>
          <p className="mt-2 text-muted-foreground">{getWhoShouldUseText(calculator.name)}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">About the {calculator.name.toLowerCase()}</h2>
          <p className="mt-3 text-muted-foreground">{calculator.content.intro}</p>
          <p className="mt-3 text-muted-foreground">{calculator.content.what}</p>
          <h3 className="mt-6 text-lg font-semibold">How to use it</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
            {calculator.content.how.map((h: string) => (
              <li key={h}>{h}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Formula Used</h2>
          <p className="mt-3 rounded-2xl border border-border bg-surface p-5 font-mono text-sm">
            {calculator.content.formula}
          </p>
          <p className="mt-3 text-muted-foreground">{calculator.content.formulaNote}</p>
          <h3 className="mt-4 text-lg font-semibold">Variable explanation</h3>
          <dl className="mt-3 space-y-2 text-muted-foreground">
            <div>
              <dt className="font-medium">M</dt>
              <dd>Monthly payment amount</dd>
            </div>
            <div>
              <dt className="font-medium">P</dt>
              <dd>Principal — the amount borrowed or invested</dd>
            </div>
            <div>
              <dt className="font-medium">r</dt>
              <dd>Monthly interest rate (annual rate ÷ 12)</dd>
            </div>
            <div>
              <dt className="font-medium">n</dt>
              <dd>Total number of monthly payments</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Worked Example</h2>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">Example: {calculator.name}</h3>
            <p className="mt-2 text-muted-foreground">{calculator.content.example}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Assumptions</h2>
          <div className="rounded-2xl border border-border bg-card p-5">
            <ul className="space-y-2 text-muted-foreground">
              {calculator.content.assumptions?.map((a: string, i: number) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Common Mistakes</h2>
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <ul className="space-y-2 text-muted-foreground">
              {calculator.content.commonMistakes?.map((m: string, i: number) => (
                <li key={i}>• {m}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-4">
            {calculator.faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Advantages and limitations</h2>
          <h3 className="text-lg font-semibold mt-3">Advantages</h3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {calculator.content.advantages.map((t: string) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4">Limitations</h3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {calculator.content.limitations.map((t: string) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Last updated</h2>
          <p className="mt-3 text-muted-foreground">
            {calculator.content.lastUpdated ? (
              <>
                <span className="font-medium">Date:</span> {calculator.content.lastUpdated.date}{" "}
                &bull;
                <span className="font-medium ml-3">Method:</span>{" "}
                {calculator.content.lastUpdated.method} &bull;
                <span className="font-medium ml-3">Version:</span>{" "}
                {calculator.content.lastUpdated.version}
              </>
            ) : (
              "Calculation method: Standard financial formulas"
            )}
          </p>
        </section>
      </article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Related calculators</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CalculatorCard key={c.slug} calculator={c} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <AdSlot placement="above-footer" />
      </div>
    </div>
  );
}

function getUseCaseText(name: string): string {
  if (name.includes("Mortgage"))
    return "Use this calculator when you're house hunting or comparing mortgage offers to understand your true monthly housing costs.";
  if (name.includes("Loan"))
    return "Use this calculator when comparing loan offers or testing different loan terms before committing to a purchase.";
  if (name.includes("Investment"))
    return "Use this calculator to project long-term investment growth and understand the impact of fees and inflation on your returns.";
  if (name.includes("Savings"))
    return "Use this calculator to set realistic savings goals and compare high-yield savings accounts.";
  if (name.includes("Retirement"))
    return "Use this calculator to check if you're on track for retirement and to test different contribution rates.";
  if (name.includes("Inflation"))
    return "Use this calculator to understand how inflation erodes purchasing power over time.";
  if (name.includes("Credit Card"))
    return "Use this calculator to plan your debt payoff strategy and test different payment amounts.";
  if (name.includes("Debt"))
    return "Use this calculator to create an accelerated debt payoff plan and quantify potential interest savings.";
  return "Use this calculator to analyze your financial scenario.";
}

function getWhoShouldUseText(name: string): string {
  if (name.includes("Mortgage"))
    return "First-time homebuyers, current homeowners considering refinancing, and anyone comparing mortgage offers.";
  if (name.includes("Loan"))
    return "Anyone considering borrowing for personal, business, or educational expenses.";
  if (name.includes("Investment"))
    return "Long-term investors, those planning for major purchases, and anyone comparing investment options.";
  if (name.includes("Savings"))
    return "People saving for specific goals like vacations, emergencies, or down payments.";
  if (name.includes("Retirement"))
    return "Anyone planning for retirement, especially those in their 20s through 50s.";
  if (name.includes("Inflation"))
    return "Anyone managing long-term financial goals or fixed-income investments.";
  if (name.includes("Credit Card"))
    return "Credit card holders trying to pay off balances efficiently.";
  if (name.includes("Debt"))
    return "Anyone carrying consumer debt looking to accelerate their payoff strategy.";
  return "Anyone looking to make informed financial decisions.";
}
