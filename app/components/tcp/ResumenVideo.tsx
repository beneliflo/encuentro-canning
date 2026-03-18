'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { VIDEO_URLS } from '@/lib/video-urls'

export default function ResumenVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  const handleEnded = () => {
    setHasStarted(false)
  }

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play().then(() => setHasStarted(true))
  }

  return (
    <section id="tcp2025" className="bg-white scroll-mt-20">
      <div className="py-12 md:py-20 text-center">
        <h2 className="text-4xl md:text-7xl font-bold uppercase leading-tight">
          Esto vivimos en<br />Testigos Con Poder 2025
        </h2>
      </div>
      <div ref={sectionRef} className="relative">
        <video
          ref={videoRef}
          className="w-full"
          playsInline
          preload="auto"
          controls={hasStarted}
          controlsList="nodownload noplaybackrate nofullscreen"
          onEnded={handleEnded}
        >
          <source src={VIDEO_URLS.tcp.resumen} type="video/mp4" />
        </video>

        {/* Poster image + play button overlay */}
        {!hasStarted && (
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={handlePlay}
          >
            <Image
              src="/videos/tcp/poster-VF RESUMEN TCP 2025.jpg"
              alt="Resumen TCP 2025"
              fill
              className="object-cover blur-sm"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="w-10 h-10 md:w-14 md:h-14"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
