import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Home, Calculator } from "lucide-react";

export const Route = createFileRoute("/500")({
  head: () =>
    pageMeta({
      title: "Server Error - MoneyCalc",
      description: "Something went wrong on our end. Please try again or return to the homepage.",
      path: "/500",
    }),
  component: ServerErrorPage,
});

function ServerErrorPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full bg-destructive/10 p-4">
            <RefreshCw className="size-8 text-destructive" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Server error</h1>
        <p className="mt-4 text-muted-foreground">
          Something went wrong on our end. Our team has been notified and we're working to fix the
          issue. Please try again in a few minutes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/calculators"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Calculator className="size-4" aria-hidden="true" />
            Browse calculators
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
          >
            <Home className="size-4" aria-hidden="true" />
            Go home
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-xs text-muted-foreground">
            Last updated: July 31, 2026 | MoneyCalc - Free Finance Calculators
          </p>
        </div>
      </div>
    </div>
  );
}
