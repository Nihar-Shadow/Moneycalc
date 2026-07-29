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
          { title: "Calculator not found — MoneyCalc" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return pageMeta({
      title: c.title,
      description: c.description,
      path: `/calculators/${c.slug}`,
      image: `${SITE.url}/og-image.png`,
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

      <article className="prose-content mt-10 space-y-8">
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
          <h2 className="text-2xl font-bold">The formula</h2>
          <p className="mt-3 rounded-2xl border border-border bg-surface p-5 font-mono text-sm">
            {calculator.content.formula}
          </p>
          <p className="mt-3 text-muted-foreground">{calculator.content.formulaNote}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Worked example</h2>
          <p className="mt-3 text-muted-foreground">{calculator.content.example}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Advantages and limitations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            {calculator.content.advantages.map((t: string) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {calculator.content.limitations.map((t: string) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
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
