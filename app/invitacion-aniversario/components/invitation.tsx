"use client"

import { useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import headerInvitacion from '@/public/invitation/header-invitacion.png'
import logoEncuentro from '@/public/invitation/logo-encuentro.png'

import styles from '../styles.module.css'

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
        <div className="max-w-[840px] mx-auto animate-slideFadeUp p-4">
          <div className="overflow-hidden bg-white rounded-lg">
            <div className='relative'><Image src={headerInvitacion} alt="Header invitacion" />
            <Image src={logoEncuentro} alt="Logo Encuentro" width={350} height={117} className='absolute inset-0 m-auto' />
            </div>
          </div>
        </div>
      }
    </div>
  )
}