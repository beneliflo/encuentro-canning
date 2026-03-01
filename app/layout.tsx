import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Roboto, Bebas_Neue } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://encuentrocanning.org'),
  title: {
    template: '%s | Encuentro Canning',
    default: 'Encuentro Canning | Iglesia en Canning, Buenos Aires',
  },
  description:
    'Iglesia Encuentro Canning — una comunidad de fe en Canning, Buenos Aires. Cultos, eventos, aula sensorial y más. ¡Te esperamos!',
  keywords: [
    'Encuentro Canning',
    'iglesia Canning',
    'iglesia evangélica Canning',
    'iglesia Buenos Aires',
    'comunidad cristiana Canning',
    'Ezeiza',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Encuentro Canning',
    images: 'https://encuentrocanning.org/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://encuentrocanning.org/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${roboto.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/duw6mjz.css" />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-09SLGMTFY9" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-09SLGMTFY9');
        `}
      </Script>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Church',
              name: 'Iglesia Encuentro Canning',
              alternateName: 'Encuentro Canning',
              url: 'https://encuentrocanning.org',
              logo: 'https://encuentrocanning.org/images/IEC-logo.png',
              image: 'https://encuentrocanning.org/og-image.png',
              description:
                'Iglesia Encuentro Canning — una comunidad de fe en Canning, Buenos Aires.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Canning',
                addressRegion: 'Buenos Aires',
                addressCountry: 'AR',
              },
              sameAs: [
                'https://www.instagram.com/encuentrocanning',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
