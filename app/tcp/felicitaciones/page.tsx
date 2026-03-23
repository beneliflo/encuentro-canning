'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import SocialIcons from '../../components/SocialIcons'
import PresaleBannerFelicitaciones from '../../components/tcp/PresaleBannerFelicitaciones'
import ResumenVideo from '../../components/tcp/ResumenVideo'
import SpeakersSection from '../../components/tcp/SpeakersSection'
import { VIDEO_URLS } from '../../../lib/video-urls'

const VALID_TOKEN = process.env.NEXT_PUBLIC_FELICITACIONES_TOKEN || 'tcp2026'

function FelicitacionesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token === VALID_TOKEN) {
      setIsAuthorized(true)
      sessionStorage.setItem('tcp_felicitaciones_auth', 'true')
      // Eliminar el token de la URL para evitar que se comparta
      router.replace('/tcp/felicitaciones')
    } else {
      const sessionAuth = sessionStorage.getItem('tcp_felicitaciones_auth')
      if (sessionAuth === 'true') {
        setIsAuthorized(true)
      } else {
        router.push('/tcp')
        return
      }
    }
    
    setIsLoading(false)
  }, [searchParams, router])

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white font-neue-haas pt-0">
      {/* Hero section - Felicitaciones */}
      <section className="relative bg-cover bg-center pt-12 md:pt-20 lg:pt-24 xl:pt-28 pb-24 md:pb-32 lg:pb-36 xl:pb-40" style={{
        backgroundImage: 'url(/images/tcp/hero-congrats.jpg)'
      }}>
          {/* Content */}
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:justify-between max-w-7xl mx-auto">
                {/* Logo TCP */}
                <div className="shrink-0">
                  <Image
                    src="/images/tcp/logo-tcp.png"
                    alt="Testigos Con Poder"
                    width={400}
                    height={400}
                    className="w-48 md:w-80 lg:w-96 xl:w-md h-auto"
                    priority
                  />
                </div>
                
                {/* Text content */}
                <div className="text-left md:max-w-xl lg:max-w-2xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase mb-4 md:mb-6 inline-block" style={{
                    background: 'linear-gradient(to right, #AE0000 0%, #F2250F 50%, #FAAD3D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    ¡FELICIDADES!
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium uppercase">
                    Por ser de los primeros
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium uppercase">
                    en <span className="font-bold">responder al llamado</span>
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium uppercase">
                    aquí tienes un descuento
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8 font-medium uppercase">
                    del <span className="font-bold">60% OFF</span> en tu entrada
                  </p>
                  
                  {/* CTA Button */}
                  <a
                    href="https://emuba.fint.app/eventos/testigos-con-poder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-2 border-black bg-transparent px-8 md:px-12 lg:px-16 py-3 md:py-4 text-base md:text-lg lg:text-xl uppercase font-bold hover:bg-black hover:text-white transition-colors"
                  >
                    Click aquí
                  </a>
              </div>
            </div>
          </div>
          
          {/* Presale banner - flotante y sticky */}
          <PresaleBannerFelicitaciones />
      </section>

      {/* Oradores */}
      <section className="relative h-[45vh] md:h-auto overflow-hidden">
        <Image
          width={1920}
          height={1080}
          src="/images/tcp/TCP2026_ORADORES.jpg"
          alt="Oradores TCP 2026"
          className="w-full h-full md:h-auto object-cover md:object-contain"
          priority
        />
      </section>

      {/* Speakers Bios */}
      <SpeakersSection />

      {/* Conferencia imagen */}
      <section>
        <Image
          width={1920}
          height={1080}
          src="/images/tcp/section-conferencia.jpg"
          alt="Conferencia de Evangelismo Sobrenatural"
          className="w-full h-auto"
        />
      </section>

      {/* Resumen TCP 2025 */}
      <ResumenVideo />

      {/* Ubicación — Desktop */}
      <section id="ubicacion" className="scroll-mt-20 hidden md:block relative">
        <Image
          width={1920}
          height={480}
          src="/images/tcp/section-map.jpg"
          alt="Ubicación — Iglesia Encuentro Canning, Hipócrates 3320, Canning"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="text-white max-w-lg">
            <h3 className="inline-block text-6xl lg:text-8xl font-semibold uppercase mb-4 border-b-2 border-white pb-1">Ubicación</h3>
            <p className="text-3xl lg:text-4xl font-normal uppercase leading-tight mb-3">
              Iglesia Encuentro<br />Canning
            </p>
            <p className="text-lg lg:text-xl opacity-90 mb-8">
              Hipócrates 3320, Canning
            </p>
            <a
              href="https://maps.app.goo.gl/mX1XBLuHT1jcX4nn8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white px-16 py-3 text-xl uppercase font-semibold hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Cómo llegar
            </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación — Mobile */}
      <section className="scroll-mt-20 md:hidden">
        <div className="relative h-[35vh] overflow-hidden">
          <Image
            width={800}
            height={600}
            src="/images/tcp/section-map-1.png"
            alt="Ubicación"
            className="w-full h-full object-cover object-left"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 py-10">
              <div className="text-white">
                <h3 className="inline-block text-4xl font-semibold uppercase mb-3 border-b-2 border-white pb-1">Ubicación</h3>
                <p className="text-2xl font-normal uppercase leading-tight mb-3">
                  Iglesia Encuentro<br />Canning
                </p>
                <p className="text-base opacity-90 mb-6">
                  Hipócrates 3320, Canning
                </p>
                <a
                  href="https://maps.app.goo.gl/mX1XBLuHT1jcX4nn8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-white px-8 py-2.5 text-sm uppercase font-semibold hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
          </div>
        </div>
        <Image
          width={800}
          height={400}
          src="/images/tcp/section-map-2.png"
          alt="Mapa — Iglesia Encuentro Canning"
          className="w-full h-auto"
        />
      </section>

      {/* Preguntas frecuentes */}
      <section id="faq" className="py-12 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">PREGUNTAS FRECUENTES</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-200 pb-4 last:border-b-0 text-lg">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <div className="space-y-4">
                  {faq.answer.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                {faq.link && (
                  <a 
                    href={faq.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-black underline hover:no-underline"
                  >
                    {faq.link.text}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo animado */}
      <section className="bg-black h-[40vh] md:h-auto overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={VIDEO_URLS.tcp.sectionBottomWebm} type="video/webm" />
          <source src={VIDEO_URLS.tcp.sectionBottom} type="video/mp4" />
        </video>
      </section>

      {/* Contacto */}
      <section className="py-12 md:py-20 pb-40 md:pb-20 text-center bg-black text-white">
        <div className="container mx-auto px-4">
          <p className="text-xl mb-12">Para más información, escribinos a <a href="mailto:info@emuba.org" className="underline hover:no-underline">info@emuba.org</a></p>
          <SocialIcons className="text-white" />
        </div>
      </section>
    </main>
  )
}

export default function FelicitacionesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    }>
      <FelicitacionesContent />
    </Suspense>
  )
}

const faqs = [
  {
    question: '¿Qué incluye la entrada?',
    answer: 'La entrada otorga acceso a los 3 días del evento, incluyendo todas las plenarias dentro del programa general.'
  },
  {
    question: '¿Se puede transferir la entrada a otra persona?',
    answer: 'Sí, para transferir la entrada a otra persona, por favor envíe un mensaje a FINT Asistencia.'
  },
  {
    question: '¿Cuál es la política de reembolso?',
    answer: 'No se realizan reembolsos por la entrada adquirida, en caso de no poder asistir puede transferir su entrada a otra persona para que asista en su lugar.'
  },
  {
    question: '¿Qué necesito llevar para la acreditación?',
    answer: 'Por favor, traiga su entrada impresa o en su celular.'
  },
  {
    question: '¿Se ofrecerá comida y bebida en el lugar?',
    answer: 'En la Iglesia Encuentro Canning contarán con un buffet abierto durante todo el evento donde podrán adquirir comida y bebidas.'
  },
  {
    question: '¿Habrá cuidado de niños?',
    answer: 'No habrá cuidado de niños durante el evento.'
  },
  {
    question: '¿Los menores pagan el mismo precio?',
    answer: 'Los menores pagan a partir de los 12 años. Tendremos TCP KIDS (más información próximamente).'
  },
  {
    question: '¿Los asientos están asignados?',
    answer: 'No, los asientos no estarán asignados, dependerán del orden de llegada.'
  },
  {
    question: '¿Hay opciones de alojamiento cercanas?',
    answer: 'Por favor consulte en este link: Booking',
    link: {
      text: 'Ver opciones en Booking.com',
      url: 'https://www.booking.com/searchresults.es-ar.html?ss=Canning%2C+Provincia+de+Buenos+Aires%2C+Argentina&efdco=1&label=es-ar-booking-desktop-MRRNwpxuLSY8eNXQ7griKwS652829001343%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9185727%3Ali%3Adec%3Adm&aid=2311236&lang=es-ar&sb=1&src_elem=sb&src=searchresults&dest_id=-980356&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=es&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=0d828cdce3201db0&ac_meta=GhAwZDgyOGNkY2UzMjAxZGIwIAAoATICZXM6B2Nhbm5pbmc%3D&checkin=2026-05-28&checkout=2026-05-30&group_adults=2&no_rooms=1&group_children=0&soz=1&lang_changed=1'
    }
  }
]
