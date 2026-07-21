import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gen Z Game Over — Encuentro de jóvenes',
  description:
    'Gen Z Game Over — un encuentro para jóvenes con oradores, adoración y mucho más. Encuentro Canning.',
  icons: {
    icon: '/genz/favicon.svg',
  },
  alternates: {
    canonical: 'https://genz.emubaescuela.com',
  },
  openGraph: {
    title: 'Gen Z Game Over — Encuentro de jóvenes',
    description: 'Un encuentro para jóvenes con oradores, adoración y mucho más.',
    url: 'https://genz.emubaescuela.com',
    images: [
      {
        url: 'https://genz.emubaescuela.com/genz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gen Z Game Over',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gen Z Game Over — Encuentro de jóvenes',
    description: 'Un encuentro para jóvenes con oradores, adoración y mucho más.',
    images: ['https://genz.emubaescuela.com/genz/og-image.png'],
  },
}

export default function GenZPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <SpeakerSection
        number={1}
        name="Sebastian Sennewald"
        roles={['PASTOR', 'EVANGELISTA', 'AVIVADOR']}
        bgImage="/genz/speakers/bg-speaker-1.png"
        bgColor="bg-red-600"
        decorationColor="bg-red-800"
        imageName="speaker-1-sebastian"
      />
      <SpeakerSection
        number={2}
        name="Rigoberto Hidalgo"
        roles={['ESCRITOR', 'CONFERENCISTA', 'DEFENSOR DE LA FÉ']}
        bgImage="/genz/speakers/bg-speaker-2.png"
        bgColor="bg-blue-600"
        decorationColor="bg-blue-800"
        imageName="speaker-2-rigoberto"
      />
      <SpeakerSection
        number={3}
        name="Daiam Ortiz"
        roles={['LIDER DE ADOLESCENTES', 'DIR. GENERACIÓN EMERGENTE (MISIÓN)', 'ADORADOR']}
        bgImage="/genz/speakers/bg-speaker-3.png"
        bgColor="bg-green-600"
        decorationColor="bg-green-800"
        imageName="speaker-3-daiam"
      />
      <SpeakerSection
        number={4}
        name="Guido Arakelian"
        roles={['EVANGELISTA', 'DIR. EMUBA X', 'APASIONADO']}
        bgImage="/genz/speakers/bg-speaker-4.png"
        bgColor="bg-orange-600"
        decorationColor="bg-orange-800"
        imageName="speaker-4-guido"
      />
      <LocationSection />
    </main>
  )
}

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 overflow-hidden px-6 py-4 md:px-12">
      <Image
        src="/genz/hero/bg-nav.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover"
        unoptimized
      />
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between">
        <a href="https://genz.emubaescuela.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
          <Image
            src="/genz/hero/emubax-logo.png"
            alt="EMUBAX"
            width={488}
            height={96}
            className="h-6 w-auto object-contain"
            unoptimized
          />
        </a>
        <ul className="flex gap-6 text-xs font-bold uppercase tracking-wider text-white">
          <li>
            <a href="#speakers" className="hover:text-yellow-300">
              ORADORES
            </a>
          </li>
          <li>
            <a href="#ubicacion" className="hover:text-yellow-300">
              UBICACIÓN
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-black px-6 py-20 md:min-h-[700px]"
    >
      <Image
        src="/genz/hero/bg-hero.png"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover opacity-60"
        priority
      />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <Image
          src="/genz/hero/genz-gameover-logo.png"
          alt="GEN Z GAME OVER"
          width={1148}
          height={756}
          className="w-full max-w-xs h-auto"
          unoptimized
          priority
        />

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <a href="#registro" className="pixel-btn">
            <span className="relative z-10">COMPRAR ENTRADAS</span>
          </a>
          <a
            href="#speakers"
            className="border-2 border-white bg-black/60 px-8 py-4 font-press-start text-xs uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:text-sm"
          >
            MÁS INFORMACIÓN
          </a>
        </div>
      </div>
    </section>
  )
}

function SpeakerSection({
  number,
  name,
  roles,
  bgImage,
  bgColor,
  decorationColor,
  imageName,
}: {
  number: number
  name: string
  roles: string[]
  bgImage?: string
  bgColor: string
  decorationColor: string
  imageName: string
}) {
  const isEven = number % 2 === 0

  return (
    <section
      id={number === 1 ? 'speakers' : undefined}
      className={`relative overflow-hidden ${bgColor} px-6 py-20 md:px-12`}
    >
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
          unoptimized
          priority={number <= 2}
        />
      )}

      <div className={`relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 text-center md:text-left">
          <p className="font-press-start text-xs uppercase tracking-[0.3em] text-white/70">SPEAKER {number}</p>
          <h2 className="mt-4 font-press-start text-3xl uppercase leading-tight text-white md:text-5xl">
            {name}
          </h2>
          <ul className="mt-6 space-y-2">
            {roles.map((role) => (
              <li key={role} className="font-press-start text-sm uppercase tracking-widest text-white md:text-base">
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex-1">
          <PlaceholderImage
            name={`Foto de ${name} (speakers/${imageName}.jpg)`}
            className="h-80 w-full max-w-md md:h-[500px]"
            bgClass="bg-neutral-900"
          />
        </div>
      </div>

    </section>
  )
}

function LocationSection() {
  return (
    <section id="ubicacion" className="relative overflow-hidden bg-black px-6 py-24 md:px-12">
      <PlaceholderImage
        name="Fondo estrellado (location/background.jpg)"
        className="absolute inset-0 z-0 opacity-50"
        bgClass="bg-slate-950"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <p className="font-press-start text-xs uppercase tracking-[0.3em] text-white/70">UBICACIÓN</p>
          <h2 className="mt-4 font-press-start text-3xl text-white md:text-5xl">
            Iglesia
            <br />
            Encuentro Canning
          </h2>
          <a
            href="https://maps.app.goo.gl/6X8X9X8X8X8X8X8X8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-2 border-yellow-300 bg-red-600 px-8 py-4 font-press-start text-xs uppercase tracking-widest text-white shadow-[0_0_28px_rgba(250,204,21,0.55)] transition hover:bg-yellow-300 hover:text-black md:text-sm"
          >
            CÓMO LLEGAR
          </a>
        </div>

        <div className="flex-1">
          <PlaceholderImage
            name="Mapa de ubicación (location/map.png)"
            className="h-80 w-full max-w-lg md:h-[450px]"
            bgClass="bg-neutral-800"
          />
        </div>
      </div>
    </section>
  )
}

function PlaceholderImage({
  name,
  className = '',
  bgClass = 'bg-neutral-800',
}: {
  name: string
  className?: string
  bgClass?: string
}) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed border-white/30 p-6 text-center ${bgClass} ${className}`}
    >
      <span className="text-xs font-bold uppercase tracking-wider text-white/60">{name}</span>
    </div>
  )
}
