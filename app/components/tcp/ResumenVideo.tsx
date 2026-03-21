'use client'

import { useRef, useEffect } from 'react'
import { VIDEO_URLS } from '@/lib/video-urls'

export default function ResumenVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play()
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="tcp2025" className="bg-black scroll-mt-20">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full"
          muted
          loop
          playsInline
          preload="auto"
          controls
          controlsList="nodownload"
        >
          <source src={VIDEO_URLS.tcp.resumenWebm} type="video/webm" />
          <source src={VIDEO_URLS.tcp.resumen} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
