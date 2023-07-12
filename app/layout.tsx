import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Encuentro Canning',
  description: 'Encuentro Canning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-09SLGMTFY9"
        strategy="beforeInteractive"
      />
      <Script strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-09SLGMTFY9');`}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
