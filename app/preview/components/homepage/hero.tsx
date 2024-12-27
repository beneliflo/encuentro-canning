'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  console.log(isVideoPlaying);

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
    </div>
  );
}
