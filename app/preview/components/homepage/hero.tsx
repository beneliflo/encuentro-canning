'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import cn from 'classnames';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('FAMILIA');
  const [currentSubtitle, setCurrentSubtitle] = useState(
    'un lugar donde pertenecer'
  );
  const [videoProgress, setVideoProgress] = useState(0);

  const words = ['FAMILIA', 'PASIÓN', 'COMPASIÓN', 'PROPÓSITO', 'PODER'];
  const subtitles = [
    'un lugar donde pertenecer',
    'el encuentro más maravilloso',
    'amando al estilo Jesús',
    'discípulos que hacen discípulos',
    'un milagro te está esperando',
  ];

  const appearAtSeconds = [0, 19, 37, 54, 66];
  const disappearAtSeconds = [19, 37, 54, 66, 77];

  useEffect(() => {
    if (isVideoPlaying) {
      for (let i = 0; i < words.length; i++) {
        if (
          videoProgress >= appearAtSeconds[i] &&
          videoProgress < disappearAtSeconds[i]
        ) {
          setCurrentWord(words[i]);
          setCurrentSubtitle(subtitles[i]);
          return;
        }
      }
    }
  }, [videoProgress]);

  return (
    <div className="relative flex items-center justify-center overflow-hidden h-dvh max-h-[600px] md:max-h-none md:min-h-[880px]">
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
          onProgress={({ playedSeconds }) => setVideoProgress(playedSeconds)}
        />
      </div>

      {/* Textos intercalados */}
      <div className="container absolute z-10 text-white">
        <p className="font-bold text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none font-pragmatica">
          {currentWord}
        </p>
        <p className="text-2xl font-light tracking-wider md:pl-1.5 md:text-5xl xl:pl-2 xl:text-[3.3rem]">
          {currentSubtitle}
        </p>
      </div>
    </div>
  );
}
