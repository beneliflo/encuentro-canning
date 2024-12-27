'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import cn from 'classnames';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('FAMILIA');

  // Lista de palabras y sus duraciones en segundos
  const words = ['FAMILIA', 'PASION', 'COMPASION', 'PROPOSITO', 'PODER'];
  const durations = [5, 21, 17, 11, 11]; // Duraciones correspondientes a cada palabra

  useEffect(() => {
    if (isVideoPlaying) {
      let index = 0; // Índice inicial de la palabra
      const changeWord = () => {
        setCurrentWord(words[index]); // Cambiar la palabra
        index = (index + 1) % words.length; // Avanzar al siguiente índice

        // Establecer el próximo cambio de palabra después de la duración de la palabra actual
        setTimeout(changeWord, durations[index] * 1000); // Convertir la duración a milisegundos
      };

      // Iniciar el ciclo de cambio de palabras
      changeWord();
    }
  }, [isVideoPlaying]);

  return (
    <div className="relative flex items-center justify-center overflow-hidden h-dvh">
      {/* Placeholder */}
      {!isVideoPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Image
            src="/hero-video-placeholder.png"
            width={1920}
            height={1080}
            alt="Loading..."
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Video */}
      <div
        className={cn(
          'transition-opacity duration-500 absolute inset-0',
          isVideoPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ReactPlayer
          className="hero-player"
          url="/hero-video.mp4"
          playsinline
          playing
          muted
          loop
          width="100%"
          height="100%"
          onReady={() => setIsVideoPlaying(true)}
        />
      </div>

      {/* Textos intercalados */}
      <div className="absolute z-10 text-4xl font-bold text-white">
        <p className="text-center">{currentWord}</p>
      </div>
    </div>
  );
}
