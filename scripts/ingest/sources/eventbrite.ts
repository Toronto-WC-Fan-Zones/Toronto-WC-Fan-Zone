import { createHash } from "node:crypto";
import type { CandidateSignal } from "../../../src/types";
import { extractCountriesFromTitle } from "../../../src/lib/countries";

const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;

// Eventbrite removed public keyword/location event search from the v3 API
// (verified live 2026-06-21: GET /v3/events/search/ now 404s, "path does not
// exist"). The only events reachable today belong to a known organizer.
// Add real Toronto World Cup-related organizer ids here once identified -
// do not invent ids. Comma-separated via EVENTBRITE_ORGANIZER_IDS.
const ORGANIZER_IDS: string[] = (process.env.EVENTBRITE_ORGANIZER_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

// Verified live 2026-06-21 against a real Toronto venue: tracking an
// organizer means tracking everything they host, not just World Cup
// content - one busy venue returned 473 events, 430 of them unrelated
// recurring nightlife promo nights ("Thursday Girls Night", etc.). Every
// genuine World Cup event in that sample did contain "world cup" in its
// title, so filtering on that keeps the signal without re-inventing the
// search API Eventbrite removed.
const RELEVANCE_PATTERN = /world cup/i;

export async function fetchEventbriteCandidates(): Promise<CandidateSignal[]> {
  if (!EVENTBRITE_TOKEN || ORGANIZER_IDS.length === 0) {
    console.warn(
      "[eventbrite] missing EVENTBRITE_TOKEN or EVENTBRITE_ORGANIZER_IDS - skipping."
    );
    return [];
  }

  const candidates: CandidateSignal[] = [];
  // Verified live 2026-06-21: a busy venue/organizer can have hundreds of
  // events (one real Toronto organizer had 433 across 9 pages) and the API
  // defaults to 50/page - without paging through, a real relevant event can
  // silently never surface. Capped to avoid an unbounded loop against an
  // organizer with an enormous catalog.
  const MAX_PAGES_PER_ORGANIZER = 10;

  for (const organizerId of ORGANIZER_IDS) {
    let continuation: string | undefined;
    let page = 0;

    do {
      const url = new URL(
        `https://www.eventbriteapi.com/v3/organizers/${organizerId}/events/`
      );
      url.searchParams.set("status", "live");
      if (continuation) url.searchParams.set("continuation", continuation);

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${EVENTBRITE_TOKEN}` },
      });
      if (!res.ok) {
        console.warn(
          `[eventbrite] organizer ${organizerId} fetch failed: ${res.status}`
        );
        break;
      }
      const data = await res.json();

      for (const e of data.events ?? []) {
        const title = e.name?.text ?? "";
        const description = e.description?.text ?? "";
        if (!RELEVANCE_PATTERN.test(title) && !RELEVANCE_PATTERN.test(description)) {
          continue;
        }

        candidates.push({
          id: `eventbrite-${e.id}`,
          sourceType: "eventbrite",
          sourceUrl: e.url,
          fetchedAt: new Date().toISOString(),
          rawTitle: title || "Untitled event",
          rawText: description,
          parsedGuess: {
            name: title,
            startDateTime: e.start?.local,
            relatedCountries: extractCountriesFromTitle(title),
          },
          status: "needs_review",
          dedupeKey: createHash("sha1")
            .update(`eventbrite-${e.id}`)
            .digest("hex"),
        });
      }

      continuation = data.pagination?.has_more_items
        ? data.pagination.continuation
        : undefined;
      page += 1;
    } while (continuation && page < MAX_PAGES_PER_ORGANIZER);
  }

  return candidates;
}
