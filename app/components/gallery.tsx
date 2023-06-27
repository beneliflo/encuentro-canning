"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface InstagramData {
  data: {
    id: string;
    caption: string;
    media_type: string;
    media_url: string;
    thumbnail_url: string;
  }[];
}

export async function fetchInstagramData() {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_KEY;
  const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${accessToken}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return null;
  }
}

export default function Gallery() {
  const [instagramData, setInstagramData] = useState<InstagramData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchInstagramData();
      setInstagramData(data);
    }
    
    fetchData();
  }, []);

  console.log(instagramData)

  return (
    <div className="container py-14 md:py-20">
      <h1 className="text-5xl font-bold">Stories & Articles</h1>
      <div className="mt-10">
        {instagramData && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {instagramData.data.slice(0, window.innerWidth < 768 ? 10 : 24).map((item) => (
              <li className="relative aspect-square" key={item.id}>
                {item.media_type === 'VIDEO' ? (
                  <Image src={item.thumbnail_url} alt={item.caption} fill style={{ objectFit: 'cover'}} />
                ) : (
                  <Image src={item.media_url} alt={item.caption} fill style={{ objectFit: 'cover'}} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}