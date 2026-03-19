import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700', '900'],
  variable: '--font-roboto',
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
    <html lang="es" className={roboto.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/duw6mjz.css" />
      </head>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KCQ3C2N7');`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-09SLGMTFY9" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-09SLGMTFY9');
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1770674730957863');
          fbq('track', 'PageView');
        `}
      </Script>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KCQ3C2N7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1770674730957863&ev=PageView&noscript=1"
          />
        </noscript>
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
