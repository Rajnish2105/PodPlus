export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ podid: string }>;
}) {
  const podcast_id = (await params).podid;

  console.log(podcast_id);

  return <div>Hello World</div>;
}

// async function getPodcastAnalytics(token: string, podcast_id: string) {
//   const response = await fetch(
//     `https://api.spotify.com/v1/podcasts/${podcast_id}/analytics`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.json();
// }
