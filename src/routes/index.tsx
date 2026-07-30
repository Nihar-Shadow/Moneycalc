import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Gauge, Lock, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InlineSearch } from "@/components/site/search";
import { Icon } from "@/components/site/icon";
import { AdSlot } from "@/components/site/ad-slot";
import { Newsletter } from "@/components/site/newsletter";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { calculators, categories } from "@/lib/calculators";
import { faqSchema, jsonLdScript, pageMeta, SITE } from "@/lib/seo";

const homeFaqs = [
  {
    question: "Are MoneyCalc calculators free?",
    answer:
      "Yes. Every calculator on MoneyCalc is free, requires no account and runs entirely in your browser.",
  },
  {
    question: "Do you store the numbers I enter?",
    answer:
      "No. Calculations happen locally in your browser, so your financial inputs never reach our servers.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "We use the standard financial formulas lenders and advisers use. Results are estimates for planning and do not include every fee or tax rule.",
  },
  {
    question: "Can I use MoneyCalc on my phone?",
    answer:
      "Yes. Every calculator is mobile-first, with large tap targets, keyboard support and instant results as you type.",
  },
];

const benefits = [
  {
    icon: Gauge,
    title: "Instant results",
    text: "Every field recalculates as you type — no submit button, no page reloads.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted formulas",
    text: "Standard amortisation and compounding maths, shown step by step so you can verify it.",
  },
  {
    icon: Lock,
    title: "Private by design",
    text: "Your numbers stay in your browser. Nothing is uploaded, stored or sold.",
  },
  {
    icon: Sparkles,
    title: "Built to explain",
    text: "Charts, worked examples and plain-language guides sit next to every calculator.",
  },
];

const tips = [
  {
    title: "Pay yourself first",
    text: "Automate a transfer on payday so saving happens before spending decisions do.",
  },
  {
    title: "Attack the highest rate",
    text: "Every unit paid to a 22% card is a guaranteed 22% return you cannot get elsewhere.",
  },
  {
    title: "Watch the fee drag",
    text: "A 1% fund fee can quietly consume a fifth of a portfolio over 25 years.",
  },
  {
    title: "Keep three months in cash",
    text: "An emergency buffer stops a bad month from turning into new credit card debt.",
  },
];

const testimonials = [
  {
    name: "Priya N.",
    role: "First-time buyer",
    quote:
      "The mortgage calculator was the first one to show tax and insurance. It changed the price range we shopped in.",
  },
  {
    name: "Marcus T.",
    role: "Paying off debt",
    quote:
      "Seeing that an extra 150 a month cut 20 months off my payoff date was the push I needed.",
  },
  {
    name: "Elena R.",
    role: "Long-term investor",
    quote:
      "I finally understand the difference between nominal and real returns. The chart makes it obvious.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Free Finance Calculators - Loans, Mortgages, Investments | MoneyCalc",
      description:
        "MoneyCalc offers free, fast and accurate finance calculators for loans, mortgages, investments, retirement, savings and debt payoff.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const featured = calculators.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema(homeFaqs)) }}
      />

      <section className="hero-gradient border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Star className="size-3.5 text-secondary" aria-hidden="true" /> 10 free calculators, no
            sign-up
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Make every money decision with <span className="brand-gradient-text">real numbers</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {SITE.tagline}. Loans, mortgages, investing, retirement and debt — calculated instantly,
            explained clearly.
          </p>
          <div className="mt-9">
            <InlineSearch />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link to="/calculators">
                Browse all calculators <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AdSlot placement="below-hero" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Featured calculators</h2>
        <p className="mt-2 text-muted-foreground">
          The tools people open first when money decisions get real.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CalculatorCard key={c.slug} calculator={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Popular categories</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/calculators"
              className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <Icon name={c.icon} className="size-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Why MoneyCalc</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <b.icon className="size-5 text-secondary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick a calculator",
              text: "Search or browse by category to find the exact tool you need.",
            },
            {
              step: "02",
              title: "Enter your numbers",
              text: "Results, charts and the maths update instantly as you type.",
            },
            {
              step: "03",
              title: "Act with confidence",
              text: "Copy, share, print or download the result and make the call.",
            },
          ].map((s) => (
            <li key={s.step} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-3xl font-bold text-primary">{s.step}</span>
              <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot placement="in-content" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Finance tips worth stealing</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tips.map((t) => (
            <div key={t.title} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <Check className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">What people say</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <blockquote className="text-sm text-muted-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  {t.name}
                  <span className="block text-xs font-normal text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {homeFaqs.map((f, i) => (
            <AccordionItem key={f.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Money tips, once a month</h2>
        <p className="mt-2 text-muted-foreground">
          Practical guides and new calculators. No spam, unsubscribe anytime.
        </p>
        <div className="mt-6">
          <Newsletter />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <AdSlot placement="above-footer" />
      </div>
    </>
  );
}
