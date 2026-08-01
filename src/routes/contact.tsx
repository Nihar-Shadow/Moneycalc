import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta({
      title: "Contact MoneyCalc - Business Inquiries",
      description:
        "Contact MoneyCalc for business inquiries, bug reports, or feedback. We respond within 48 hours.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Contact</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Contact Us</h1>

      <div className="mt-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <p className="mt-3 text-muted-foreground">
            Whether you have a question about our calculators, found a bug, or want to discuss a
            business opportunity, we'd love to hear from you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Email</h2>
          <p className="mt-3 text-muted-foreground">
            For general inquiries, bug reports, and feedback, please email us at:
          </p>
          <div className="mt-4 rounded-2xl border border-border bg-card p-4">
            <a href="mailto:hello@moneycalc.com" className="text-primary hover:underline">
              hello@moneycalc.com
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Business Inquiries</h2>
          <p className="mt-3 text-muted-foreground">
            For partnership opportunities, advertising inquiries, or media requests, please contact
            our business team at business@moneycalc.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Bug Reports</h2>
          <p className="mt-3 text-muted-foreground">
            Found an error in one of our calculators? Please let us know! Include the calculator
            name, input values, and the incorrect result. We take accuracy seriously and will fix
            issues promptly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Feedback</h2>
          <p className="mt-3 text-muted-foreground">
            We value your feedback. Whether you'd like to suggest a new calculator, improve existing
            functionality, or simply share your experience, we're listening.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Response Expectations</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We aim to respond to all inquiries within 48 business hours:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Email inquiries:</strong> Response within 48 business hours
              </li>
              <li>
                <strong>Bug reports:</strong> Priority review and resolution within 72 hours
              </li>
              <li>
                <strong>Feature requests:</strong> Reviewed quarterly and included in our roadmap
              </li>
              <li>
                <strong>Business inquiries:</strong> Response within 2 business days
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Connect With Us</h2>
          <p className="mt-3 text-muted-foreground">
            Follow us on social media for calculator updates, financial tips, and new features:
          </p>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Last Updated</h3>
        <p className="mt-2 text-muted-foreground">
          This page was last updated on July 31, 2026. Contact information may change, so please
          verify before sending sensitive information.
        </p>
      </div>
    </div>
  );
}
