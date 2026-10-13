import type { Metadata } from 'next';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import Actions from '../components/V2Actions';

export const metadata: Metadata = {
  title: 'Contact | Intellumia',
  description: 'Book a call, send a WhatsApp message or email Intellumia about your business.',
  alternates: { canonical: '/connect' },
  openGraph: { type: 'website', url: 'https://intellumia.com/connect', title: 'Contact | Intellumia', description: 'Let us talk about your business.', images: [{ url: '/social/og-default.png', width: 1200, height: 630, alt: 'Intellumia: AI that knows your business. Built with your team. Owned by you.' }] },
};

export default function Connect() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="v2">
        <section className="v2-contact" aria-labelledby="contact-title">
          <div className="v2-contact-plate" aria-hidden="true" />
          <div className="v2-contact-text">
            <p className="system-label v2-kicker">Contact</p>
            <h1 id="contact-title">
              <span className="heading-line">Let&apos;s talk about</span>
              <span className="heading-line">your business.</span>
            </h1>
            <Actions where="contact" />
            <p className="v2-email">
              Or email <a href="mailto:sundeep@intellumia.com" data-analytics-event="email_click" data-analytics-location="contact">sundeep@intellumia.com</a>
            </p>
            <ol className="v2-next v2-next-dark">
              <li>Book a call or send a message.</li>
              <li>Talk to Sundeep about your business.</li>
              <li>Get a short note on whether a First Look makes sense.</li>
            </ol>
            <p className="v2-privacy">Please leave confidential information out of a first message.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
