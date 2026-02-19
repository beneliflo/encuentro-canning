'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

export default function ColegioEncuentro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="bg-dark bg-section-pattern py-10 md:py-20">
      <div className="container flex flex-col lg:flex-row lg:items-center gap-8 text-white font-pragmatica">
        {/* Texto - izquierda */}
        <div className="flex flex-col gap-5 flex-1">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-[1px]">
            Conoce nuestro proyecto
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[1px] md:mb-4 text-cel">
            Colegio Encuentro Canning
          </h2>
          <Link
            href="#contactanos"
            className="self-start rounded-lg bg-white/90 px-8 py-3 text-lg font-bold text-dark no-underline transition-colors hover:bg-white md:text-2xl"
          >
            Quiero saber más
          </Link>
        </div>
        {/* Video - derecha */}
        <div className="relative w-full lg:w-3/5 rounded-lg overflow-hidden shadow-2xl aspect-video shrink-0" onContextMenu={(e) => e.preventDefault()}>
          <video
            ref={videoRef}
            src="/videos/VF%20F%20PROYECTO%20COLEGIO%20EC.mp4"
            poster="/images/thumb-VF%20F%20PROYECTO%20COLEGIO%20EC.png"
            controls={isPlaying}
            playsInline
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            className="w-full h-full object-cover"
            onEnded={() => {
              setIsPlaying(false);
              if (videoRef.current) {
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
                videoRef.current.src = '/videos/VF%20F%20PROYECTO%20COLEGIO%20EC.mp4';
              }
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
      </div>
    </div>
  );
}
