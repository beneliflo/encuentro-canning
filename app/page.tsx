import Image from 'next/image'
import Link from 'next/link'

import FacebookIcon from '@/public/facebook.svg'
import InstagramIcon from '@/public/instagram.svg'
import YoutubeIcon from '@/public/youtube.svg'

import logoIEC from '@/public/logo-iec.png'

const mapEmbedCode = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5866264193533!2d-58.51235886463723!3d-34.88144292619042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd76848809fd5%3A0xa4dcb81c015f76f2!2sIglesia%20el%20encuentro!5e0!3m2!1ses-419!2sar!4v1687666073992!5m2!1ses-419!2sar" width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

export default function Home() {
  return (
    <main className="bg-[url('/bg-preview.png')] before:bg-section-pattern before:absolute before:inset-0 bg-cover bg-no-repeat bg-top">
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <Link href="/"><Image className="w-10 pt-8 cursor-pointer sm:w-14" src={logoIEC} alt="IEC Logo" loading='eager' /></Link>
        <div className="relative">
          <div className="container text-center py-14 md:py-20">
            <div className="flex flex-col justify-center text-white xl:flex-row">
              <h1 className="text-4xl font-semibold md:text-5xl xl:pr-10 xl:mr-10 xl:border-r-2 xl:border-r-white">Hipócrates 3320 - Canning</h1>
              <p className="mt-6 text-3xl md:text-5xl xl:mt-0">Domingos 10:00 AM</p>
            </div>
            <div className="overflow-hidden mt-14 rounded-2xl" dangerouslySetInnerHTML={{ __html: mapEmbedCode }} />
          </div>
        </div>
        <ul className="flex items-center gap-8 pb-8">
          <li><Link href="https://www.facebook.com/ElEncuentro.Canning" target='_blank'><Image className="w-8 transition-opacity duration-150 ease-in-out hover:opacity-80" src={FacebookIcon} alt="facebook icon" loading='eager' /></Link></li>
          <li><Link href="https://www.instagram.com/encuentrocanning/" target='_blank'><Image className="w-8 transition-opacity duration-150 ease-in-out hover:opacity-80" src={InstagramIcon} alt="instagram icon" loading='eager' /></Link></li>
          <li><Link href="https://www.youtube.com/@encuentrocanning" target='_blank'><Image className="w-10 transition-opacity duration-150 ease-in-out hover:opacity-80" src={YoutubeIcon} alt="youtube icon" loading='eager' /></Link></li>
        </ul>
      </div>
    </main>
  )
}