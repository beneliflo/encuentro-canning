import { Metadata } from 'next'
// import Script from 'next/script'
import '../../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta http-equiv="refresh" content="0;url=https://encuentrocanning.org/invitacion-inauguracion"/>
      <link rel="canonical" href="https://encuentrocanning.org/invitacion-inauguracion"/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
