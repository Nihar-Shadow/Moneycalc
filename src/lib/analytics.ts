export type AnalyticsEvent =
  | "calculator_view"
  | "calculator_calculate"
  | "calculator_reset"
  | "result_copy"
  | "result_share"
  | "result_print"
  | "result_download"
  | "search_query"
  | "newsletter_signup"
  | "cta_click"
  | "category_view"
  | "footer_link_click"
  | "outbound_link_click"
  | "cookie_consent_accept"
  | "cookie_consent_decline";

export type CookieConsentState = {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    ts?: (args: { name: string; payload?: Record<string, unknown> }) => void;
  }
}

const CONSENT_KEY = "moneycalc-cookie-consent";

export function getCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return consent ? JSON.parse(consent) as CookieConsentState : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: CookieConsentState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

export function isConsentGiven(category: "analytics" | "advertising" | "functional"): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[category] === true;
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  
  try {
    window.gtag?.("event", event, params);
  } catch {
    // GA4 not configured yet
  }
  
  try {
    window.clarity?.("event", event);
  } catch {
    // Clarity not configured yet
  }
  
  try {
    window.ts?.({ name: event, payload: params });
  } catch {
    // Custom tracking endpoint not configured
  }
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  
  const consent = getCookieConsent();
  if (!consent || !consent.analytics) return;
  
  track("page_view", { page_path: path });
}

export function trackCalculatorView(calculatorName: string, slug: string) {
  track("calculator_view", { calculator_name: calculatorName, calculator_slug: slug });
}

export function trackCalculatorCalculate(slug: string, inputs: Record<string, number>) {
  track("calculator_calculate", { calculator_slug: slug, inputs });
}

export function trackResultShare(slug: string) {
  track("result_share", { calculator_slug: slug });
}

export function trackResultDownload(slug: string, format: "csv" | "json" | "pdf") {
  track("result_download", { calculator_slug: slug, format });
}

export function trackSearchQuery(query: string) {
  track("search_query", { query });
}

export function trackCategoryView(categoryName: string) {
  track("category_view", { category_name: categoryName });
}

export function trackFooterLink(linkText: string) {
  track("footer_link_click", { link_text: linkText });
}

export function trackOutboundLink(url: string, text?: string) {
  track("outbound_link_click", { url, link_text: text });
}

export function trackCookieConsent(consent: "accepted" | "declined") {
  track("cookie_consent_" + consent);
}