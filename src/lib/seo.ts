export const SITE_URL =
  typeof process !== "undefined"
    ? process.env.PUBLIC_SITE_URL ?? "https://moneycalc-kiku.vercel.app"
    : "https://moneycalc-kiku.vercel.app";

export const SITE = {
  name: "MoneyCalc",
  tagline: "Free Finance Calculators for Smarter Money Decisions",
  description:
    "MoneyCalc offers free, fast and accurate finance calculators for loans, mortgages, investments, retirement, savings and debt payoff.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.svg`,
  imageWidth: 1200,
  imageHeight: 630,
};

export const US_STATES = [
  { code: "AL", name: "Alabama", nameLower: "alabama", slug: "alabama" },
  { code: "AK", name: "Alaska", nameLower: "alaska", slug: "alaska" },
  { code: "AZ", name: "Arizona", nameLower: "arizona", slug: "arizona" },
  { code: "AR", name: "Arkansas", nameLower: "arkansas", slug: "arkansas" },
  { code: "CA", name: "California", nameLower: "california", slug: "california" },
  { code: "CO", name: "Colorado", nameLower: "colorado", slug: "colorado" },
  { code: "CT", name: "Connecticut", nameLower: "connecticut", slug: "connecticut" },
  { code: "DE", name: "Delaware", nameLower: "delaware", slug: "delaware" },
  { code: "FL", name: "Florida", nameLower: "florida", slug: "florida" },
  { code: "GA", name: "Georgia", nameLower: "georgia", slug: "georgia" },
  { code: "HI", name: "Hawaii", nameLower: "hawaii", slug: "hawaii" },
  { code: "ID", name: "Idaho", nameLower: "idaho", slug: "idaho" },
  { code: "IL", name: "Illinois", nameLower: "illinois", slug: "illinois" },
  { code: "IN", name: "Indiana", nameLower: "indiana", slug: "indiana" },
  { code: "IA", name: "Iowa", nameLower: "iowa", slug: "iowa" },
  { code: "KS", name: "Kansas", nameLower: "kansas", slug: "kansas" },
  { code: "KY", name: "Kentucky", nameLower: "kentucky", slug: "kentucky" },
  { code: "LA", name: "Louisiana", nameLower: "louisiana", slug: "louisiana" },
  { code: "ME", name: "Maine", nameLower: "maine", slug: "maine" },
  { code: "MD", name: "Maryland", nameLower: "maryland", slug: "maryland" },
  { code: "MA", name: "Massachusetts", nameLower: "massachusetts", slug: "massachusetts" },
  { code: "MI", name: "Michigan", nameLower: "michigan", slug: "michigan" },
  { code: "MN", name: "Minnesota", nameLower: "minnesota", slug: "minnesota" },
  { code: "MS", name: "Mississippi", nameLower: "mississippi", slug: "mississippi" },
  { code: "MO", name: "Missouri", nameLower: "missouri", slug: "missouri" },
  { code: "MT", name: "Montana", nameLower: "montana", slug: "montana" },
  { code: "NE", name: "Nebraska", nameLower: "nebraska", slug: "nebraska" },
  { code: "NV", name: "Nevada", nameLower: "nevada", slug: "nevada" },
  { code: "NH", name: "New Hampshire", nameLower: "new hampshire", slug: "new-hampshire" },
  { code: "NJ", name: "New Jersey", nameLower: "new jersey", slug: "new-jersey" },
  { code: "NM", name: "New Mexico", nameLower: "new mexico", slug: "new-mexico" },
  { code: "NY", name: "New York", nameLower: "new york", slug: "new-york" },
  { code: "NC", name: "North Carolina", nameLower: "north carolina", slug: "north-carolina" },
  { code: "ND", name: "North Dakota", nameLower: "north dakota", slug: "north-dakota" },
  { code: "OH", name: "Ohio", nameLower: "ohio", slug: "ohio" },
  { code: "OK", name: "Oklahoma", nameLower: "oklahoma", slug: "oklahoma" },
  { code: "OR", name: "Oregon", nameLower: "oregon", slug: "oregon" },
  { code: "PA", name: "Pennsylvania", nameLower: "pennsylvania", slug: "pennsylvania" },
  { code: "RI", name: "Rhode Island", nameLower: "rhode island", slug: "rhode-island" },
  { code: "SC", name: "South Carolina", nameLower: "south carolina", slug: "south-carolina" },
  { code: "SD", name: "South Dakota", nameLower: "south dakota", slug: "south-dakota" },
  { code: "TN", name: "Tennessee", nameLower: "tennessee", slug: "tennessee" },
  { code: "TX", name: "Texas", nameLower: "texas", slug: "texas" },
  { code: "UT", name: "Utah", nameLower: "utah", slug: "utah" },
  { code: "VT", name: "Vermont", nameLower: "vermont", slug: "vermont" },
  { code: "VA", name: "Virginia", nameLower: "virginia", slug: "virginia" },
  { code: "WA", name: "Washington", nameLower: "washington", slug: "washington" },
  { code: "WV", name: "West Virginia", nameLower: "west virginia", slug: "west-virginia" },
  { code: "WI", name: "Wisconsin", nameLower: "wisconsin", slug: "wisconsin" },
  { code: "WY", name: "Wyoming", nameLower: "wyoming", slug: "wyoming" },
];

export const COUNTRIES = [
  { code: "us", name: "United States", nameLower: "united states" },
  { code: "uk", name: "United Kingdom", nameLower: "united kingdom" },
  { code: "ca", name: "Canada", nameLower: "canada" },
  { code: "au", name: "Australia", nameLower: "australia" },
  { code: "in", name: "India", nameLower: "india" },
  { code: "sg", name: "Singapore", nameLower: "singapore" },
  { code: "za", name: "South Africa", nameLower: "south africa" },
  { code: "mx", name: "Mexico", nameLower: "mexico" },
];

export const REGIONS = [
  { code: "west", name: "West Coast", states: ["CA", "OR", "WA", "NV", "AZ"] },
  { code: "southwest", name: "Southwest", states: ["AZ", "NM", "TX", "NV", "CA"] },
  { code: "southeast", name: "Southeast", states: ["FL", "GA", "NC", "SC", "AL", "TN"] },
  { code: "midwest", name: "Midwest", states: ["IL", "OH", "MI", "WI", "MN", "IN"] },
  { code: "northeast", name: "Northeast", states: ["NY", "MA", "CT", "NJ", "PA", "NH"] },
  { code: "south-central", name: "South Central", states: ["TX", "OK", "AR", "LA", "MS"] },
  { code: "north-central", name: "North Central", states: ["ND", "SD", "NE", "KS", "MN", "WI"] },
];

export const loanTypes = [
  { slug: "personal", name: "Personal", label: "Personal" },
  { slug: "auto", name: "Auto", label: "Auto/Vehicle" },
  { slug: "business", name: "Business", label: "Business" },
  { slug: "student", name: "Student", label: "Student" },
  { slug: "debt-consolidation", name: "Debt Consolidation", label: "Debt Consolidation" },
  { slug: "home", name: "Home", label: "Home/Home Equity" },
  { slug: "medical", name: "Medical", label: "Medical/Healthcare" },
  { slug: "wedding", name: "Wedding", label: "Wedding" },
  { slug: "vacation", name: "Vacation", label: "Vacation/Loan" },
];

export const investmentTypes = [
  { slug: "sip", name: "SIP", label: "Systematic Investment Plan" },
  { slug: "lump-sum", name: "Lump Sum", label: "Lump Sum Investment" },
  { slug: "etf", name: "ETF", label: "ETF Calculator" },
  { slug: "index-fund", name: "Index Fund", label: "Index Fund Calculator" },
  { slug: "mutual-fund", name: "Mutual Fund", label: "Mutual Fund Calculator" },
  { slug: "stock", name: "Stock", label: "Stock Investment" },
  { slug: "dividend", name: "Dividend", label: "Dividend Calculator" },
];

export const retirementTypes = [
  { slug: "fire", name: "FIRE", label: "Financial Independence Retire Early" },
  { slug: "401k", name: "401k", label: "401(k) Calculator" },
  { slug: "ira", name: "IRA", label: "IRA Calculator" },
  { slug: "pension", name: "Pension", label: "Pension Calculator" },
  { slug: "retirement-income", name: "Retirement Income", label: "Retirement Income Calculator" },
  { slug: "withdrawal", name: "Withdrawal", label: "Retirement Withdrawal Calculator" },
];

export const savingsTypes = [
  { slug: "emergency-fund", name: "Emergency Fund", label: "Emergency Fund Calculator" },
  { slug: "vacation", name: "Vacation", label: "Vacation Savings Calculator" },
  { slug: "house-down-payment", name: "House Down Payment", label: "House Down Payment Calculator" },
  { slug: "wedding", name: "Wedding", label: "Wedding Savings Calculator" },
  { slug: "college", name: "College", label: "College Savings Calculator" },
];

export function getStateBySlug(slug: string) {
  return US_STATES.find((s) => s.slug === slug);
}

export function getStateByCode(code: string) {
  return US_STATES.find((s) => s.code === code.toUpperCase());
}

export function getCountryByCode(code: string) {
  return COUNTRIES.find((c) => c.code === code.toLowerCase());
}

export const usStates = US_STATES.map((s) => ({ name: s.name }));

export const loanTypeMeta: Record<string, { keyword: string; secondary: string[] }> = {
  personal: {
    keyword: "Personal Loan Calculator",
    secondary: ["personal loan monthly payment", "personal loan interest calculator", "best personal loan rates"],
  },
  auto: {
    keyword: "Auto Loan Calculator",
    secondary: ["car loan payment calculator", "auto loan interest calculator", "best car loan rates"],
  },
  business: {
    keyword: "Business Loan Calculator",
    secondary: ["business loan payment", "commercial loan calculator", "small business loan rates"],
  },
  student: {
    keyword: "Student Loan Calculator",
    secondary: ["student loan payment calculator", "student loan interest", "pay off student loans"],
  },
};

export const savingsTypeMeta: Record<string, { keyword: string; secondary: string[] }> = {
  "emergency-fund": {
    keyword: "Emergency Fund Calculator",
    secondary: ["how much emergency fund", "emergency savings target", "3-6 months expense"],
  },
  "vacation": {
    keyword: "Vacation Savings Calculator",
    secondary: ["vacation budget planner", "travel savings calculator", "how much to save for vacation"],
  },
  "house-down-payment": {
    keyword: "House Down Payment Calculator",
    secondary: ["down payment percentage", "typical down payment", "20 percent down payment"],
  },
  "wedding": {
    keyword: "Wedding Savings Calculator",
    secondary: ["average wedding cost", "wedding budget", "plan wedding savings"],
  },
  "college": {
    keyword: "College Savings Calculator",
    secondary: ["529 plan calculator", "college fund savings", "how much for college"],
  },
};

export function getLoanTypeSlug(type: string): string {
  return type.toLowerCase().replace(/\s+/g, "-");
}

export function getLoanTypeName(slug: string): string {
  const lowerSlug = slug.toLowerCase().replace(/-/g, " ");
  return loanTypes.find((t) => t.slug === slug)?.name || slug;
}

export function getInvestmentTypeName(slug: string): string {
  const lowerSlug = slug.toLowerCase().replace(/-/g, " ");
  return investmentTypes.find((t) => t.slug === slug)?.name || slug;
}

export function getRetirementTypeName(slug: string): string {
  const lowerSlug = slug.toLowerCase().replace(/-/g, " ");
  return retirementTypes.find((t) => t.slug === slug)?.name || slug;
}

export function getSavingsTypeName(slug: string): string {
  const lowerSlug = slug.toLowerCase().replace(/-/g, " ");
  return savingsTypes.find((t) => t.slug === slug)?.name || slug;
}

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
    foundingDate: "2024",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Online",
        addressCountry: "US",
      },
    },
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

export function personSchema(name: string, credentials?: string, role?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    jobTitle: role || "Financial Content Specialist",
    description: credentials ? `${name}, ${credentials}` : name,
    url: `${SITE.url}/about`,
  };
}

export function articleSchema(article: {
  headline: string;
  description: string;
  author: { name: string; credentials: string; role: string };
  datePublished: string;
  dateModified: string;
  image?: string;
  publisher?: { name: string; logo: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: article.image || `${SITE.url}/og-image.svg`,
    publisher: article.publisher || {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}${article.headline.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
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
    featureList: [
      "Instant calculations",
      "Visual charts",
      "Mobile-friendly",
      "Privacy-focused",
      "Educational content",
      "Industry-standard formulas",
    ],
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    dateModified: "2026-07-31",
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
    "Mortgage Calculator":
      "Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. Plan your home purchase with accurate estimates. Try it now!",
    "Loan Calculator":
      "Calculate loan payments and total interest costs for personal, auto, or business loans. Compare different terms and rates instantly. Free accurate calculator.",
    "Compound Interest Calculator":
      "Project your investment growth with compound interest. Calculate how regular contributions grow over time. Accurate financial projection tool.",
    "Investment Calculator":
      "Project investment growth and calculate inflation-adjusted returns. See how fees impact your portfolio. Plan your financial future.",
    "Savings Calculator":
      "Calculate savings growth and time to reach goals. Compare high-yield savings accounts. Track your progress to financial targets.",
    "Retirement Calculator":
      "Project your retirement nest egg and sustainable income. Test different contribution rates. Plan for financial security.",
    "Inflation Calculator":
      "Calculate purchasing power changes over time. See how inflation affects your savings and goals. Make informed financial decisions.",
    "Credit Card Payoff Calculator":
      "Plan your credit card payoff strategy. Calculate time to debt freedom and interest savings. Test different payment amounts.",
    "Debt Payoff Calculator":
      "Create an accelerated debt payoff plan. Compare current vs. aggressive strategies. Quantify interest savings. Get out of debt faster.",
    "Auto Loan Calculator":
      "Calculate car loan payments including tax and fees. Compare financing options. Plan your next vehicle purchase.",
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
      {
        name: "description",
        content: description.length > 160 ? `${description.substring(0, 157)}...` : description,
      },
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

import type { CalculatorConfig } from "./calculators/types";

export interface LandingPageContext {
  calculator: CalculatorConfig;
  state?: string;
  country?: string;
  type?: string;
  slug?: string;
  variationType?: "location" | "type" | "investment" | "retirement" | "savings";
}

export interface LandingPageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}

const useCaseTemplates: Record<string, string> = {
  "Mortgage": "Use this calculator when house hunting or comparing mortgage offers to understand your true monthly housing costs. Essential for first-time homebuyers and those considering refinancing. Calculate PITI (Principal, Interest, Taxes, Insurance) to see the complete monthly housing expense including all components.",
  "Loan": "Use this calculator when comparing loan offers or testing different loan terms before committing to a purchase. Perfect for personal loans, auto loans, student loans, and business financing. Compare the total interest cost and monthly payment to find the best deal.",
  "Investment": "Use this calculator to project long-term investment growth and understand the impact of fees and inflation on your returns. Essential for portfolio planning and retirement preparation. Calculate compound interest returns over time.",
  "Savings": "Use this calculator to set realistic savings goals and compare high-yield savings accounts. Ideal for emergency funds, vacation savings, and down payment goals. See how compound interest accelerates your savings.",
  "Retirement": "Use this calculator to check if you're on track for retirement and to test different contribution rates. Essential for 401k and IRA planning. Calculate your sustainable withdrawal rate.",
  "Credit Card": "Use this calculator to plan your debt payoff strategy and test different payment amounts. Essential for anyone carrying credit card debt. Calculate how to get out of debt faster.",
  "Debt": "Use this calculator to create an accelerated debt payoff plan and quantify potential interest savings. Perfect for debt snowball or avalanche strategies.",
  "Compound Interest": "Use this calculator to understand how compound interest grows your money over time with regular contributions. Essential for investment education and planning. Calculate the power of starting early.",
};

const whoShouldUseTemplates: Record<string, string> = {
  "Mortgage": "First-time homebuyers, current homeowners considering refinancing, and anyone comparing mortgage offers. Essential for anyone in the home buying process. Also useful for investors analyzing rental property cash flow.",
  "Loan": "Anyone considering borrowing for personal, business, or educational expenses. Great for comparing loan terms and rates across different lenders. Perfect for major purchases like vehicles or home improvements.",
  "Investment": "Long-term investors, those planning for major purchases, and anyone comparing investment options. Perfect for retirement planning and wealth building strategies. Ideal for beginners learning about investing.",
  "Savings": "People saving for specific goals like vacations, emergencies, or down payments. Ideal for high-yield savings account comparisons. Essential for anyone building financial security.",
  "Retirement": "Anyone planning for retirement, especially those in their 20s through 50s. Essential for 401k and IRA planning. Perfect for early career professionals and pre-retirees.",
  "Credit Card": "Credit card holders trying to pay off balances efficiently. Essential for debt management strategies. Anyone interested in understanding credit card interest calculations.",
  "Debt": "Anyone carrying consumer debt looking to accelerate their payoff strategy. Perfect for debt reduction plans. Those considering debt consolidation options.",
  "Compound Interest": "Anyone interested in understanding how compound interest works and its power in wealth building. Ideal for investment beginners and seasoned investors alike.",
};

export function getUseCaseText(name: string): string {
  for (const key in useCaseTemplates) {
    if (name.includes(key)) {
      return useCaseTemplates[key];
    }
  }
  return "Use this calculator to analyze your financial scenario and make informed decisions.";
}

export function getWhoShouldUseText(name: string): string {
  for (const key in whoShouldUseTemplates) {
    if (name.includes(key)) {
      return whoShouldUseTemplates[key];
    }
  }
  return "Anyone looking to make informed financial decisions based on accurate calculations.";
}

export function getCanonicalPath(ctx: LandingPageContext): string {
  const { calculator } = ctx;
  return `${SITE.url}/calculators/${calculator.slug}`;
}

export function generateRelatedKeywords(baseKeyword: string, variationType: string): string[] {
  const keywords: Record<string, (base: string) => string[]> = {
    location: (base) => [
      `${base} calculator by state`,
      `${base} calculator by zip code`,
      `find ${base.toLowerCase()} rates near me`,
    ],
    type: (base) => [
      `best ${base.toLowerCase()} rates`,
      `${base} monthly payment`,
      `${base.toLowerCase()} terms and conditions`,
    ],
    investment: (base) => [
      `${base} performance analysis`,
      `compare ${base.toLowerCase()} returns`,
      `${base} tax implications`,
    ],
    retirement: (base) => [
      `${base} contribution limits`,
      `${base} withdrawal rules`,
      `${base} tax treatment`,
    ],
    savings: (base) => [
      `how to save for ${base.toLowerCase()}`,
      `${base} interest rates`,
      `budget for ${base.toLowerCase()}`,
    ],
  };
  
  const generator = keywords[variationType] || (() => []);
  return generator(baseKeyword);
}