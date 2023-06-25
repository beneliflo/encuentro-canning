'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import cn from 'classnames'
import { Dancing_Script } from 'next/font/google'

import FacebookIcon from '../public/facebook.svg'
import InstagramIcon from '../public/instagram.svg'
import YoutubeIcon from '../public/youtube.svg'
import logoIEC from '../public/logo-iec.png'

import heroOne from '../public/hero.jpg'
import heroTwo from '../public/hero2.jpg'

import uno from '../public/uno.jpg'
import kids from '../public/kids.jpg'
import pre from '../public/pre.jpg'
import conectados from '../public/conectados.jpg'
import matrimonios from '../public/matrimonios.jpg'

import imageOne from '../public/image-1.jpg'
import imageTwo from '../public/image-2.jpg'

const dancing_script = Dancing_Script({ subsets: ['latin'] })

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
      {/* Hero */}
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
      {/* Palabra Rhema section */}
      <div className="container text-center py-14 md:py-20">
        <h1 className={cn('text-4xl md:text-6xl', dancing_script.className)}>"Si permanece la obra de alguno que ha edificado sobre el fundamento, recibirá recompensa."</h1>
        <p className="mt-4 text-xl">1 Corintios 3:14 (LBLA)</p>
      </div>
      {/* Quienes somos? section */}
      <div className="bg-gradient-to-br relative from-[#5800EA]/70 to-[#D400F1]/70 before:bg-section-pattern before:absolute before:inset-0">
        <div className="container relative flex flex-col-reverse gap-24 md:grid md:grid-cols-2 py-14 md:py-20">
          <div className="flex flex-col">
            <Image className="overflow-hidden rounded-2xl max-w-[80%]" src={imageOne} alt="Image One" />
            <Image className="overflow-hidden rounded-2xl max-w-[80%] self-end -mt-20" src={imageTwo} alt="Image Two" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold">Empowered by God to reach others for Christ</h1>
            <p className="mt-4 text-lg">Our community makes us unique. They have an energy that reverberates around them. Their mission in life is to ensure the wonder in the world is not overlooked.</p>
          </div>
        </div>
      </div>
      {/* Ministries section */}
      <div className="container py-14 md:py-20">
        <h1 className="text-5xl font-bold">Experience. Connect. Grow.</h1>
        <p className="mt-4 text-lg">Join our ministries to get connected through service.</p>
        <div className="grid mt-10 gap-14 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
              <div className="after:absolute after:inset-0 after:bg-black/30">
                <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={heroOne} alt="uno" fill style={{objectFit: "cover"}} />
              </div>
              <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Ecuentros</p>
            </div>
          </Link>
          <Link href="/">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
              <div className="after:absolute after:inset-0 after:bg-black/30">
                <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={matrimonios} alt="uno" fill style={{objectFit: "cover"}} />
              </div>
              <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Matrimonios</p>
            </div>
          </Link>
          <Link href="/">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
              <div className="after:absolute after:inset-0 after:bg-black/30">
                <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={uno} alt="uno" fill style={{objectFit: "cover"}} />
              </div>
              <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">UNO</p>
            </div>
          </Link>
          <Link href="/">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
              <div className="after:absolute after:inset-0 after:bg-black/30">
                <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={conectados} alt="uno" fill style={{objectFit: "cover"}} />
              </div>
              <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Conectados</p>
            </div>
          </Link>
          <Link href="/">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
              <div className="after:absolute after:inset-0 after:bg-black/30">
                <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={pre} alt="uno" fill style={{objectFit: "cover"}} />
              </div>
              <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Familia PRE</p>
            </div>
          </Link>
          <Link href="/">
            <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
              <div className="after:absolute after:inset-0 after:bg-black/30">
                <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={kids} alt="uno" fill style={{objectFit: "cover"}} />
              </div>
              <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Encuentro Kids</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
