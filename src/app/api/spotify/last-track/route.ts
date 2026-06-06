import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const CACHE_TTL_MS = 60_000;
const RECENT_MIN_INTERVAL_MS = 60_000;

type Track = { song: string; artist: string };

type SpotifyState = {
  accessToken: string | null;
  tokenExpiresAt: number;
  track: Track | null;
  fetchedAt: number;
  recentBlockedUntil: number;
  inflight: Promise<Track | null> | null;
};

function state(): SpotifyState {
  const g = globalThis as typeof globalThis & { __spotify?: SpotifyState };
  if (!g.__spotify) {
    g.__spotify = {
      accessToken: null,
      tokenExpiresAt: 0,
      track: null,
      fetchedAt: 0,
      recentBlockedUntil: 0,
      inflight: null,
    };
  }
  return g.__spotify;
}

function retryAfterMs(response: Response, fallbackMs: number) {
  const header = response.headers.get("Retry-After");
  if (!header) return fallbackMs;

  const seconds = Number.parseInt(header, 10);
  if (Number.isFinite(seconds) && seconds > 0) {
    return seconds * 1000;
  }

  return fallbackMs;
}

function json(track: Track | null, maxAge = 60) {
  const body = track ?? { song: "", artist: "" };
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": `public, max-age=${maxAge}, s-maxage=${maxAge}`,
    },
  });
}

async function getAccessToken(s: SpotifyState): Promise<string> {
  if (s.accessToken && Date.now() < s.tokenExpiresAt - 60_000) {
    return s.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables.");
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
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

  const payload = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!payload.access_token) {
    throw new Error("Spotify token response missing access token.");
  }

  s.accessToken = payload.access_token;
  s.tokenExpiresAt = Date.now() + (payload.expires_in ?? 3600) * 1000;
  return payload.access_token;
}

function parseTrack(data: {
  item?: { name?: string; artists?: Array<{ name?: string }> };
}): Track | null {
  const song = data.item?.name?.trim();
  if (!song) return null;
  return { song, artist: data.item?.artists?.[0]?.name?.trim() ?? "" };
}

async function fetchTrack(s: SpotifyState): Promise<Track | null> {
  const token = await getAccessToken(s);

  const nowPlaying = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (nowPlaying.status !== 429 && nowPlaying.ok && nowPlaying.status !== 204) {
    const data = (await nowPlaying.json()) as Parameters<typeof parseTrack>[0];
    const track = parseTrack(data);
    if (track) return track;
  }

  if (Date.now() < s.recentBlockedUntil) {
    return s.track;
  }

  const recent = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (recent.status === 429) {
    s.recentBlockedUntil =
      Date.now() + retryAfterMs(recent, RECENT_MIN_INTERVAL_MS);
    return s.track;
  }

  if (!recent.ok) {
    return s.track;
  }

  s.recentBlockedUntil = Date.now() + RECENT_MIN_INTERVAL_MS;

  const data = (await recent.json()) as {
    items?: Array<{ track?: Parameters<typeof parseTrack>[0]["item"] }>;
  };

  const item = data.items?.[0]?.track;
  return item ? parseTrack({ item }) : s.track;
}

export async function GET() {
  const s = state();

  if (Date.now() - s.fetchedAt < CACHE_TTL_MS) {
    return json(s.track);
  }

  if (!s.inflight) {
    s.inflight = fetchTrack(s).finally(() => {
      s.inflight = null;
    });
  }

  try {
    const track = await s.inflight;
    s.fetchedAt = Date.now();
    if (track) {
      s.track = track;
    }
    return json(track ?? s.track);
  } catch (error) {
    console.error(error);
    s.fetchedAt = Date.now();
    return json(s.track);
  }
}
