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