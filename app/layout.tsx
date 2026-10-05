import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://intellumia.com'),
  title: 'Intellumia | Intelligence is free. Judgement is the moat.',
  description:
    'Intellumia is a software company for the intelligence era. We embed with leadership teams to find where their judgement lives and build the layer they run it on.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://intellumia.com/',
    siteName: 'Intellumia',
    title: 'Intelligence is free. Judgement is the moat.',
    description:
      'Own the layer your judgement lives on, or someone else will. Intellumia embeds with leadership teams, one decision at a time.',
    images: [
      {
        url: '/social/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Intellumia: Intelligence is free. Judgement is the moat.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelligence is free. Judgement is the moat.',
    description:
      'Own the layer your judgement lives on, or someone else will. Intellumia embeds with leadership teams, one decision at a time.',
    images: ['/social/og-default.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; base-uri 'self'; font-src 'self'; form-action 'none'; img-src 'self' data:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link
          rel="preload"
          href="/fonts/InstrumentSans-Latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/InstrumentSerif-Italic-Latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
