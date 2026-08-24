import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://intellumia.com'),
  title: 'Intellumia | Building intelligent organisations',
  description:
    'Intellumia helps leaders turn consequential business and technology decisions into operating outcomes and enduring organisational intelligence.',
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
    title: 'Every company will become an intelligent organisation.',
    description:
      'Intellumia begins with one consequential decision or workflow and a measurable business outcome.',
  },
  twitter: {
    card: 'summary',
    title: 'Every company will become an intelligent organisation.',
    description:
      'Intellumia begins with one consequential decision or workflow and a measurable business outcome.',
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
        <link
          rel="preload"
          href="/fonts/Recursive-Mono-Latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
