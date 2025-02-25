"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.push("/");
  }

  const handleSpotifySignIn = async () => {
    try {
      const result = await signIn("spotify", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        toast.error("Failed to sign in with Spotify");
        return;
      }

      if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-white">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              onClick={handleSpotifySignIn}
            >
              <Music className="mr-2 h-5 w-5" />
              Sign up with Spotify
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
