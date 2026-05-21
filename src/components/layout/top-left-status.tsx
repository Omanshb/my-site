"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Music2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

const SF_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

type DisplayMode = "time" | "spotify" | "github" | "quote";

type SpotifyTrackResponse = {
  song?: string;
  artist?: string;
};

type SpotifyTrack = {
  song: string;
  artist: string;
};

type GithubContributionDay = {
  date: string;
  count: number;
};

type GithubContributionsResponse = {
  days?: GithubContributionDay[];
};

const DEFAULT_SPOTIFY_TRACK = {
  song: "Texts Go Green",
  artist: "Drake",
};

const LOADING_SPOTIFY_TRACK = {
  song: "...",
  artist: "",
};

const SPOTIFY_CACHE_KEY = "top-left-status:spotify-track";
const SPOTIFY_POLL_INTERVAL_MS = 30_000;

function readCachedSpotifyTrack(): SpotifyTrack | null {
  try {
    const rawCache = window.localStorage.getItem(SPOTIFY_CACHE_KEY);
    if (!rawCache) return null;

    const parsed = JSON.parse(rawCache) as Partial<SpotifyTrack>;
    const cachedSong = parsed.song?.trim();
    if (!cachedSong) return null;

    return {
      song: cachedSong,
      artist: parsed.artist ?? "",
    };
  } catch {
    return null;
  }
}

const EMPTY_GITHUB_DAYS: GithubContributionDay[] = Array.from(
  { length: 14 },
  (_, index) => ({
    date: `day-${index}`,
    count: 0,
  }),
);

const QUOTES = [
  "Comparison is the thief of joy."
];

const MODE_ORDER: DisplayMode[] = ["time", "spotify", "github", "quote"];

const CONTRIBUTION_GREEN_EMPTY = "#161b22";
const CONTRIBUTION_GREEN_MIN = { r: 14, g: 68, b: 41 };
const CONTRIBUTION_GREEN_MAX = { r: 57, g: 211, b: 83 };

function getContributionGreen(count: number, maxCount: number) {
  if (count <= 0 || maxCount <= 0) {
    return CONTRIBUTION_GREEN_EMPTY;
  }

  const ratio = Math.min(1, count / maxCount);
  const r = Math.round(
    CONTRIBUTION_GREEN_MIN.r +
      (CONTRIBUTION_GREEN_MAX.r - CONTRIBUTION_GREEN_MIN.r) * ratio,
  );
  const g = Math.round(
    CONTRIBUTION_GREEN_MIN.g +
      (CONTRIBUTION_GREEN_MAX.g - CONTRIBUTION_GREEN_MIN.g) * ratio,
  );
  const b = Math.round(
    CONTRIBUTION_GREEN_MIN.b +
      (CONTRIBUTION_GREEN_MAX.b - CONTRIBUTION_GREEN_MIN.b) * ratio,
  );

  return `rgb(${r} ${g} ${b})`;
}

function formatContributionDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;

  return new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatContributionCount(count: number) {
  if (count === 0) return "No contributions";
  return `${count} contribution${count === 1 ? "" : "s"}`;
}

function ModeIcon({ mode }: { mode: DisplayMode }) {
  if (mode === "time") {
    return <Clock3 size={14} strokeWidth={3} aria-hidden />;
  }

  if (mode === "spotify") {
    return <Music2 size={14} strokeWidth={3} aria-hidden />;
  }

  if (mode === "github") {
    return <FaGithub size={14} aria-hidden />;
  }

  return (
    <BookOpen size={14} strokeWidth={3} className="translate-y-px" aria-hidden />
  );
}

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
  const [spotifyTrack, setSpotifyTrack] = useState<SpotifyTrack>(
    LOADING_SPOTIFY_TRACK,
  );
  const [githubDays, setGithubDays] = useState<GithubContributionDay[]>(
    EMPTY_GITHUB_DAYS,
  );
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
    const cachedTrack = readCachedSpotifyTrack();
    if (cachedTrack) {
      setSpotifyTrack(cachedTrack);
    }
  }, []);

  useEffect(() => {
    if (mode !== "spotify") return;

    let isMounted = true;

    const loadSpotifySong = async () => {
      const cachedTrack = readCachedSpotifyTrack();

      try {
        const response = await fetch("/api/spotify/last-track", {
          cache: "no-store",
        });
        if (!response.ok) {
          if (isMounted) {
            setSpotifyTrack(cachedTrack ?? DEFAULT_SPOTIFY_TRACK);
          }
          return;
        }
        const json = (await response.json()) as SpotifyTrackResponse;
        const songFromApi = json.song?.trim();
        const hasValidSong =
          !!songFromApi &&
          songFromApi !== "Spotify unavailable." &&
          songFromApi !== "No recent song found.";
        if (isMounted) {
          const nextTrack = hasValidSong
            ? {
                song: songFromApi,
                artist: json.artist ?? DEFAULT_SPOTIFY_TRACK.artist,
              }
            : (cachedTrack ?? DEFAULT_SPOTIFY_TRACK);

          setSpotifyTrack(nextTrack);
          if (hasValidSong) {
            window.localStorage.setItem(SPOTIFY_CACHE_KEY, JSON.stringify(nextTrack));
          }
        }
      } catch {
        if (isMounted) {
          setSpotifyTrack(cachedTrack ?? DEFAULT_SPOTIFY_TRACK);
        }
      }
    };

    loadSpotifySong();
    const interval = window.setInterval(loadSpotifySong, SPOTIFY_POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "github") return;

    let isMounted = true;

    const loadGithubContributions = async () => {
      try {
        const response = await fetch("/api/github/contributions", {
          cache: "no-store",
        });
        if (!response.ok) {
          if (isMounted) {
            setGithubDays(EMPTY_GITHUB_DAYS);
          }
          return;
        }

        const json = (await response.json()) as GithubContributionsResponse;

        if (isMounted) {
          setGithubDays(
            json.days?.length ? json.days : EMPTY_GITHUB_DAYS,
          );
        }
      } catch {
        if (isMounted) {
          setGithubDays(EMPTY_GITHUB_DAYS);
        }
      }
    };

    loadGithubContributions();
    const interval = window.setInterval(loadGithubContributions, 900_000);

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
        : prevMode === "github"
          ? "last 14 days of GitHub contributions"
        : "inspirational quote";

  const nextModeLabel =
    nextMode === "time"
      ? "San Francisco time"
      : nextMode === "spotify"
        ? "latest Spotify song"
        : nextMode === "github"
          ? "last 14 days of GitHub contributions"
        : "inspirational quote";

  const currentQuote = QUOTES[quoteIndex] ?? QUOTES[0];
  const quoteLines = wrapQuoteLines(currentQuote, 60);

  return (
    <div
      className={`fixed left-6 top-4 z-20 flex md:left-8 md:top-6 ${
        mode === "quote" ? "items-start" : "h-7 items-center"
      }`}
    >
      <div className="-ml-1.5 mr-2 flex h-7 shrink-0 items-center gap-1">
        <button
          type="button"
          className="inline-flex h-4 w-4 translate-y-[0.5px] items-center justify-center text-[#555555] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          onClick={() => setMode(prevMode)}
          aria-label={`Show ${prevModeLabel}`}
        >
          <ChevronLeft size={14} strokeWidth={3} aria-hidden />
        </button>
        <span
          className="inline-flex h-4 w-4 items-center justify-center text-[#555555]"
          aria-hidden
        >
          <ModeIcon mode={mode} />
        </span>
        <button
          type="button"
          className="inline-flex h-4 w-4 translate-y-[0.5px] items-center justify-center text-[#555555] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          onClick={() => setMode(nextMode)}
          aria-label={`Show ${nextModeLabel}`}
        >
          <ChevronRight size={14} strokeWidth={3} aria-hidden />
        </button>
      </div>
      <p
        className={`max-w-[45vw] font-nav text-[14px] tracking-[0.02em] text-white ${
          mode === "quote"
            ? "whitespace-normal pt-[4px] leading-5"
            : mode === "github"
              ? "overflow-visible whitespace-nowrap"
              : "truncate whitespace-nowrap"
        }`}
      >
        {mode === "time" && `San Francisco: ${currentTime}`}
        {mode === "spotify" && (
          <>
            <span className="italic">
              {spotifyTrack.song}
              {spotifyTrack.song === LOADING_SPOTIFY_TRACK.song ? "" : ","}
            </span>
            {spotifyTrack.artist ? (
              <span className="ml-2">{spotifyTrack.artist}</span>
            ) : null}
          </>
        )}
        {mode === "github" && (
          <span
            className="inline-flex items-center gap-[3px] overflow-visible"
            aria-label="Last 14 days of GitHub contributions"
          >
            {(() => {
              const maxCount = Math.max(
                0,
                ...githubDays.map((day) => day.count),
              );

              return githubDays.map((day) => {
                const formattedDate = formatContributionDate(day.date);
                const contributionLabel = formatContributionCount(day.count);

                return (
                  <span
                    key={day.date}
                    className="group relative inline-block shrink-0"
                  >
                    <span
                      className="block h-[10px] w-[10px] cursor-default rounded-none"
                      style={{
                        backgroundColor: getContributionGreen(
                          day.count,
                          maxCount,
                        ),
                      }}
                      aria-label={`${formattedDate}: ${contributionLabel}`}
                    />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-[#1a1a1a] px-2 py-1 font-nav text-[11px] leading-tight text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
                    >
                      <span className="block">{formattedDate}</span>
                      <span className="block text-white/70">
                        {contributionLabel}
                      </span>
                    </span>
                  </span>
                );
              });
            })()}
          </span>
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
