import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Felicitaciones — Descuento Exclusivo TCP 2026',
  description: 'Página exclusiva con descuento para TCP 2026',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: '/images/tcp/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/tcp/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/tcp/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/images/tcp/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/images/tcp/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/tcp/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function FelicitacionesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
