"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { fetchYoutubeData } from '@/app/api/youtube'

interface VideoItem {
  id: string;
  snippet?: {
    title?: string | any;
    thumbnails?: {
      high?: {
        url?: string | any;
        width?: number;
        height?: number;
      };
    };
    resourceId?: {
      videoId?: string;
    };
    publishedAt?: string;
  };
}

interface YouTubeData {
  items: VideoItem[];
}

interface Props {
  youtubeData: YouTubeData;
}

export default function VideoGallery() {
  const [youtubeData, setYoutubeData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchYoutubeData();
      setYoutubeData(data);
    }
    
    fetchData();
  }, []);
  
  if (!youtubeData) {
    // Handle the case when youtubeData is null or undefined
    return null;
  }

  const sortedItems = youtubeData.items.sort((a: VideoItem, b: VideoItem) => {
    const publishedAtA = a.snippet?.publishedAt || '';
    const publishedAtB = b.snippet?.publishedAt || '';
    return new Date(publishedAtB).getTime() - new Date(publishedAtA).getTime();
  });

  return (
    <div className="container pt-14 md:pt-20">
      <h1 className="text-5xl font-bold">Watch now</h1>
      {sortedItems && (
        <ul className="grid gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3">
          {sortedItems.map(({ id, snippet = {} }: VideoItem) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { high } = thumbnails;
            return (
              <li className="overflow-hidden border border-gray-800 rounded-lg" key={id}>
                <Link href={`https://www.youtube.com/watch?v=${resourceId.videoId}`} target='_blank'>
                  <p className="relative w-full aspect-video">
                    <Image fill style={{ objectFit: 'cover' }} src={high?.url} alt={title} loading='eager' />
                  </p>
                  <h3 className="p-3 text-sm font-semibold">{title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  )
}