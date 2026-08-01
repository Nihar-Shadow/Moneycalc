import type { CurrencyCode } from "@/lib/format";

export type FieldType = "currency" | "percent" | "number" | "months" | "years" | "select";

export interface CalculatorField {
  name: string;
  label: string;
  type: FieldType;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
  options?: { label: string; value: number }[];
}

export interface Metric {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
}

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface ChartSpec {
  type: "area" | "bar" | "pie";
  title: string;
  xKey?: string;
  data: Record<string, number | string>[];
  series: ChartSeries[];
}

export interface CalcStep {
  label: string;
  expression: string;
  result: string;
}

export interface CalcResult {
  summary: string;
  metrics: Metric[];
  chart?: ChartSpec;
  steps: CalcStep[];
  table?: { columns: string[]; rows: string[][] };
}

export type CalculatorCategory =
  | "Loans"
  | "Investments"
  | "Retirement"
  | "Savings"
  | "Credit Cards"
  | "Real Estate"
  | "Personal Finance"
  | "Taxes";

export interface CalculatorFaq {
  question: string;
  answer: string;
}

export interface CalculatorContent {
  intro: string;
  what: string;
  how: string[];
  formula: string;
  formulaNote: string;
  example: string;
  advantages: string[];
  limitations: string[];
  howWorks?: string;
  assumptions?: string[];
  commonMistakes?: string[];
  lastUpdated?: {
    date: string;
    method: string;
    version: string;
  };
  sources?: string[];
  references?: string[];
  author?: {
    name: string;
    credentials: string;
    role: string;
  };
  verification?: {
    status: "verified" | "pending";
    verifiedBy?: string;
    verifiedDate?: string;
  };
  whenToUse?: string;
  whenNotToUse?: string;
  tips?: string[];
  localIntro?: Record<string, string>;
  localExample?: Record<string, string>;
  localTaxInfo?: Record<string, string>;
  localAssumptions?: Record<string, string[]>;
  localReferences?: Record<string, string[]>;
  localFaqs?: Record<string, CalculatorFaq[]>;
}

export interface CategoryContent {
  intro: string;
  overview: string;
  benefits: string[];
  faqs: CalculatorFaq[];
}

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface CalculatorConfig {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords: string[];
  category: CalculatorCategory;
  icon: string;
  popular?: boolean;
  indexable: boolean;
  sitemap: boolean;
  robots?: string;
  priority?: number;
  changefreq?: ChangeFrequency;
  lastUpdated?: string;
  schemaType?: string;
  searchIntent?: string;
  fields: CalculatorField[];
  compute: (values: Record<string, number>, currency: CurrencyCode) => CalcResult;
  content: CalculatorContent;
  faqs: CalculatorFaq[];
  related: string[];
  variationIndexable?: Record<string, boolean>;
}
