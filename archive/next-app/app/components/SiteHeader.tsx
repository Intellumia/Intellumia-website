import Image from 'next/image';
import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-link" href="/" aria-label="Intellumia home">
        <Image
          src="/logo/primary-white.svg"
          alt="Intellumia"
          width={771}
          height={207}
          priority
          unoptimized
        />
      </Link>
      <div className="header-right">
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/about">About</Link>
          <Link href="/point-of-view">Investors and partners</Link>
        </nav>
        <details className="mobile-nav">
          <summary className="mobile-nav-toggle" aria-label="Menu">
            <span className="mobile-nav-bar" aria-hidden="true" />
            <span className="mobile-nav-bar" aria-hidden="true" />
            <span className="mobile-nav-bar" aria-hidden="true" />
          </summary>
          <nav className="mobile-nav-panel" aria-label="Primary navigation">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/about">About</Link>
            <Link href="/point-of-view">Investors and partners</Link>
          </nav>
        </details>
        <a
          className="header-action"
          href="https://cal.com/meetsk/30"
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="book_call_click"
          data-analytics-location="header"
        >
          Book a call
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
