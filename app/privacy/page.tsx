import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy | Intellumia',
  description: 'Privacy statement for intellumia.com.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Link className="privacy-back" href="/">
        <span aria-hidden="true">←</span> Intellumia
      </Link>
      <span className="system-label">Intellumia Pte. Ltd.</span>
      <h1>Privacy</h1>
      <p className="privacy-intro">
        This statement explains how Intellumia Pte. Ltd. (&quot;Intellumia&quot;,
        &quot;we&quot;) handles personal data in connection with this website, in
        line with Singapore&apos;s Personal Data Protection Act 2012 (PDPA).
      </p>

      <section>
        <h2>What this site collects</h2>
        <p>
          This website is a static informational page. It does not use contact
          forms, tracking cookies, or analytics. We do not collect personal
          data from visitors through it.
        </p>
        <p>
          Our hosting provider may keep standard server logs, which can include
          IP addresses and browser information, for security and operational
          purposes. We do not use these logs to identify individuals.
        </p>
      </section>

      <section>
        <h2>If you email us</h2>
        <p>
          If you contact us at the address on this site, we receive whatever
          information you choose to include, typically your name, email address,
          and the content of your message. We use it only to respond to you and
          to keep a record of the correspondence, and we retain it for as long
          as needed for that purpose or as required by law.
        </p>
      </section>

      <section>
        <h2>Disclosure</h2>
        <p>
          We do not sell personal data. We disclose it only where necessary to
          service providers acting on our instructions, or where required by
          law or regulation.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Under the PDPA you may request access to the personal data we hold
          about you, ask us to correct it, or withdraw consent to its use. Write
          to the address below and we will respond within a reasonable time.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Data Protection Officer, Intellumia Pte. Ltd.<br />
          <Link href="/connect">connect@intellumia.com</Link>
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this statement from time to time. The version published
          here is the current one.
        </p>
      </section>

      <footer>
        <p>Last updated: July 2026 · © 2026 Intellumia Pte. Ltd.</p>
      </footer>
    </main>
  );
}
