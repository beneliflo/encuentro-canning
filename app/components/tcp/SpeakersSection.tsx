import Image from 'next/image'

const speakers = [
  {
    name: 'Sebastián Sennewald',
    image: '/images/tcp/speakers/sebastian-sennewald.png',
    bio: 'es evangelista y pastor de la Iglesia Encuentro Canning, en Buenos Aires. Junto con Paula, su esposa, presiden la iglesia local desde el año 2017. Estudió en el Instituto Bíblico Elim y New York School of Urban Ministry (NYSUM). En 2009 fundó EMUBA con la visión de encender y entrenar a la iglesia local para amar, servir y predicar con poder y creatividad a Cristo en las ciudades del mundo. El propósito de su ministerio es equipar a la iglesia para vivir un evangelismo como estilo de vida, sabiendo que predicar y hacer discípulos es la misión suprema de todo cristiano y la mejor manera de esperar el regreso de Cristo.'
  },
  {
    name: 'Daniela Freidzon',
    image: '/images/tcp/speakers/daniela-freidzon.png',
    bio: 'Daniela Freidzon-McCabe es pastora y oradora internacional de la iglesia Rey de Reyes en Buenos Aires, Argentina. Tiene la pasión por alcanzar a esta generación y verla vivir y experimentar la plenitud de Cristo a través de una vida empoderada por el Espíritu. Es co-presidenta del ministerio Empowered21 Women\'s Alliance y miembro de la Junta Directiva de la Alianza Evangélica Nacional Argentina (ACIERA). Actualmente, Daniela supervisa el ministerio para adolescentes, universitarios y profesionales con su esposo, Chad McCabe, mientras participa activamente en programas de ayuda social.'
  },
  {
    name: 'Ross Johnston',
    image: '/images/tcp/speakers/ross-johnston.png',
    bio: 'es evangelista, predicador y cofundador de California Will Be Saved. Nació por inseminación artificial y fue criado por dos madres lesbianas. Su corazón arde por el avivamiento, la predicación del evangelio y el amor a Jesús con toda su alma. Le apasiona ver la manifestación del Espíritu de Dios en la tierra en esta generación y está en primera línea para el avance del reino de Dios. Su ministerio tiene el mandato de alcanzar a cada escuela secundaria pública con el poder del evangelio, proclamar las Buenas Nuevas en las calles de todos los continentes y capacitar a la iglesia para guiar a una generación de regreso a Jesús.'
  },
  {
    name: 'Suleman Manzoor',
    image: '/images/tcp/speakers/suleman-manzoor.png',
    bio: 'es pastor, proveniente de Pakistán, y fundador de iglesias locales. Es graduado de Christ for the Nations (Cristo para las naciones) en Dallas, Texas y es director de RAPHA Mission con sede en Suecia. El ministerio trabaja en misiones en Asia y por el avivamiento en Europa, con énfasis en profecía y sanidad. Han realizado grandes cruzadas de sanidad y seminarios de liderazgo, además de brindar ayuda humanitaria, trabajar entre los refugiados afganos, y asistir a cristianos de la iglesia perseguida.'
  }
]

export default function SpeakersSection() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-12 md:space-y-16">
          {speakers.map((speaker) => (
            <div 
              key={speaker.name}
              className="flex flex-col md:flex-row gap-6 md:gap-8 items-start"
            >
              {/* Speaker Image */}
              <div className="w-full md:w-64 shrink-0">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Speaker Bio */}
              <div className="flex-1">
                <p className="text-base md:text-lg leading-relaxed text-gray-800 font-neue-haas">
                  <span className="font-bold">{speaker.name}</span> {speaker.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
