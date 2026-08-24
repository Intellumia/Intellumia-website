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
            <p>Tell us what needs to change and what is currently in the way.</p>
            <p>
              Use whichever email service works for you. Copy the address below, or
              open your default email app if you know it is configured.
            </p>
          </div>

          <CopyEmailAddress />

          <a
            className="connect-mail-link"
            href="mailto:connect@intellumia.com"
            data-analytics-event="conversation_email_client_open"
            data-analytics-location="connect_page"
          >
            Open your email app <span aria-hidden="true">↗</span>
          </a>

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
