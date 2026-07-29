export const SITE = {
  name: "MoneyCalc",
  tagline: "Free Finance Calculators for Smarter Money Decisions",
  description:
    "MoneyCalc offers free, fast and accurate finance calculators for loans, mortgages, investments, retirement, savings and debt payoff.",
  url: "https://moneycalc.com",
  image: "https://moneycalc.com/og-image.png",
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
    logo: `${SITE.url}/favicon.ico`,
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
      { title: `${title} — ${SITE.name}` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: absolutePath },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: String(SITE.imageWidth) },
      { property: "og:image:height", content: String(SITE.imageHeight) },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@MoneyCalc" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: absolutePath }],
  };
}
