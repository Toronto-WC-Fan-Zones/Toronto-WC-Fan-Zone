import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CandidateSignal } from "../../src/types";
import { fetchEventbriteCandidates } from "./sources/eventbrite";
import { fetchFootballDataCandidates } from "./sources/football-data";
import { fetchTorontoOpenDataCandidates } from "./sources/toronto-open-data";

const STAGING_PATH = path.join(
  process.cwd(),
  "data",
  "staging",
  "candidates.json"
);

const CONNECTORS: Record<string, () => Promise<CandidateSignal[]>> = {
  eventbrite: fetchEventbriteCandidates,
  toronto_open_data: fetchTorontoOpenDataCandidates,
  football_data: fetchFootballDataCandidates,
};

function parseArgs() {
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith("--source="));
  return {
    source: sourceArg ? sourceArg.split("=")[1] : "all",
    dryRun: args.includes("--dry-run"),
  };
}

async function loadStaging(): Promise<CandidateSignal[]> {
  try {
    const raw = await readFile(STAGING_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function main() {
  const { source, dryRun } = parseArgs();
  const names = source === "all" ? Object.keys(CONNECTORS) : [source];

  const existing = await loadStaging();
  const existingKeys = new Set(existing.map((c) => c.dedupeKey));

  const fresh: CandidateSignal[] = [];
  for (const name of names) {
    const connector = CONNECTORS[name];
    if (!connector) {
      console.warn(`Unknown source "${name}" - skipping.`);
      continue;
    }
    console.log(`Fetching ${name}...`);
    fresh.push(...(await connector()));
  }

  const newCandidates = fresh.filter((c) => !existingKeys.has(c.dedupeKey));
  const merged = [...existing, ...newCandidates];

  console.log(
    `Fetched ${fresh.length} candidate(s), ${newCandidates.length} new after dedupe.`
  );
  for (const c of newCandidates) {
    console.log(`  + [${c.sourceType}] ${c.rawTitle}`);
  }

  if (dryRun) {
    console.log("(dry run - not writing data/staging/candidates.json)");
    return;
  }

  await mkdir(path.dirname(STAGING_PATH), { recursive: true });
  await writeFile(STAGING_PATH, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`Wrote ${merged.length} total candidate(s) to ${STAGING_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
