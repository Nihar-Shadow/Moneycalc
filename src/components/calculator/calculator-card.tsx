import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/site/icon";
import type { CalculatorConfig } from "@/lib/calculators/types";
import { cn } from "@/lib/utils";

export function CalculatorCard({
  calculator,
  className,
}: {
  calculator: CalculatorConfig;
  className?: string;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={`/calculators/${calculator.slug}` as any}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift",
        className,
      )}
    >
      <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon name={calculator.icon} className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{calculator.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{calculator.description}</p>
      <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
        Open calculator
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
