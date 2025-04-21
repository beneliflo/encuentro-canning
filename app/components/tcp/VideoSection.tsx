'use client'

import { useState, useEffect, useRef } from 'react'

export default function VideoSection() {
  const [isClient, setIsClient] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative py-12 md:py-32 bg-black text-white overflow-hidden">
      {/* Video background */}
      {isClient && (
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/tcp/FINAL PROMO TCP 1080.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}
      
      {/* Centered text */}
      <div className="relative z-20 h-[40vh] md:h-[50vh] flex items-center justify-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white">ES AQUÍ Y ES AHORA</h2>
      </div>
    </section>
  )
}
