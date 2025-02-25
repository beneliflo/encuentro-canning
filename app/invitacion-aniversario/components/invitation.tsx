"use client"

import { useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import headerInvitacion from '@/public/invitation/header-invitacion.png'
import logoEncuentro from '@/public/invitation/logo-encuentro.png'
import aniversarioNumber from '@/public/invitation/8aniversario.png'
import textOne from '@/public/invitation/text-1.png'
import textOneMobile from '@/public/invitation/text-1-mobile.png'
import aulaSensorial from '@/public/invitation/aula-sensorial.png'
import qrForm from '@/public/invitation/qr-form.png'
import textTwo from '@/public/invitation/text-2.png'
import textTwoMobile from '@/public/invitation/text-2-mobile.png'

import styles from '../styles.module.css'

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
        <div className="max-w-[832px] w-full mx-auto animate-slideFadeUp p-4">
          <div className="overflow-hidden bg-white rounded-lg">
            <div>
              <div className='relative'>
                <Image src={headerInvitacion} alt="Header invitacion" />
                <Image src={logoEncuentro} alt="Logo Encuentro" className='absolute inset-0 m-auto sm:max-w-[350px] max-w-40' />
              </div>
            </div>
            <div className='px-5 sm:py-11 py-5'>
              <Image src={aniversarioNumber} alt="8 Aniversario" className='mb-5' />
              <Image src={textOne} alt="Te invitamos..." className='max-w-[690px] w-full hidden sm:block' />
              <Image src={textOneMobile} alt="Te invitamos..." className='sm:hidden' />
              <div className='flex flex-col sm:flex-row sm:pl-8 sm:-translate-y-4 -translate-y-2'>
                <div className='px-5 sm:px-0'>
                  <Image src={aulaSensorial} alt="Aula Sensorial" />
                </div>
                <div className='flex-col items-center justify-center text-center -translate-y-6 sm:flex hidden'>
                  <Image src={qrForm} alt="qr form" />
                  <div className='uppercase tracking-[1px] text-center text-sm font-normal hidden sm:block'><Link type='button' href="https://forms.gle/bypbr9QT29SJL4rv8" target='_blank' className='px-3 py-2 bg-[#efb810] rounded-full text-white'>Confirmar Asistencia</Link></div>
                </div>
                <div className='uppercase tracking-[1px] text-center text-sm font-normal sm:hidden mt-8 mb-5'><Link type='button' href="https://forms.gle/bypbr9QT29SJL4rv8" target='_blank' className='px-3 py-2 bg-[#efb810] rounded-full text-white'>Confirmar Asistencia Aquí</Link></div>
              </div>
              <Image src={textTwo} alt="Viernes 14 de Marzo" className='hidden sm:block' />
              <Image src={textTwoMobile} alt="Viernes 14 de Marzo" className='sm:hidden' />
            </div>
          </div>
        </div>
      }
    </div>
  )
}