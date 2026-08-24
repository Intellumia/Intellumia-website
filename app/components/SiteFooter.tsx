import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <p>Intellumia Pte. Ltd. · Singapore</p>
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
