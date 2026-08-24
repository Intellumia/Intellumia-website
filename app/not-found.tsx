import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
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
      <div className="not-found-content">
        <span className="system-label">404 / Page not found</span>
        <h1>This is not the decision path you were looking for.</h1>
        <p>The page may have moved, or it may never have existed.</p>
        <Link href="/">Return to Intellumia <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
