import Image from "next/image";
import Link from "next/link";
import { BarChart3, Headphones, Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 p-5">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/PodPlus.svg"
              alt="PodPlus Logo"
              width={100}
              height={100}
              className="cursor-pointer"
            />
          </Link>
          <div className="flex items-center space-x-6">
            <NavItem
              href="/podcasts"
              icon={<Headphones size={20} />}
              text="Podcasts"
            />
            <NavItem
              href="/ranking"
              icon={<BarChart3 size={20} />}
              text="Ranking"
            />
            <NavItem
              href="/dashboard"
              icon={<Home size={20} />}
              text="Dashboard"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition duration-150 ease-in-out"
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  );
}
