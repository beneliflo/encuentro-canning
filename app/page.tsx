import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

import FacebookIcon from '../public/facebook.svg'
import InstagramIcon from '../public/instagram.svg'
import YoutubeIcon from '../public/youtube.svg'
 
export const metadata: Metadata = {
  title: 'Encuentro Canning',
  description: 'Encuentro Canning',
}

export default function Home() {
  return (
    <main>
      <div className="h-screen max-h-[1000px] overflow-hidden relative">
        <header className="flex items-center relative z-10 px-10 py-6">
          <Image className="mr-10" src="/logo-iec.png" alt="IEC Logo" width="35" height="50" />
          <nav className="flex justify-between w-full">
            <ul className="flex text-white gap-10">
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Quienes somos</Link></li>
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Ministerios</Link></li>
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Edades</Link></li>
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Contacto</Link></li>
            </ul>
            <ul className="flex max-h-6">
              <li><Link href="/"><Image className="max-h-full hover:opacity-80 transition-opacity ease-in-out duration-150" src={FacebookIcon} alt="facebook icon" /></Link></li>
              <li><Link href="/"><Image className="max-h-full hover:opacity-80 transition-opacity ease-in-out duration-150" src={InstagramIcon} alt="instagram icon" /></Link></li>
              <li><Link href="/"><Image className="max-h-full hover:opacity-80 transition-opacity ease-in-out duration-150" src={YoutubeIcon} alt="youtube icon" /></Link></li>
            </ul>
          </nav>
        </header>
        <Image src="/hero.jpg" alt="adoracion" fill style={{objectFit: "cover"}} />
      </div>
    </main>
  )
}
