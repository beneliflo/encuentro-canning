import { Metadata } from 'next'
// import Script from 'next/script'
import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invitación 8vo Aniversario | Encuentro Canning',
  description: 'Invitación al 8vo Aniversario de Encuentro Canning',
  openGraph: {
    images: 'https://encuentrocanning.org/invitation/og-image.png',
  },
  twitter: {
    images: ['https://encuentrocanning.org/invitation/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="canonical" href="https://encuentrocanning.org/invitacion-aniversario"/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
