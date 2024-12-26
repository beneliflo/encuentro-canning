"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function fetchYoutubeData() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PL_3tjwhL5Q7kDCCE09JBFqeAZj5cRrib7&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

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

export default function VideoGallery() {
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoId, setVideoId] = useState<string | null>(null);

  const openModal = (videoId: string) => {
    setModal(!modal);
    setVideoId(videoId);
  };

  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const [youtubeData, setYoutubeData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchYoutubeData();
      setYoutubeData(data);
    }
    
    fetchData();
  }, []);

  const sortedItems = youtubeData?.items.sort((a: VideoItem, b: VideoItem) => {
    const publishedAtA = a.snippet?.publishedAt || '';
    const publishedAtB = b.snippet?.publishedAt || '';
    return new Date(publishedAtB).getTime() - new Date(publishedAtA).getTime();
  });

  return (
    <div className="container pt-14 md:pt-20">
      <h1 className="text-5xl font-bold">MIRANOS ONLINE</h1>
      {sortedItems && (
        <>
          <ul className="grid gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3">
            {sortedItems.slice(0, 12).map(({ id, snippet = {} }: VideoItem) => {
              const { title, thumbnails = {}, resourceId = {} } = snippet;
              const { high } = thumbnails;
              return (
                <li className="overflow-hidden border border-gray-800 rounded-lg" key={id}>
                  <div className="cursor-pointer" onClick={() => resourceId.videoId && openModal(resourceId.videoId)}>
                    <p className="relative w-full aspect-video">
                      <Image fill style={{ objectFit: 'cover' }} src={high?.url} alt={title} loading='eager' />
                    </p>
                    <h3 className="p-3 text-sm font-semibold">{title}</h3>
                  </div>
                </li>
              );
            })}
          </ul>

          <a className="rounded-lg table text-sm font-semibold py-2.5 px-4 bg-black text-white hover:bg-black/90 my-10 mx-auto" href="https://www.youtube.com/@encuentrocanning"><span>Mirá más <span>→</span></span></a>

          {modal && (
            <section className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={toggleModal}>
              <div className="flex items-center justify-center h-screen">
                <div className="aspect-video w-full max-w-[1280px] shadow-lg rounded-lg bg-transparent">
                  <div className="relative flex w-full h-full">
                    {videoLoading ? (
                      <div className="fixed text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <p>Loading...</p>
                      </div>
                    ) : null}
                    <iframe
                      className="z-50 rounded-lg"
                      onLoad={spinner}
                      loading="lazy"
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}