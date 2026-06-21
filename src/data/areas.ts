import type { AreaGuide } from "@/types";

export const areas: AreaGuide[] = [
  {
    slug: "downtown-core",
    name: "Downtown Core",
    description:
      "Home to the biggest official fan zones and highest foot traffic during the World Cup. Expect massive crowds for knockout games.",
    fanZoneSlugs: ["nathan-phillips-square"],
    hotspotSlugs: [],
    arrivalGuidanceBusy:
      "Arrive 2–3 hours early for knockout games. Expect transit delays - TTC will be very busy.",
    arrivalGuidanceQuiet:
      "45–60 min early is usually enough for group stage weekday games.",
    highlights: [
      "Nathan Phillips Square - flagship fan zone",
      "Transit-accessible from all subway lines",
      "Bars and restaurants along King and Queen St",
    ],
    lastChecked: "2026-06-16",
    confidence: "manually_verified",
    sources: [
      {
        label: "City of Toronto - Fan Zone Info",
        url: "https://www.toronto.ca/explore-enjoy/festivals-events/toronto-celebrates-2026-fifa-world-cup/",
        type: "official",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "little-portugal",
    name: "Little Portugal (Dundas West)",
    description:
      "Toronto's most passionate neighbourhood for the World Cup. Street parties, bar patios, and community energy unlike anywhere else in the city.",
    fanZoneSlugs: [],
    hotspotSlugs: ["little-portugal-dundas-west", "little-italy-college-street"],
    arrivalGuidanceBusy:
      "Arrive 1–2 hours early for Portugal games. Streets fill up fast.",
    arrivalGuidanceQuiet:
      "30–45 min early works for non-Portugal games. Bars are more relaxed.",
    highlights: [
      "Dundas West strip - multiple bars & restaurants",
      "Street celebrations during Portugal games",
      "Community-driven atmosphere",
    ],
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community verification - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "waterfront",
    name: "Waterfront",
    description:
      "Harbourfront Centre and the waterfront trail offer a scenic, high-capacity outdoor viewing experience. Great for families and big groups.",
    fanZoneSlugs: ["harbourfront-centre"],
    hotspotSlugs: [],
    arrivalGuidanceBusy:
      "Arrive 2+ hours early for knockout games. Parking is limited - take TTC or walk from Union Station.",
    arrivalGuidanceQuiet: "45–60 min early is fine for most group stage games.",
    highlights: [
      "Large outdoor screens by the lake",
      "Walk from Union Station (15 min)",
      "Family-friendly layout",
    ],
    lastChecked: "2026-06-16",
    confidence: "manually_verified",
    sources: [
      {
        label: "Harbourfront Centre",
        url: "https://www.harbourfrontcentre.com",
        type: "official",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "king-west-liberty-village",
    name: "King West / Liberty Village",
    description:
      "Popular destination for after-work World Cup viewing. Mix of official venues (STACKT, Exhibition Place) and bars with great screens.",
    fanZoneSlugs: ["stackt-market", "toronto-official-fan-festival"],
    hotspotSlugs: [],
    arrivalGuidanceBusy:
      "Arrive 90 min–2 hours early for Canada or big games. King St streetcar gets packed.",
    arrivalGuidanceQuiet: "30–60 min early works for group stage weekday games.",
    highlights: [
      "STACKT Market - outdoor container market",
      "Toronto Official Fan Festival - highest capacity in the city",
      "Multiple sports bars in Liberty Village",
    ],
    lastChecked: "2026-06-14",
    confidence: "manually_verified",
    sources: [
      {
        label: "STACKT Market",
        url: "https://stacktmarket.com",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "near-union-station",
    name: "Near Union Station",
    description:
      "Excellent transit hub area with multiple viewing spots a short walk from GO Transit, TTC, and UP Express. Best for commuters.",
    fanZoneSlugs: [],
    hotspotSlugs: [],
    arrivalGuidanceBusy:
      "Transit is fast but very busy after games. Allow extra time to get in and out.",
    arrivalGuidanceQuiet: "Transit is efficient. Walk-in spots easy to access.",
    highlights: [
      "CIBC Square public screens - steps from Union",
      "Multiple bars and restaurants on Front St",
      "Easy GO / TTC / UP Express access",
    ],
    lastChecked: "2026-06-13",
    confidence: "manually_verified",
    sources: [
      {
        label: "City of Toronto",
        url: "https://www.toronto.ca",
        type: "official",
      },
    ],
    userSubmitted: false,
  },
];
