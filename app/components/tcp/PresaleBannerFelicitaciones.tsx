'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function PresaleBannerFelicitaciones() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [scrollState, setScrollState] = useState<'bottom' | 'scrolling' | 'top'>('bottom')
  const bannerRef = useRef<HTMLDivElement>(null)
  const triggerPointRef = useRef<number>(0)

  useEffect(() => {
    // Target date: Tuesday March 24, 2026 at 11:59 PM GMT-3 (Buenos Aires time)
    const targetDate = new Date('2026-03-24T23:59:59-03:00')

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
    // En mobile siempre bottom, en desktop sticky top cuando scrollea
    if (scrollState === 'top') {
      return 'fixed md:fixed bottom-0 md:top-0 left-0 right-0'
    }
    return 'fixed md:absolute bottom-0 md:-bottom-2 left-0 right-0'
  }

  return (
    <div 
      ref={bannerRef} 
      id="presale-banner" 
      className={`${getPositionClasses()} z-50 px-3 md:px-6 lg:px-8 py-2 md:py-4 transition-all duration-300 pointer-events-none`}
    >
      <div className="max-w-7xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg px-3 py-3 md:px-6 lg:px-36 md:py-4 lg:py-6 pb-6 md:pb-7 lg:pb-9 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 md:gap-4 pointer-events-auto">
        {/* Left: PRESALE with arrow and message */}
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 lg:gap-5 w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-5 shrink-0">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold uppercase">Presale</span>
            <Image src="/images/tcp/arrow-right.png" alt="→" width={88} height={66} className="w-6 h-5 sm:w-8 sm:h-6 md:w-10 md:h-7 lg:w-11 lg:h-8" />
          </div>
          {/* Center: Message box */}
          <a
            href="https://emuba.fint.app/eventos/testigos-con-poder"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-black text-white border-2 border-black rounded-lg px-3 py-2 md:px-5 lg:px-8 md:py-2.5 lg:py-3 text-xs sm:text-sm md:text-sm lg:text-base uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 text-center leading-tight shadow-lg hover:shadow-xl"
          >
            <span className="font-medium">¡Solo por hoy! Accede a</span>
            <br />
            <span className="font-medium">tu entrada con</span> <span className="font-semibold">60% OFF</span>
          </a>
        </div>

        {/* Right: Countdown */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-3 shrink-0">
          {timeLeft.days > 0 && (
            <div className="flex flex-col items-center mr-6 -mb-4 md:-mb-5">
              <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold font-mono px-2 py-1 md:px-4 md:py-3 rounded min-w-[40px] sm:min-w-[50px] md:min-w-[70px] text-center tabular-nums">
                {timeLeft.days}
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-xs uppercase font-semibold mt-1">Días</span>
            </div>
          )}
          <div className="flex flex-col items-center -mb-4 md:-mb-5">
            <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold font-mono px-2 py-1 md:px-4 md:py-3 rounded min-w-[40px] sm:min-w-[50px] md:min-w-[70px] text-center tabular-nums">
              {formatNumber(timeLeft.hours)}
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase font-semibold mt-0.5 md:mt-1">Horas</span>
          </div>
          <span className="text-base sm:text-xl md:text-3xl font-semibold self-center">:</span>
          <div className="flex flex-col items-center -mb-4 md:-mb-5">
            <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold font-mono px-2 py-1 md:px-4 md:py-3 rounded min-w-[40px] sm:min-w-[50px] md:min-w-[70px] text-center tabular-nums">
              {formatNumber(timeLeft.minutes)}
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase font-semibold mt-0.5 md:mt-1">Minutos</span>
          </div>
          <span className="text-base sm:text-xl md:text-3xl font-semibold self-center">:</span>
          <div className="flex flex-col items-center -mb-4 md:-mb-5">
            <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold font-mono px-2 py-1 md:px-4 md:py-3 rounded min-w-[40px] sm:min-w-[50px] md:min-w-[70px] text-center tabular-nums">
              {formatNumber(timeLeft.seconds)}
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase font-semibold mt-0.5 md:mt-1">Segundos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
