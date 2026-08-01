import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageMeta({
      title: "Privacy Policy - MoneyCalc",
      description:
        "MoneyCalc Privacy Policy explains how we collect, use, and protect your data. Your privacy is our priority.",
      path: "/privacy-policy",
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Privacy Policy</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Privacy Policy</h1>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold">Effective Date: July 31, 2026</h2>
          <p className="mt-3 text-muted-foreground">
            This Privacy Policy describes how MoneyCalc ("we", "us", or "our") collects, uses, and
            protects your information when you use our website and financial calculators.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Information We Collect</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              <strong>Information you provide directly:</strong> When you use our calculators, you
              may enter financial data such as loan amounts, interest rates, savings goals, and
              other personal financial information. This information is processed locally in your
              browser and is never transmitted to our servers unless you explicitly choose to share
              it.
            </p>
            <p className="text-muted-foreground">
              <strong>Information collected automatically:</strong> We may collect non-personal
              information about your device and browser, including IP address, browser type,
              operating system, referral source, and pages visited. This information is used solely
              for analytics and improving our services.
            </p>
            <p className="text-muted-foreground">
              <strong>Location information:</strong> We do not collect precise location data from
              your device.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">How We Use Your Information</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Providing our services:</strong> To operate the financial calculators and
                display results based on your inputs.
              </li>
              <li>
                <strong>Analytics and improvement:</strong> To understand how users interact with
                our website and improve the user experience.
              </li>
              <li>
                <strong>Communication:</strong> If you subscribe to our newsletter, to send you
                updates about new calculators and financial tips.
              </li>
              <li>
                <strong>Legal compliance:</strong> To comply with applicable laws and regulations.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Cookies and Tracking Technologies</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              <strong>Cookies:</strong> We use cookies to remember your preferences and for
              analytics purposes. Cookies are small text files stored on your device that help us
              understand how you use our site.
            </p>
            <p className="text-muted-foreground">
              <strong>Types of cookies we use:</strong>
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Essential cookies:</strong> These are necessary for the website to function
                properly (e.g., remembering your cookie preferences).
              </li>
              <li>
                <strong>Analytics cookies:</strong> These help us understand how visitors interact
                with our website, such as which pages are most popular.
              </li>
              <li>
                <strong>AdSense cookies:</strong> If Google AdSense is enabled, these cookies are
                used to serve personalized ads.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Google Analytics</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We use Google Analytics to help us understand how visitors use our website. Google
              Analytics uses cookies to collect information about your activity on our site,
              including:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>How you found our website</li>
              <li>Which pages you visit</li>
              <li>How long you stay on the site</li>
              <li>What device and browser you use</li>
            </ul>
            <p className="text-muted-foreground">
              The information collected by Google Analytics is stored on Google's servers. Google
              may transfer this information to third parties where required by law or where those
              third parties process the information on Google's behalf.
            </p>
            <p className="text-muted-foreground">
              You can prevent Google Analytics from collecting your information by installing the
              Google Analytics Opt-out Browser Add-on.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Google AdSense</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We use Google AdSense to display advertisements on our website. Google AdSense uses
              cookies and similar technologies to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Serve personalized ads based on your interests and browsing behavior</li>
              <li>Limit ad frequency to prevent excessive repetition</li>
              <li>Measure ad effectiveness and website performance</li>
            </ul>
            <p className="text-muted-foreground">
              AdSense may collect information about your browsing habits across different websites
              to provide personalized advertising. This is done in an anonymized manner.
            </p>
            <p className="text-muted-foreground">
              You can control ad personalization through Google's Ad Settings or by using browser
              extensions that block ad tracking.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Third-Party Services</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We may use third-party services to help us operate our website and provide enhanced
              functionality. These services may have their own privacy policies governing how they
              collect and use your information. We recommend reviewing the privacy policies of any
              third-party services you use.
            </p>
            <p className="text-muted-foreground">Third-party services we may use include:</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Google Analytics for website analytics</li>
              <li>Google AdSense for advertising</li>
              <li>Cloudflare for content delivery and security</li>
              <li>Social media platforms for sharing (if enabled)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Local Storage</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Our website may use local storage (localStorage) to remember your preferences, such
              as:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Currency selection</li>
              <li>Dark/light mode preference</li>
              <li>Cookie consent preferences</li>
              <li>Recently used calculator settings</li>
            </ul>
            <p className="text-muted-foreground">
              Information stored in local storage remains on your device and is not transmitted to
              our servers. You can clear this data through your browser settings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Your Privacy Rights</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Depending on your location, you may have the following rights regarding your personal
              information:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>The right to access:</strong> You can request details about your personal
                data we hold.
              </li>
              <li>
                <strong>The right to rectification:</strong> You can request correction of
                inaccurate personal data.
              </li>
              <li>
                <strong>The right to erasure:</strong> You can request deletion of your personal
                data, subject to legal requirements.
              </li>
              <li>
                <strong>The right to restrict processing:</strong> You can ask us to limit how we
                use your personal data.
              </li>
              <li>
                <strong>The right to data portability:</strong> You can request your data in a
                structured, machine-readable format.
              </li>
              <li>
                <strong>The right to object:</strong> You can object to our processing of your
                personal data for marketing or other purposes.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">GDPR Compliance (European Union)</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              For users in the European Union, we comply with the General Data Protection Regulation
              (GDPR). This means:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>We process your data only for legitimate purposes</li>
              <li>We inform you of the purposes for which we collect data</li>
              <li>We implement appropriate security measures to protect your data</li>
              <li>We retain your data only for as long as necessary</li>
              <li>You can contact our Data Protection Officer at privacy@moneycalc.com</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">CCPA Compliance (California)</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              For California residents, we comply with the California Consumer Privacy Act (CCPA).
              This gives you the right to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Know what personal information we collect about you</li>
              <li>Delete your personal information</li>
              <li>Opt-out of the sale of your personal information</li>
              <li>Non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="text-muted-foreground">
              We do not sell your personal information to third parties. If you wish to exercise any
              of these rights, please contact us at privacy@moneycalc.com.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Data Retention</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We retain your information for the following periods:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong>Calculator inputs:</strong> Not retained - all calculations are performed
                locally in your browser.
              </li>
              <li>
                <strong>Analytics data:</strong> Aggregated data is retained for business
                intelligence purposes for up to 24 months.
              </li>
              <li>
                <strong>Email addresses (newsletter):</strong> Retained until you unsubscribe or for
                as long as necessary for the purpose.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Security</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We take the security of your information seriously and implement appropriate measures
              to protect it from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-muted-foreground">Security measures include:</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Encrypted connections (HTTPS) for all website traffic</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to user data on a need-to-know basis</li>
              <li>Secure server infrastructure and monitoring</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Children's Privacy</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Our services are not intended for individuals under the age of 16. We do not knowingly
              collect personal information from children under 16. If we become aware that we have
              collected personal information from a child under 16, we will take steps to delete
              such information as soon as possible.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Effective Date". We
              encourage you to review this Privacy Policy periodically.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or your personal data, please
              contact us:
            </p>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="font-medium">Email: privacy@moneycalc.com</p>
              <p className="text-muted-foreground mt-1">MoneyCalc, Attn: Privacy Officer</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Last Updated</h3>
        <p className="mt-2 text-muted-foreground">
          This Privacy Policy was last updated on July 31, 2026. We may update this policy from time
          to time. Please review this page periodically for any changes.
        </p>
      </div>
    </div>
  );
}
