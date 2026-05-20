import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyTrackPayload = {
  item?: {
    name?: string;
    artists?: Array<{
      name?: string;
    }>;
  };
  is_playing?: boolean;
};

type SpotifyRecentlyPlayedPayload = {
  items?: Array<{
    track?: {
      name?: string;
      artists?: Array<{
        name?: string;
      }>;
    };
  }>;
};

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables.");
  }

  const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not refresh Spotify access token.");
  }

  const json = (await response.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error("Spotify token response missing access token.");
  }
  return json.access_token;
}

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();

    const currentlyPlayingResponse = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (currentlyPlayingResponse.ok) {
      const currentlyPlaying =
        (await currentlyPlayingResponse.json()) as SpotifyTrackPayload;
      const currentTrackName = currentlyPlaying.item?.name;
      const currentArtistName = currentlyPlaying.item?.artists?.[0]?.name;

      if (currentlyPlaying.is_playing && currentTrackName) {
        return NextResponse.json(
          {
            song: currentTrackName,
            artist: currentArtistName ?? "Unknown Artist",
            source: "currently-playing",
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
    }

    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!recentlyPlayedResponse.ok) {
      throw new Error("Could not load recently played Spotify track.");
    }

    const recentlyPlayed =
      (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedPayload;
    const recentTrackName = recentlyPlayed.items?.[0]?.track?.name;
    const recentArtistName = recentlyPlayed.items?.[0]?.track?.artists?.[0]?.name;

    if (!recentTrackName) {
      return NextResponse.json(
        { song: "No recent song found.", artist: "", source: "none" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      {
        song: recentTrackName,
        artist: recentArtistName ?? "Unknown Artist",
        source: "recently-played",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { song: "Spotify unavailable.", artist: "", source: "error" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
