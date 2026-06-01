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

type SpotifyTrackResponse = {
  song: string;
  artist: string;
};

async function parseJsonSafely<T>(response: Response): Promise<T | null> {
  if (response.status === 204) return null;

  const body = await response.text();
  if (!body.trim()) return null;

  try {
    return JSON.parse(body) as T;
  } catch {
    return null;
  }
}

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
        await parseJsonSafely<SpotifyTrackPayload>(currentlyPlayingResponse);
      const currentTrackName = currentlyPlaying?.item?.name;
      const currentArtistName = currentlyPlaying?.item?.artists?.[0]?.name;

      if (currentlyPlaying?.is_playing && currentTrackName) {
        const payload: SpotifyTrackResponse = {
          song: currentTrackName,
          artist: currentArtistName ?? "",
        };

        return NextResponse.json(
          payload,
          { headers: { "Cache-Control": "public, max-age=30, s-maxage=30" } },
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
      throw new Error("No recent Spotify track found.");
    }

    const payload: SpotifyTrackResponse = {
      song: recentTrackName,
      artist: recentArtistName ?? "",
    };

    return NextResponse.json(
      payload,
      { headers: { "Cache-Control": "public, max-age=30, s-maxage=30" } },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Spotify unavailable." }, { status: 503 });
  }
}
