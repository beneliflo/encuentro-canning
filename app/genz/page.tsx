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
      />
      <SpeakerSection
        number={2}
        name="Rigoberto Hidalgo"
        roles={['ESCRITOR', 'CONFERENCISTA', 'DEFENSOR DE LA FÉ']}
        bgImage="/genz/speakers/bg-speaker-2.png"
        bgColor="bg-blue-600"
        decorationColor="bg-blue-800"
      />
      <SpeakerSection
        number={3}
        name="Daiam Ortiz"
        roles={['LIDER DE ADOLESCENTES', 'DIR. GENERACIÓN EMERGENTE (MISIÓN)', 'ADORADOR']}
        bgImage="/genz/speakers/bg-speaker-3.png"
        bgColor="bg-green-600"
        decorationColor="bg-green-800"
      />
      <SpeakerSection
        number={4}
        name="Guido Arakelian"
        roles={['EVANGELISTA', 'DIR. EMUBA X', 'APASIONADO']}
        bgImage="/genz/speakers/bg-speaker-4.png"
        bgColor="bg-orange-600"
        decorationColor="bg-orange-800"
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
        <a href="/" className="hover:opacity-80">
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
      className="relative flex min-h-[700px] flex-col items-center justify-center overflow-hidden bg-black px-6 py-20 md:min-h-[800px]"
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
          className="h-auto w-full max-w-sm"
          unoptimized
          priority
        />

        <div className="mt-12 flex flex-col gap-4 md:flex-row">
          <a href="https://emuba.fint.app/eventos/gen-z-2026" className="pixel-btn genz-hero-cta">
            <span className="relative z-10">COMPRAR ENTRADAS</span>
          </a>
          <a
            href="#speakers"
            className="hidden border-2 border-white bg-black/60 px-8 py-4 font-press-start text-xs uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:text-sm"
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
}: {
  number: number
  name: string
  roles: string[]
  bgImage?: string
  bgColor: string
  decorationColor: string
}) {
  const isEven = number % 2 === 0
  const decorations = speakerDecorations[number] ?? []
  const avatar = speakerAvatars[number]
  const profile = speakerProfiles[number]
  const nameGraphic = speakerNames[number]
  const roleShapes =
    number === 1
      ? s1RoleShapes
      : number === 2
        ? s2RoleShapes
        : number === 3
          ? s3RoleShapes
          : number === 4
            ? s4RoleShapes
            : undefined

  return (
    <section
      id={number === 1 ? 'speakers' : undefined}
      className={`relative overflow-hidden ${bgColor} px-6 py-16 md:px-12`}
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

      {avatar && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src={avatar.src}
            alt=""
            width={avatar.width}
            height={avatar.height}
            sizes="(min-width: 768px) 48vw, 78vw"
            className={`absolute bottom-0 z-[2] h-auto w-[78%] translate-y-[48%] md:w-[48%] ${avatar.position}`}
            style={{
              maxWidth: `${avatar.width / 2}px`,
              mixBlendMode: avatar.blendMode,
              opacity: avatar.opacity,
            }}
            unoptimized
            priority={number <= 2}
          />
        </div>
      )}

      {profile && (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[4] w-full max-w-6xl -translate-x-1/2 px-6 md:px-12">
          <Image
            src={profile.src}
            alt={`Foto de ${name}`}
            width={profile.width}
            height={profile.height}
            sizes="(min-width: 768px) 34vw, 62vw"
            className={`absolute h-auto w-[62%] md:w-[34%] ${profile.position} ${profile.rotateClass}`}
            style={{ maxWidth: `${profile.width / 2}px`, bottom: profile.bottom }}
            unoptimized
            priority={number <= 2}
          />
        </div>
      )}

      {decorations.map((decoration) => (
        <Image
          key={decoration.src}
          src={decoration.src}
          alt=""
          width={decoration.width}
          height={decoration.height}
          sizes={`${decoration.width / 2}px`}
          className={`pointer-events-none absolute z-[5] h-auto ${decoration.position}`}
          style={{ width: `${decoration.width / 2}px` }}
          unoptimized
        />
      ))}

      <div className={`relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1 text-center md:text-left">
          <h2>
            {nameGraphic ? (
              <Image
                src={nameGraphic.src}
                alt={name}
                width={nameGraphic.width}
                height={nameGraphic.height}
                sizes={`${nameGraphic.width / 2}px`}
                className={
                  number === 1
                    ? 'mx-auto h-auto w-full md:ml-auto md:mr-10'
                    : number === 2
                      ? 'mx-auto h-auto w-full md:mx-0 md:-translate-x-8'
                      : number === 3
                        ? 'mx-auto h-auto w-full md:ml-auto md:mr-8'
                        : 'mx-auto h-auto w-full md:mx-0'
                }
                style={{ maxWidth: `${nameGraphic.width / 2}px` }}
                unoptimized
              />
            ) : (
              name
            )}
          </h2>
          <ul
            className={
              number === 1
                ? 'mt-14 flex flex-col items-center gap-2 md:items-end md:pr-10'
                : number === 2
                  ? 'mt-14 flex flex-col items-center gap-2 md:items-start'
                  : number === 3
                    ? 'mt-14 flex flex-col items-center gap-2 md:items-end md:pr-8'
                    : number === 4
                      ? 'mt-14 flex flex-col items-center gap-2 md:items-start'
                  : 'mt-6 space-y-2'
            }
          >
            {roles.map((role, index) => (
              <li
                key={role}
                className={
                  roleShapes
                    ? `w-fit bg-black px-5 py-3 text-center [font-family:var(--font-press-start-2p)] text-base uppercase leading-[1.35] tracking-widest text-[#FFB500] md:text-lg ${number === 3 ? '' : 'whitespace-nowrap'}`
                    : 'font-press-start text-sm uppercase tracking-widest text-white md:text-base'
                }
                style={roleShapes?.[index]}
              >
                {number === 3
                  ? s3RoleLines[index].map((line, lineIndex) => (
                      <span key={line}>
                        {line}
                        {lineIndex < s3RoleLines[index].length - 1 && <br />}
                      </span>
                    ))
                  : role}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-72 flex-1 md:h-[440px]" aria-hidden="true" />
      </div>

    </section>
  )
}

const s1RoleShapes = [
  { clipPath: 'polygon(7% 0, 100% 0, 97% 100%, 0 100%)', transform: 'rotate(-1deg)' },
  { clipPath: 'polygon(0 8%, 97% 0, 100% 100%, 3% 94%)', transform: 'rotate(1deg)' },
  { clipPath: 'polygon(4% 0, 96% 6%, 100% 100%, 0 92%)', transform: 'rotate(2deg)' },
]

const s2RoleShapes = [
  { clipPath: 'polygon(4% 8%, 100% 0, 93% 100%, 0 100%)', transform: 'rotate(-1deg)' },
  { clipPath: 'polygon(0 5%, 100% 0, 97% 100%, 5% 94%)', transform: 'rotate(0deg)' },
  { clipPath: 'polygon(0 0, 94% 5%, 100% 100%, 3% 92%)', transform: 'rotate(1deg)' },
]

const s3RoleShapes = [
  { clipPath: 'polygon(3% 0, 96% 6%, 100% 100%, 0 96%)', transform: 'rotate(1deg)' },
  { clipPath: 'polygon(8% 0, 96% 4%, 100% 94%, 0 100%)', transform: 'rotate(-1deg)' },
  { clipPath: 'polygon(3% 5%, 100% 0, 100% 82%, 0 100%)', transform: 'rotate(-1deg)' },
]

const s3RoleLines = [
  ['LIDER DE', 'ADOLESCENTES'],
  ['DIR. GENERACIÓN', 'EMERGENTE (MISIÓN)'],
  ['ADORADOR'],
]

const s4RoleShapes = [
  { clipPath: 'polygon(0 8%, 100% 0, 94% 100%, 0 100%)', transform: 'rotate(-1deg)' },
  { clipPath: 'polygon(7% 0, 100% 3%, 100% 100%, 0 96%)', transform: 'rotate(0deg)' },
  { clipPath: 'polygon(8% 0, 100% 0, 95% 100%, 0 97%)', transform: 'rotate(1deg)' },
]

const speakerNames: Record<number, { src: string; width: number; height: number }> = {
  1: { src: '/genz/decorations/s1-name.png', width: 846, height: 300 },
  2: { src: '/genz/decorations/s2-name.png', width: 933, height: 537 },
  3: { src: '/genz/decorations/s3-name.png', width: 948, height: 367 },
  4: { src: '/genz/decorations/s4-name.png', width: 1007, height: 298 },
}

const speakerDecorations: Record<
  number,
  Array<{ src: string; width: number; height: number; position: string }>
> = {
  1: [
    { src: '/genz/decorations/s1-top-left.png', width: 241, height: 240, position: 'left-0 top-0' },
    { src: '/genz/decorations/s1-bottom-left.png', width: 241, height: 160, position: 'bottom-0 left-0' },
    { src: '/genz/decorations/s1-bottom-rigth.png', width: 401, height: 240, position: 'bottom-0 right-0' },
  ],
  2: [
    { src: '/genz/decorations/s2-top-left.png', width: 81, height: 81, position: 'left-0 top-0' },
    { src: '/genz/decorations/s2-top-rigth.png', width: 161, height: 241, position: 'right-0 top-0' },
    { src: '/genz/decorations/s2-bottom-left.png', width: 161, height: 241, position: 'bottom-0 left-0' },
  ],
  3: [
    { src: '/genz/decorations/s3-top-left.png', width: 161, height: 240, position: 'left-0 top-0' },
    { src: '/genz/decorations/s3-bottom-left.png', width: 241, height: 320, position: 'bottom-0 left-0' },
    { src: '/genz/decorations/s3-bottom-rigth.png', width: 161, height: 400, position: 'bottom-0 right-0' },
  ],
  4: [
    { src: '/genz/decorations/s4-top-rigth.png', width: 161, height: 240, position: 'right-0 top-0' },
    { src: '/genz/decorations/s4-bottom-left.png', width: 321, height: 241, position: 'bottom-0 left-0' },
    { src: '/genz/decorations/s4-bottom-rigth.png', width: 161, height: 321, position: 'bottom-0 right-0' },
  ],
}

const speakerAvatars: Record<
  number,
  {
    src: string
    width: number
    height: number
    position: string
    blendMode: 'normal' | 'soft-light'
    opacity: number
  }
> = {
  1: {
    src: '/genz/decorations/s1-avatar-bottom-left.png',
    width: 733,
    height: 1172,
    position: 'left-[-6%]',
    blendMode: 'normal',
    opacity: 0.5,
  },
  2: {
    src: '/genz/decorations/s2-avatar-bottom-rigth.png',
    width: 736,
    height: 1320,
    position: 'right-[-8%]',
    blendMode: 'normal',
    opacity: 0.5,
  },
  3: {
    src: '/genz/decorations/s3-avatar-bottom-left.png',
    width: 725,
    height: 1238,
    position: 'left-[-6%]',
    blendMode: 'soft-light',
    opacity: 1,
  },
  4: {
    src: '/genz/decorations/s4-avatar-bottom-rigth.png',
    width: 881,
    height: 1454,
    position: 'right-[-8%]',
    blendMode: 'soft-light',
    opacity: 1,
  },
}

const speakerProfiles: Record<
  number,
  { src: string; width: number; height: number; position: string; rotateClass: string; bottom: string }
> = {
  1: {
    src: '/genz/decorations/s1-profile-rigth.png',
    width: 755,
    height: 1332,
    position: 'right-6 md:right-12',
    rotateClass: 'rotate-[4deg]',
    bottom: '-20%',
  },
  2: {
    src: '/genz/decorations/s2-profile-left.png',
    width: 798,
    height: 1506,
    position: 'left-6 md:left-12',
    rotateClass: '-rotate-[4deg]',
    bottom: '-25%',
  },
  3: {
    src: '/genz/decorations/s3-profile-rigth.png',
    width: 681,
    height: 1272,
    position: 'right-6 md:right-12',
    rotateClass: 'rotate-[4deg]',
    bottom: '-20%',
  },
  4: {
    src: '/genz/decorations/s4-profile-left.png',
    width: 640,
    height: 1246,
    position: 'left-6 md:left-12',
    rotateClass: '-rotate-[4deg]',
    bottom: '-12%',
  },
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
