import { fanZones } from "@/data/fan-zones";
import { hotspots } from "@/data/hotspots";
import { areas } from "@/data/areas";
import { upcomingGames } from "@/data/games";
import { misconceptions } from "@/data/misconceptions";
import type {
  OfficialFanZone,
  CountryHotspot,
  AreaGuide,
  Game,
  MisconceptionFAQ,
  QuickPick,
} from "@/types";

// Fan Zones
export function getAllFanZones(): OfficialFanZone[] {
  return fanZones;
}

export function getFanZoneBySlug(slug: string): OfficialFanZone | undefined {
  return fanZones.find((z) => z.slug === slug);
}

// Hotspots
export function getAllHotspots(): CountryHotspot[] {
  return hotspots;
}

export function getHotspotBySlug(slug: string): CountryHotspot | undefined {
  return hotspots.find((h) => h.slug === slug);
}

export function getHotspotsByCountry(country: string): CountryHotspot[] {
  return hotspots.filter(
    (h) => h.country.toLowerCase() === country.toLowerCase()
  );
}

// Areas
export function getAllAreas(): AreaGuide[] {
  return areas;
}

export function getAreaBySlug(slug: string): AreaGuide | undefined {
  return areas.find((a) => a.slug === slug);
}

// Games
export function getUpcomingGames(): Game[] {
  return upcomingGames;
}

export function getNextGame(): Game | undefined {
  const now = new Date();
  return upcomingGames.find((g) => new Date(g.dateTime) > now);
}

// Misconceptions
export function getMisconceptions(): MisconceptionFAQ[] {
  return misconceptions;
}

// Quick Picks (curated top 3 for homepage)
export function getQuickPicks(): QuickPick[] {
  return [
    {
      slug: "harbourfront-centre",
      type: "fan-zone",
      name: "Harbourfront Centre",
      label: "Best for Canada games",
      tagline: "Arrive 2–3 hours early for Canada matches",
      crowdRisk: "high",
      entryType: "free",
      imageSrc:
        "https://nowtoronto.com/wp-content/uploads/2026/06/canada-soccer-house.png",
    },
    {
      slug: "little-portugal-dundas-west",
      type: "hotspot",
      name: "Little Portugal / Dundas West",
      label: "Best Portuguese atmosphere",
      tagline: "Bars, cafés & restaurants - very busy for Portugal games",
      crowdRisk: "high",
      entryType: "walk-in",
      imageSrc: "/images/quick-picks/little-portugal.svg",
    },
    {
      slug: "nathan-phillips-square",
      type: "fan-zone",
      name: "Nathan Phillips Square",
      label: "Best near downtown office",
      tagline: "Flagship City Hall fan zone - free with ticket",
      crowdRisk: "packed",
      entryType: "free",
      imageSrc: "/images/venues/nathan-phillips.jpg",
    },
  ];
}

// Related fan zones by slugs
export function getFanZonesBySlug(slugs: string[]): OfficialFanZone[] {
  return slugs
    .map((slug) => fanZones.find((z) => z.slug === slug))
    .filter((z): z is OfficialFanZone => z !== undefined);
}

export function getHotspotsBySlug(slugs: string[]): CountryHotspot[] {
  return slugs
    .map((slug) => hotspots.find((h) => h.slug === slug))
    .filter((h): h is CountryHotspot => h !== undefined);
}
