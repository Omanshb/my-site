"use client";

import { useEffect, useState } from "react";

const SF_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

type DisplayMode = "time" | "spotify" | "quote";

type SpotifyTrackResponse = {
  song?: string;
  artist?: string;
};

const DEFAULT_SPOTIFY_TRACK = {
  song: "Texts Go Green",
  artist: "Drake",
};

const QUOTES = [
  "Comparison is the thief of joy.",
  "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience.",
];

const MODE_ORDER: DisplayMode[] = ["time", "spotify", "quote"];

function wrapQuoteLines(text: string, maxCharsPerLine: number) {
  const words = text.trim().split(/\s+/);
  if (!words.length) return [text];

  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length <= maxCharsPerLine) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(word);
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

export function TopLeftStatus() {
  const [currentTime, setCurrentTime] = useState(() =>
    SF_TIME_FORMATTER.format(new Date()),
  );
  const [mode, setMode] = useState<DisplayMode>("time");
  const [spotifyTrack, setSpotifyTrack] = useState(DEFAULT_SPOTIFY_TRACK);
  const [quoteIndex] = useState(QUOTES.length - 1);

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
        if (!response.ok) {
          if (isMounted) {
            setSpotifyTrack(DEFAULT_SPOTIFY_TRACK);
          }
          return;
        }
        const json = (await response.json()) as SpotifyTrackResponse;
        const songFromApi = json.song?.trim();
        const hasValidSong =
          !!songFromApi && songFromApi !== "Spotify unavailable.";
        if (isMounted) {
          setSpotifyTrack({
            song: hasValidSong ? songFromApi : DEFAULT_SPOTIFY_TRACK.song,
            artist: hasValidSong
              ? (json.artist ?? DEFAULT_SPOTIFY_TRACK.artist)
              : DEFAULT_SPOTIFY_TRACK.artist,
          });
        }
      } catch {
        if (isMounted) {
          setSpotifyTrack(DEFAULT_SPOTIFY_TRACK);
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

  const currentModeIndex = MODE_ORDER.indexOf(mode);
  const prevMode =
    MODE_ORDER[(currentModeIndex - 1 + MODE_ORDER.length) % MODE_ORDER.length];
  const nextMode = MODE_ORDER[(MODE_ORDER.indexOf(mode) + 1) % MODE_ORDER.length];

  const prevModeLabel =
    prevMode === "time"
      ? "San Francisco time"
      : prevMode === "spotify"
        ? "latest Spotify song"
        : "inspirational quote";

  const nextModeLabel =
    nextMode === "time"
      ? "San Francisco time"
      : nextMode === "spotify"
        ? "latest Spotify song"
        : "inspirational quote";

  const currentQuote = QUOTES[quoteIndex] ?? QUOTES[0];
  const quoteLines = wrapQuoteLines(currentQuote, 60);

  return (
    <div
      className={`fixed left-6 top-4 z-20 flex md:left-8 md:top-6 ${
        mode === "quote" ? "items-start" : "h-7 items-center"
      }`}
    >
      <div className="-ml-1.5 mr-2 flex h-7 shrink-0 items-center gap-0.5">
        <button
          type="button"
          className="inline-flex h-4 w-4 translate-y-[0.5px] items-center justify-center text-[#555555] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          onClick={() => setMode(prevMode)}
          aria-label={`Show ${prevModeLabel}`}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M10 4.5 5.5 8 10 11.5" />
          </svg>
        </button>
        <button
          type="button"
          className="inline-flex h-4 w-4 translate-y-[0.5px] items-center justify-center text-[#555555] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
     
          onClick={() => setMode(nextMode)}
          aria-label={`Show ${nextModeLabel}`}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 4.5 10.5 8 6 11.5" />
          </svg>
        </button>
      </div>
      <p
        className={`max-w-[45vw] font-nav text-[14px] tracking-[0.02em] text-white ${
          mode === "quote"
            ? "whitespace-normal pt-[4px] leading-5"
            : "truncate whitespace-nowrap"
        }`}
      >
        {mode === "time" && `San Francisco: ${currentTime}`}
        {mode === "spotify" && (
          <>
            <span className="italic">{spotifyTrack.song},</span>
            {spotifyTrack.artist ? (
              <span className="ml-2">{spotifyTrack.artist}</span>
            ) : null}
          </>
        )}
        {mode === "quote" && (
          <span className="italic">
            &quot;
            {quoteLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
            &quot;
          </span>
        )}
      </p>
    </div>
  );
}
