import { createHash } from "node:crypto";
import type { CandidateSignal } from "../../../src/types";

const FOOTBALL_DATA_TOKEN = process.env.FOOTBALL_DATA_API_KEY;

// TheSportsDB's free test key ("3") was the original plan, but verified live
// 2026-06-21 it only covers 10 domestic European leagues - no international
// tournaments, so it can't return World Cup fixtures at all. Swapped to
// football-data.org, whose free tier explicitly lists "World Cup" as a
// covered competition (https://www.football-data.org/coverage).
export async function fetchFootballDataCandidates(): Promise<
  CandidateSignal[]
> {
  if (!FOOTBALL_DATA_TOKEN) {
    console.warn("[football_data] missing FOOTBALL_DATA_API_KEY - skipping.");
    return [];
  }

  const res = await fetch(
    "https://api.football-data.org/v4/competitions/WC/matches",
    { headers: { "X-Auth-Token": FOOTBALL_DATA_TOKEN } }
  );
  if (!res.ok) {
    console.warn(`[football_data] fetch failed: ${res.status}`);
    return [];
  }
  const { matches } = await res.json();

  // Verified live 2026-06-21: future knockout-stage slots (LAST_32 etc.)
  // come back as real match records with a real id/date/stage but with
  // homeTeam.name / awayTeam.name both null until qualification is decided.
  // Real data, not a bug - but useless for this guide until teams are set.
  const decided = (matches ?? []).filter(
    (m: any) => m.homeTeam?.name && m.awayTeam?.name
  );

  return decided.map((m: any): CandidateSignal => ({
    id: `football_data-${m.id}`,
    sourceType: "football_data",
    sourceUrl: `https://www.football-data.org/v4/matches/${m.id}`,
    fetchedAt: new Date().toISOString(),
    rawTitle: `${m.homeTeam?.name} vs ${m.awayTeam?.name}`,
    rawText: `${m.homeTeam?.name} vs ${m.awayTeam?.name} - ${m.stage}`,
    parsedGuess: {
      teams: [m.homeTeam?.name, m.awayTeam?.name],
      dateTime: m.utcDate,
      venue: m.venue,
    },
    status: "needs_review",
    dedupeKey: createHash("sha1")
      .update(`football_data-${m.id}`)
      .digest("hex"),
  }));
}
