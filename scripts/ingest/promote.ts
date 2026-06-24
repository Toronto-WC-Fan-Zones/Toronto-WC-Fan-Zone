import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CandidateSignal } from "../../src/types";

const STAGING_PATH = path.join(
  process.cwd(),
  "data",
  "staging",
  "candidates.json"
);

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todo(label: string): string {
  return `/* TODO: ${label} */ undefined`;
}

function quoted(value: string): string {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// Only enough fields are filled in from the candidate's parsedGuess to save
// typing - everything that needs a human judgment call (confidence beyond
// "unconfirmed", entryType, eventType, groupStage, crowd risk) stays a TODO.
// This script never writes to src/data/*.ts itself.
function scaffoldCommunityEvent(c: CandidateSignal): string {
  const guess = c.parsedGuess as any;
  const name = guess?.name ?? c.rawTitle;
  const slug = slugify(name);
  const today = new Date().toISOString().slice(0, 10);
  const defaultShelved =
    c.sourceType === "reddit" || c.sourceType === "eventbrite";
  const visibility = guess?.visibility
    ? quoted(guess.visibility)
    : defaultShelved
      ? '"shelved"'
      : todo('"public" | "shelved"');
  const venueCategory = guess?.venueCategory
    ? quoted(guess.venueCategory)
    : defaultShelved
      ? '"licensed_venue"'
      : todo('"licensed_venue" | "restaurant" | "community_space" | "outdoor" | "official" | "unknown"');
  const shelvedReason = guess?.shelvedReason
    ? quoted(guess.shelvedReason)
    : defaultShelved
      ? '"alcohol_venue_guardrails_pending"'
      : todo('"alcohol_venue_guardrails_pending" | "needs_review" | undefined');

  return `{
  slug: "${slug}",
  name: ${quoted(name)},
  eventType: ${todo('"watch-party" | "screening" | "street-festival" | "march" | "other"')},
  startDateTime: ${guess?.startDateTime ? `"${guess.startDateTime}"` : todo("ISO datetime")},
  endDateTime: null,
  neighbourhood: ${guess?.neighbourhood ? `"${guess.neighbourhood}"` : todo("neighbourhood")},
  venueName: null,
  relatedCountries: ${guess?.relatedCountries?.length ? JSON.stringify(guess.relatedCountries) : "[]"},
  entryType: ${todo('"free" | "ticketed" | "reservation" | "walk-in" | "unclear"')},
  sourceSignalId: "${c.id}",
  visibility: ${visibility},
  venueCategory: ${venueCategory},
  shelvedReason: ${shelvedReason},
  lastChecked: "${today}",
  confidence: "unconfirmed",
  sources: [{ label: "${c.sourceType}", url: "${c.sourceUrl}", type: "community" }],
  userSubmitted: false,
}`;
}

function scaffoldGame(c: CandidateSignal): string {
  const guess = c.parsedGuess as any;
  const teams: string[] = guess?.teams ?? [todo("home team"), todo("away team")];

  return `{
  id: "${c.id}",
  teams: [${teams.map((t) => (t.startsWith("/* TODO") ? t : `"${t}"`)).join(", ")}],
  dateTime: ${guess?.dateTime ? `"${guess.dateTime}"` : todo("ISO datetime")},
  groupStage: ${todo("true | false")},
  crowdRiskMultiplier: ${todo('"low" | "high"')},
  venue: ${guess?.venue ? `"${guess.venue}"` : todo("venue")},
}`;
}

function buildScaffold(c: CandidateSignal): { target: string; code: string } {
  if (c.sourceType === "football_data" || c.sourceType === "ticketmaster") {
    return {
      target: "src/data/games.ts (upcomingGames array)",
      code: scaffoldGame(c),
    };
  }
  return {
    target: "src/data/events.ts (events array)",
    code: scaffoldCommunityEvent(c),
  };
}

async function main() {
  const [, , candidateId, ...flags] = process.argv;
  const dryRun = flags.includes("--dry-run");

  if (!candidateId) {
    console.error("Usage: npm run promote -- <candidateId> [--dry-run]");
    process.exitCode = 1;
    return;
  }

  const raw = await readFile(STAGING_PATH, "utf8");
  const candidates: CandidateSignal[] = JSON.parse(raw);
  const candidate = candidates.find((c) => c.id === candidateId);

  if (!candidate) {
    console.error(`No candidate with id "${candidateId}" in ${STAGING_PATH}`);
    process.exitCode = 1;
    return;
  }

  if (candidate.status !== "approved") {
    console.error(
      `Candidate "${candidateId}" has status "${candidate.status}", not "approved". ` +
        `Review it in the staging PR and set status to "approved" before promoting.`
    );
    process.exitCode = 1;
    return;
  }

  const { target, code } = buildScaffold(candidate);

  console.log(
    `\nPromote "${candidate.rawTitle}" (${candidate.sourceType}) into ${target}:\n`
  );
  console.log(code);
  console.log(
    "\nCopy the object above into the array, fill in every TODO, then re-run " +
      "`npm run lint && npx tsc --noEmit` before committing.\n"
  );

  if (dryRun) {
    console.log('(dry run - candidate status left as "approved")');
    return;
  }

  candidate.status = "published";
  await writeFile(
    STAGING_PATH,
    JSON.stringify(candidates, null, 2) + "\n",
    "utf8"
  );
  console.log(`Marked "${candidateId}" as published in ${STAGING_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
