"use client"

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
  const [isNavOpen, setIsNavOpen] = useState(false);

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
      <header className="relative z-10 flex flex-row items-center px-10 py-6">
        <Link href="/"><Image className="w-10 mr-10" src={logoIEC} alt="IEC Logo" /></Link>
        <nav className="flex justify-center w-full md:justify-between">
          <ul className="hidden gap-10 text-white md:flex">
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Quienes somos</Link></li>
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Ministerios</Link></li>
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Edades</Link></li>
            <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Contacto</Link></li>
          </ul>
          <ul id="redes" className="flex items-center gap-5">
            <li><Link href="https://www.facebook.com/ElEncuentro.Canning" target='_blank'><Image className="w-6 transition-opacity duration-150 ease-in-out hover:opacity-80" src={FacebookIcon} alt="facebook icon" /></Link></li>
            <li><Link href="https://www.instagram.com/encuentrocanning/" target='_blank'><Image className="w-6 transition-opacity duration-150 ease-in-out hover:opacity-80" src={InstagramIcon} alt="instagram icon" /></Link></li>
            <li><Link href="https://www.youtube.com/@elencuentrocanning3177" target='_blank'><Image className="w-8 transition-opacity duration-150 ease-in-out hover:opacity-80" src={YoutubeIcon} alt="youtube icon" /></Link></li>
            <li>
              <Link href="https://www.youtube.com/@elencuentrocanning3177" target='_blank'>
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
          <li id="vivo">
              <Link href="https://www.youtube.com/@elencuentrocanning3177" target='_blank'>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex w-3 h-3">
                    <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                  <p className="text-sm font-semibold text-white">EN VIVO</p>
                </div>
              </Link>
            </li>
        </nav>
        {/* Menu hamburgesa mobile */}
        <div id="mobile-menu" className="flex items-center ml-10 justify-between border-gray-400 py-8">
            <nav >
              <section className="MOBILE-MENU flex lg:hidden">
                <div
                  className="HAMBURGER-ICON space-y-2" 
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  <span className="block h-0.5 w-8 bg-white"></span>
                  <span className="block h-0.5 w-8 bg-white"></span>
                  <span className="block h-0.5 w-8 bg-white"></span>
                </div>

                <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                  <div
                    className="absolute top-0 right-0 px-8 py-8"
                    onClick={() => setIsNavOpen(false)}
                  >
                    <svg
                      className="h-10 w-10 mt-4 mr-1 text-white"
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
                  <ul className="flex flex-col items-center justify-evenly mt-40 min-h-[250px]">
                    <li className="border-gray-400 uppercase font-bold">
                      <a href="/">Quienes somos</a>
                    </li>
                    <li className="border-gray-400 uppercase font-bold">
                      <a href="/">Ministerios</a>
                    </li>
                    <li className="border-gray-400 uppercase font-bold">
                      <a href="/">Edades</a>
                    </li>
                    <li className="border-gray-400 uppercase font-bold">
                      <a href="/">Contacto</a>
                    </li>
                  </ul>
                    <ul className="flex flex-row items-center justify-evenly mt-40 min-w-[200px]">
                      <li><Link href="https://www.facebook.com/ElEncuentro.Canning" target='_blank'><Image className="w-6 transition-opacity duration-150 ease-in-out hover:opacity-80" src={FacebookIcon} alt="facebook icon" /></Link></li>
                      <li><Link href="https://www.instagram.com/encuentrocanning/" target='_blank'><Image className="w-6 transition-opacity duration-150 ease-in-out hover:opacity-80" src={InstagramIcon} alt="instagram icon" /></Link></li>
                      <li><Link href="https://www.youtube.com/@elencuentrocanning3177" target='_blank'><Image className="w-8 transition-opacity duration-150 ease-in-out hover:opacity-80" src={YoutubeIcon} alt="youtube icon" /></Link></li>
                    </ul>
                </div>
              </section>
            </nav>
          </div>
        {/* Menu hamburgesa mobile */}
      </header>
      <div className={cn('absolute inset-0 transition-opacity duration-300 ease-in', mount ? 'opacity-100' : 'opacity-0')}>
        <div ref={sliderRef} className="h-full keen-slider">
          <div className="keen-slider__slide after:absolute after:inset-0 after:bg-black/30"><Image src={heroOne} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
          <div className="keen-slider__slide after:absolute after:inset-0 after:bg-black/30"><Image src={heroTwo} alt="adoracion" fill style={{objectFit: "cover"}} /></div>
        </div>
      </div>
    </div>
  )
}