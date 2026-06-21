import { createHash } from "node:crypto";
import type { CandidateSignal } from "../../../src/types";

const CKAN_BASE = "https://ckan0.cf.opendata.inter.prod-toronto.ca";
const FESTIVALS_EVENTS_PACKAGE = "9201059e-43ed-4369-885e-0b867652feac";

interface CkanResource {
  format: string;
  url: string;
}

// Verified live 2026-06-21: this package has no datastore-backed resource,
// only a direct JSON file feed. The feed itself currently returns an Access
// Denied page from the City's own CDN for direct script requests, so any
// non-JSON response is treated as a soft failure rather than a crash.
export async function fetchTorontoOpenDataCandidates(): Promise<
  CandidateSignal[]
> {
  const pkgRes = await fetch(
    `${CKAN_BASE}/api/3/action/package_show?id=${FESTIVALS_EVENTS_PACKAGE}`
  );
  const pkg = await pkgRes.json();
  const jsonResource = (pkg.result?.resources ?? []).find(
    (r: CkanResource) => r.format === "JSON"
  );
  if (!jsonResource) return [];

  const feedRes = await fetch(jsonResource.url);
  const text = await feedRes.text();

  let records: any[];
  try {
    const parsed = JSON.parse(text);
    records = Array.isArray(parsed)
      ? parsed
      : parsed.events ?? parsed.calEvents ?? [];
  } catch {
    console.warn(
      "[toronto_open_data] feed did not return valid JSON (likely blocked or down) - skipping this run."
    );
    return [];
  }

  return records.map((r: any): CandidateSignal => {
    const externalId = String(r.eventId ?? r.id ?? r.eventName ?? r.name);
    return {
      id: `toronto_open_data-${externalId}`,
      sourceType: "toronto_open_data",
      sourceUrl: "https://open.toronto.ca/dataset/festivals-events/",
      fetchedAt: new Date().toISOString(),
      rawTitle: r.eventName ?? r.name ?? "Untitled event",
      rawText: JSON.stringify(r),
      parsedGuess: {
        name: r.eventName ?? r.name,
        neighbourhood: r.location ?? r.ward,
        startDateTime: r.startDate ?? r.eventStartDate,
      },
      status: "needs_review",
      dedupeKey: createHash("sha1")
        .update(`toronto_open_data-${externalId}`)
        .digest("hex"),
    };
  });
}
