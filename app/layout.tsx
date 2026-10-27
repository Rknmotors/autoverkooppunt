import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.autoverkooppunt.be'),
  title: 'Autoverkooppunt',
  description:
    'Je auto snel en eenvoudig verkopen? Ontvang gratis en vrijblijvend een correcte prijs. Wij komen langs en betalen meteen.',
  icons: { icon: { url: '/img/logo-avp.png', type: 'image/png' } },
  openGraph: {
    title: 'Autoverkooppunt | Verkoop je auto snel en zonder zorgen',
    description: 'Gratis en vrijblijvend een correcte prijs. Wij komen langs en betalen meteen.',
    images: ['/img/hero.jpg'],
    locale: 'nl_BE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0C6429',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <head>
        {/* Zelfde lettertypes en dezelfde Google Fonts-URL als de originele index.html */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
