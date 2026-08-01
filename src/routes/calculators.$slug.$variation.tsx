import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCalculator, isVariationIndexable } from "@/lib/calculators";
import { pageMeta, SITE } from "@/lib/seo";
import { Shield, Check, Globe, Award } from "lucide-react";

function unslug(slug: string): string {
  return slug.split("-").map((w, i) => {
    if (i === 0) return w.charAt(0).toUpperCase() + w.slice(1);
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(" ");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Route = createFileRoute("/calculators/$slug/$variation")({
  loader: ({ params }) => {
    const { slug, variation } = params;
    const calculator = getCalculator(slug);
    
    if (!calculator) throw notFound();
    
    let isLocationVariation = false;
    let isTypeVariation = false;
    let locationName: string | undefined;
    let typeName: string | undefined;
    
    if (variation.includes("-in-")) {
      const match = variation.match(/-in-([a-z-]+)$/);
      if (match) {
        locationName = unslug(match[1]);
        if (locationName) {
          isLocationVariation = true;
        }
      }
    }
    
    if (!isLocationVariation && variation !== slug && !variation.startsWith(slug)) {
      isTypeVariation = true;
      typeName = variation;
    }
    
    const indexable = isVariationIndexable(
      calculator,
      isLocationVariation ? "location" : "type",
      locationName
    );
    
    if (!indexable) {
      const pageTitle = calculator.name;
      const desc = `${calculator.description} No unique localized content available for this variation.`;
      
      return {
        slug,
        variation,
        notIndexable: true,
        pageTitle,
        pageMeta: {
          title: pageTitle,
          description: desc,
          path: `/calculators/${slug}/${variation}`,
          robots: "noindex, follow",
        },
      };
    }
    
    let pageTitle = calculator.name;
    if (locationName) {
      pageTitle = `${calculator.name} in ${locationName}`;
    } else if (typeName) {
      pageTitle = `${capitalize(typeName)} ${calculator.name}`;
    }
    
    return {
      slug,
      variation,
      isLocationVariation,
      isTypeVariation,
      locationName,
      typeName,
      pageTitle,
      notIndexable: false,
    };
  },
  head: ({ params }) => {
    const result = Route.getLoaderData();
    
    if (!result) {
      return {
        meta: [
          { title: "Calculator not found - MoneyCalc" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    
    if (result.notIndexable) {
      return {
        meta: [
          { title: result.pageMeta?.title || "Calculator Variation" },
          { name: "description", content: result.pageMeta?.description || "" },
          { name: "robots", content: "noindex, follow" },
          { rel: "canonical", href: `${SITE.url}/calculators/${result.slug}` },
        ],
      };
    }
    
    return result.pageMeta;
  },
  component: CalculatorVariationPage,
});

interface LoaderResult {
  slug: string;
  variation: string;
  notIndexable: boolean;
  pageTitle?: string;
  pageMeta?: any;
  isLocationVariation?: boolean;
  isTypeVariation?: boolean;
  locationName?: string;
  typeName?: string;
}

function CalculatorVariationPage() {
  const data = Route.useLoaderData() as LoaderResult;
  
  if (!data) throw notFound();
  
  const { slug, variation, notIndexable, pageTitle, locationName, typeName } = data;
  
  const calculator = getCalculator(slug);
  if (!calculator) throw notFound();
  
  const canonicalPath = `${SITE.url}/calculators/${calculator.slug}`;
  
  if (notIndexable) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{pageTitle || calculator.name}</h1>
        <p className="mt-4 text-muted-foreground">
          This is a variation template page. Unique localized content is required for this page to be published.
        </p>
        <div className="mt-8">
          <Link
            to={`/calculators/${slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Use the standard calculator
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <link rel="canonical" href={canonicalPath} />
      
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="px-1.5">/</span>
        <Link to="/calculators" className="hover:text-foreground">Calculators</Link>
        <span className="px-1.5">/</span>
        <Link to={`/calculators/${slug}`} className="hover:text-foreground">{calculator.name}</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{pageTitle || calculator.name}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{pageTitle}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {calculator.description}
        {locationName && ` Tailored for ${locationName.toLowerCase()} users.`}
        {typeName && ` Try this ${typeName.toLowerCase()} variation.`}
      </p>

      <div className="mt-6 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
          <Check className="size-3" aria-hidden="true" />
          Formula Verified
        </div>
        <div className="text-xs text-muted-foreground">
          Canonical: <Link to={`/calculators/${slug}`} className="text-primary hover:underline">Standard {calculator.name}</Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-4">Variation Page Notice</h2>
        <p className="text-muted-foreground">
          This page shows a variation calculator template. To publish unique content, add:
        </p>
        <ul className="mt-3 list-disc list-inside text-muted-foreground space-y-1">
          <li>Unique introduction text</li>
          <li>Local examples</li>
          <li>State/country-specific tax information</li>
          <li>Localized assumptions and references</li>
          <li>Variation-specific FAQs</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          When content is added, set <code className="bg-surface/50 px-2 py-1 rounded">indexable: true</code>
        </p>
      </div>

      <div className="mt-12">
        <Link
          to={`/calculators/${slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Use Standard Calculator
        </Link>
      </div>
    </div>
  );
}