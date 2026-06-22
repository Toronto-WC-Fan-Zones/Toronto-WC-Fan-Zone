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
