"use client"

import { useState, useEffect } from 'react'

interface InstagramData {
  data: {
    id: string;
    caption: string;
    media_type: string;
    media_url: string;
  }[];
}

export async function fetchInstagramData() {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_KEY;
  const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`;

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

  return (
    <div className="container py-14 md:py-20">
      <h1 className="text-5xl font-bold">Stories & Articles</h1>
      <div>
        {instagramData && (
          <ul>
            {instagramData.data.map((item) => (
              <li key={item.id}>
                <img src={item.media_url} alt={item.caption} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}