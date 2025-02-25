import SpotifyProvider from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "user-read-email user-read-private user-library-read",
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    //user
    async jwt({ token, account, profile }) {
      try {
        // Initial sign in
        if (account && profile) {
          return {
            ...token,
            id: profile.id,
            email: profile.email,
            name: profile.display_name,
            picture: profile.images?.[0]?.url ?? null,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            accessTokenExpires: account.expires_at
              ? Date.now() + account.expires_at * 1000
              : Date.now() + 3600 * 1000, // default to 1 hour if not provided
          };
        }

        if (
          token.accessTokenExpires &&
          Date.now() < (token.accessTokenExpires as number)
        ) {
          return token;
        }

        // Otherwise, refresh the access token
        return await refreshAccessToken(token);
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        if (token) {
          session.user = {
            ...session.user,
            id: token.id as string,
            email: token.email!,
            name: token.name!,
            image: token.picture ?? "",
            accessToken: token.accessToken as string,
            refreshToken: token.refreshToken as string,
            expiresAt: token.expiresAt as number,
          };
        }
        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);
        return session;
      }
    },

    async signIn({ user, account, profile }) {
      try {
        if (!user?.email || !profile || !account) {
          console.error("Missing required auth data");
          return false;
        }

        if (account.provider === "spotify") {
          await db.user.upsert({
            where: { email: user.email },
            update: {
              name: profile.display_name || user.name || "",
              image: profile.images?.[0]?.url ?? null,
              spotifyId: profile.id,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              expiresAt: account.expires_at
                ? new Date(Date.now() + account.expires_at * 1000)
                : undefined,
            },
            create: {
              email: user.email,
              name: profile.display_name || user.name || "",
              image: profile.images?.[0]?.url ?? null,
              spotifyId: profile.id,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              expiresAt: new Date(
                Date.now() + (account.expires_at as number) * 1000
              ),
            },
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // If a new refresh token is returned, use it. Otherwise, keep the old one.
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
