import { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import GenZRegistration from './GenZRegistration'

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gen Z Game Over — Pre Sale',
  description:
    'Pre sale Gen Z Game Over en Encuentro Canning. Registrate para recibir acceso anticipado.',
  icons: {
    icon: '/genz/favicon.svg',
  },
  alternates: {
    canonical: 'https://genz.emubaescuela.com',
  },
  openGraph: {
    title: 'Gen Z Game Over — Pre Sale',
    description: 'Registrate para recibir acceso anticipado a Gen Z Game Over.',
    url: 'https://genz.emubaescuela.com',
    images: [
      {
        url: 'https://genz.emubaescuela.com/genz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gen Z Game Over Pre Sale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen Z Game Over — Pre Sale',
    description: 'Registrate para recibir acceso anticipado a Gen Z Game Over.',
    images: ['https://genz.emubaescuela.com/genz/og-image.png'],
  },
}

export default function GenZPage() {
  return <GenZRegistration pixelFontClassName={pressStart2P.className} />
}
