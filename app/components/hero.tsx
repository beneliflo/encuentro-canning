import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import FacebookIcon from '../../public/facebook.svg'
import InstagramIcon from '../../public/instagram.svg'
import YoutubeIcon from '../../public/youtube.svg'

import logoIEC from '../../public/logo-iec.png'
import heroOne from '../../public/hero.jpg'
import heroTwo from '../../public/hero2.jpg'

export default function Hero() {
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
          }, 3000)
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
    <div className="h-screen max-h-96 md:max-h-[1000px] overflow-hidden relative">
      <header className="relative z-10 flex items-center px-10 py-6">
        <Link href="/"><Image className="w-9" src={logoIEC} alt="IEC Logo" /></Link>
        <nav className="flex justify-end w-full ml-10 md:justify-between">
          <ul className="hidden gap-10 text-white md:flex">
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Quienes somos</Link></li>
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Ministerios</Link></li>
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Edades</Link></li>
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Contacto</Link></li>
          </ul>
          <ul className="flex items-center gap-5">
            <li><Link href="https://www.facebook.com/ElEncuentro.Canning"><Image className="w-6 transition-opacity duration-150 ease-in-out hover:opacity-80" src={FacebookIcon} alt="facebook icon" /></Link></li>
            <li><Link href="https://www.instagram.com/encuentrocanning/"><Image className="w-6 transition-opacity duration-150 ease-in-out hover:opacity-80" src={InstagramIcon} alt="instagram icon" /></Link></li>
            <li><Link href="https://www.youtube.com/@elencuentrocanning3177"><Image className="w-8 transition-opacity duration-150 ease-in-out hover:opacity-80" src={YoutubeIcon} alt="youtube icon" /></Link></li>
            <li>
              <Link href="https://www.youtube.com/@elencuentrocanning3177">
                <div className="relative flex items-center gap-2">
                  <div className="relative flex w-3 h-3">
                    <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                  <p className="text-sm font-semibold text-white">EN VIVO</p>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={cn('absolute inset-0 transition-opacity duration-300 ease-in', mount ? 'opacity-100' : 'opacity-0')}>
        <div ref={sliderRef} className="h-full keen-slider">
          <div className="keen-slider__slide after:absolute after:inset-0 after:bg-black/30"><Image src={heroOne} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
          <div className="keen-slider__slide after:absolute after:inset-0 after:bg-black/30"><Image src={heroTwo} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
          <div className="keen-slider__slide after:absolute after:inset-0 after:bg-black/30"><Image src={heroOne} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
        </div>
      </div>
    </div>
  )
}