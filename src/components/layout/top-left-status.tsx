"use client";

import { useEffect, useState } from "react";

const SF_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

type DisplayMode = "time" | "spotify";

type SpotifyTrackResponse = {
  song?: string;
  artist?: string;
};

export function TopLeftStatus() {
  const [currentTime, setCurrentTime] = useState(() =>
    SF_TIME_FORMATTER.format(new Date()),
  );
  const [mode, setMode] = useState<DisplayMode>("time");
  const [spotifyTrack, setSpotifyTrack] = useState({
    song: "Loading...",
    artist: "",
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(SF_TIME_FORMATTER.format(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (mode !== "spotify") return;

    let isMounted = true;

    const loadSpotifySong = async () => {
      try {
        const response = await fetch("/api/spotify/last-track", {
          cache: "no-store",
        });
        const json = (await response.json()) as SpotifyTrackResponse;
        if (isMounted) {
          setSpotifyTrack({
            song: json.song ?? "Unavailable",
            artist: json.artist ?? "",
          });
        }
      } catch {
        if (isMounted) {
          setSpotifyTrack({
            song: "Unavailable",
            artist: "",
          });
        }
      }
    };

    loadSpotifySong();
    const interval = window.setInterval(loadSpotifySong, 30_000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [mode]);

  return (
    <div className="fixed left-6 top-4 z-20 flex h-7 items-center md:left-8 md:top-6">
      <button
        type="button"
        className="mr-2 font-nav text-[14px] uppercase tracking-[0.02em] text-[#555555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
        onClick={() => setMode((prev) => (prev === "time" ? "spotify" : "time"))}
        aria-label={
          mode === "time" ? "Show latest Spotify song" : "Show San Francisco time"
        }
      >
        {mode === "time" ? "→" : "←"}
      </button>
      <p
        className={`max-w-[45vw] truncate whitespace-nowrap font-nav text-[14px] tracking-[0.02em] text-[#555555] ${
          mode === "time" ? "uppercase" : ""
        }`}
      >
        {mode === "time" ? (
          `San Francisco: ${currentTime}`
        ) : (
          <>
            <span className="italic">{spotifyTrack.song}</span>
            {spotifyTrack.artist ? ` - ${spotifyTrack.artist}` : ""}
          </>
        )}
      </p>
    </div>
  );
}
