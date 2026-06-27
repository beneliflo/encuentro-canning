import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gracias — Gen Z Game Over',
  description: 'Gracias por registrarte a Gen Z Game Over.',
  icons: {
    icon: '/genz/favicon.svg',
  },
  alternates: {
    canonical: 'https://genz.emubaescuela.com/gracias',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function GenZGraciasPage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-white">
      <Image
        src="/genz/gracias-desktop.jpeg"
        alt="Gen Z Game Over"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block"
      />
      <Image
        src="/genz/gracias-mobile.jpeg"
        alt="Gen Z Game Over"
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />

      <h1 className="sr-only">Gracias por registrarte a Gen Z Game Over</h1>
    </main>
  )
}
