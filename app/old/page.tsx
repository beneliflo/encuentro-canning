import cn from 'classnames'
import { Unbounded } from 'next/font/google'

import Hero from './components/hero'
import Who from './components/who'
import Ministries from './components/ministries'
import Pastors from './components/pastors'
import VideoGallery from './components/video-gallery'
// import Gallery from './components/gallery'
import Footer from './components/footer'

const unbounded = Unbounded({ subsets: ['latin'] })

const mapEmbedCode = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5866264193533!2d-58.51235886463723!3d-34.88144292619042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd76848809fd5%3A0xa4dcb81c015f76f2!2sIglesia%20el%20encuentro!5e0!3m2!1ses-419!2sar!4v1687666073992!5m2!1ses-419!2sar" width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Palabra Rhema section */}
      <div className="container text-center py-14 md:py-20">
        <h1 className={cn('text-4xl md:text-5xl md:leading-snug', unbounded.className)}>“SOMOS UNA FAMILIA APASIONADA POR JESÚS, QUE SE MULTIPLICA, PREDICA CON PODER Y SIRVE CON COMPASIÓN”</h1>
      </div>
      {/* <Who /> */}
      <Ministries />
      {/* <Pastors /> */}
      <VideoGallery />
      <Footer />
    </main>
  )
}