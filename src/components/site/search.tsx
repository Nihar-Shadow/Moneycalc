import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icon } from "./icon";
import { calculators, popularSearches } from "@/lib/calculators";
import { track } from "@/lib/analytics";

const RECENT_KEY = "moneycalc-recent-searches";

export function SearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    try {
      setRecent(JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      setRecent([]);
    }
  }, [open]);

  const remember = (name: string) => {
    const next = [name, ...recent.filter((r) => r !== name)].slice(0, 5);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    setRecent(next);
  };

  const grouped = useMemo(() => {
    const map = new Map<string, typeof calculators>();
    calculators.forEach((c) => {
      map.set(c.category, [...(map.get(c.category) ?? []), c]);
    });
    return [...map.entries()];
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search calculators"
        className={
          "flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground " +
          (className ?? "")
        }
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search calculators</span>
        <kbd className="ml-2 hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium md:inline">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search 10+ finance calculators…" />
        <CommandList>
          <CommandEmpty>No calculator matches that search.</CommandEmpty>
          {recent.length > 0 && (
            <CommandGroup heading="Recent searches">
              {recent.map((r) => (
                <CommandItem
                  key={r}
                  value={`recent ${r}`}
                  onSelect={() => navigate({ to: "/calculators", search: { q: r } })}
                >
                  {r}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Popular searches">
            {popularSearches.map((p) => (
              <CommandItem
                key={p}
                value={`popular ${p}`}
                onSelect={() => {
                  track("search_query", { query: p, source: "popular" });
                  setOpen(false);
                  navigate({ to: "/calculators", search: { q: p } });
                }}
              >
                {p}
              </CommandItem>
            ))}
          </CommandGroup>
          {grouped.map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((c) => (
                <CommandItem
                  key={c.slug}
                  value={`${c.name} ${c.keywords.join(" ")}`}
                  onSelect={() => {
                    track("search_query", { query: c.name, source: "command" });
                    remember(c.name);
                    setOpen(false);
                    navigate({ to: "/calculators/$slug", params: { slug: c.slug } });
                  }}
                >
                  <Icon name={c.icon} className="mr-2 size-4 text-primary" />
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export function InlineSearch() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const matches = useMemo(
    () =>
      value.trim()
        ? calculators
            .filter((c) =>
              [c.name, c.category, ...c.keywords]
                .join(" ")
                .toLowerCase()
                .includes(value.toLowerCase()),
            )
            .slice(0, 5)
        : [],
    [value],
  );

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <label htmlFor="hero-search" className="sr-only">
        Search finance calculators
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="hero-search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            track("search_query", { query: value, source: "hero" });
            navigate({ to: "/calculators", search: { q: value } });
          }
        }}
        placeholder="Try “mortgage”, “compound interest”, “debt payoff”…"
        className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-base shadow-soft outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      {matches.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-lift">
          {matches.map((c) => (
            <li key={c.slug}>
              <Link
                to="/calculators/$slug"
                params={{ slug: c.slug }}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent"
              >
                <Icon name={c.icon} className="size-4 text-primary" />
                <span className="font-medium">{c.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{c.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
