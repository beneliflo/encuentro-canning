'use client'

import { useState, useEffect, useRef } from 'react'

export default function VideoSection() {
  const [isClient, setIsClient] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="py-32 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-16">ES AQUI Y ES AHORA</h2>
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden">
          <div className="relative pt-[56.25%] bg-black/20">
            {isClient && (
              <div className="absolute inset-0">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  controls
                  playsInline
                  preload="auto"
                >
                  <source src="/tcp/FINAL PROMO TCP 1080.mp4" type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
