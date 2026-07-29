import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calculator, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SearchTrigger } from "./search";

const links = [
  { to: "/calculators", label: "Calculators" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 glass-panel">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6"
        aria-label="Main"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          MoneyCalc
        </Link>

        <ul className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={l.to as any}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger className="hidden sm:flex" />
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <Link to="/calculators">Start calculating</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={l.to as any}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <SearchTrigger className="w-full justify-start" />
          </div>
        </div>
      )}
    </header>
  );
}
