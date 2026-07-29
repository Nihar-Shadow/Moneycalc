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
  | "cta_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Sends an event to GA4 and Microsoft Clarity when they are configured.
 * Safe to call during SSR and when no analytics IDs are present.
 */
export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.clarity?.("event", event);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", { page_path: path });
}
