"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css';

import { fetchInstagramData } from '@/app/api/instagram'

interface InstagramData {
  data: {
    id: string;
    caption: string;
    media_type: string;
    media_url: string;
    thumbnail_url: string;
  }[];
}

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  640: 1
};

export default function Gallery() {
  const [instagramData, setInstagramData] = useState<InstagramData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchInstagramData();
      setInstagramData(data);
    }
    
    fetchData();
  }, []);

  return (
    <div className="container py-14 md:py-20">
      <h1 className="text-5xl font-bold">Stories & Articles</h1>
      <div className="mt-10">
        {instagramData && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="bg-clip-padding flex flex-col gap-4"
          >
            {instagramData.data.slice(0, window.innerWidth < 768 ? 10 : 22).map((item) => (
                <div className="relative" key={item.id}>
                  {item.media_type === 'VIDEO' ? (
                    <Image
                      className='object-cover'
                      src={item.thumbnail_url}
                      alt={item.caption}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                      loading='eager'
                    />
                  ) : (
                    <Image
                      className='object-cover'
                      src={item.media_url}
                      alt={item.caption}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                      loading='eager'
                    />
                  )}
                </div>
              ))}
          </Masonry>
        )}
      </div>
    </div>
  )
}