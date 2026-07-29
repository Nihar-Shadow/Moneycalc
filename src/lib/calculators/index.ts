import type { CalculatorCategory, CalculatorConfig } from "./types";
import { loanCalculators } from "./definitions/loans";
import { investingCalculators } from "./definitions/investing";

export const calculators: CalculatorConfig[] = [
  ...investingCalculators.slice(0, 2),
  ...loanCalculators.slice(0, 3),
  ...investingCalculators.slice(2),
  ...loanCalculators.slice(3),
];

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

export type { CalculatorConfig, CalculatorCategory };
