export type Confidence =
  | "official"
  | "manually_verified"
  | "user_submitted"
  | "unconfirmed";

export type CrowdRisk = "low" | "medium" | "high" | "packed";

export type EntryType =
  | "free"
  | "ticketed"
  | "reservation"
  | "walk-in"
  | "unclear";

export interface SourceInfo {
  label: string;
  url: string;
  type: "official" | "news" | "community";
}

export interface TrustMeta {
  lastChecked: string; // ISO date "2026-06-15"
  confidence: Confidence;
  sources: SourceInfo[];
  userSubmitted: boolean;
}

export interface EntryRequirements {
  type: EntryType;
  ticketsAvailable: boolean | null;
  reservationGuaranteesEntry: boolean | null;
  dayOfDropAdvisory: boolean;
  officialTicketUrl: string | null;
  restrictions: string[];
  arrivalGuidance: string | null;
  cost: string | null;
}

export interface ArrivalTime {
  gameType: string;
  timing: string;
}

export interface InfoSection {
  icon: string;
  label: string;
  bullets: string[];
}

export interface LocalFAQ {
  question: string;
  answer: string;
}

export interface UsefulLink {
  icon: string;
  label: string;
  url: string;
}

export interface NearbyAlternativeEntry {
  slug: string;
  distanceKm: number;
  walkMinutes: number;
}

export interface ScheduleEntry {
  date: string;   // e.g. "Sat, June 20"
  hours: string;  // e.g. "11:00am → 10:30pm"
}

export interface OfficialFanZone extends TrustMeta {
  slug: string;
  name: string;
  neighbourhood: string;
  shortDescription: string;
  imageSrc?: string;
  entryRequirements: EntryRequirements;
  crowdRisk: CrowdRisk;
  capacity: number | null;
  isOutdoor: boolean;
  alternativeSlugs: string[];
  screeningConfirmed: boolean | null;
  bestFor: string[];
  notIdealFor: string[];
  arrivalTimes?: ArrivalTime[];
  veryBusyGames?: string[];
  lessBusyGames?: string[];
  address?: string;
  websiteLabel?: string;
  quickAnswerSummary?: string;
  customBadges?: string[];
  infoSections?: InfoSection[];
  localFaqs?: LocalFAQ[];
  usefulLinks?: UsefulLink[];
  nearbyAlternatives?: NearbyAlternativeEntry[];
  schedule?: ScheduleEntry[];
}

export type HotspotRegion =
  | "West End"
  | "Etobicoke"
  | "Downtown Core"
  | "East End"
  | "Scarborough"
  | "North York";

export interface CountryHotspot extends TrustMeta {
  slug: string;
  name: string;
  neighbourhood: string;
  region: HotspotRegion;
  shortDescription: string;
  imageSrc?: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  flagEmoji: string;
  entryRequirements: EntryRequirements;
  crowdRisk: CrowdRisk;
  atmosphere: string | null;
  venueType: "outdoor" | "community" | "mixed";
  bestFor: string[];
  alternativeSlugs: string[];
}

export interface AreaGuide extends TrustMeta {
  slug: string;
  name: string;
  description: string;
  fanZoneSlugs: string[];
  hotspotSlugs: string[];
  arrivalGuidanceBusy: string | null;
  arrivalGuidanceQuiet: string | null;
  highlights: string[];
}

export interface MisconceptionFAQ {
  id: string;
  question: string;
  answer: string;
  severity: "high" | "medium";
}

export interface Game {
  id: string;
  teams: [string, string];
  dateTime: string; // ISO datetime
  groupStage: boolean;
  crowdRiskMultiplier: "low" | "high";
  venue: string;
}

export interface QuickPick {
  slug: string;
  type: "fan-zone" | "hotspot" | "area";
  name: string;
  label: string;
  tagline: string;
  crowdRisk: CrowdRisk;
  entryType: EntryType;
  imageSrc?: string;
}

export type CommunityEventType =
  | "watch-party"
  | "screening"
  | "street-festival"
  | "march"
  | "other";

export type EventVisibility = "public" | "shelved";

export type VenueCategory =
  | "licensed_venue"
  | "restaurant"
  | "community_space"
  | "outdoor"
  | "official"
  | "unknown";

export type ShelvedReason =
  | "alcohol_venue_guardrails_pending"
  | "needs_review";

export interface CommunityEvent extends TrustMeta {
  slug: string;
  name: string;
  eventType: CommunityEventType;
  startDateTime: string;
  endDateTime: string | null;
  neighbourhood: string;
  venueName: string | null;
  // Most real events are a "Team A vs Team B" watch party relevant to fans
  // of both, not one - empty array means no specific country affinity.
  relatedCountries: string[];
  entryType: EntryType;
  sourceSignalId: string | null;
  visibility: EventVisibility;
  venueCategory: VenueCategory;
  shelvedReason?: ShelvedReason;
}

export interface CandidateSignal {
  id: string;
  sourceType:
    | "ticketmaster"
    | "eventbrite"
    | "toronto_open_data"
    | "reddit"
    | "official_page"
    | "football_data";
  sourceUrl: string;
  fetchedAt: string; // ISO timestamp of the ingestion run
  rawTitle: string;
  rawText: string;
  parsedGuess: Partial<OfficialFanZone | CountryHotspot | CommunityEvent | Game>;
  status: "needs_review" | "approved" | "rejected" | "published";
  dedupeKey: string; // hash(sourceType + external id) - keeps reruns idempotent
  reviewHints?: string[];
}
