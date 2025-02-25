export async function getAccessToken(): Promise<string> {
  try {
    const authResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: "grant_type=client_credentials", // ✅ Corrected: Include body
    });

    if (!authResponse.ok) {
      throw new Error(`HTTP error! Status: ${authResponse.status}`);
    }

    const res = await authResponse.json();
    return res.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}
