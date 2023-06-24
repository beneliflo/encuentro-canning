import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import cn from 'classnames'

import FacebookIcon from '../public/facebook.svg'
import InstagramIcon from '../public/instagram.svg'
import YoutubeIcon from '../public/youtube.svg'
 
export const metadata: Metadata = {
  title: 'Encuentro Canning',
  description: 'Encuentro Canning',
}

export default function Home() {
  const [mount, setMount] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true
    },
    [
      (slider) => {
        let timeout: string | number | NodeJS.Timeout | undefined
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on("created", () => {
          setMount(true)
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )
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
        <div className={cn('absolute inset-0 transition-opacity duration-300 ease-in', mount ? 'opacity-100' : 'opacity-0')}>
          <div ref={sliderRef} className="keen-slider h-full">
            <div className="keen-slider__slide"><Image src="/hero.jpg" alt="adoracion" fill style={{objectFit: "cover"}} /></div>
            <div className="keen-slider__slide"><Image src="/hero.jpg" alt="adoracion" fill style={{objectFit: "cover"}} /></div>
            <div className="keen-slider__slide"><Image src="/hero.jpg" alt="adoracion" fill style={{objectFit: "cover"}} /></div>
          </div>
        </div>
      </div>
    </main>
  )
}
