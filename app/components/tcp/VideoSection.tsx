'use client'

import { useState, useEffect, useRef } from 'react'
import { VIDEO_URLS } from '@/lib/video-urls'

export default function VideoSection() {
  const [isClient, setIsClient] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Full-width video covering entire section */}
      <div className="relative w-full aspect-video"> {/* 16:9 Aspect Ratio */}
        {isClient && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
          >
            <source src={VIDEO_URLS.tcp.finalPromo} type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  )
}
