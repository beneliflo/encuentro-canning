'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_KEY;
const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${accessToken}`;

async function fetchInstagramData() {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface InstagramData {
  item: {
    id: string;
    caption: string;
    media_type: string;
    media_url: string;
    thumbnail_url: string;
  };
}

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  640: 1,
};

export default function Gallery() {
  const [instagramData, setInstagramData] = useState<InstagramData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchInstagramData();
      setInstagramData(data.data);
    }

    fetchData();
  }, []);

  const imageCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 22;

  return (
    <div className="container py-14 md:py-20">
      <h1 className="text-5xl font-bold">Stories & Articles</h1>
      <div className="mt-10">
        {instagramData.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="bg-clip-padding flex flex-col gap-4"
          >
            {instagramData.slice(0, imageCount).map(({ item }: InstagramData) => (
              <div className="relative" key={item.id}>
                {item.media_type === 'VIDEO' ? (
                  <Image
                    className="object-cover"
                    src={item.thumbnail_url}
                    alt={item.caption}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    loading="eager"
                  />
                ) : (
                  <Image
                    className="object-cover"
                    src={item.media_url}
                    alt={item.caption}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    loading="eager"
                  />
                )}
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
}