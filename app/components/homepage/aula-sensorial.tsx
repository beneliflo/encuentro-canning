'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

export default function AulaSensorial() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="bg-[url('/images/aula-sensorial-bg.jpg')] bg-bottom py-10 md:py-20 bg-cover">
      <div className="container flex flex-col lg:flex-row lg:items-center gap-8 text-hueso font-pragmatica [text-shadow:2px_2px_10px_rgba(0,0,0,0.3),0_0_20px_rgba(0,0,0,0.1)]">
        {/* Video - izquierda */}
        <div className="relative w-full lg:w-2/5 rounded-lg overflow-hidden shadow-2xl text-shadow-none aspect-video shrink-0 order-last lg:order-first" onContextMenu={(e) => e.preventDefault()}>
          <video
            ref={videoRef}
            src="/videos/Aula%20Sensorial%20VF%20F.mp4"
            controls={isPlaying}
            playsInline
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            className="w-full h-full object-cover"
            onEnded={() => {
              setIsPlaying(false);
              if (videoRef.current) videoRef.current.currentTime = 0;
            }}
          />
          {!isPlaying && (
            <button
              onClick={() => {
                setIsPlaying(true);
                videoRef.current?.play();
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer transition-all hover:bg-black/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-16 h-16 drop-shadow-lg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Texto - derecha */}
        <div className="flex flex-col gap-5 text-right flex-1">
          <h3 className="text-2xl lg:text-4xl font-bold uppercase tracking-[1px] md:mb-2">
            Aula Sensorial
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold md:leading-[110px] uppercase tracking-[1px] md:mb-8">
            Club de Valientes
          </h2>
          <div className="justify-items-end">
            <p className="mb-4 md:mb-10 text-xl md:text-3xl font-bold md:leading-10 max-w-[750px]">
              Sala equipada para la estimulación sensorial en niños con trastornos
              del neurodesarrollo
            </p>
          </div>
          <Link
            href="#contactanos"
            className="self-end rounded-lg bg-white/90 px-8 py-3 text-lg font-bold text-dark no-underline transition-colors hover:bg-white md:text-2xl text-shadow-none"
          >
            Quiero saber más
          </Link>
        </div>
      </div>
    </div>
  );
}
