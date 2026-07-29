import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const KEY = "moneycalc-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setVisible(true);
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

  const decide = (value: "accepted" | "declined") => {
    window.localStorage.setItem(KEY, value);
    close();
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
      <p id="cookie-description" className="text-sm text-muted-foreground">
        We use cookies for analytics and advertising. Read our{" "}
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={"/privacy-policy" as any}
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" className="rounded-xl" onClick={() => decide("accepted")}>
          Accept
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-xl"
          onClick={() => decide("declined")}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
