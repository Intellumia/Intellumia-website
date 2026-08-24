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
          <Link href="/#how-we-help">How we help</Link>
          <Link href="/point-of-view">Our point of view</Link>
        </nav>
        <Link
          className="header-action"
          href="/connect"
          data-analytics-event="conversation_path_open"
          data-analytics-location="header"
        >
          Begin a conversation
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
