export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "CAD" | "AUD" | "JPY";

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string; locale: string }[] = [
  { code: "USD", label: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", label: "Euro", symbol: "€", locale: "de-DE" },
  { code: "GBP", label: "British Pound", symbol: "£", locale: "en-GB" },
  { code: "INR", label: "Indian Rupee", symbol: "₹", locale: "en-IN" },
  { code: "CAD", label: "Canadian Dollar", symbol: "$", locale: "en-CA" },
  { code: "AUD", label: "Australian Dollar", symbol: "$", locale: "en-AU" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥", locale: "ja-JP" },
];

export function currencyMeta(code: CurrencyCode) {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function formatCurrency(value: number, code: CurrencyCode = "USD", decimals = 2) {
  const meta = currencyMeta(code);
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency: meta.code,
    maximumFractionDigits: code === "JPY" ? 0 : decimals,
    minimumFractionDigits: code === "JPY" ? 0 : decimals,
  }).format(value);
}

export function formatCompact(value: number, code: CurrencyCode = "USD") {
  const meta = currencyMeta(code);
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency: meta.code,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 0) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatMonths(months: number) {
  if (!Number.isFinite(months) || months <= 0) return "—";
  const total = Math.ceil(months);
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (y === 0) return `${m} month${m === 1 ? "" : "s"}`;
  if (m === 0) return `${y} year${y === 1 ? "" : "s"}`;
  return `${y} yr ${m} mo`;
}

/** Monthly amortising payment for a loan. */
export function monthlyPayment(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}
