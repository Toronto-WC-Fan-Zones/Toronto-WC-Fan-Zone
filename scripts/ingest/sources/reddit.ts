import { createHash } from "node:crypto";
import type { CandidateSignal } from "../../../src/types";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const USER_AGENT = "web:toronto-fan-zones-ingest:v1.0 (by /u/replace_me)";

const SUBREDDITS = (process.env.REDDIT_SUBREDDITS ?? "toronto")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Verified live 2026-06-21: oauth.reddit.com returned "403 Blocked" with a
// reddit-ct bot-detection header for every endpoint tried from this
// environment (the token endpoint, /api/v1/me, /r/.../search), with or
// without a bearer token present. This looks like edge-level bot detection
// on datacenter IPs rather than a flaw in the OAuth flow itself, but it may
// or may not clear from a real GitHub Actions runner - untested. Any
// non-JSON response (an HTML block page, e.g.) is treated as a soft failure.
async function getAccessToken(): Promise<string | null> {
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": USER_AGENT,
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    console.warn(`[reddit] token request failed: ${res.status}`);
    return null;
  }
  const data = await res.json().catch(() => null);
  return data?.access_token ?? null;
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

  for (const subreddit of SUBREDDITS) {
    const res = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/search?q=world+cup+watch+party&restrict_sr=1&sort=new&limit=25`,
      { headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT } }
    );
    if (!res.ok) {
      console.warn(`[reddit] r/${subreddit} search failed: ${res.status}`);
      continue;
    }
    const data = await res.json().catch(() => null);
    const posts = data?.data?.children ?? [];

    for (const { data: post } of posts) {
      candidates.push({
        id: `reddit-${post.id}`,
        sourceType: "reddit",
        sourceUrl: `https://reddit.com${post.permalink}`,
        fetchedAt: new Date().toISOString(),
        rawTitle: post.title,
        rawText: post.selftext ?? "",
        parsedGuess: { name: post.title },
        status: "needs_review",
        dedupeKey: createHash("sha1").update(`reddit-${post.id}`).digest("hex"),
      });
    }
  }

  return candidates;
}
