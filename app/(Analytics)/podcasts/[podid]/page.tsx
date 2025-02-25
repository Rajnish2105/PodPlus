import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Calendar, Clock, Globe, Mic, Play } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

type episodetype = {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  type: string;
  release_date_precision: string;
  uri: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
};

export default async function PodcastPage({
  params,
}: {
  params: Promise<{ podid: string }>;
}) {
  const session = await getServerSession(authOptions);

  const data = await getOnePodcast(
    (
      await params
    ).podid,
    session?.user.accessToken as string
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-800 rounded-lg p-8 shadow-lg">
          <Image
            src={data.images[0].url || "/placeholder.svg"}
            alt={data.name}
            width={300}
            height={300}
            className="rounded-lg shadow-xl"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-white">{data.name}</h1>
            <p className="text-xl text-green-400 mb-4">{data.publisher}</p>
            <div className="flex items-center gap-4 mb-6 text-gray-300">
              <span className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-400" />
                {data.total_episodes} episodes
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                {data.languages.join(", ")}
              </span>
            </div>
            <div className="flex justify-start items-center gap-3">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition duration-300 shadow-lg">
                <Play className="w-5 h-5" />
                Play Latest Episode
              </button>
              <Link
                href={`/podcasts/${(await params).podid}/analytics`}
                className="bg-green-500 w-fit hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition duration-300 shadow-lg"
              >
                Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            About the Show
          </h2>
          <p className="text-gray-300 leading-relaxed">{data.description}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Recent Episodes
          </h2>
          <div className="space-y-4">
            {data.episodes.items && data.episodes.items.length > 0 ? (
              data.episodes.items.map((episode: episodetype, index: number) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg flex items-center gap-4 hover:bg-gray-700 transition duration-300 shadow-md"
                >
                  <div className="bg-green-500 rounded-full p-3 shadow-lg">
                    <Play className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{episode.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-green-400" />
                        {new Date(episode.release_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-green-400" />
                        {Math.floor(episode.duration_ms / 60000)} min
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No Episodes Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

async function getOnePodcast(podid: string, token: string) {
  const response = await fetch(`https://api.spotify.com/v1/shows/${podid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const res = response.json();
  return res;
}
