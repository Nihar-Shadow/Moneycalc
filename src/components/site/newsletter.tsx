import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { track } from "@/lib/analytics";
import { Check } from "lucide-react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(value) || value.length > 255) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
    track("newsletter_signup", { placement: compact ? "footer" : "section" });
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-secondary">
        <Check className="size-4" aria-hidden="true" /> You are on the list. Talk soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={compact ? "space-y-2" : "mx-auto flex max-w-md flex-col gap-3 sm:flex-row"}
    >
      <label htmlFor={compact ? "nl-footer" : "nl-main"} className="sr-only">
        Email address
      </label>
      <Input
        id={compact ? "nl-footer" : "nl-main"}
        type="email"
        inputMode="email"
        maxLength={255}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${compact ? "nl-footer" : "nl-main"}-error` : undefined}
        className="h-11 rounded-xl"
      />
      <Button type="submit" className="h-11 rounded-xl">
        Subscribe
      </Button>
      {error && (
        <p id={`${compact ? "nl-footer" : "nl-main"}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}
