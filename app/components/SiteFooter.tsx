import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-sign">
        <p className="footer-thesis">
          Own the layer. Rent the model. <em>Trust nothing you cannot see.</em>
        </p>
        <Link
          className="footer-cta"
          href="/connect"
          data-analytics-event="conversation_path_open"
          data-analytics-location="footer_cta"
        >
          Begin a conversation <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="footer-primary">
        <p>Intellumia · Intelligence, Illuminated. · sundeep@intellumia.com · +91 88558 84042</p>
        <nav aria-label="Company, legal and contact links">
          <Link
            href="/connect"
            data-analytics-event="conversation_path_open"
            data-analytics-location="legal_footer"
          >
            Contact
          </Link>
          <Link href="/point-of-view">Point of view</Link>
          <Link href="/privacy">Privacy</Link>
          <a href="https://www.linkedin.com/in/kumarsundeep" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
      <p className="footer-legal">
        Private company limited by shares · Incorporated 2025 · Registered office:
        60 Paya Lebar Road, #07-54, Paya Lebar Square, Singapore 409051 · © 2026
        Intellumia Pte. Ltd.
      </p>
    </footer>
  );
}
