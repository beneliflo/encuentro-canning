'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function PresaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [promoEnded, setPromoEnded] = useState(false)
  const [scrollState, setScrollState] = useState<'bottom' | 'scrolling' | 'top'>('bottom')
  const bannerRef = useRef<HTMLDivElement>(null)
  const triggerPointRef = useRef<number>(0)

  useEffect(() => {
    // Target date: Wednesday May 27, 2026 at 11:59 PM GMT-3 (Buenos Aires time)
    const targetDate = new Date('2026-05-27T23:59:59-03:00')

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
        setPromoEnded(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setPromoEnded(true)
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
        <div className="w-fit mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg px-4 pt-2 pb-2 md:px-6 md:py-3 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 pointer-events-auto">
        {/* Botón Instagram */}
        <a
          href="https://www.instagram.com/emuba_escuela/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 text-white border-2 border-transparent rounded-lg px-5 py-3 md:px-6 md:py-3 text-sm md:text-sm uppercase hover:opacity-90 hover:scale-105 transition-all duration-200 text-center leading-tight shadow-lg hover:shadow-xl whitespace-nowrap"
        >
          <span className="font-semibold">Mirá lo que pasó en TCP 2026</span>
          <br />
          <span className="font-medium">@emuba_escuela</span>
        </a>

        {/* Mensaje post-evento */}
        <div className="flex flex-col items-center gap-0.5 shrink-0">
          {promoEnded ? (
            <span className="text-xs md:text-sm font-bold uppercase tracking-wide text-gray-500">¡Gracias por ser parte!</span>
          ) : (
            <>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wide">25% Off Finaliza en:</span>
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5">
                {timeLeft.days > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-bold font-mono px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-lg min-w-[40px] sm:min-w-[50px] md:min-w-[65px] lg:min-w-[70px] text-center tabular-nums">
                      {timeLeft.days}
                    </div>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase font-bold mt-0.5 md:mt-1 tracking-wider">Días</span>
                  </div>
                )}
                {timeLeft.days > 0 && <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold self-start mt-1 md:mt-2">:</span>}
                <div className="flex flex-col items-center">
                  <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-bold font-mono px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-lg min-w-[40px] sm:min-w-[50px] md:min-w-[65px] lg:min-w-[70px] text-center tabular-nums">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase font-bold mt-0.5 md:mt-1 tracking-wider">Horas</span>
                </div>
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold self-start mt-1 md:mt-2">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-bold font-mono px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-lg min-w-[40px] sm:min-w-[50px] md:min-w-[65px] lg:min-w-[70px] text-center tabular-nums">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase font-bold mt-0.5 md:mt-1 tracking-wider">Minutos</span>
                </div>
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold self-start mt-1 md:mt-2">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-black text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-bold font-mono px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-3 rounded-lg min-w-[40px] sm:min-w-[50px] md:min-w-[65px] lg:min-w-[70px] text-center tabular-nums">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase font-bold mt-0.5 md:mt-1 tracking-wider">Segundos</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
