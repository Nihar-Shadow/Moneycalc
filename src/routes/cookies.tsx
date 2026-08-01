import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageMeta({
      title: "Cookie Policy - MoneyCalc",
      description:
        "MoneyCalc Cookie Policy explains how we use cookies and similar technologies on our website.",
      path: "/cookies",
    }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Cookie Policy</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Cookie Policy</h1>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold">Effective Date: July 31, 2026</h2>
          <p className="mt-3 text-muted-foreground">
            This Cookie Policy explains how MoneyCalc ("we", "us", or "our") uses cookies and
            similar technologies to recognize you when you return to our Service, and the
            information we collect through these technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">What Are Cookies?</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Cookies are small text files that are placed on your device (computer, tablet, or
              mobile phone) when you visit a website. They are widely used to make websites work or
              work more efficiently, as well as to provide information to the owners of the website.
            </p>
            <p className="text-muted-foreground">
              Similar technologies include web beacons (also known as action tags, pixel tags, or
              transparent GIFs), JavaScript tags, and embedded scripts. These technologies are used
              for similar purposes as cookies.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">How We Use Cookies</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We use cookies and similar technologies for several reasons:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>To make our Service work securely and efficiently:</strong> Essential
                cookies help the website function properly and maintain security.
              </li>
              <li>
                <strong>To enhance your user experience:</strong> Some cookies remember your
                preferences, such as language and currency settings.
              </li>
              <li>
                <strong>To analyze how our Service is used:</strong> Analytics cookies help us
                understand how visitors interact with our website.
              </li>
              <li>
                <strong>To serve relevant advertisements:</strong> Advertising cookies help us
                present you with ads that are relevant to you.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Purpose</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm">Essential</td>
                    <td className="px-4 py-2 text-sm">
                      Necessary for website functionality and security (e.g., cookie consent)
                    </td>
                    <td className="px-4 py-2 text-sm">Session or until dismissed</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm">Preference</td>
                    <td className="px-4 py-2 text-sm">
                      Remember your settings (currency, theme, etc.)
                    </td>
                    <td className="px-4 py-2 text-sm">1 year</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm">Analytics</td>
                    <td className="px-4 py-2 text-sm">
                      Understand how you use our website (Google Analytics)
                    </td>
                    <td className="px-4 py-2 text-sm">2 years</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm">Advertising</td>
                    <td className="px-4 py-2 text-sm">Serve personalized ads (Google AdSense)</td>
                    <td className="px-4 py-2 text-sm">13 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Specific Cookies We Use</h2>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Cookie Consent</h3>
            <p className="text-muted-foreground">
              We use a cookie consent banner that stores your preferences. This ensures you are not
              repeatedly shown the consent banner.
            </p>

            <h3 className="text-lg font-semibold">Google Analytics</h3>
            <p className="text-muted-foreground">
              We use Google Analytics to understand how visitors use our website. Google Analytics
              uses cookies to collect information about your activity. The information is stored on
              Google's servers.
            </p>

            <h3 className="text-lg font-semibold">Google AdSense</h3>
            <p className="text-muted-foreground">
              We display advertisements through Google AdSense. AdSense may place cookies on your
              device to show personalized ads based on your browsing history.
            </p>

            <h3 className="text-lg font-semibold">Local Storage</h3>
            <p className="text-muted-foreground">
              We may use browser local storage to remember your preferences. This is not a cookie
              but functions similarly for storing user settings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Third-Party Cookies</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Some cookies on our website are placed by third-party services:
            </p>
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="text-sm font-semibold mb-2">Google Analytics</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Used to analyze website traffic and user behavior. Google may combine this
                information with your use of other websites.
              </p>

              <h3 className="text-sm font-semibold mb-2">Google AdSense</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Used to serve personalized advertisements. Google uses cookies to track your
                browsing across websites.
              </p>

              <h3 className="text-sm font-semibold mb-2">Cloudflare</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Used for security and performance optimization. May set cookies for security
                purposes.
              </p>
            </div>
            <p className="text-muted-foreground">
              You can learn more about how Google uses cookies by visiting their Privacy & Terms
              page.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Managing Your Cookie Preferences</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              You have the right to control which cookies are set on your device. Here are several
              ways you can manage cookies:
            </p>

            <h3 className="text-lg font-semibold">Using our Cookie Banner</h3>
            <p className="text-muted-foreground">
              When you first visit our website, you'll see a cookie consent banner. You can choose
              to accept or reject cookies based on your preferences.
            </p>

            <h3 className="text-lg font-semibold">Browser Settings</h3>
            <p className="text-muted-foreground">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>View and delete cookies stored by your browser</li>
              <li>Block all cookies or only third-party cookies</li>
              <li>Set your browser to block cookies from specific sites</li>
            </ul>

            <h3 className="text-lg font-semibold">Opting Out of Analytics</h3>
            <p className="text-muted-foreground">
              You can opt out of Google Analytics tracking by installing the Google Analytics
              Opt-out Browser Add-on or by using Google's Ads Settings.
            </p>

            <h3 className="text-lg font-semibold">Ad Personalization</h3>
            <p className="text-muted-foreground">
              To limit personalized advertising, you can visit Google's Ad Settings and adjust your
              preferences, or use the Google Analytics Opt-out Browser Add-on.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Do Not Track</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We honor Do Not Track (DNT) signals where technically feasible. However, DNT is not
              widely supported, and we recommend adjusting your cookie preferences directly through
              our cookie banner or your browser settings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Changes to Our Cookie Policy</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We may update our Cookie Policy from time to time to reflect changes in our practices
              or for other operational, legal, or regulatory reasons. When we make changes, we will
              revise the "Effective Date" at the top of this page.
            </p>
            <p className="text-muted-foreground">
              We encourage you to review this Cookie Policy periodically for any changes.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about our use of cookies or other technologies, please
              contact us:
            </p>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="font-medium">Email: privacy@moneycalc.com</p>
              <p className="text-muted-foreground mt-1">MoneyCalc, Attn: Privacy Team</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Last Updated</h3>
        <p className="mt-2 text-muted-foreground">
          This Cookie Policy was last updated on July 31, 2026. Please review it periodically for
          any changes.
        </p>
      </div>
    </div>
  );
}
