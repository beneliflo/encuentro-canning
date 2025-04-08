'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
})

export default function VideoSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <section className="py-32 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-16">ES AQUI Y ES AHORA</h2>
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden">
          <div className="relative pt-[56.25%] bg-black/20">
            {isClient ? (
              <ReactPlayer
                url="https://www.youtube.com/watch?v=GRFkWF1Ousg"
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                playing={false}
                controls
                light
                playIcon={
                  <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-white border-b-[20px] border-b-transparent ml-3" />
                  </div>
                }
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-white border-b-[20px] border-b-transparent ml-3" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
