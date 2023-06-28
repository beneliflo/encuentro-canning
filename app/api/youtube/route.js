const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function fetchYoutubeData() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PL_3tjwhL5Q7kDCCE09JBFqeAZj5cRrib7&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}