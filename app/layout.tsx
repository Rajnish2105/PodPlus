import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PodPulse - Podcast Analytics Made Simple",
  description:
    "Gain valuable insights into your podcast performance with PodPulse analytics.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
