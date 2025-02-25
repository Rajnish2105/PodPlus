"use client";

import type React from "react";

import Image from "next/image";
import { BarChart, LineChart, PieChart, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  // Now you can properly handle the loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log("Session Status:", status); // 'authenticated' or 'unauthenticated'
  console.log("Session Data Client Side:", session);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/PodPlus.svg"
              alt="PodPulse Logo"
              width={100}
              height={100}
            />
          </div>
          <div>
            <Link
              href="#features"
              className="text-gray-300 hover:text-green-400 px-3 py-2 transition duration-300"
            >
              Features
            </Link>
            <Link
              href="#demo"
              className="text-gray-300 hover:text-green-400 px-3 py-2 transition duration-300"
            >
              Demo
            </Link>
            <Link
              href={session?.user ? "/podcasts" : "/auth"}
              className="bg-green-500 hover:bg-green-600 text-gray-900 px-4 py-2 rounded-md ml-3 transition duration-300"
            >
              {session?.user ? "Go To Podcasts" : "Sign up"}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Unlock the Power of Your Podcast
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Get deep insights and analytics to grow your audience and improve your
          content.
        </p>
        <Link
          href="/auth"
          className="bg-green-500 hover:bg-green-600 text-gray-900 px-8 py-3 rounded-md text-lg font-semibold transition duration-300"
        >
          Start Free Trial
        </Link>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Powerful Analytics at Your Fingertips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BarChart className="w-8 h-8 text-green-400" />}
              title="Listener Trends"
              description="Track your audience growth and listening patterns over time."
            />
            <FeatureCard
              icon={<LineChart className="w-8 h-8 text-green-400" />}
              title="Episode Performance"
              description="See how each episode performs and identify your best content."
            />
            <FeatureCard
              icon={<PieChart className="w-8 h-8 text-green-400" />}
              title="Audience Demographics"
              description="Understand your listeners with detailed demographic breakdowns."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-green-400" />}
              title="Engagement Metrics"
              description="Measure listener engagement with advanced metrics and insights."
            />
          </div>
        </div>
      </section>

      {/* Sample Analytics Section */}
      <section id="demo" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Your Podcast Performance at a Glance
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 shadow-xl rounded-lg overflow-hidden"
          >
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Sample Analytics Dashboard"
              width={800}
              height={400}
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                PodPulse
              </h3>
              <p className="text-gray-400">
                Empowering podcasters with actionable insights.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Product
              </h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "FAQ"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-green-400 transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Company
              </h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-green-400 transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Connect
              </h4>
              <ul className="space-y-2">
                {["Twitter", "LinkedIn", "Contact Us"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-green-400 transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 PodPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-700 rounded-lg p-6 text-center shadow-lg"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
