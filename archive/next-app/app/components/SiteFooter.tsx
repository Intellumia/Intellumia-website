import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <p>Intelligence, Illuminated. · sundeep@intellumia.com</p>
        <nav aria-label="Company, legal and contact links">
          <Link
            href="/connect"
            data-analytics-event="conversation_path_open"
            data-analytics-location="legal_footer"
          >
            Contact
          </Link>
          <Link href="/privacy">Privacy</Link>
          <a href="https://www.linkedin.com/in/kumarsundeep" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
      <p className="footer-legal">
        © 2026 Intellumia Pte. Ltd., Singapore
      </p>
    </footer>
  );
}
