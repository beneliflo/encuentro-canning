const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_KEY;
const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${accessToken}`;

export async function fetchInstagramData() {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}