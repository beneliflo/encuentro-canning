import Head from 'next/head';
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
      <Head>
        <script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
