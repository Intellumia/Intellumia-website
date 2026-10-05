import type { Metadata } from 'next';
import CopyEmailAddress from '../components/CopyEmailAddress';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'Begin a conversation | Intellumia',
  description: 'Begin a conversation with Intellumia about an outcome that matters.',
  alternates: {
    canonical: '/connect',
  },
};

export default function ConnectPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="connect-page">
        <section className="connect-section" aria-labelledby="connect-title">
          <span className="system-label">Begin a conversation</span>
          <h1 id="connect-title">Start with the outcome that matters.</h1>

          <div className="connect-intro">
            <p>
              Sundeep Kumar, Founder &amp; CEO, reads every message himself. Twenty-five
              years inside enterprise technology at Microsoft and IBM, working with
              large enterprises across Asia-Pacific. Now on the client&apos;s side of the
              table.
            </p>
            <p>Tell us what needs to change and what is currently in the way.</p>
            <p>
              Use whichever email service works for you. Copy the address below, or
              open your default email app if you know it is configured.
            </p>
          </div>

          <a
            className="button-primary connect-primary"
            href="https://cal.com/meetsk/30"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="conversation_schedule_open"
            data-analytics-location="connect_primary"
          >
            Schedule a call <span aria-hidden="true">↗</span>
          </a>

          <CopyEmailAddress />

          <a
            className="connect-mail-link"
            href="mailto:sundeep@intellumia.com"
            data-analytics-event="conversation_email_client_open"
            data-analytics-location="connect_page"
          >
            Open your email app <span aria-hidden="true">↗</span>
          </a>

          <blockquote className="founder-note">
            <span className="system-label">A note from the founder</span>
            <p>
              I spent twenty-five years selling and delivering technology to the
              largest companies in Asia-Pacific. The pattern never changed: the
              best decisions lived in a few people&apos;s heads, and the technology
              never touched them. AI makes that gap expensive. I am building
              Intellumia so a company can put its own judgement on a layer it owns,
              starting with one decision.
            </p>
            <cite>Sundeep Kumar, Founder &amp; CEO</cite>
          </blockquote>

          <p className="connect-privacy-note">
            Please do not include confidential or sensitive information in an initial
            message.
          </p>
        </section>
      </main>
      <SiteFooter />
      <script src="/connect.js" defer data-static-script="true" />
    </>
  );
}
