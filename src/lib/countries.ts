// Maps country names as they appear in ingested data (football-data.org team
// names, Eventbrite watch-party titles) to a flag for display. England,
// Scotland, and Wales compete separately at the World Cup but aren't ISO
// 3166-1 countries, so their flags are hardcoded rather than derived.
const SPECIAL_FLAGS: Record<string, string> = {
  England: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",
  Scotland: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
  Wales: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}",
};

// flag-icons CSS library subdivision codes for home nations
const SPECIAL_CODES: Record<string, string> = {
  England: "gb-eng",
  Scotland: "gb-sct",
  Wales: "gb-wls",
};

const COUNTRY_TO_ISO: Record<string, string> = {
  Mexico: "MX",
  "South Africa": "ZA",
  "South Korea": "KR",
  Czechia: "CZ",
  "Czech Republic": "CZ",
  Canada: "CA",
  "Bosnia-Herzegovina": "BA",
  "Bosnia and Herzegovina": "BA",
  "United States": "US",
  USA: "US",
  Paraguay: "PY",
  Qatar: "QA",
  Switzerland: "CH",
  Brazil: "BR",
  Morocco: "MA",
  Haiti: "HT",
  Australia: "AU",
  Turkey: "TR",
  "Türkiye": "TR",
  Germany: "DE",
  "Curaçao": "CW",
  Curacao: "CW",
  Netherlands: "NL",
  Japan: "JP",
  "Ivory Coast": "CI",
  "Côte d'Ivoire": "CI",
  Ecuador: "EC",
  Sweden: "SE",
  Tunisia: "TN",
  Spain: "ES",
  "Cape Verde Islands": "CV",
  "Cape Verde": "CV",
  "Cabo Verde": "CV",
  Belgium: "BE",
  Egypt: "EG",
  "Saudi Arabia": "SA",
  Uruguay: "UY",
  Iran: "IR",
  "New Zealand": "NZ",
  France: "FR",
  Senegal: "SN",
  Iraq: "IQ",
  Norway: "NO",
  Argentina: "AR",
  Algeria: "DZ",
  Austria: "AT",
  Jordan: "JO",
  Portugal: "PT",
  "Congo DR": "CD",
  "DR Congo": "CD",
  "Democratic Republic of the Congo": "CD",
  Croatia: "HR",
  Ghana: "GH",
  Panama: "PA",
  Uzbekistan: "UZ",
  Usbekistan: "UZ", // typo seen verbatim in real ingested Eventbrite data
  Colombia: "CO",
};

function isoToFlagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(0x1f1e6 + (char.charCodeAt(0) - 65)))
    .join("");
}

// Returns null for unrecognized names rather than guessing - a missing flag
// is better than a wrong one.
export function getFlagEmoji(countryName: string): string | null {
  if (SPECIAL_FLAGS[countryName]) return SPECIAL_FLAGS[countryName];
  const iso = COUNTRY_TO_ISO[countryName];
  return iso ? isoToFlagEmoji(iso) : null;
}

// Returns a flag-icons CSS class suffix (e.g. "pt", "gb-eng") for use with
// <span class="fi fi-{code}">. Returns null for unrecognized country names.
export function getCountryCode(countryName: string): string | null {
  if (SPECIAL_CODES[countryName]) return SPECIAL_CODES[countryName];
  const iso = COUNTRY_TO_ISO[countryName];
  return iso ? iso.toLowerCase() : null;
}

// Title text as it literally appears in real ingested sources - validates
// against the map above rather than accepting arbitrary capitalized words,
// so we don't mistake e.g. "World Cup" or a venue name for a country.
export function extractCountriesFromTitle(title: string): string[] {
  const known = [...Object.keys(COUNTRY_TO_ISO), ...Object.keys(SPECIAL_FLAGS)];
  const found = known.filter((name) =>
    new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(
      title
    )
  );
  // Longest-name-first dedupe: "Bosnia-Herzegovina" shouldn't also match a
  // shorter substring some other entry happens to contain.
  return [...new Set(found)];
}
