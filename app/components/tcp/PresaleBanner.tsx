'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import RegistrationButton from './RegistrationButton'

export default function PresaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [scrollState, setScrollState] = useState<'bottom' | 'scrolling' | 'top'>('bottom')
  const bannerRef = useRef<HTMLDivElement>(null)
  const triggerPointRef = useRef<number>(0)

  useEffect(() => {
    // Target date: Monday March 23, 2026 at 11:59 PM GMT-3 (Buenos Aires time)
    const targetDate = new Date('2026-03-23T23:59:59-03:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect()
        // Si el banner llega al top del viewport, hacerlo sticky
        if (rect.top <= 0 && scrollState !== 'top') {
          setScrollState('top')
          // Guardar la posición donde se hizo sticky
          triggerPointRef.current = window.scrollY
        } else if (window.scrollY < triggerPointRef.current && scrollState === 'top') {
          // Si scrolleamos hacia arriba, volver a bottom
          setScrollState('bottom')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollState])

  const formatNumber = (num: number) => String(num).padStart(2, '0')

  const getPositionClasses = () => {
    if (scrollState === 'top') {
      return 'fixed top-0 left-0 right-0'
    }
    return 'absolute -bottom-2 left-0 right-0'
  }

  return (
    <div 
      ref={bannerRef} 
      id="presale-banner" 
      className={`${getPositionClasses()} z-50 px-4 md:px-6 lg:px-8 py-4 transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        {/* Left: PRESALE with arrow */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase">Presale</span>
          <Image src="/images/tcp/arrow-right.png" alt="→" width={48} height={48} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
        </div>

        {/* Center: Clickable button */}
        <RegistrationButton className="cursor-pointer border-2 border-black px-4 py-2 md:px-8 md:py-3 text-xs sm:text-sm md:text-base uppercase hover:bg-black hover:text-white transition-colors text-center leading-tight">
          <span className="font-normal">Registrate y llevate un</span>
          <br />
          <span className="font-bold">Descuento exclusivo</span>
        </RegistrationButton>

        {/* Right: Countdown */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="flex flex-col items-center">
            <div className="bg-black text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 py-2 md:px-4 md:py-3 rounded min-w-[50px] md:min-w-[70px] text-center">
              {timeLeft.days}
            </div>
            <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-semibold mt-1">Días</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-black text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 py-2 md:px-4 md:py-3 rounded min-w-[50px] md:min-w-[70px] text-center">
              {formatNumber(timeLeft.hours)}
            </div>
            <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-semibold mt-1">Horas</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-black text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 py-2 md:px-4 md:py-3 rounded min-w-[50px] md:min-w-[70px] text-center">
              {formatNumber(timeLeft.minutes)}
            </div>
            <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-semibold mt-1">Minutos</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-black text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 py-2 md:px-4 md:py-3 rounded min-w-[50px] md:min-w-[70px] text-center">
              {formatNumber(timeLeft.seconds)}
            </div>
            <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-semibold mt-1">Segundos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
