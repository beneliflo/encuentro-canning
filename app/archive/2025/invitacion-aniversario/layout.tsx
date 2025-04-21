import type { Metadata } from 'next'
import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://encuentrocanning.org'),
  title: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
    url: 'https://encuentrocanning.org/invitacion-aniversario',
    siteName: 'Encuentro Canning',
    images: [
      {
        url: 'https://encuentrocanning.org/invitation/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Invitación 8vo Aniversario Encuentro Canning',
      }
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    images: ['https://encuentrocanning.org/invitation/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <link rel="canonical" href="https://encuentrocanning.org/invitacion-aniversario"/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
