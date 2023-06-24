'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import cn from 'classnames'

import FacebookIcon from '../public/facebook.svg'
import InstagramIcon from '../public/instagram.svg'
import YoutubeIcon from '../public/youtube.svg'
import logoIEC from '../public/logo-iec.png'

import heroOne from '../public/hero.jpg'
import heroTwo from '../public/hero2.jpg'

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
      <div className="h-screen max-h-96 md:max-h-[1000px] overflow-hidden relative">
        <header className="flex items-center relative z-10 px-10 py-6">
          <Link href="/"><Image className="w-9" src={logoIEC} alt="IEC Logo" /></Link>
          <nav className="flex justify-end w-full md:justify-between ml-10">
            <ul className="text-white gap-10 hidden md:flex">
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Quienes somos</Link></li>
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Ministerios</Link></li>
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Edades</Link></li>
              <li><Link className="hover:opacity-80 transition-opacity ease-in-out duration-150" href="/">Contacto</Link></li>
            </ul>
            <ul className="flex items-center gap-5">
              <li><Link href="https://www.facebook.com/ElEncuentro.Canning"><Image className="w-6 hover:opacity-80 transition-opacity ease-in-out duration-150" src={FacebookIcon} alt="facebook icon" /></Link></li>
              <li><Link href="https://www.instagram.com/encuentrocanning/"><Image className="w-6 hover:opacity-80 transition-opacity ease-in-out duration-150" src={InstagramIcon} alt="instagram icon" /></Link></li>
              <li><Link href="https://www.youtube.com/@elencuentrocanning3177"><Image className="w-8 hover:opacity-80 transition-opacity ease-in-out duration-150" src={YoutubeIcon} alt="youtube icon" /></Link></li>
              <li>
                <Link href="https://www.youtube.com/@elencuentrocanning3177">
                  <div className="relative flex items-center gap-2">
                    <div className="flex relative h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <p className="text-white text-sm font-semibold">EN VIVO</p>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className={cn('absolute inset-0 transition-opacity duration-300 ease-in filter brightness-75', mount ? 'opacity-100' : 'opacity-0')}>
          <div ref={sliderRef} className="keen-slider h-full">
            <div className="keen-slider__slide"><Image src={heroOne} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
            <div className="keen-slider__slide"><Image src={heroTwo} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
            <div className="keen-slider__slide"><Image src={heroOne} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
          </div>
        </div>
      </div>
    </main>
  )
}
