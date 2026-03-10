'use client'

import { useState, useEffect, useRef } from 'react'
import RegistrationButton from './RegistrationButton'

export default function FloatingPresave() {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const wasInView = useRef(false)

  useEffect(() => {
    const banner = document.getElementById('presave-banner')
    if (!banner) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Banner came back into view — reset dismissed state
          wasInView.current = true
          setDismissed(false)
          setIsVisible(false)
        } else if (wasInView.current) {
          // Banner left view after being visible — show floating
          setIsVisible(true)
        }
      },
      { threshold: 0 }
    )

    observer.observe(banner)
    return () => observer.disconnect()
  }, [])

  if (!isVisible || dismissed) return null

  return (
    <div className="fixed right-4 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-40 animate-fade-in">
      {/* Close button — mobile only */}
      <button
        onClick={() => setDismissed(true)}
        className="md:hidden absolute -top-2 -right-2 z-50 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
        aria-label="Cerrar"
      >
        ✕
      </button>
      <RegistrationButton className="group cursor-pointer bg-white rounded-xl shadow-lg px-4 py-3 md:px-8 md:py-6 flex flex-col items-center gap-1.5 md:gap-3 hover:shadow-xl transition-shadow">
        <span className="border-2 border-black px-6 py-1.5 md:px-12 md:py-3 text-base md:text-2xl uppercase font-bold group-hover:bg-black group-hover:text-white transition-colors">
          Presave
        </span>
        <span className="text-[10px] md:text-base uppercase text-center leading-tight font-medium text-gray-600">
          Obtené acceso anticipado<br />a la venta de entradas
        </span>
      </RegistrationButton>
    </div>
  )
}
