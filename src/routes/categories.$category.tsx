import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta, SITE } from "@/lib/seo";
import { calculatorsByCategory, categories, calculatorMap } from "@/lib/calculators";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { AdSlot } from "@/components/site/ad-slot";
import { breadcrumbSchema, faqSchema, jsonLdScript } from "@/lib/seo";

const categoryContent: Record<string, {
  intro: string;
  overview: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
} | null> = {
  "loans": {
    intro: "Understanding the true cost of borrowing is essential for making informed financial decisions. Our comprehensive loan calculator collection helps you evaluate personal loans, auto loans, business financing, and more with precise, industry-standard calculations.",
    overview: "Whether you're financing your first car, consolidating high-interest debt, or exploring options for your business, our loan calculators provide the clarity you need to make confident borrowing decisions. Each tool walks you through the math behind monthly payments, total interest costs, and how different terms impact your financial obligation.",
    benefits: [
      "Compare multiple loan offers side by side using consistent calculations",
      "Understand the hidden costs behind advertised rates including fees and insurance",
      "Model different scenarios quickly without waiting for lender approvals",
      "Calculate prepayment savings and early payoff strategies",
      "Plan your budget with confidence knowing exact monthly obligations"
    ],
    faqs: [
      { question: "What's the difference between interest rate and APR?", answer: "The interest rate is just the cost of borrowing money itself. APR (Annual Percentage Rate) includes the interest rate plus certain fees, giving you a more accurate picture of the total loan cost. Always compare APRs when shopping for loans, as they provide a truer measure of expense." },
      { question: "How do I calculate my total loan cost?", answer: "Total loan cost = (Monthly payment × number of payments) - original loan amount. For example, a $20,000 loan with $450 monthly payments over 5 years costs $9000 ($450 × 60) in total payments, meaning $1000 ($9000 - $8000) is the total interest." },
      { question: "Should I choose a shorter loan term?", answer: "Shorter terms save money in interest but require higher monthly payments. Use our calculators to model different term lengths and find the sweet spot where the payment remains affordable while minimizing total interest. A 36-month auto loan often beats 60-month on total cost." },
      { question: "How does making extra payments help?", answer: "Making additional principal payments reduces the balance faster, which cuts interest immediately. The earlier in the loan term you make extra payments, the more interest you save. Our loan calculators show exactly how much you'll save with accelerated payments." }
    ]
  },
  "investments": {
    intro: "Investing is one of the most powerful tools for building long-term wealth, but calculating potential returns can feel overwhelming. Our investment calculators demystify compound growth, helping you project how different contributions, rates of return, and time horizons affect your portfolio's trajectory.",
    overview: "From understanding how regular SIP contributions grow through compound interest to projecting retirement nest egg sizes based on current savings, these tools provide actionable insights for investors at every stage. Whether you're a beginner learning the basics or experienced investor planning for early retirement, these calculators provide the clarity to make informed decisions.",
    benefits: [
      "Visualize how compound interest accelerates wealth growth over time",
      "Compare different contribution strategies and their long-term impact",
      "Model the effect of fees on your investment returns over decades",
      "Test sensitivity to different rate of return assumptions",
      "Create confidence with data-driven retirement planning"
    ],
    faqs: [
      { question: "How does compound interest work?", answer: "Compound interest earns interest on both your original investment and previously earned interest. Starting with $10,000 at 7% annual return, you earn $700 the first year. The second year, you earn interest on $10,700, earning $749. This compounding accelerates dramatically over time, which is why starting early is so powerful." },
      { question: "What's a realistic annual return for investments?", answer: "Historically, diversified stock market investments have returned approximately 7-10% annually after inflation. However, returns vary year to year. Our calculators allow you to model different scenarios to plan for various market conditions and risk tolerances." },
      { question: "How much should I save each month for retirement?", answer: "Financial experts recommend saving 15% of your gross income for retirement, starting as early as possible. Use our retirement calculators to determine your specific monthly savings goal based on your target retirement age and desired income level." }
    ]
  },
  "retirement": {
    intro: "Planning for retirement requires projecting savings growth and income needs over decades. Our retirement calculators help you evaluate how different contribution rates, investment strategies, and retirement ages impact your ability to maintain your desired lifestyle when you stop working.",
    overview: "Whether you're considering FIRE (Financial Independence, Retire Early), plotting your 401(k) growth, or modeling IRA withdrawals in retirement, these tools provide personalized projections based on sound financial principles. Understand how Social Security benefits, pension plans, and portfolio withdrawals combine to create your retirement income strategy.",
    benefits: [
      "Project your retirement timeline based on current savings and contribution rates",
      "Compare different withdrawal strategies to maximize your nest egg",
      "Model the impact of Social Security claiming age on benefits",
      "Evaluate catch-up contributions for those with less saved",
      "Understand the 4% safe withdrawal rate and its limitations"
    ],
    faqs: [
      { question: "What is the 4% rule for retirement withdrawals?", answer: "The 4% rule suggests you can withdraw 4% of your retirement portfolio annually, adjusted for inflation, for at least 30 years of sustainable income. For a $1 million portfolio, this means $40,000 per year. However, this is a guideline and you should adjust based on your specific situation." },
      { question: "How does a Roth IRA differ from a Traditional IRA for retirement?", answer: "Traditional IRAs offer tax-deferred growth with taxes paid on withdrawal, while Roth IRAs provide tax-free growth with taxes paid upfront. If you expect higher tax rates in retirement, Roth conversions can be advantageous. Use our IRA calculators to model both scenarios." },
      { question: "Should I start saving for retirement at 40 vs 30?", answer: "Starting at 40 requires significantly higher monthly contributions due to compound interest's power. For example, saving $500/month from age 30 at 7% returns creates $512,000 by 65, while starting at 40 with $800/month only creates $336,000. The gap can only be closed with much higher contributions." }
    ]
  },
  "savings": {
    intro: "Savings is the foundation of financial security, whether you're building an emergency fund, preparing for a major purchase, or planning for specific goals. Our savings calculators help you determine how much to save, how long it will take, and how interest rates impact your progress.",
    overview: "From emergency fund benchmarks (3-6 months of expenses) to college savings strategies and down payment timelines, these tools transform abstract savings goals into concrete, achievable plans. Understand how different account types, contribution amounts, and interest rates work together to build your financial cushion.",
    benefits: [
      "Determine your emergency fund target based on income and expenses",
      "Model different savings rates to reach specific goals faster",
      "Compare high-yield savings account options for maximum growth",
      "Plan vacations, weddings, or major purchases with dedicated savings plans",
      "Understand how compound interest accelerates savings growth"
    ],
    faqs: [
      { question: "How much should my emergency fund be?", answer: "Financial experts recommend 3-6 months of essential living expenses in your emergency fund. Those in stable employment may need 3 months, while freelancers or those with variable income should aim for 6 months or more. Use our emergency fund calculator to determine your specific target." },
      { question: "What's the best savings account for my money?", answer: "High-yield savings accounts typically offer 4-5% APY compared to 0.01-0.5% at traditional banks. For longer-term goals, consider CDs or money market accounts that may offer slightly higher rates with limited access. Our savings calculators help you compare the growth potential of different account types." },
      { question: "How can I save more for college?", answer: "Use our college savings calculator to model 529 plan contributions, Coverdell ESAs, and other education savings vehicles. Starting early with smaller monthly contributions often beats lump-sum contributions later due to compound growth. Many states offer tax deductions on 529 contributions." }
    ]
  }
};

export const Route = createFileRoute("/categories/$category")({
  loader: ({ params }) => {
    const category = params.category;
    const categoryCalcs = calculatorsByCategory(category as any);
    return { category, categoryCalcs };
  },
  head: ({ params }) => {
    const category = categories.find(
      (c) => c.name.toLowerCase() === params.category || c.name.toLowerCase().replace(/ /g, "-") === params.category
    );
    if (!category) {
      return {
        meta: [
          { title: "Category not found - MoneyCalc" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const content = categoryContent[category.name.toLowerCase().replace(/ /g, "-")] || null;
    return pageMeta({
      title: `${category.name} Calculator - All Tools | MoneyCalc`,
      description: content?.overview || `Calculate ${category.name.toLowerCase()} with our financial tools. Updated 2026.`,
      path: `/categories/${category.name.toLowerCase().replace(/ /g, "-")}`,
    });
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, categoryCalcs } = Route.useLoaderData();
  const cat = categories.find((c) => c.name.toLowerCase().replace(/ /g, "-") === category) || categories[0];
  const content = categoryContent[cat.name.toLowerCase().replace(/ /g, "-")] || categoryContent.loans;
  
  const canonicalData = jsonLdScript({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${cat.name} Financial Calculators`,
    "description": content?.overview || `Comprehensive ${cat.name.toLowerCase()} calculators for financial planning`,
    "url": `${SITE.url}/categories/${cat.name.toLowerCase().replace(/ /g, "-")}`,
    "mainEntity": categoryCalcs.map((c) => ({
      "@type": "WebApplication",
      "name": c.name,
      "description": c.description,
      "url": `${SITE.url}/calculators/${c.slug}`
    }))
  });

  const contentData = content ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const faqData = contentData ? jsonLdScript(contentData) : "";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: canonicalData }} />
      {faqData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqData }} />}
      
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="px-1.5">/</span>
        <Link to="/calculators" className="hover:text-foreground">Calculators</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{cat.name}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{cat.name} Calculators</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {content?.intro || cat.description}
      </p>

      <div className="mt-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold">{content?.overview || "Find the right calculator for your needs"}</h2>
          {content?.benefits && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {content.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">All {cat.name} Calculators ({categoryCalcs.length})</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCalcs.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Popular from this category</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCalcs.filter((c) => c.popular).slice(0, 3).map((calc) => (
              <CalculatorCard key={calc.slug + "-popular"} calculator={calc} />
            ))}
          </div>
        </div>

        {content?.faqs && content.faqs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <dl className="divide-y divide-border">
              {content.faqs.map((faq, i) => (
                <div key={i} className="py-4">
                  <dt className="text-lg font-medium text-foreground">{faq.question}</dt>
                  <dd className="mt-1 text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="mt-12">
        <AdSlot placement="in-content" />
      </div>
    </div>
  );
}