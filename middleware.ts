export { default } from "next-auth/middleware";

export const config = {
  // Protect all routes under /dashboard, /profile, /analytics, etc
  // But allow /auth and / to be public
  matcher: [
    "/dashboard/:path*",
    "/podcasts/:path*",
    "/ranking/:path*",
    // Add any other protected routes here
  ],
};
