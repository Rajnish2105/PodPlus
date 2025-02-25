import Navbar from "@/components/layout/Navbar";
export const metadata = {
  title: "Podcast Dashboard",
  description: "Explore and manage your favorite podcasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
