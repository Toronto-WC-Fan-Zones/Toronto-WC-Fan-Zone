// This app is Toronto-only - hardcoding the timezone here means every
// formatted date is correct regardless of what timezone the rendering
// server happens to run in (Vercel's build/serverless runtime defaults to
// UTC, not Toronto - verified live 2026-06-22 that omitting this produces
// times that are off by hours once the underlying ISO string is correct).
const TORONTO_TIMEZONE = "America/Toronto";

export function formatTorontoDateTime(
  iso: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  return new Date(iso).toLocaleString("en-CA", {
    timeZone: TORONTO_TIMEZONE,
    ...options,
  });
}

// Pure calendar dates ("2026-06-15", e.g. lastChecked) carry no time-of-day
// or timezone meaning at all. new Date("2026-06-15") parses that as UTC
// midnight - verified live 2026-06-22 that this currently displays as
// "Jun 20" for a real "2026-06-21" value in this sandbox (America/Toronto,
// UTC-4, puts UTC midnight Jun 21 at 8pm Jun 20 local). The multi-arg Date
// constructor below is always local, so parsing and display use the same
// reference frame and the day can never shift either direction, regardless
// of what timezone the runtime happens to be.
function parseCalendarDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatCalendarDate(isoDate: string): string {
  return parseCalendarDate(isoDate).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function daysSinceCalendarDate(isoDate: string): number {
  const checked = parseCalendarDate(isoDate);
  const now = new Date();
  return Math.floor((now.getTime() - checked.getTime()) / (1000 * 60 * 60 * 24));
}
