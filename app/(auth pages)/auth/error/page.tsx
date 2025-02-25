"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-gray-300 text-center">
            There was an error during authentication. Please try again.
          </p>
          <Button
            variant="outline"
            className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            onClick={() => router.push("/auth")}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
