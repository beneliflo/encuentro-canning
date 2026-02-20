import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
          
          {/* Button in the middle */}
          <div className="grow flex justify-center items-center z-30">
            <Link 
              href="https://go.eventik.app/tcp2025"
              className="inline-block px-8 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-3 md:py-5 lg:py-6 text-white border border-white hover:bg-white hover:text-black transition-colors text-base sm:text-sm md:text-base lg:text-2xl uppercase tracking-wide font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar Entradas →
            </Link>
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

      {/* Biografias de oradores */}
      <section id="speakers" className="py-12 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-8 md:mb-24">ORADORES</h2>
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-24">
            {speakers.map((speaker, index) => (
              <div 
                key={speaker.name} 
                className={`grid md:grid-cols-2 gap-8 items-start ${
                  index % 2 === 0 ? '' : 'md:[direction:rtl]'
                }`}
              >
                <div className="md:w-[300px] aspect-3/4 relative rounded-lg overflow-hidden justify-self-center md:justify-self-auto">
                  <Image
                    src={`/images/tcp/speakers/${speaker.name}.png`}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 300px, 100vw"
                    loading="eager"
                    quality={85}
                  />
                </div>
                <div className={`space-y-4 md:[direction:ltr]`}>
                  <h3 className="text-2xl md:text-3xl font-semibold uppercase">{speaker.name}</h3>
                  <div className="prose prose-lg max-w-none space-y-4">
                    {speaker.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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

const speakers = [
  {
    name: 'Chris Overstreet',
    bio: `Chris Overstreet es evangelista y fundador de "Compassion To Action" un ministerio con la misión de alcanzar al mundo mediante la compasión de Jesús.

Chris equipa a los creyentes para vivir un estilo de vida sobrenatural, de manera que puedan ver salvaciones, milagros, y vidas transformadas como parte de su día a día. Fue pastor en Bethel Church, Redding, por 15 años, y en 2018 inició con su ministerio en Vancouver, Washington.

A lo largo de estos años ha desarrollado relaciones estratégicas en la comunidad y al mismo tiempo capacita, equipa y moviliza a las personas a las calles, a la compasión y a vivir el evangelismo sobrenatural como algo cotidiano.`
  },
  {
    name: 'Sebastián Sennewald',
    bio: `Sebastián Sennewald es evangelista y pastor de la Iglesia Encuentro Canning, en Buenos Aires. Junto con Paula, su esposa, presiden la iglesia local desde el año 2017.

Estudió en el Instituto Bíblico Elim y New York School of Urban Ministry (NYSUM). En 2009 fundó EMUBA con la visión de encender y entrenar a la iglesia local para amar, servir y predicar con poder y creatividad a Cristo en las ciudades del mundo.

El propósito de su ministerio es equipar a la iglesia para vivir un evangelismo como estilo de vida, sabiendo que predicar y hacer discípulos es la misión suprema de todo cristiano y la mejor manera de esperar el regreso de Cristo.`
  },
  {
    name: 'Peter DeArruda',
    bio: `Peter DeArruda es el presidente del ministerio "New York School of Urban Ministry" (NYSUM). Él y su esposa, Darleen, sirven como misioneros urbanos durante los últimos 34 años allí. Estudió en el Instituto Bíblico Zion, se graduó del Instituto Bíblico Elim en 1980 y obtuvo su licenciatura en religión y filosofía de Houghton College en 1981.

Desde 1987, ha participado en dirección de campañas urbanas, así como en la capacitación en evangelismo. Ha sido fundamental para traer visión y desafío a las iglesias de la ciudad en la movilización del cuerpo de Cristo para el ministerio urbano.`
  },
  {
    name: 'Daniela Freidzon',
    bio: `Daniela Freidzon es pastora y oradora internacional de la iglesia Rey de Reyes en Buenos Aires, Argentina. Tiene la pasión por alcanzar a esta generación y verla vivir y experimentar la plenitud de Cristo a través de una vida empoderada por el Espíritu.

Es co-presidenta del ministerio Empowered21 Women's Alliance y miembro de la Junta Directiva de la Alianza Evangélica Nacional Argentina (ACIERA). Actualmente, Daniela supervisa el ministerio para adolescentes, universitarios y profesionales con su esposo, Chad McCabe, mientras participa activamente en programas de ayuda social.`
  }
]

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
