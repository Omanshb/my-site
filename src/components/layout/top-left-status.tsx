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

import { FUN_FACTS } from "@/data/fun-facts";

const SF_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

// On small screens we drop the seconds so the clock stays fully readable
// instead of colliding with (or truncating beside) the compact nav.
const SF_TIME_FORMATTER_COMPACT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

type DisplayMode = "time" | "spotify" | "github" | "fact";

type SpotifyTrackResponse = {
  song: string;
  artist: string;
};

type SpotifyTrack = {
  song: string;
  artist: string;
};

type SpotifyTrackCacheEntry = SpotifyTrack & {
  updatedAt: number;
};

type GithubContributionDay = {
  date: string;
  count: number;
};

type GithubContributionsResponse = {
  days?: GithubContributionDay[];
};

const LOADING_SPOTIFY_TRACK = {
  song: "...",
  artist: "",
};

const SPOTIFY_CACHE_KEY = "top-left-status:spotify-track";
const SPOTIFY_POLL_INTERVAL_MS = 30_000;

function readCachedSpotifyTrack(): SpotifyTrackCacheEntry | null {
  try {
    const rawCache = window.localStorage.getItem(SPOTIFY_CACHE_KEY);
    if (!rawCache) return null;

    const parsed = JSON.parse(rawCache) as Partial<SpotifyTrackCacheEntry>;
    const cachedSong = parsed.song?.trim();
    const cachedUpdatedAt =
      typeof parsed.updatedAt === "number" ? parsed.updatedAt : null;
    if (!cachedSong || !cachedUpdatedAt) return null;

    return {
      song: cachedSong,
      artist: parsed.artist ?? "",
      updatedAt: cachedUpdatedAt,
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

const MODE_ORDER: DisplayMode[] = ["time", "spotify", "github", "fact"];

function pickRandomFactIndex() {
  return Math.floor(Math.random() * FUN_FACTS.length);
}

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

function wrapFactLines(text: string, maxCharsPerLine: number) {
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
  const [currentTime, setCurrentTime] = useState("");
  const [mode, setMode] = useState<DisplayMode>("time");
  const [spotifyTrack, setSpotifyTrack] = useState<SpotifyTrack>(
    LOADING_SPOTIFY_TRACK,
  );
  const [githubDays, setGithubDays] = useState<GithubContributionDay[]>(
    EMPTY_GITHUB_DAYS,
  );
  const [factIndex, setFactIndex] = useState(pickRandomFactIndex);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Set on the client only; rendering the clock during SSR would mismatch
    // the time captured a few seconds earlier on the server.
    const formatter = isCompact ? SF_TIME_FORMATTER_COMPACT : SF_TIME_FORMATTER;
    setCurrentTime(formatter.format(new Date()));

    const interval = window.setInterval(() => {
      setCurrentTime(formatter.format(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isCompact]);

  useEffect(() => {
    const cachedTrack = readCachedSpotifyTrack();
    if (cachedTrack) {
      setSpotifyTrack({
        song: cachedTrack.song,
        artist: cachedTrack.artist,
      });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSpotifySong = async () => {
      const cachedTrack = readCachedSpotifyTrack();
      const now = Date.now();

      if (cachedTrack && now - cachedTrack.updatedAt < SPOTIFY_POLL_INTERVAL_MS) {
        if (isMounted) {
          setSpotifyTrack({ song: cachedTrack.song, artist: cachedTrack.artist });
        }
        return;
      }

      try {
        const response = await fetch("/api/spotify/last-track");
        if (!response.ok) return;

        const json = (await response.json()) as SpotifyTrackResponse;
        const songFromApi = json.song?.trim();
        if (!songFromApi) return;

        const nextTrack: SpotifyTrackCacheEntry = {
          song: songFromApi,
          artist: json.artist?.trim() ?? "",
          updatedAt: now,
        };

        if (isMounted) {
          setSpotifyTrack({ song: nextTrack.song, artist: nextTrack.artist });
          window.localStorage.setItem(SPOTIFY_CACHE_KEY, JSON.stringify(nextTrack));
        }
      } catch {
        // Keep the most recent known track on transient network issues.
      }
    };

    loadSpotifySong();
    const interval = window.setInterval(loadSpotifySong, SPOTIFY_POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

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

  useEffect(() => {
    if (mode === "fact") {
      setFactIndex(pickRandomFactIndex());
    }
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
        : "fun fact";

  const nextModeLabel =
    nextMode === "time"
      ? "San Francisco time"
      : nextMode === "spotify"
        ? "latest Spotify song"
        : nextMode === "github"
          ? "last 14 days of GitHub contributions"
        : "fun fact";

  const currentFact = FUN_FACTS[factIndex] ?? FUN_FACTS[0];
  const factLines = wrapFactLines(currentFact, 60);

  return (
    <div
      className={`fixed left-3 top-4 z-20 flex sm:left-5 md:left-8 md:top-6 ${
        mode === "fact" ? "items-start" : "h-7 items-center"
      }`}
    >
      <div className="-ml-1.5 mr-1 flex h-7 shrink-0 items-center gap-0.5 sm:mr-2 sm:gap-1">
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
        className={`max-w-[44vw] font-nav text-[12px] tracking-[0.02em] text-white sm:text-[13px] md:max-w-[45vw] md:text-[14px] ${
          mode === "fact"
            ? "whitespace-normal pt-[4px] leading-5"
            : mode === "github"
              ? "overflow-visible whitespace-nowrap"
              : "truncate whitespace-nowrap"
        }`}
      >
        {mode === "time" && currentTime && `San Francisco: ${currentTime}`}
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
            className="inline-flex items-center gap-[2px] overflow-visible sm:gap-[3px]"
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
                      className="block h-[7px] w-[7px] cursor-default rounded-none sm:h-[10px] sm:w-[10px]"
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
        {mode === "fact" && (
          <span>
            {factLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </span>
        )}
      </p>
    </div>
  );
}
