import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://intellumia.com'),
  title: 'Intellumia | AI that knows your business. Built with your team. Owned by you.',
  description:
    'Intellumia is an AI-native services company. We learn how a business really works, build and run the AI with their team, and hand it over to own.',
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
    title: 'AI that knows your business. Built with your team. Owned by you.',
    description:
      'You know your business. Intellumia helps you see how AI will change it, where to start, and builds it with your team for you to own.',
    images: [
      {
        url: '/social/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Intellumia: AI that knows your business. Built with your team. Owned by you.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI that knows your business. Built with your team. Owned by you.',
    description:
      'You know your business. Intellumia helps you see how AI will change it, where to start, and builds it with your team for you to own.',
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
