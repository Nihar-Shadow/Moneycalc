import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageMeta({
      title: "Terms of Service - MoneyCalc",
      description:
        "MoneyCalc Terms of Service governs your use of our financial calculator website. Read our terms before using our tools.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Terms</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Terms of Service</h1>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold">Effective Date: July 31, 2026</h2>
          <p className="mt-3 text-muted-foreground">
            These Terms of Service ("Terms") govern your use of the MoneyCalc website and financial
            calculator tools (the "Service"). By accessing or using the Service, you agree to be
            bound by these Terms. If you do not agree to these Terms, you may not access or use the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              By accessing or using MoneyCalc, you acknowledge that you have read, understood, and
              agree to be bound by these Terms, our Privacy Policy, and any applicable laws and
              regulations.
            </p>
            <p className="text-muted-foreground">
              These Terms constitute a legally binding agreement between you and MoneyCalc. If any
              provision of these Terms is found to be invalid or unenforceable, the remainder of
              these Terms will remain in full force and effect.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Changes to Terms</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any
              time. If we make a material change to these Terms, we will provide reasonable advance
              notice of such changes. Your continued use of the Service after any changes to these
              Terms will constitute your acceptance of the new Terms.
            </p>
            <p className="text-muted-foreground">
              We may also make changes to our Service, add or remove features, or temporarily or
              permanently suspend all or part of the Service without notice.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Acceptable Use</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">When using the Service, you agree to:</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Use the Service for lawful purposes only</li>
              <li>
                Not engage in any activity that could harm the Service or interfere with others' use
                of it
              </li>
              <li>Not attempt to gain unauthorized access to any portion of the Service</li>
              <li>Not use the Service to generate false, misleading, or deceptive information</li>
              <li>
                Not use any automated system, bot, or data mining technique to access the Service
              </li>
              <li>Respect all applicable laws and regulations in your jurisdiction</li>
              <li>Not use the Service to calculate financial decisions for illegal activities</li>
            </ul>
            <p className="text-muted-foreground">
              Prohibited activities include, but are not limited to: hacking, cracking, spamming,
              phishing, distributing malicious code, or any activity that violates the rights of
              others.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              The Service and its original content, features, and functionality are owned and
              operated by MoneyCalc. The Service is protected by copyright, trademark, and other
              laws of both the United States and other countries.
            </p>
            <p className="text-muted-foreground">
              <strong>Trademarks:</strong> MoneyCalc, the MoneyCalc logo, and any other service
              marks or trade names displayed on the Service are our trademarks. You may not use
              these marks without our prior written permission.
            </p>
            <p className="text-muted-foreground">
              <strong>Content:</strong> The content, software, algorithms, and code on the Service,
              including the calculator formulas and logic, are our intellectual property or that of
              our licensors. You may not reproduce, distribute, modify, create derivative works, or
              publicly display any portion of the Service without our express written permission.
            </p>
            <p className="text-muted-foreground">
              <strong>Open source:</strong> Some portions of our Service may be based on or use open
              source software, which is subject to the applicable open source licenses.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. License to Use Service</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
              non-transferable, non-sublicensable license to access and use the Service for your
              personal or internal business purposes.
            </p>
            <p className="text-muted-foreground">This license does not include:</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Reselling or commercial exploitation of the Service</li>
              <li>Distribution, public display, or performance of the Service</li>
              <li>Creating derivative works based on the Service</li>
              <li>Use of the Service to provide similar services to others</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              TO THE FULLEST EXTENT PERMITTED BY LAW, MONEY CALC AND ITS AFFILIATES, OFFICERS,
              DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO
              DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF
              MONEY CALC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES).
            </p>
            <p className="text-muted-foreground">
              IN NO EVENT SHALL MONEY CALC'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES ARISING OUT OF
              OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE EXCEED THE AMOUNT PAID BY
              YOU, IF ANY, TO MONEY CALC FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE
              EVENT GIVING RISE TO THE CLAIM.
            </p>
            <p className="text-muted-foreground">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">7. No Warranties</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              THE SERVICE IS PROVIDED WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE
              DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>ANY WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE</li>
              <li>ANY WARRANTY THAT THE RESULTS OF CALCULATIONS WILL BE ACCURATE OR COMPLETE</li>
              <li>ANY WARRANTIES OF NON-INFRINGEMENT OF INTELLECTUAL PROPERTY RIGHTS</li>
            </ul>
            <p className="text-muted-foreground">
              WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR THAT THE SERVICE
              WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">8. Disclaimer</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              <strong>Educational Purpose Only:</strong> The Service is designed for educational and
              informational purposes only. The calculations and results provided by the Service are
              estimates and should not be relied upon as the sole basis for any financial decision.
            </p>
            <p className="text-muted-foreground">
              <strong>No Financial Advice:</strong> The Service does not constitute financial,
              investment, tax, or legal advice. You should consult with a qualified professional
              before making any financial decisions.
            </p>
            <p className="text-muted-foreground">
              <strong>Accuracy:</strong> While we strive to provide accurate calculations, we do not
              guarantee the accuracy, completeness, or timeliness of the information provided by the
              Service. Results may vary based on individual circumstances.
            </p>
            <p className="text-muted-foreground">
              <strong>User Responsibility:</strong> You are solely responsible for verifying the
              accuracy of any data you input into the calculators and for reviewing the results
              provided.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">9. Links to Third-Party Websites</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              The Service may contain links to third-party websites or services that are not owned
              or controlled by MoneyCalc.
            </p>
            <p className="text-muted-foreground">
              We do not endorse or assume any responsibility for the content, privacy policies, or
              practices of any third-party websites or services. You acknowledge and agree that
              MoneyCalc shall not be liable for any damage or loss caused by or arising from your
              use of any third-party websites or services.
            </p>
            <p className="text-muted-foreground">
              You should read the terms and privacy policies of any third-party websites or services
              that you visit before providing any information to them.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">10. Termination</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              We may, in our sole discretion, suspend or terminate your access to all or any part of
              the Service, at any time, with or without cause, with or without notice. Upon
              termination, your access to the Service will cease immediately.
            </p>
            <p className="text-muted-foreground">
              If you wish to terminate your use of the Service, you may simply stop using it.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">11. Governing Law</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              These Terms shall be governed and construed in accordance with the laws of the State
              of Delaware, United States, without regard to its principles of conflict of law.
            </p>
            <p className="text-muted-foreground">
              Any legal action or proceeding arising out of or relating to these Terms or your use
              of the Service shall be exclusively governed by the federal and state courts located
              in Delaware, and you hereby consent to the personal jurisdiction of such courts.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">12. Dispute Resolution</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              <strong>Arbitration:</strong> Any dispute, controversy, or claim arising out of or
              relating to these Terms, including their formation, existence, breach, termination,
              enforcement, interpretation, validity, or enforceability, including the determination
              of the scope of this clause, shall be finally settled by binding arbitration.
            </p>
            <p className="text-muted-foreground">
              The arbitration shall be conducted in English, and the award shall be final and
              binding on all parties. Judgment on the award rendered by the arbitrator(s) may be
              entered in any court having jurisdiction.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">13. Severability</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              If any provision of these Terms is held to be invalid or unenforceable, the remainder
              of these Terms will remain in full force and effect. Such invalidity or
              unenforceability shall not invalidate the remaining provisions.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">14. Entire Agreement</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              These Terms constitute the entire agreement between you and MoneyCalc regarding your
              use of the Service. They supersede all prior or contemporaneous written or oral
              agreements, proposals, or communications.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">15. Contact Information</h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="font-medium">Email: support@moneycalc.com</p>
              <p className="text-muted-foreground mt-1">MoneyCalc, Attn: Legal Department</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Last Updated</h3>
        <p className="mt-2 text-muted-foreground">
          These Terms of Service were last updated on July 31, 2026. We may update these Terms from
          time to time. Please review this page periodically for any changes.
        </p>
      </div>
    </div>
  );
}
