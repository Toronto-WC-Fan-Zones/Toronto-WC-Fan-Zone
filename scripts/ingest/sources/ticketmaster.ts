import { createHash } from "node:crypto";
import type { CandidateSignal } from "../../../src/types";

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

// Verified live 2026-06-21: GET .../discovery/v2/events.json with no apikey
// returns a clean "Failed to resolve API Key" error, and a bogus key returns
// "Invalid ApiKey" - the documented apikey query-param auth works exactly as
// expected, no deprecation surprises like Eventbrite/TheSportsDB had.
export async function fetchTicketmasterCandidates(): Promise<
  CandidateSignal[]
> {
  if (!TICKETMASTER_API_KEY) {
    console.warn("[ticketmaster] missing TICKETMASTER_API_KEY - skipping.");
    return [];
  }

  const url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  url.searchParams.set("apikey", TICKETMASTER_API_KEY);
  url.searchParams.set("city", "Toronto");
  url.searchParams.set("keyword", "World Cup");

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`[ticketmaster] fetch failed: ${res.status}`);
    return [];
  }
  const data = await res.json().catch(() => null);
  const events = data?._embedded?.events ?? [];

  return events.map((e: any): CandidateSignal => {
    const venue = e._embedded?.venues?.[0];
    return {
      id: `ticketmaster-${e.id}`,
      sourceType: "ticketmaster",
      sourceUrl: e.url,
      fetchedAt: new Date().toISOString(),
      rawTitle: e.name,
      rawText: e.info ?? e.pleaseNote ?? "",
      parsedGuess: {
        name: e.name,
        startDateTime: e.dates?.start?.dateTime,
        neighbourhood: venue?.address?.line1 ?? venue?.name,
      },
      status: "needs_review",
      dedupeKey: createHash("sha1")
        .update(`ticketmaster-${e.id}`)
        .digest("hex"),
    };
  });
}
