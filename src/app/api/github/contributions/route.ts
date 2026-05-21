import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContributionDay = {
  date: string;
  count: number;
};

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "omanshb";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GITHUB_PAT;

const CONTRIBUTIONS_QUERY = `
  query ContributionDays($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

type GraphQLContributionResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: Array<{
            contributionDays?: Array<{
              date?: string;
              contributionCount?: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
};

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getLast14DayRange() {
  const to = new Date();
  const from = new Date();
  from.setUTCDate(to.getUTCDate() - 13);
  from.setUTCHours(0, 0, 0, 0);
  to.setUTCHours(23, 59, 59, 999);
  return { from, to };
}

function buildLast14Days(countByDate: Map<string, number>): ContributionDay[] {
  const { from, to } = getLast14DayRange();
  const days: ContributionDay[] = [];
  const cursor = new Date(from);

  while (cursor <= to) {
    const date = formatDate(cursor);
    days.push({
      date,
      count: countByDate.get(date) ?? 0,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

async function fetchContributionsFromGraphQL(): Promise<ContributionDay[]> {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not configured.");
  }

  const { from, to } = getLast14DayRange();

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "my-site-contributions-widget",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        login: GITHUB_USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("GitHub GraphQL request failed.");
  }

  const json = (await response.json()) as GraphQLContributionResponse;

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GitHub GraphQL returned errors.");
  }

  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const countByDate = new Map<string, number>();

  for (const week of weeks) {
    for (const day of week.contributionDays ?? []) {
      if (!day.date) continue;
      countByDate.set(day.date, day.contributionCount ?? 0);
    }
  }

  return buildLast14Days(countByDate);
}

function readAttr(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`));
  return match?.[1];
}

function parseContributionDaysFromHtml(html: string): ContributionDay[] {
  const dayTags =
    html.match(/<td\b[^>]*\bContributionCalendar-day\b[^>]*>/g) ?? [];
  const countByDate = new Map<string, number>();

  for (const tag of dayTags) {
    const date = readAttr(tag, "data-date");
    const countRaw = readAttr(tag, "data-count");
    const levelRaw = readAttr(tag, "data-level");

    if (!date) continue;

    const countFromAttr = countRaw ? Number.parseInt(countRaw, 10) : Number.NaN;
    const level = levelRaw ? Number.parseInt(levelRaw, 10) : Number.NaN;
    const count = Number.isNaN(countFromAttr)
      ? Number.isNaN(level)
        ? 0
        : level
      : countFromAttr;

    countByDate.set(date, count);
  }

  return buildLast14Days(countByDate);
}

async function fetchContributionsFromHtml(): Promise<ContributionDay[]> {
  const { from, to } = getLast14DayRange();
  const url = `https://github.com/users/${encodeURIComponent(
    GITHUB_USERNAME,
  )}/contributions?from=${formatDate(from)}&to=${formatDate(to)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "my-site-contributions-widget",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not fetch GitHub contributions HTML.");
  }

  return parseContributionDaysFromHtml(await response.text());
}

export async function GET() {
  try {
    const days = GITHUB_TOKEN
      ? await fetchContributionsFromGraphQL()
      : await fetchContributionsFromHtml();

    return NextResponse.json(
      { username: GITHUB_USERNAME, days },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { username: GITHUB_USERNAME, days: [] },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
