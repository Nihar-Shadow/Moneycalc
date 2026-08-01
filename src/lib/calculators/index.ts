import type { CalculatorCategory, CalculatorConfig } from "./types";
import { loanCalculators } from "./definitions/loans";
import { investingCalculators } from "./definitions/investing";
import { SITE } from "@/lib/seo";

export const calculators: CalculatorConfig[] = [
  ...investingCalculators.slice(0, 2),
  ...loanCalculators.slice(0, 3),
  ...investingCalculators.slice(2),
  ...loanCalculators.slice(3),
].map((calc) => ({
  ...calc,
  indexable: calc.indexable !== false,
  sitemap: calc.sitemap !== false,
  robots: calc.robots || "index, follow",
  priority: calc.priority ?? 0.9,
  changefreq: calc.changefreq ?? "monthly",
  lastUpdated: calc.lastUpdated ?? "2026-07-31",
  searchIntent: calc.searchIntent ?? "informational",
}));

export const calculatorMap = new Map(calculators.map((c) => [c.slug, c]));

export function getCalculator(slug: string) {
  return calculatorMap.get(slug);
}

export function getRelated(slugs: string[]) {
  return slugs.map((s) => calculatorMap.get(s)).filter(Boolean) as CalculatorConfig[];
}

export const categories: { name: CalculatorCategory; description: string; icon: string }[] = [
  { name: "Loans", description: "Personal, auto and business borrowing costs", icon: "Banknote" },
  {
    name: "Investments",
    description: "Compounding, portfolios and long-term growth",
    icon: "TrendingUp",
  },
  {
    name: "Retirement",
    description: "Nest egg projections and withdrawal planning",
    icon: "Sunrise",
  },
  {
    name: "Savings",
    description: "Goals, emergency funds and high-yield accounts",
    icon: "PiggyBank",
  },
  { name: "Credit Cards", description: "Payoff timelines and interest costs", icon: "CreditCard" },
  { name: "Real Estate", description: "Mortgages, affordability and home costs", icon: "Home" },
  { name: "Personal Finance", description: "Budgeting, debt and purchasing power", icon: "Wallet" },
  { name: "Taxes", description: "Tax-aware planning tools — coming soon", icon: "Receipt" },
];

export function calculatorsByCategory(category: CalculatorCategory) {
  return calculators.filter((c) => c.category === category);
}

export function searchCalculators(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return calculators;
  return calculators.filter((c) =>
    [c.name, c.description, c.category, ...c.keywords].join(" ").toLowerCase().includes(q),
  );
}

export const popularSearches = [
  "mortgage",
  "compound interest",
  "retirement",
  "credit card",
  "auto loan",
  "inflation",
];

export function isVariationIndexable(calculator: CalculatorConfig, variationType: string, location?: string): boolean {
  if (!calculator.indexable) return false;
  
  if (location && calculator.content.localIntro && !calculator.content.localIntro[location]) {
    return false;
  }
  
  if (!location && variationType !== "type") {
    return false;
  }
  
  return true;
}

export function generateSitemap(): string {
  const urls: string[] = [];
  
  urls.push(
    `<url><loc>${SITE.url}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`
  );
  
  urls.push(
    `<url><loc>${SITE.url}/calculators</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`
  );
  
  for (const calc of calculators) {
    if (calc.indexable && calc.sitemap) {
      urls.push(
        `<url><loc>${SITE.url}/calculators/${calc.slug}</loc><changefreq>${calc.changefreq}</changefreq><priority>${calc.priority}</priority><lastmod>${calc.lastUpdated}</lastmod></url>`
      );
    }
  }
  
  for (const cat of categories) {
    const slug = cat.name.toLowerCase().replace(/ /g, "-");
    urls.push(
      `<url><loc>${SITE.url}/categories/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    );
  }
  
  urls.push(
    `<url><loc>${SITE.url}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`
  );
  urls.push(
    `<url><loc>${SITE.url}/contact</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`
  );
  urls.push(
    `<url><loc>${SITE.url}/privacy-policy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`
  );
  urls.push(
    `<url><loc>${SITE.url}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`
  );
  urls.push(
    `<url><loc>${SITE.url}/disclaimer</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`
  );
  urls.push(
    `<url><loc>${SITE.url}/cookies</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`
  );
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

export function getAllUrls(): Array<{ url: string; lastmod: string; changefreq: string; priority: number }> {
  const urls: Array<{ url: string; lastmod: string; changefreq: string; priority: number }> = [];
  
  for (const calc of calculators) {
    if (calc.indexable && calc.sitemap) {
      urls.push({
        url: `${SITE.url}/calculators/${calc.slug}`,
        lastmod: calc.lastUpdated || "2026-07-31",
        changefreq: calc.changefreq || "monthly",
        priority: calc.priority || 0.9,
      });
    }
  }
  
  return urls;
}

export type { CalculatorConfig, CalculatorCategory };
