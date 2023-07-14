"use client"

import { useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Fade } from "react-awesome-reveal";
import localFont from 'next/font/local'
import { Titillium_Web } from 'next/font/google'

import photoTop from '@/public/invitation/photo-top.png'
import photoBottom from '@/public/invitation/photo-bottom.png'
import goldTop from '@/public/invitation/gold-top.png'
import goldBottom from '@/public/invitation/gold-bottom.png'
import split from '@/public/invitation/split.svg'
import confirmationBottom from '@/public/invitation/confirmation-bottom.png'

import styles from '../styles.module.css'

const titillium_web = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})
 

const snellRoundhand = localFont({
  src: [
    {
      path: '../../fonts/snell-roundhand/SnellBT-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/snell-roundhand/SnellRoundhand-BoldScript.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const theSeasons = localFont({
  src: [
    {
      path: '../../fonts/the-seasons/Fontspring-DEMO-theseasons-reg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/the-seasons/Fontspring-DEMO-theseasons-bd.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const objectSans = localFont({
  src: [
    {
      path: '../../fonts/object-sans/ObjectSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/object-sans/ObjectSans-Heavy.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const openSauce = localFont({
  src: [
    {
      path: '../../fonts/open-sauce/OpenSauceOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/open-sauce/OpenSauceOne-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const mapEmbedCode = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5866264193533!2d-58.51235886463723!3d-34.88144292619042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd76848809fd5%3A0xa4dcb81c015f76f2!2sIglesia%20el%20encuentro!5e0!3m2!1ses-419!2sar!4v1687666073992!5m2!1ses-419!2sar" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

export default function Invitation() {
  const [open, setOpen] = useState(false);
  const [letter, setLetter] = useState(false);

  let timeout: string | number | NodeJS.Timeout | undefined

  const toggleOpen = () => {
    setOpen(true);
    clearTimeout(timeout)
    if (open) return
    timeout = setTimeout(() => {
      setLetter(true)
    }, 1400)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleOpen();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={cn(`bg-[url('/invitation/bg.jpg')] bg-cover bg-no-repeat h-screen bg-center`, letter ? 'overflow-auto' : 'overflow-hidden')}>
      {!letter &&
        <div className="flex items-center justify-center w-full h-screen overflow-hidden animate-zoomFadeIn">
          <div className={cn(styles.envelopeWrapper, open ? styles.open : styles.close)}>
            <div className={cn('sm:scale-150', styles.envelope, open ? styles.open : styles.close)}>
              <div className={cn(styles.front, styles.flap)}></div>
              <div className={cn(styles.front, styles.pocket)}></div>
              <div className={styles.letter} />
            </div>
          </div>
        </div>
      }
      {letter &&
        <div className="max-w-[992px] mx-auto animate-slideFadeUp p-4">
          <div className="overflow-hidden bg-white rounded-2xl">
            <Fade triggerOnce>
              <div className="relative z-10">
                <Image src={photoTop} alt='photo top' loading='eager' />
                <Image src={goldTop} alt='gold top' loading='eager' className="absolute -bottom-1 max-h-[20px] w-full" />
              </div>
            </Fade>
            <div className="relative flex flex-col p-6 sm:p-10 bg-[url('/invitation/bg-invitation.png')] bg-cover bg-no-repeat bg-center">
              <Fade triggerOnce direction='left'>
                <h3 className={cn('text-3xl sm:text-5xl lg:text-6xl font-bold', snellRoundhand.className)}>Te invitamos a:</h3>
              </Fade>
              <Fade triggerOnce direction='right'>
                <h2 className={cn('text-5xl sm:text-8xl lg:text-[6rem] font-normal text-[#B48D48] sm:leading-[0.5] leading-[0.55] mt-8 mb-12 sm:mt-12 sm:mb-24 text-center lg:text-right lg:mr-16', snellRoundhand.className)}>
                  <p className="block transform lg:-translate-x-44">Gran</p>
                  Inaguración
                </h2>
              </Fade>
              <Fade triggerOnce direction='up'>
                <h1 className={cn('uppercase text-[2.75rem] sm:text-7xl md:text-[6.5rem] lg:text-[7rem] font-bold leading-[0.85] text-center lg:text-left relative z-10 mb-12', theSeasons.className)}>
                  <p className="block">El Encuentro</p>
                  <p className="block">Canning</p>
                </h1>
              </Fade>
              <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
                <Fade triggerOnce direction='up'>
                  <p className={cn('text-xl sm:text-3xl', objectSans.className)}>Compartí con nosotros la alegría de ver el <b>sueño de Dios</b> hecho realidad. <br /><b>2 Corintios 9:8</b></p>
                </Fade>
                <Fade triggerOnce direction='up'>
                  <Image src={split} alt="split" loading='eager' className="max-w-[200px] sm:max-w-[340px] my-6 sm:my-10" />
                  <p className={cn('text-2xl sm:text-4xl font-bold', openSauce.className)}>VIERNES 25/08 | 19hs</p>
                </Fade>
              </div>
            </div>
            <Fade triggerOnce>
              <div className="relative">
                <Image src={photoBottom} alt='photo bottom' loading='eager' />
                <Image src={goldBottom} alt='gold bottom' loading='eager' className="absolute -top-1 max-h-[20px] w-full" />
              </div>
            </Fade>
            {/* Confirmation */}
            <div className="relative bg-[url('/invitation/bg-confirmation.png')] bg-cover bg-top bg-no-repeat p-6 sm:p-10 flex flex-col">
              <Fade triggerOnce direction='left'>
                <h2 className={cn('text-5xl sm:text-6xl font-normal text-[#B48D48] sm:leading-[0.5] leading-[0.55] pt-8 pb-12 sm:pt-12 sm:pb-24 text-center lg:text-left', snellRoundhand.className)}>
                  <p className="block transform lg:translate-x-24">Gran</p>
                  Inaguración
                </h2>
              </Fade>
              <Fade triggerOnce direction='up'>
                <p className={cn('text-xl sm:text-4xl font-bold text-center max-w-2xl mx-auto mb-10 uppercase', objectSans.className)}>Por cuestiones de capacidad te pedimos que confirmes tu asistencia y la de tus acompañante</p>
              </Fade>
              <div className="flex flex-col justify-center gap-4 text-center">
                <Fade triggerOnce cascade direction='up'>
                  <Link className={cn(titillium_web.className, 'inline-block transition bg-[#DFA23E] hover:bg-[#B48D48] px-4 py-2 rounded-full max-w-max font-bold text-base border border-[#B48D48] text-white mx-auto uppercase')} href='https://wa.me/5491168194422?text=Confirmo%20mi%20asistencia%20a%20la%20inauguración%20(19hs)%20con%20(Ingrese%20cantidad%20de%20acompañantes%20aquí)'>Confirmar asistencia aquí</Link>
                  <Link className={cn(titillium_web.className, 'inline-block transition bg-[#DFA23E] hover:bg-[#B48D48] px-4 py-2 rounded-full max-w-max font-bold text-base border border-[#B48D48] text-white mx-auto uppercase')} href='https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NDI0c2JrMjBnZm5wbnVsdmVtajJzbGQ2ZmYgZWxlbmN1ZW50cm9jYW5uaW5nLm9rQG0&tmsrc=elencuentrocanning.ok%40gmail.com'>AÑADIR A CALENDARIO</Link>
                </Fade>
              </div>
              <div className="flex flex-col gap-6 mt-20">
                <Fade triggerOnce cascade direction='up'>
                  <p className={cn('text-xl sm:text-3xl font-bold text-center uppercase', objectSans.className)}>Hipócrates 3320, Canning, Ezeiza</p>
                  <div className="overflow-hidden rounded-2xl" dangerouslySetInnerHTML={{ __html: mapEmbedCode }} />
                </Fade>
              </div>
              <Fade triggerOnce cascade>
                <p className={cn('text-2xl sm:text-4xl font-normal text-center mt-20 max-w-lg mx-auto mb-20 border-double border-4 border-[#DFA23E] py-4 rounded-lg', titillium_web.className)}>CÓDIGO DE VESTIMENTA ELEGANTE SPORT</p>
                <h1 className={cn('uppercase text-4xl sm:text-7xl font-bold leading-[0.85] text-center relative z-10 mb-20', theSeasons.className)}>
                  <p className="block">El Encuentro</p>
                  <p className="block">Canning</p>
                </h1>
              </Fade>
              <Image src={confirmationBottom} alt='confirmation bottom' loading='eager' className="absolute inset-x-0 bottom-0" />
            </div>
          </div>
        </div>
      }
    </div>
  )
}