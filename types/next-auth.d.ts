import NextAuth, {
  DefaultSession,
  DefaultUser,
  DefaultProfile,
} from "next-auth";

declare module "next-auth" {
  interface Profile extends DefaultProfile {
    display_name?: string;
    picture?: string;
    id?: string;
    images?: { url: string }[];
  }

  interface User extends DefaultUser {
    provider?: string;
    spotifyId?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: BigInt;
    authCode?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    } & DefaultSession["user"];
  }

  interface Account {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    authorization_code?: string;
  }
}
