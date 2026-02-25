import { Metadata } from 'next'
import Image from 'next/image'
import SocialIcons from '../components/SocialIcons'
import Navigation from '../components/tcp/Navigation'
import VideoSection from '../components/tcp/VideoSection'

export const metadata: Metadata = {
  title: 'Testigos Con Poder 2025 — Congreso de Evangelismo',
  description:
    'Testigos Con Poder 2025 — Congreso de evangelismo en Encuentro Canning. 3 días de plenarias con Chris Overstreet, Sebastián Sennewald, Peter DeArruda y Daniela Freidzon. ¡Comprá tu entrada!',
  keywords: [
    'Testigos Con Poder',
    'TCP 2025',
    'congreso evangelismo',
    'Encuentro Canning',
    'Chris Overstreet',
    'Sebastián Sennewald',
    'Peter DeArruda',
    'Daniela Freidzon',
    'congreso cristiano Buenos Aires',
  ],
  openGraph: {
    title: 'Testigos Con Poder 2025 — Congreso de Evangelismo',
    description:
      '3 días de plenarias con oradores internacionales. Congreso de evangelismo en Encuentro Canning, Buenos Aires.',
  },
}

export default function TCPPage() {
  return (
    <main className="min-h-screen bg-white font-neue-haas">
      <Navigation />

      {/* Hero section with video */}
      <section className="relative bg-black pt-14 md:pt-16 lg:pt-20 flex flex-col">
        {/* Hero container with video and image */}
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[calc(100vh-5rem)] min-h-[300px] overflow-hidden flex flex-col">
          {/* Video background */}
          <div className="absolute inset-0 bg-black/65 z-10" />
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
          >
            <source src="/videos/tcp/VIDEO HOME TCP.mp4" type="video/mp4" />
          </video>
          
          {/* PALABRA HERO image absolute at bottom */}
          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
            <Image
              src="/images/tcp/PALABRA HERO.png"
              alt="Testigos Con Poder 2025"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
              quality={90}
            />
          </div>
          
          {/* Muy pronto text in the middle */}
          <div className="grow flex justify-center items-center z-30">
            <span className="inline-block px-8 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-3 md:py-5 lg:py-6 text-white border border-white text-base sm:text-sm md:text-base lg:text-2xl uppercase tracking-wide font-semibold">
              Muy pronto
            </span>
          </div>
        </div>
      </section>

      {/* Visión congreso imagen */}
      <section id="vision" className="scroll-mt-20">
        <Image
          width={1920}
          height={1080}
          src="/images/tcp/vision.png"
          alt="TCP Vision"
          className="w-full h-auto"
          priority
        />
      </section>

      {/* Info basica con fondo video */}
      <section id="info" className="relative py-12 md:py-32 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="/videos/tcp/VIDEO FECHA TCP.mp4" type="video/mp4" />
        </video>
        <div className="relative z-20 container mx-auto px-4 text-white">
          <Image
            src="/images/tcp/tcp-reserva.png"
            alt="TCP Fechas"
            width={1920}
            height={600}
            className="w-full h-auto"
            priority
            quality={90}
          />
          <p className="w-[45%] h-[18%] right-0 bottom-[35%] absolute">
            <a 
              href="https://maps.app.goo.gl/mX1XBLuHT1jcX4nn8" 
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
            </a>
          </p>
        </div>
      </section>

      {/* Oradores imagen tipo poster */}
      <section className="scroll-mt-20 bg-black">
        <div className="relative bg-cover bg-center h-[40vh] md:h-auto" style={{ backgroundImage: 'url(/images/tcp/oradores.png)' }}>
          {/* Desktop view - regular image */}
          <div className="hidden md:block">
            <Image
              src="/images/tcp/oradores.png"
              alt="TCP Oradores"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
              quality={90}
            />
          </div>
          
          {/* Button for both views */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-8 md:pb-12">
            <a 
              href="#speakers" 
              className="inline-block px-6 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 text-white bg-black border border-black hover:bg-white hover:text-black transition-colors text-sm sm:text-sm md:text-base uppercase tracking-wide font-semibold"
            >
              Conoce a los oradores →
            </a>
          </div>
        </div>
      </section>

      {/* Video YT */}
      <VideoSection />

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
      <section className="bg-black">
        <video
          className="w-full"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/tcp/web tcp logo rojo.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Contacto */}
      <section className="py-12 md:py-20 text-center bg-black text-white">
        <div className="container mx-auto px-4">
          <p className="text-xl mb-12">Para más información, escribinos a <a href="mailto:info@emuba.org" className="underline hover:no-underline">info@emuba.org</a></p>
          <SocialIcons className="text-white" />
        </div>
      </section>
    </main>
  )
}

const faqs = [
  {
    question: '¿Qué incluye la entrada?',
    answer: 'La entrada otorga acceso a los 3 días del evento, incluyendo todas las plenarias dentro del programa general.'
  },
  {
    question: '¿Se puede transferir la entrada a otra persona?',
    answer: 'Sí, para transferir la entrada a otra persona, por favor envíe un mensaje a Eventik Asistencia.'
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
    answer: 'En la Iglesia El Encuentro Canning contarán con un buffet abierto durante todo el evento donde podrán adquirir comida y bebidas.'
  },
  {
    question: '¿Habrá cuidado de niños?',
    answer: 'No habrá cuidado de niños durante el evento.'
  },
  {
    question: '¿Los menores pagan el mismo precio?',
    answer: 'Sí, los menores pagan el mismo precio de entrada.'
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
      url: 'https://www.booking.com/searchresults.es.html?label=es-ar-booking-desktop-MRRNwpxuLSY8eNXQ7griKwS652829001343%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9185727%3Ali%3Adec%3Adm&aid=2311236&ss=Ezeiza&ssne=Ezeiza&ssne_untouched=Ezeiza&efdco=1&lang=es&src=searchresults&dest_id=-989273&dest_type=city&checkin=2025-05-22&checkout=2025-05-25&group_adults=1&no_rooms=1&group_children=0'
    }
  },
  {
    question: '¿Ofrecen packs promocionales?',
    answer: `Sí, se encuentran disponibles en Eventik:

Pack dúo para dos integrantes de una misma familia.

Pack familiar para cuatro integrantes de una misma familia.

Pack iglesias: cada once miembros de una misma iglesia, una entrada está 100% bonificada.`,
    link: {
      text: 'Ver packs en Eventik',
      url: 'https://eventik.com.ar/encuentro-canning'
    }
  }
]
