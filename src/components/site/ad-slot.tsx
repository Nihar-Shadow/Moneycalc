import { cn } from "@/lib/utils";

type AdPlacement = "below-hero" | "in-content" | "sidebar" | "after-faq" | "above-footer";

const sizes: Record<AdPlacement, string> = {
  "below-hero": "min-h-[90px]",
  "in-content": "min-h-[250px]",
  sidebar: "min-h-[600px]",
  "after-faq": "min-h-[250px]",
  "above-footer": "min-h-[90px]",
};

/**
 * Reusable AdSense slot. Renders a labelled, layout-stable placeholder until a
 * publisher ID and slot ID are supplied, which prevents cumulative layout shift.
 */
export function AdSlot({
  placement,
  className,
  slotId,
}: {
  placement: AdPlacement;
  className?: string;
  slotId?: string;
}) {
  const env = import.meta.env as { VITE_ADSENSE_CLIENT?: string };
  const client = env["VITE_ADSENSE_CLIENT"];

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "flex w-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface text-xs uppercase tracking-widest text-muted-foreground",
        sizes[placement],
        className,
      )}
    >
      {client && slotId ? (
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span>Advertisement</span>
      )}
    </aside>
  );
}
