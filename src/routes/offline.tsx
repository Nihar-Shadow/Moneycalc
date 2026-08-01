import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { Home, Calculator, Download, Wifi } from "lucide-react";

export const Route = createFileRoute("/offline")({
  head: () =>
    pageMeta({
      title: "Offline - MoneyCalc",
      description:
        "You appear to be offline. You can still use previously loaded calculators or return home.",
      path: "/offline",
    }),
  component: OfflinePage,
});

function OfflinePage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-full bg-secondary/10 p-4">
            <Wifi className="size-8 text-secondary" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">You appear to be offline</h1>
        <p className="mt-4 text-muted-foreground">
          It looks like you're not connected to the internet. You can still access previously loaded
          content or navigate using the links below.
        </p>
        <div className="mt-8">
          <div className="space-y-3">
            <Link
              to="/calculators"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Calculator className="size-4" aria-hidden="true" />
              Browse calculators
            </Link>
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
            >
              <Home className="size-4" aria-hidden="true" />
              Go home
            </Link>
            <a
              href="/calculators"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
              download
            >
              <Download className="size-4" aria-hidden="true" />
              Download results
            </a>
          </div>
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
