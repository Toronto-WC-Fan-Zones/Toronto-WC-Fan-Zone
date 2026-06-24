import { createHash } from "node:crypto";
import type {
  CandidateSignal,
  EventVisibility,
  ShelvedReason,
  VenueCategory,
} from "../../../src/types";
import { extractCountriesFromTitle } from "../../../src/lib/countries";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT;

const DEFAULT_SUBREDDITS = [
  "toronto",
  "askTO",
  "mississauga",
  "Brampton",
  "Scarborough",
  "Markham",
  "Vaughan",
  "Hamilton",
  "oakville",
];

const SUBREDDITS = (process.env.REDDIT_SUBREDDITS ?? DEFAULT_SUBREDDITS.join(","))
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SEARCH_QUERIES = [
  "world cup watch party",
  "fifa watch party",
  "world cup screening",
  "world cup fan zone",
  "soccer watch party",
];

const MAX_PAGES_PER_QUERY = 2;
const SEARCH_LIMIT = 25;

const ALCOHOL_VENUE_CUES = [
  "bar",
  "pub",
  "brewery",
  "taproom",
  "tavern",
  "sports bar",
  "public house",
  "beer",
  "19+",
  "licensed",
  "nightclub",
  "lounge",
];

const RESTAURANT_VENUE_CUES = [
  "restaurant",
  "patio",
  "cafe",
  "caf\u00e9",
  "bistro",
  "grill",
];

const COMMUNITY_SPACE_CUES = [
  "community centre",
  "community center",
  "library",
  "cultural centre",
  "cultural center",
  "mosque",
  "church",
  "temple",
];

const OUTDOOR_CUES = ["park", "square", "plaza", "street", "outdoor"];
const OFFICIAL_CUES = ["official", "city of toronto", "fan zone", "fan festival"];

const GTA_CUES = [
  "toronto",
  "gta",
  "greater toronto",
  "mississauga",
  "brampton",
  "scarborough",
  "markham",
  "vaughan",
  "hamilton",
  "oakville",
  "north york",
  "etobicoke",
  "east york",
];

const NEIGHBOURHOOD_CUES: Array<{ name: string; cues: string[] }> = [
  { name: "Toronto", cues: ["toronto"] },
  { name: "Mississauga", cues: ["mississauga"] },
  { name: "Brampton", cues: ["brampton"] },
  { name: "Scarborough", cues: ["scarborough"] },
  { name: "Markham", cues: ["markham"] },
  { name: "Vaughan", cues: ["vaughan"] },
  { name: "Hamilton", cues: ["hamilton"] },
  { name: "Oakville", cues: ["oakville"] },
  { name: "North York", cues: ["north york"] },
  { name: "Etobicoke", cues: ["etobicoke"] },
  { name: "East York", cues: ["east york"] },
  { name: "King West", cues: ["king west"] },
  { name: "Little Portugal", cues: ["little portugal", "dundas west"] },
  { name: "Little Italy", cues: ["little italy", "college street"] },
  { name: "Kensington Market", cues: ["kensington"] },
  { name: "Waterfront", cues: ["waterfront", "harbourfront"] },
];

interface RedditPost {
  id?: string;
  title?: string;
  selftext?: string;
  permalink?: string;
  subreddit?: string;
}

interface RedditListing {
  data?: {
    children?: Array<{ data?: RedditPost }>;
    after?: string | null;
  };
}

function matchesAny(text: string, cues: string[]): string[] {
  const lower = text.toLowerCase();
  return cues.filter((cue) => {
    const normalizedCue = cue.toLowerCase();
    if (/^[a-z0-9 ]+$/.test(normalizedCue)) {
      const escaped = normalizedCue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(lower);
    }
    return lower.includes(normalizedCue);
  });
}

function detectNeighbourhood(text: string): string | undefined {
  const lower = text.toLowerCase();
  return NEIGHBOURHOOD_CUES.find((entry) =>
    entry.cues.some((cue) => lower.includes(cue))
  )?.name;
}

function extractIsoDateTime(text: string): string | undefined {
  const match = text.match(
    /\b20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:?\d{2})?\b/
  );
  if (!match) return undefined;

  const date = new Date(match[0]);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function classifyVenue(text: string): {
  venueCategory: VenueCategory;
  visibility: EventVisibility;
  shelvedReason?: ShelvedReason;
  matchedVenueCues: string[];
} {
  const alcoholCues = matchesAny(text, ALCOHOL_VENUE_CUES);
  if (alcoholCues.length > 0) {
    return {
      venueCategory: "licensed_venue",
      visibility: "shelved",
      shelvedReason: "alcohol_venue_guardrails_pending",
      matchedVenueCues: alcoholCues,
    };
  }

  const restaurantCues = matchesAny(text, RESTAURANT_VENUE_CUES);
  if (restaurantCues.length > 0) {
    return {
      venueCategory: "restaurant",
      visibility: "shelved",
      shelvedReason: "alcohol_venue_guardrails_pending",
      matchedVenueCues: restaurantCues,
    };
  }

  const communityCues = matchesAny(text, COMMUNITY_SPACE_CUES);
  if (communityCues.length > 0) {
    return {
      venueCategory: "community_space",
      visibility: "public",
      matchedVenueCues: communityCues,
    };
  }

  const officialCues = matchesAny(text, OFFICIAL_CUES);
  if (officialCues.length > 0) {
    return {
      venueCategory: "official",
      visibility: "public",
      matchedVenueCues: officialCues,
    };
  }

  const outdoorCues = matchesAny(text, OUTDOOR_CUES);
  if (outdoorCues.length > 0) {
    return {
      venueCategory: "outdoor",
      visibility: "public",
      matchedVenueCues: outdoorCues,
    };
  }

  return {
    venueCategory: "unknown",
    visibility: "shelved",
    shelvedReason: "needs_review",
    matchedVenueCues: [],
  };
}

function logRateLimit(headers: Headers, label: string) {
  const used = headers.get("x-ratelimit-used");
  const remaining = headers.get("x-ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset");
  if (!used && !remaining && !reset) return;

  console.log(
    `[reddit] rate limit ${label}: used=${used ?? "?"}, remaining=${
      remaining ?? "?"
    }, reset=${reset ?? "?"}`
  );
}

async function getAccessToken(): Promise<string | null> {
  if (!REDDIT_USER_AGENT || REDDIT_USER_AGENT.includes("replace_me")) {
    console.warn(
      "[reddit] missing REDDIT_USER_AGENT or using placeholder user agent - skipping."
    );
    return null;
  }

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": REDDIT_USER_AGENT,
    },
    body: "grant_type=client_credentials",
  });

  logRateLimit(res.headers, "token");

  if (!res.ok) {
    console.warn(`[reddit] token request failed: ${res.status}`);
    return null;
  }

  const data = await res.json().catch(() => null);
  if (!data?.access_token) {
    console.warn("[reddit] token response was not valid JSON with access_token.");
    return null;
  }

  return data.access_token;
}

async function fetchSearchPage(
  token: string,
  subreddit: string,
  query: string,
  after?: string
): Promise<RedditListing | null> {
  const url = new URL(
    `https://oauth.reddit.com/r/${encodeURIComponent(subreddit)}/search`
  );
  url.searchParams.set("q", query);
  url.searchParams.set("restrict_sr", "1");
  url.searchParams.set("sort", "new");
  url.searchParams.set("limit", String(SEARCH_LIMIT));
  url.searchParams.set("t", "year");
  url.searchParams.set("raw_json", "1");
  if (after) url.searchParams.set("after", after);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": REDDIT_USER_AGENT!,
    },
  });

  logRateLimit(res.headers, `r/${subreddit} "${query}"`);

  if (!res.ok) {
    console.warn(`[reddit] r/${subreddit} search failed: ${res.status}`);
    return null;
  }

  const data = await res.json().catch(() => null);
  if (!data) {
    console.warn(`[reddit] r/${subreddit} search returned non-JSON content.`);
    return null;
  }

  return data;
}

function buildCandidate(
  post: RedditPost,
  subreddit: string,
  query: string,
  fetchedAt: string
): CandidateSignal | null {
  if (!post.id) return null;

  const title = post.title?.trim() || "Untitled Reddit post";
  const body = post.selftext?.trim() ?? "";
  const combined = `${title}\n${body}`;
  const classification = classifyVenue(combined);
  const countries = extractCountriesFromTitle(combined);
  const neighbourhood = detectNeighbourhood(combined);
  const startDateTime = extractIsoDateTime(combined);
  const gtaCues = matchesAny(combined, GTA_CUES);
  const sourceUrl = post.permalink
    ? `https://reddit.com${post.permalink}`
    : `https://reddit.com/r/${subreddit}/comments/${post.id}`;

  const reviewHints = [
    `subreddit: r/${post.subreddit ?? subreddit}`,
    `query: ${query}`,
    `visibility: ${classification.visibility}`,
    `venue category: ${classification.venueCategory}`,
    classification.shelvedReason
      ? `shelved reason: ${classification.shelvedReason}`
      : null,
    classification.matchedVenueCues.length > 0
      ? `matched venue cues: ${classification.matchedVenueCues.join(", ")}`
      : "matched venue cues: none",
    gtaCues.length > 0
      ? `matched GTA cues: ${gtaCues.join(", ")}`
      : "matched GTA cues: subreddit only",
  ].filter((hint): hint is string => hint !== null);

  return {
    id: `reddit-${post.id}`,
    sourceType: "reddit",
    sourceUrl,
    fetchedAt,
    rawTitle: title,
    rawText: body,
    parsedGuess: {
      name: title,
      relatedCountries: countries,
      ...(neighbourhood ? { neighbourhood } : {}),
      ...(startDateTime ? { startDateTime } : {}),
      visibility: classification.visibility,
      venueCategory: classification.venueCategory,
      ...(classification.shelvedReason
        ? { shelvedReason: classification.shelvedReason }
        : {}),
    },
    status: "needs_review",
    dedupeKey: createHash("sha1").update(`reddit-${post.id}`).digest("hex"),
    reviewHints,
  };
}

export async function fetchRedditCandidates(): Promise<CandidateSignal[]> {
  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
    console.warn(
      "[reddit] missing REDDIT_CLIENT_ID or REDDIT_CLIENT_SECRET - skipping."
    );
    return [];
  }

  const token = await getAccessToken();
  if (!token) return [];

  const candidates: CandidateSignal[] = [];
  const seen = new Set<string>();
  const fetchedAt = new Date().toISOString();

  for (const subreddit of SUBREDDITS) {
    for (const query of SEARCH_QUERIES) {
      let after: string | undefined;

      for (let page = 0; page < MAX_PAGES_PER_QUERY; page += 1) {
        const data = await fetchSearchPage(token, subreddit, query, after);
        if (!data) break;

        const posts = data.data?.children ?? [];
        for (const child of posts) {
          if (!child.data?.id || seen.has(child.data.id)) continue;
          const candidate = buildCandidate(child.data, subreddit, query, fetchedAt);
          if (!candidate) continue;

          seen.add(child.data.id);
          candidates.push(candidate);
        }

        after = data.data?.after ?? undefined;
        if (!after) break;
      }
    }
  }

  return candidates;
}
