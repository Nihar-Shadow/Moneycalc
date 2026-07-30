export const SITE = {
  name: "MoneyCalc",
  tagline: "Free Finance Calculators for Smarter Money Decisions",
  description:
    "MoneyCalc offers free, fast and accurate finance calculators for loans, mortgages, investments, retirement, savings and debt payoff.",
  url: "https://moneycalc.com",
  image: "https://moneycalc.com/og-image.svg",
  imageWidth: 1200,
  imageHeight: 630,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    description: SITE.description,
    slogan: SITE.tagline,
    url: SITE.url,
    sameAs: [],
    logo: `${SITE.url}/logo.svg`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/calculators?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function calculatorSchema(calculator: {
  slug: string;
  name: string;
  description: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${calculator.name} - ${SITE.name}`,
    description: calculator.description,
    url: `${SITE.url}/calculators/${calculator.slug}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Instant calculations", "Visual charts", "Mobile-friendly", "Privacy-focused"],
  };
}

export function webPageSchema(calculator: {
  slug: string;
  name: string;
  description: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${calculator.name} - ${SITE.name}`,
    description: calculator.description,
    url: `${SITE.url}/calculators/${calculator.slug}`,
    mainEntity: {
      "@type": "WebApplication",
      name: calculator.name,
      description: calculator.description,
    },
  };
}

export function breadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function jsonLdScript(data: unknown): string {
  try {
    const json = JSON.stringify(data);
    return json;
  } catch {
    return "{}";
  }
}

export function webAppSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function generateTitle(name: string): string {
  const titles: Record<string, string> = {
    "Mortgage Calculator": "Mortgage Calculator - Calculate Monthly Payments | MoneyCalc",
    "Loan Calculator": "Loan Calculator - EMI & Interest Calculator | MoneyCalc",
    "Compound Interest Calculator": "Compound Interest Calculator | MoneyCalc",
    "Investment Calculator": "Investment Calculator | MoneyCalc",
    "Savings Calculator": "Savings Calculator | MoneyCalc",
    "Retirement Calculator": "Retirement Calculator | MoneyCalc",
    "Inflation Calculator": "Inflation Calculator | MoneyCalc",
    "Credit Card Payoff Calculator": "Credit Card Payoff Calculator | MoneyCalc",
    "Debt Payoff Calculator": "Debt Payoff Calculator | MoneyCalc",
    "Auto Loan Calculator": "Auto Loan Calculator | MoneyCalc",
  };
  return titles[name] || `${name} - ${SITE.name}`;
}

export function generateDescription(name: string): string {
  const descriptions: Record<string, string> = {
    "Mortgage Calculator": "Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. Plan your home purchase with accurate estimates. Try it now!",
    "Loan Calculator": "Calculate loan payments and total interest costs for personal, auto, or business loans. Compare different terms and rates instantly. Free accurate calculator.",
    "Compound Interest Calculator": "Project your investment growth with compound interest. Calculate how regular contributions grow over time. Accurate financial projection tool.",
    "Investment Calculator": "Project investment growth and calculate inflation-adjusted returns. See how fees impact your portfolio. Plan your financial future.",
    "Savings Calculator": "Calculate savings growth and time to reach goals. Compare high-yield accounts. Track your progress to financial targets.",
    "Retirement Calculator": "Project your retirement nest egg and sustainable income. Test different contribution rates. Plan for financial security.",
    "Inflation Calculator": "Calculate purchasing power changes over time. See how inflation affects your savings and goals. Make informed financial decisions.",
    "Credit Card Payoff Calculator": "Plan your credit card payoff strategy. Calculate time to debt freedom and interest savings. Test different payment amounts.",
    "Debt Payoff Calculator": "Create an accelerated debt payoff plan. Compare current vs. aggressive strategies. Quantify interest savings. Get out of debt faster.",
    "Auto Loan Calculator": "Calculate car loan payments including tax and fees. Compare financing options. Plan your next vehicle purchase.",
  };
  return descriptions[name] || SITE.description;
}

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  image,
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
}) {
  const absolutePath = path.startsWith("http") ? path : `${SITE.url}${path}`;
  const ogImage = image || SITE.image;

  return {
    meta: [
      { title: title.length > 60 ? `${title.substring(0, 57)}...` : title },
      { name: "description", content: description.length > 160 ? `${description.substring(0, 157)}...` : description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: absolutePath },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: String(SITE.imageWidth) },
      { property: "og:image:height", content: String(SITE.imageHeight) },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@MoneyCalc" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "theme-color", content: "#2563EB" },
      { name: "msapplication-TileColor", content: "#2563EB" },
    ],
    links: [
      { rel: "canonical", href: absolutePath },
      { rel: "alternate", hrefLang: "en", href: absolutePath },
    ],
  };
}