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
  openGraph: {
    title: 'Gen Z Game Over — Pre Sale',
    description: 'Registrate para recibir acceso anticipado a Gen Z Game Over.',
    images: [
      {
        url: '/genz/Pre sale Gen z Flyer.jpeg',
        width: 1920,
        height: 1081,
        alt: 'Gen Z Game Over Pre Sale',
      },
    ],
  },
}

export default function GenZPage() {
  return <GenZRegistration pixelFontClassName={pressStart2P.className} />
}
