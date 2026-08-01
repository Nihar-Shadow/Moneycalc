import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  CookieConsentState,
  setCookieConsent,
  trackCookieConsent,
  isConsentGiven,
} from "@/lib/analytics";

const KEY = "moneycalc-cookie-consent";

const cookieCategories = [
  {
    id: "necessary" as const,
    title: "Essential",
    description: "Required for the website to function properly. Cannot be disabled.",
    required: true,
  },
  {
    id: "analytics" as const,
    title: "Analytics",
    description: "Help us understand how visitors interact with our calculators and improve the experience.",
  },
  {
    id: "advertising" as const,
    title: "Advertising",
    description: "Used to deliver ads that are relevant to you and limit ad repetition.",
  },
  {
    id: "functional" as const,
    title: "Functional",
    description: "Enable enhanced features like saved calculations and preferences.",
  },
];

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(KEY);
    if (!consent) setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      const firstFocusable = dialogRef.current?.querySelector("button") as HTMLElement;
      firstFocusable?.focus();
    } else {
      previouslyFocusedElementRef.current?.focus();
    }
  }, [visible]);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close],
  );

  const acceptAll = () => {
    const consent: CookieConsentState = {
      necessary: true,
      analytics: true,
      advertising: true,
      functional: true,
    };
    localStorage.setItem(KEY, JSON.stringify(consent));
    trackCookieConsent("accepted");
    setVisible(false);
  };

  const rejectNonEssential = () => {
    const consent: CookieConsentState = {
      necessary: true,
      analytics: false,
      advertising: false,
      functional: false,
    };
    localStorage.setItem(KEY, JSON.stringify(consent));
    trackCookieConsent("declined");
    setVisible(false);
  };

  const savePreferences = (preferences: Partial<CookieConsentState>) => {
    const consent: CookieConsentState = {
      necessary: true,
      analytics: preferences.analytics ?? false,
      advertising: preferences.advertising ?? false,
      functional: preferences.functional ?? false,
    };
    localStorage.setItem(KEY, JSON.stringify(consent));
    trackCookieConsent(consent.analytics ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="true"
      aria-describedby="cookie-description"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-border bg-card p-4 shadow-lift sm:inset-x-auto sm:right-6 sm:max-w-md"
    >
      {showPreferences ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cookie Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Choose which cookies you want to allow. You can change these settings anytime.
          </p>
          <div className="space-y-3">
            {cookieCategories.map((category) => (
              <div key={category.id} className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`consent-${category.id}`}
                    checked={
                      category.required
                        ? true
                        : isConsentGiven(category.id)
                    }
                    onChange={(e) => {
                      const newPrefs: Partial<CookieConsentState> = {
                        [category.id]: e.target.checked,
                      };
                      savePreferences(newPrefs);
                    }}
                    disabled={category.required}
                    className="mt-0.5"
                  />
                  <label htmlFor={`consent-${category.id}`} className="text-sm font-medium">
                    {category.title}
                    {category.required && <span className="text-xs text-muted-foreground">(Required)</span>}
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="rounded-xl" onClick={() => savePreferences({})}>
              Save Preferences
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl"
              onClick={close}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p id="cookie-description" className="text-sm text-muted-foreground">
            We use cookies to improve your experience and for analytics. Read our{" "}
            <Link
              to="/privacy-policy"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              privacy policy
            </Link>{" "}
            for details.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-2">
            <Button size="sm" className="rounded-xl" onClick={acceptAll}>
              Accept All
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl"
              onClick={rejectNonEssential}
            >
              Reject Non-Essential
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl"
              onClick={() => setShowPreferences(true)}
            >
              Preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}