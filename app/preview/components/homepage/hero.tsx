'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import cn from 'classnames';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('FAMILIA');
  const [videoProgress, setVideoProgress] = useState(0); // Para almacenar el tiempo de progreso del video

  const words = ['FAMILIA', 'PASION', 'COMPASION', 'PROPOSITO', 'PODER'];
  const appearAtSeconds = [0, 19, 37, 54, 66]; // Segundos en los que aparecen las palabras
  const disappearAtSeconds = [19, 37, 54, 66, 77]; // Segundos en los que desaparecen las palabras (inicio de la siguiente palabra)

  // Función para calcular la palabra a mostrar en función del progreso del video
  useEffect(() => {
    if (isVideoPlaying) {
      for (let i = 0; i < words.length; i++) {
        if (
          videoProgress >= appearAtSeconds[i] &&
          videoProgress < disappearAtSeconds[i]
        ) {
          setCurrentWord(words[i]);
          return;
        }
      }
    }
  }, [videoProgress]); // Solo actualiza el estado cuando el progreso del video cambia

  console.log(videoProgress);

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
          'absolute inset-0',
          isVideoPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ReactPlayer
          className="hero-player"
          url="/hero-video.mp4"
          playing
          muted
          loop
          width="100%"
          height="100%"
          onReady={() => setIsVideoPlaying(true)}
          onProgress={({ playedSeconds }) => setVideoProgress(playedSeconds)} // Actualiza el progreso del video
        />
      </div>

      {/* Textos intercalados */}
      <div className="absolute z-10 text-4xl font-bold text-white">
        <p className="text-center">{currentWord}</p>
      </div>
    </div>
  );
}
