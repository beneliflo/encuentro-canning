import cn from 'classnames'
import { Dancing_Script } from 'next/font/google'

import Hero from './components/hero'
import Who from './components/who'
import Ministries from './components/ministries'
import Pastors from './components/pastors'
import Gallery from './components/gallery'
import Footer from './components/footer'

const dancing_script = Dancing_Script({ subsets: ['latin'] })

export default function Home() {

  const mapEmbedCode = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5866264193533!2d-58.51235886463723!3d-34.88144292619042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd76848809fd5%3A0xa4dcb81c015f76f2!2sIglesia%20el%20encuentro!5e0!3m2!1ses-419!2sar!4v1687666073992!5m2!1ses-419!2sar" width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <main>
    {/* Menu hamburgesa mobile */}
    <div className="flex items-center justify-between border-gray-400 py-8">
        <nav className='mobile-menu'>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-gray-400 my-8 uppercase">
                  <a href="/">Quienes somos</a>
                </li>
                <li className="border-gray-400 my-8 uppercase">
                  <a href="/">Ministerios</a>
                </li>
                <li className="border-gray-400 my-8 uppercase">
                  <a href="/">Edades</a>
                </li>
                <li className="border-gray-400 my-8 uppercase">
                  <a href="/">Contacto</a>
                </li>
              </ul>
            </div>
          </section>
        </nav>
      </div>
      {/* Menu hamburgesa mobile */}
      <Hero />
      {/* Palabra Rhema section */}
      <div className="container text-center py-14 md:py-20">
        <h1 className={cn('text-4xl md:text-6xl', dancing_script.className)}>"Si permanece la obra de alguno que ha edificado sobre el fundamento, recibirá recompensa."</h1>
        <p className="mt-4 text-xl">1 Corintios 3:14 (LBLA)</p>
      </div>
      <Who />
      <Ministries />
      <Pastors />
      {/* Join us at church section */}
      <div className="relative bg-black before:bg-section-pattern before:absolute before:inset-0">
        <div className="container text-center py-14 md:py-20">
          <div className="flex flex-col justify-center text-white md:flex-row">
            <h1 className="text-4xl font-semibold md:text-5xl md:pr-10 md:mr-10 md:border-r-2 md:border-r-white">Join Us at Church</h1>
            <p className="mt-2 text-3xl md:text-5xl md:mt-0">Domingos 10:00 AM</p>
          </div>
          <div className="overflow-hidden mt-14 rounded-2xl" dangerouslySetInnerHTML={{ __html: mapEmbedCode }} />
        </div>
      </div>
      <Gallery />
      <Footer />
    </main>
  )
}