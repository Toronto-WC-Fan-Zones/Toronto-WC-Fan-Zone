import { createHash } from "node:crypto";
import type { CandidateSignal } from "../../../src/types";

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

export async function fetchEventbriteCandidates(): Promise<CandidateSignal[]> {
  if (!EVENTBRITE_TOKEN || ORGANIZER_IDS.length === 0) {
    console.warn(
      "[eventbrite] missing EVENTBRITE_TOKEN or EVENTBRITE_ORGANIZER_IDS - skipping."
    );
    return [];
  }

  const candidates: CandidateSignal[] = [];

  for (const organizerId of ORGANIZER_IDS) {
    const res = await fetch(
      `https://www.eventbriteapi.com/v3/organizers/${organizerId}/events/?status=live`,
      { headers: { Authorization: `Bearer ${EVENTBRITE_TOKEN}` } }
    );
    if (!res.ok) {
      console.warn(
        `[eventbrite] organizer ${organizerId} fetch failed: ${res.status}`
      );
      continue;
    }
    const { events } = await res.json();

    for (const e of events ?? []) {
      candidates.push({
        id: `eventbrite-${e.id}`,
        sourceType: "eventbrite",
        sourceUrl: e.url,
        fetchedAt: new Date().toISOString(),
        rawTitle: e.name?.text ?? "Untitled event",
        rawText: e.description?.text ?? "",
        parsedGuess: {
          name: e.name?.text,
          startDateTime: e.start?.local,
        },
        status: "needs_review",
        dedupeKey: createHash("sha1").update(`eventbrite-${e.id}`).digest("hex"),
      });
    }
  }

  return candidates;
}
