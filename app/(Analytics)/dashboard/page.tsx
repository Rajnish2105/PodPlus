import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic, Play, Users, BarChart2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type podcasttype = {
  id: string;
  name: string;
  episodes: number;
  listeners: number;
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  const podcastData = await getDashboardData(
    session.user.accessToken as string
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">
            PodPulse Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{session?.user?.name}</span>
            {session?.user?.image && (
              <Image
                src={session.user.image || "/placeholder.svg"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Podcasts"
            value={podcastData.total}
            icon={<Mic className="h-8 w-8 text-green-400" />}
          />
          <StatCard
            title="Total Episodes"
            value={podcastData.items.reduce(
              (sum: number, podcast: podcasttype) => sum + podcast.episodes,
              0
            )}
            icon={<Play className="h-8 w-8 text-green-400" />}
          />
          <StatCard
            title="Total Listeners"
            value={podcastData.items.reduce(
              (sum: number, podcast: podcasttype) => sum + podcast.listeners,
              0
            )}
            icon={<Users className="h-8 w-8 text-green-400" />}
          />
          <StatCard
            title="Avg. Listeners/Podcast"
            value={Math.round(
              podcastData.items.reduce(
                (sum: number, podcast: podcasttype) => sum + podcast.listeners,
                0
              ) / podcastData.total
            )}
            icon={<BarChart2 className="h-8 w-8 text-green-400" />}
          />
        </div>

        <h2 className="text-2xl font-bold mb-4">Your Podcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcastData.items.length != 0 ? (
            podcastData.items.map((podcast: podcasttype) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))
          ) : (
            <div className=" text-green-400">
              You Currently have no podcasts
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white hover:text-green-400 cursor-pointer">
          {value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}

function PodcastCard({ podcast }: { podcast: podcasttype }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          {podcast.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">Episodes: {podcast.episodes}</p>
        <p className="text-gray-300 mb-4">
          Listeners: {podcast.listeners.toLocaleString()}
        </p>
        <Link href={`/podcast/${podcast.id}`} passHref>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

async function getDashboardData(token: string) {
  const data = await fetch("https://api.spotify.com/v1/me/shows", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data.json();
}
