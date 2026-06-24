import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CandidateSignal } from "../../src/types";

const STAGING_PATH = path.join(
  process.cwd(),
  "data",
  "staging",
  "candidates.json"
);

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const arg = args.find((a) => a.startsWith(`--${flag}=`));
    return arg ? arg.split("=")[1] : undefined;
  };
  return {
    status: get("status") ?? "needs_review",
    source: get("source"),
    approve: get("approve")?.split(",").filter(Boolean) ?? [],
    reject: get("reject")?.split(",").filter(Boolean) ?? [],
  };
}

function whenOf(c: CandidateSignal): string | undefined {
  const guess = c.parsedGuess as any;
  return guess?.startDateTime ?? guess?.dateTime;
}

function describe(c: CandidateSignal): string {
  const guess = c.parsedGuess as any;
  const when = whenOf(c);
  const whenStr = when
    ? new Date(when).toLocaleString("en-CA", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "date unknown";
  const countries: string[] | undefined =
    guess?.relatedCountries?.length ? guess.relatedCountries : guess?.teams;
  const hints = c.reviewHints?.length
    ? c.reviewHints.map((hint) => `  \u{1F4DD} ${hint}`)
    : [];

  return [
    `[${c.status}] ${c.id} (${c.sourceType})`,
    `  ${c.rawTitle}`,
    `  \u{1F4C5} ${whenStr}${countries?.length ? `   \u{1F30D} ${countries.join(" vs ")}` : ""}`,
    `  \u{1F517} ${c.sourceUrl}`,
    ...hints,
  ].join("\n");
}

async function main() {
  const { status, source, approve, reject } = parseArgs();

  const raw = await readFile(STAGING_PATH, "utf8");
  const candidates: CandidateSignal[] = JSON.parse(raw);

  let changed = false;
  for (const id of approve) {
    const c = candidates.find((c) => c.id === id);
    if (!c) {
      console.warn(`No candidate "${id}" found - skipping approve.`);
      continue;
    }
    c.status = "approved";
    changed = true;
    console.log(`Approved ${id}`);
  }
  for (const id of reject) {
    const c = candidates.find((c) => c.id === id);
    if (!c) {
      console.warn(`No candidate "${id}" found - skipping reject.`);
      continue;
    }
    c.status = "rejected";
    changed = true;
    console.log(`Rejected ${id}`);
  }

  if (changed) {
    await writeFile(
      STAGING_PATH,
      JSON.stringify(candidates, null, 2) + "\n",
      "utf8"
    );
    console.log(`Saved changes to ${STAGING_PATH}\n`);
  }

  const filtered = candidates
    .filter((c) => c.status === status)
    .filter((c) => !source || c.sourceType === source)
    .sort((a, b) => {
      const aWhen = whenOf(a) ?? a.fetchedAt;
      const bWhen = whenOf(b) ?? b.fetchedAt;
      return new Date(aWhen).getTime() - new Date(bWhen).getTime();
    });

  console.log(
    `${filtered.length} candidate(s) with status "${status}"` +
      `${source ? ` from ${source}` : ""}:\n`
  );
  for (const c of filtered) {
    console.log(describe(c));
    console.log();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
