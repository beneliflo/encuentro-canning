'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Hero() {
  return (
    <div>
      <ReactPlayer
        url="/hero-with-values.mp4"
        playing
        muted
        loop
        width="100%"
        height="auto"
      />
    </div>
  );
}
