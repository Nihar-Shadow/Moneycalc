import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Home, Calculator } from "lucide-react";

export const Route = createFileRoute("/404")({
  head: () =>
    pageMeta({
      title: "Page Not Found - MoneyCalc",
      description:
        "The page you're looking for doesn't exist. Browse our finance calculators or return home.",
      path: "/404",
    }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full bg-secondary/10 p-4">
            <Calculator className="size-8 text-secondary" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Oops! Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist. It may have been moved, removed, or the URL is
          incorrect.
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
