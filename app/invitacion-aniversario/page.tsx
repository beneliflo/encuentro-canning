"use client"

import { useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import localFont from 'next/font/local'
import Tilt from 'react-parallax-tilt'

import photoTop from '@/public/invitation/photo-top.png'
import photoBottom from '@/public/invitation/photo-bottom.png'
import goldTop from '@/public/invitation/gold-top.png'
import goldBottom from '@/public/invitation/gold-bottom.png'
import split from '@/public/invitation/split.svg'

import styles from './styles.module.css'

const snellRoundhand = localFont({
  src: [
    {
      path: '../fonts/snell-roundhand/SnellBT-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/snell-roundhand/SnellRoundhand-BoldScript.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const theSeasons = localFont({
  src: [
    {
      path: '../fonts/the-seasons/Fontspring-DEMO-theseasons-reg.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/the-seasons/Fontspring-DEMO-theseasons-bd.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const objectSans = localFont({
  src: [
    {
      path: '../fonts/object-sans/ObjectSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/object-sans/ObjectSans-Heavy.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const openSauce = localFont({
  src: [
    {
      path: '../fonts/open-sauce/OpenSauceOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/open-sauce/OpenSauceOne-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

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
  
  return (
    <main>
      {!letter &&
        <div className="flex items-center justify-center w-full h-screen overflow-hidden">
          <div className={cn(styles.envelopeWrapper, open ? styles.open : styles.close)}>
            <Tilt scale={1.15} transitionSpeed={2500}>
              <div className={cn('cursor-pointer sm:scale-150', styles.envelope, open ? styles.open : styles.close)} onClick={toggleOpen}>
                <div className={cn(styles.front, styles.flap)}></div>
                <div className={cn(styles.front, styles.pocket)}></div>
                <div className={styles.letter} />
              </div>
            </Tilt>
          </div>
        </div>
      }
      {letter &&
        <div className="max-w-[960px] mx-auto animate-slideFadeUp">
          <div className="relative">
            <Image src={photoTop} alt='photo top' loading='eager' />
            <Image src={goldTop} alt='gold top' loading='eager' className="absolute -bottom-1 max-h-[30px] w-full" />
          </div>
          <div className="flex flex-col p-6 sm:p-10">
            <h3 className={cn('text-3xl sm:text-5xl lg:text-6xl font-bold', snellRoundhand.className)}>Te invitamos a:</h3>
            <h2 className={cn('text-5xl sm:text-8xl lg:text-[6.25rem] font-normal text-[#DFA23E] sm:leading-[0.5] leading-[0.55] mt-8 mb-12 sm:mt-12 sm:mb-24 text-center lg:text-right lg:mr-16', snellRoundhand.className)}>
              <p className="block transform lg:-translate-x-44">Gran</p>
              Inaguración
            </h2>
            <h1 className={cn('uppercase text-5xl sm:text-8xl lg:text-[8.45rem] font-bold leading-[0.85] mb-12 text-center lg:text-left', theSeasons.className)}>
              <p className="block transform lg:translate-x-20">Encuentro</p>
              <p className="block">Canning</p>
            </h1>
            <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
              <p className={cn('text-xl sm:text-3xl', objectSans.className)}>Compartí con nosotros la alegría de ver el <b>sueño de Dios</b> hecho realidad. <br /><b>2 Corintios 9:8</b></p>
              <Image src={split} alt="split" loading='eager' className="max-w-[200px] sm:max-w-full my-6 sm:my-10" />
              <p className={cn('text-2xl sm:text-4xl font-bold', openSauce.className)}>VIERNES 25/08 | 19hs</p>
            </div>
          </div>
          <div className="relative">
            <Image src={photoBottom} alt='photo bottom' loading='eager' />
            <Image src={goldBottom} alt='gold bottom' loading='eager' className="absolute -top-1 max-h-[30px] w-full" />
          </div>
        </div>
      }
    </main>
  )
}