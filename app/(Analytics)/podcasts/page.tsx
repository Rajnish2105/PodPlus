import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getAccessToken } from "@/lib/spotifywebapi";

export type podcasttype = {
  available_markets: string[];
  copyrights: string[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
};

export default async function PodcastsPage() {
  const data = await getPodcast();

  if (!data?.shows?.items) {
    return <div>No podcasts found</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Discover Podcasts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.shows.items.map((podcast: podcasttype) => (
          <Card
            key={podcast.id}
            className="bg-gray-800 text-white border-gray-700 overflow-hidden transition-all hover:shadow-lg hover:shadow-green-400/10"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={podcast.images[0].url || "/placeholder.svg"}
                  alt={podcast.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Link href={`/podcasts/${podcast.id}`} passHref>
                <CardTitle className="text-lg font-bold mb-2 line-clamp-1 hover:text-green-400 transition-colors">
                  {podcast.name}
                </CardTitle>
              </Link>
              <p className="text-sm text-gray-400 mb-2">{podcast.publisher}</p>
              <p className="text-sm text-gray-300 line-clamp-3">
                {podcast.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Badge variant="secondary" className="bg-gray-700 text-green-400">
                {podcast.total_episodes} episodes
              </Badge>
              <a
                href={`https://open.spotify.com/show/${podcast.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-400 hover:underline"
              >
                Listen on Spotify
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function getPodcast() {
  const token = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/search?q=podcast&type=show&limit=50",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const res = response.json();

  return res;
}
