import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Encuentro Canning',
    default: 'Encuentro Canning', // a default is required when creating a template
  },
  description: 'Encuentro Canning',
  openGraph: {
    images: 'https://encuentrocanning.org/og-image.png',
  },
  twitter: {
    images: ['https://encuentrocanning.org/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-09SLGMTFY9" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-09SLGMTFY9');
        `}
      </Script>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/duw6mjz.css" />
      </head>
      <body className="font-roboto">{children}</body>
    </html>
  );
}
