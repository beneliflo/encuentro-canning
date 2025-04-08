'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';

const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_KEY;
const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;

async function fetchInstagramData() {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface InstagramData {
  id: string;
  media_type: string;
  thumbnail_url: string;
  caption: string;
  media_url: string;
  permalink: string;
}

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  640: 1,
};

export default function Gallery() {
  const [instagramData, setInstagramData] = useState<InstagramData[]>([]);

  async function fetchData() {
    const data = await fetchInstagramData();
    setInstagramData(data.data);
  }

  useEffect(() => {
    const cachedData = localStorage.getItem('instagramData');

    if (cachedData) {
      setInstagramData(JSON.parse(cachedData));
    } else {
      fetchData();
    }
  }, []);

  const imageCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 22;
  const displayedData = instagramData.slice(0, imageCount);

  return (
    <div className="container py-14 md:py-20">
      <h1 className="text-5xl font-bold">Stories & Articles</h1>
      <div className="mt-10">
        {displayedData.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="bg-clip-padding flex flex-col gap-4"
          >
            {displayedData.map((item) => (
              <div className="relative overflow-hidden border border-gray-800 rounded-lg" key={item?.id}>
                {item?.media_type === 'VIDEO' ? (
                  <Link href={item.permalink} target='_blank'>
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
                    <p className="p-3 text-sm font-semibold line-clamp-2">
                      <span className="line-clamp-2">{item.caption}</span>
                    </p>
                  </Link>
                ) : (
                  <Link href={item.permalink} target='_blank'>
                    <Image
                      className="object-cover"
                      src={item?.media_url}
                      alt={item?.caption}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                      loading="eager"
                    />
                    <p className="p-3 text-sm font-semibold line-clamp-2">
                      <span className="line-clamp-2">{item.caption}</span>
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
}