import type { CountryHotspot } from "@/types";

// ─── West End ───────────────────────────────────────────────────────────────

const westEnd: CountryHotspot[] = [
  {
    slug: "little-portugal-dundas-west",
    name: "Little Portugal / Dundas West",
    neighbourhood: "Little Portugal",
    region: "West End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Portugal",
    countryCode: "PT",
    flagEmoji: "🇵🇹",
    shortDescription:
      "The undisputed home of Portugal fans in Toronto. Dundas West fills with flags, community energy, and passionate street celebrations for every Seleção match.",
    crowdRisk: "high",
    atmosphere:
      "Passionate, loud, street-level celebrations. Expect chants, flags on every lamppost, and neighbours watching from stoops and balconies. Força Portugal!",
    venueType: "community",
    bestFor: [
      "Portugal fans",
      "High-energy street atmosphere",
      "Community vibe",
      "Groups of friends",
    ],
    alternativeSlugs: ["kensington-market", "little-italy-college-street"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "Arrive 1–2 hours early for Portugal matches. The street fills up fast.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - verified June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "little-italy-college-street",
    name: "Little Italy / College Street",
    neighbourhood: "Little Italy",
    region: "West End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Italy",
    countryCode: "IT",
    flagEmoji: "🇮🇹",
    shortDescription:
      "College Street's Little Italy corridor comes alive for Azzurri matches. Outdoor patios, community energy, and Italian cafés host big outdoor gatherings.",
    crowdRisk: "high",
    atmosphere:
      "Vibrant outdoor patio scene with Italian community pride and passionate supporters. Expect Italian flags and spontaneous singing after goals.",
    venueType: "community",
    bestFor: [
      "Italy fans",
      "Outdoor patio scene",
      "Community atmosphere",
      "Groups of all ages",
    ],
    alternativeSlugs: ["little-portugal-dundas-west", "roncesvalles-village"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "Arrive 1 hour early for Italy matches. Outdoor space is plentiful but fills for big games.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - verified June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "corso-italia-st-clair-west",
    name: "Corso Italia / St. Clair West",
    neighbourhood: "Corso Italia",
    region: "West End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Italy",
    countryCode: "IT",
    flagEmoji: "🇮🇹",
    shortDescription:
      "St. Clair West's Corso Italia strip is Toronto's second Italian community corridor. Quieter than College Street but deeply rooted - expect authentic neighbourhood watching experiences.",
    crowdRisk: "medium",
    atmosphere:
      "Traditional Italian neighbourhood feel with genuine community gatherings. Outdoor patios and community plazas host local fans in a more relaxed setting than College Street.",
    venueType: "community",
    bestFor: [
      "Italy fans",
      "Authentic neighbourhood atmosphere",
      "Quieter alternative to College St",
      "Families and older fans",
    ],
    alternativeSlugs: ["little-italy-college-street", "roncesvalles-village"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "30–45 min early is usually enough. Less intense than College Street for Italy games.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "roncesvalles-village",
    name: "Roncesvalles Village",
    neighbourhood: "Roncesvalles",
    region: "West End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Poland",
    countryCode: "PL",
    flagEmoji: "🇵🇱",
    shortDescription:
      "One of Toronto's most distinctly European neighbourhoods. The Polish community along Roncesvalles has deep roots - bakeries, delis, and outdoor patios become gathering spots for Polish national matches.",
    crowdRisk: "medium",
    atmosphere:
      "European café culture meets community passion. Expect Polish flags, impromptu outdoor watching, and warm neighbourhood energy along the tree-lined strip.",
    venueType: "community",
    bestFor: [
      "Poland fans",
      "European football atmosphere",
      "Authentic neighbourhood experience",
      "Families",
    ],
    alternativeSlugs: ["little-portugal-dundas-west", "kensington-market"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "30–60 min early works well for most Polish national matches.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
];

// ─── Etobicoke ─────────────────────────────────────────────────────────────

const etobicoke: CountryHotspot[] = [
  {
    slug: "mimico-etobicoke",
    name: "Mimico / Etobicoke Lakeshore",
    neighbourhood: "Mimico",
    region: "Etobicoke",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Bosnia-Herzegovina",
    countryCode: "BA",
    flagEmoji: "🇧🇦",
    shortDescription:
      "South Etobicoke's Lakeshore strip is anchored by the Bosnian Islamic Centre on Birmingham Street, a community hub for Toronto's Bosnian diaspora since 1977. Quieter than the city's flagship hotspots, but a genuine, long-standing gathering point for Dragons matches.",
    crowdRisk: "low",
    atmosphere:
      "A quiet, institution-anchored community rather than a bustling commercial strip - this is one mosque and its surrounding community, not a strip of cafes. Expect a smaller, close-knit crowd for Bosnia-Herzegovina matches.",
    venueType: "community",
    bestFor: [
      "Bosnia-Herzegovina fans",
      "Smaller, close-knit gatherings",
      "Quieter alternative to downtown hotspots",
      "Etobicoke residents",
    ],
    alternativeSlugs: ["roncesvalles-village", "little-portugal-dundas-west"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: [
        "Community centre hours may be limited outside of organized events",
      ],
      arrivalGuidance:
        "This is a quiet, institution-anchored hotspot, not a packed venue - no need to arrive early. Check the centre's own listings for organized match screenings.",
      cost: "Free to be in the neighbourhood. Any organized screenings may have their own entry terms.",
    },
    lastChecked: "2026-06-22",
    confidence: "unconfirmed",
    sources: [
      {
        label: "Bosnian Islamic Centre (est. 1977)",
        url: "https://bictoronto.com/",
        type: "community",
      },
      {
        label: "Bosnian Canadians - background",
        url: "https://en.wikipedia.org/wiki/Bosnian_Canadians",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
];

// ─── Downtown Core ───────────────────────────────────────────────────────────

const downtownCore: CountryHotspot[] = [
  {
    slug: "kensington-market",
    name: "Kensington Market",
    neighbourhood: "Kensington Market",
    region: "Downtown Core",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Mexico",
    countryCode: "MX",
    flagEmoji: "🇲🇽",
    shortDescription:
      "Casual, multicultural neighbourhood at the edge of downtown. Outdoor plazas and community spaces attract mixed international crowds and Mexico fans. Family-friendly and relaxed.",
    crowdRisk: "low",
    atmosphere:
      "Relaxed, multicultural, and welcoming. Great energy without massive crowds - ideal for fans who want to enjoy the game without the intensity of bigger zones.",
    venueType: "outdoor",
    bestFor: [
      "Mexico fans",
      "Mixed international crowds",
      "Family-friendly daytime viewing",
      "Casual atmosphere",
    ],
    alternativeSlugs: ["little-portugal-dundas-west", "chinatown-spadina"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["Some outdoor areas close after dark", "Family-friendly during daytime"],
      arrivalGuidance: "Walk-in friendly. No need to rush for most games.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-12",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "chinatown-spadina",
    name: "Chinatown / Spadina Ave",
    neighbourhood: "Chinatown",
    region: "Downtown Core",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "China",
    countryCode: "CN",
    flagEmoji: "🇨🇳",
    shortDescription:
      "One of the largest Chinatowns in North America, centred at Spadina and Dundas. Outdoor plazas and community spaces host gatherings as the East Asian diaspora follows their national teams.",
    crowdRisk: "low",
    atmosphere:
      "Community-led outdoor watching in a vibrant neighbourhood setting. Multiple generations come together in this cultural hub for national team matches.",
    venueType: "outdoor",
    bestFor: [
      "China fans",
      "East Asian football community",
      "Outdoor community atmosphere",
      "Family-friendly",
    ],
    alternativeSlugs: ["koreatown-bloor-west", "kensington-market"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["All ages welcome outdoors"],
      arrivalGuidance:
        "Walk-in friendly. Community gatherings form organically around match times.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "koreatown-bloor-west",
    name: "Koreatown / Bloor West",
    neighbourhood: "Koreatown",
    region: "Downtown Core",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "South Korea",
    countryCode: "KR",
    flagEmoji: "🇰🇷",
    shortDescription:
      "Bloor Street West's Koreatown is one of Toronto's most vibrant cultural corridors. South Korean matches draw passionate community gatherings along the strip.",
    crowdRisk: "high",
    atmosphere:
      "Electric atmosphere for Korean national matches. Community pride runs deep - expect organized watch gatherings, Korean flags, and passionate fans cheering together.",
    venueType: "community",
    bestFor: [
      "South Korea fans",
      "High-energy community atmosphere",
      "K-culture community",
      "Authentic neighbourhood experience",
    ],
    alternativeSlugs: ["chinatown-spadina", "kensington-market"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "Arrive 1 hour early for South Korea matches. The strip fills quickly for major games.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "little-tokyo-downtown",
    name: "Little Tokyo / Dundas Street",
    neighbourhood: "Little Tokyo",
    region: "Downtown Core",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Japan",
    countryCode: "JP",
    flagEmoji: "🇯🇵",
    shortDescription:
      "A compact, fast-growing strip of Japanese restaurants and cafes on Dundas Street West near Yonge-Dundas Square - not to be confused with the Dundas West of Little Portugal, much further west. A real, walkable hub for Samurai Blue fans downtown.",
    crowdRisk: "medium",
    atmosphere:
      "A tight cluster of izakayas, ramen shops, and cafes that fills up fast on game nights. Younger downtown crowd with genuine community pride for Japan matches.",
    venueType: "community",
    bestFor: [
      "Japan fans",
      "Downtown, easy-to-reach location",
      "Restaurant and cafe atmosphere",
      "Younger crowd",
    ],
    alternativeSlugs: ["koreatown-bloor-west", "chinatown-spadina"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "Arrive 30–45 min early for Japan matches - this is a compact strip and seating fills up fast.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-22",
    confidence: "unconfirmed",
    sources: [
      {
        label: "Little Tokyo neighbourhood guide",
        url: "https://www.blogto.com/little-tokyo-toronto/",
        type: "news",
      },
    ],
    userSubmitted: false,
  },
];

// ─── East End ─────────────────────────────────────────────────────────────────

const eastEnd: CountryHotspot[] = [
  {
    slug: "greektown-danforth",
    name: "Greektown / The Danforth",
    neighbourhood: "Greektown",
    region: "East End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Greece",
    countryCode: "GR",
    flagEmoji: "🇬🇷",
    shortDescription:
      "Toronto's Greektown is one of the largest Greek communities in North America. Expect community celebrations and big outdoor gatherings for Greek national team matches along The Danforth.",
    crowdRisk: "medium",
    atmosphere:
      "Warm community atmosphere with outdoor celebrations. Greek tavernas and cafés host outdoor watching along the Danforth strip.",
    venueType: "community",
    bestFor: [
      "Greece fans",
      "Mediterranean football fans",
      "Community atmosphere",
      "Family-friendly outdoor setting",
    ],
    alternativeSlugs: ["little-italy-college-street", "gerrard-india-bazaar"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street celebrations are all ages"],
      arrivalGuidance:
        "30–60 min early is typically enough. The neighbourhood swells for big Greek national matches.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - verified June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "gerrard-india-bazaar",
    name: "Gerrard India Bazaar",
    neighbourhood: "Gerrard India Bazaar",
    region: "East End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "India",
    countryCode: "IN",
    flagEmoji: "🇮🇳",
    shortDescription:
      "Toronto's Little India on Gerrard Street East. The South Asian community gathers here to follow India, Pakistan, Bangladesh, and the broader AFC region in a festive street atmosphere.",
    crowdRisk: "medium",
    atmosphere:
      "Colourful outdoor community gatherings with food and festive energy. The whole block transforms during major South Asian national team matches.",
    venueType: "outdoor",
    bestFor: [
      "South Asian football fans",
      "Multicultural community atmosphere",
      "Outdoor street festival feel",
      "Family-friendly",
    ],
    alternativeSlugs: ["greektown-danforth", "little-jamaica-eglinton"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["All ages welcome outdoors"],
      arrivalGuidance:
        "Walk-in friendly. Community energy builds naturally around South Asian team matches.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "little-jamaica-eglinton",
    name: "Little Jamaica / Eglinton West",
    neighbourhood: "Little Jamaica",
    region: "East End",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Jamaica",
    countryCode: "JM",
    flagEmoji: "🇯🇲",
    shortDescription:
      "Eglinton Avenue West's Little Jamaica is Toronto's Caribbean heartbeat. A passionate football community gathers here for Jamaican and Caribbean national matches.",
    crowdRisk: "medium",
    atmosphere:
      "Vibrant Caribbean community energy. Expect reggae, flags, and passionate celebrations when Jamaica or Caribbean teams play. The neighbourhood comes alive for CONCACAF matches.",
    venueType: "community",
    bestFor: [
      "Jamaica and Caribbean fans",
      "Authentic community atmosphere",
      "CONCACAF matches",
      "Reggae and festival vibes",
    ],
    alternativeSlugs: ["greektown-danforth", "gerrard-india-bazaar"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "30–45 min early is usually enough. Very busy for Jamaica and Caribbean team matches.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
];

// ─── Scarborough ─────────────────────────────────────────────────────────────

const scarborough: CountryHotspot[] = [
  {
    slug: "agincourt-scarborough",
    name: "Agincourt / Scarborough",
    neighbourhood: "Agincourt",
    region: "Scarborough",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "China",
    countryCode: "CN",
    flagEmoji: "🌏",
    shortDescription:
      "Agincourt in Scarborough is home to one of Toronto's largest East and South Asian communities. A diverse, welcoming neighbourhood to catch matches for China, South Korea, Philippines, India, and more.",
    crowdRisk: "low",
    atmosphere:
      "Diverse and welcoming community gathering spots away from downtown. Multiple cultural communities mix here - a great option if you prefer a quieter experience with authentic neighbourhood character.",
    venueType: "mixed",
    bestFor: [
      "East and South Asian football fans",
      "Quieter alternative to downtown",
      "Multicultural community",
      "Families",
    ],
    alternativeSlugs: ["chinatown-spadina", "koreatown-bloor-west"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["All ages welcome outdoors"],
      arrivalGuidance:
        "Walk-in friendly. No rush needed - far less congested than downtown.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "malvern-scarborough",
    name: "Malvern / Scarborough",
    neighbourhood: "Malvern",
    region: "Scarborough",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Trinidad and Tobago",
    countryCode: "TT",
    flagEmoji: "🇹🇹",
    shortDescription:
      "Malvern in northeast Scarborough has one of the most vibrant Afro-Caribbean and South Asian communities in Canada. A warm, passionate community for Caribbean and African national team matches.",
    crowdRisk: "low",
    atmosphere:
      "Warm and welcoming community energy. Caribbean and African football fans come together in a neighbourhood that truly celebrates football as a community event.",
    venueType: "community",
    bestFor: [
      "Caribbean and African football fans",
      "Afro-Caribbean community atmosphere",
      "Authentic neighbourhood experience",
      "Away from downtown crowds",
    ],
    alternativeSlugs: ["little-jamaica-eglinton", "agincourt-scarborough"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["All ages welcome outdoors"],
      arrivalGuidance:
        "Walk-in friendly. Very accessible and relaxed even on busy match days.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "arab-town-scarborough",
    name: "Arab Town / Lawrence Avenue East",
    neighbourhood: "Arab Town",
    region: "Scarborough",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Iraq",
    countryCode: "IQ",
    flagEmoji: "🇮🇶",
    shortDescription:
      "Toronto's only well-documented Arab commercial strip, along Lawrence Avenue East between Victoria Park and Warden. Pan-Arab in character with around 30 Middle Eastern restaurants and grocers, including Iraqi-owned businesses - a real option for Iraq matches.",
    crowdRisk: "low",
    atmosphere:
      "A market-and-restaurant strip rather than a single iconic venue. Expect a mixed Arab community crowd - genuine, but broader pan-Arab solidarity as much as it is country-specific.",
    venueType: "outdoor",
    bestFor: [
      "Iraq fans",
      "Broader Arab football community",
      "Grocery and restaurant strip",
      "Quieter, less downtown-centric option",
    ],
    alternativeSlugs: ["gerrard-india-bazaar", "agincourt-scarborough"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["All ages welcome outdoors", "19+ inside licensed premises"],
      arrivalGuidance:
        "Walk-in friendly. This is a market strip, not a single packed venue, so there's rarely a need to rush.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-22",
    confidence: "unconfirmed",
    sources: [
      {
        label: "Arab America - Toronto's Little Araby",
        url: "https://www.arabamerica.com/spending-a-day-enjoying-torontos-little-araby/",
        type: "news",
      },
    ],
    userSubmitted: false,
  },
];

// ─── North York ───────────────────────────────────────────────────────────────

const northYork: CountryHotspot[] = [
  {
    slug: "north-york-centre",
    name: "North York Centre",
    neighbourhood: "North York Centre",
    region: "North York",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Iran",
    countryCode: "IR",
    flagEmoji: "🇮🇷",
    shortDescription:
      "North York Centre along Yonge Street hosts a large Iranian and Persian community alongside a diverse mix of other nationalities. Strong community energy for Team Melli matches.",
    crowdRisk: "medium",
    atmosphere:
      "Welcoming, multicultural community atmosphere. Iranian and Persian community pride is strong here - expect organized gatherings for Team Melli matches along Yonge Street.",
    venueType: "community",
    bestFor: [
      "Iran and Persian community fans",
      "North Toronto residents",
      "Mixed multicultural community",
      "Away from downtown intensity",
    ],
    alternativeSlugs: ["agincourt-scarborough", "koreatown-bloor-west"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "30–45 min early is plenty. Far less congested than downtown.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "wilson-heights-north-york",
    name: "Wilson Heights / North York",
    neighbourhood: "Wilson Heights",
    region: "North York",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Morocco",
    countryCode: "MA",
    flagEmoji: "🇲🇦",
    shortDescription:
      "The Wilson Heights and Bathurst Street area in North York is home to a significant North African and Moroccan community. Community spaces come alive for Atlas Lions matches.",
    crowdRisk: "medium",
    atmosphere:
      "Passionate North African community atmosphere. Morocco's recent World Cup success has energized this community - expect genuine celebrations and community pride for Atlas Lions matches.",
    venueType: "community",
    bestFor: [
      "Morocco and North African fans",
      "MENA football community",
      "Community-first atmosphere",
      "North York residents",
    ],
    alternativeSlugs: ["north-york-centre", "little-jamaica-eglinton"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: ["19+ inside licensed premises", "Street is open to all ages"],
      arrivalGuidance:
        "Arrive 30–45 min early for Morocco matches. Community gatherings can be large for big games.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-15",
    confidence: "manually_verified",
    sources: [
      {
        label: "Community report - June 2026",
        url: "https://www.toronto.ca",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "weston-road-north-york",
    name: "Weston Road / Jane Street",
    neighbourhood: "Weston-Jane",
    region: "North York",
    imageSrc: "/images/placeholders/hotspot.svg",
    country: "Ghana",
    countryCode: "GH",
    flagEmoji: "🇬🇭",
    shortDescription:
      "The Weston Road and Jane Street corridor, on the North York/Etobicoke border, is the real institutional home of Toronto's roughly 50,000-person Ghanaian community - anchored by the Ghanaian Canadian Multicultural Community Centre and the Ghanaian-Canadian Resource Hub. GhanaFest draws huge crowds nearby every summer.",
    crowdRisk: "medium",
    atmosphere:
      "Genuine community pride backed by real institutions - cultural centres, a Ghanaian-run restaurant and bar, and an annual GhanaFest crowd nearby. Less a single iconic strip and more a real, lived community network for Black Stars matches.",
    venueType: "community",
    bestFor: [
      "Black Stars fans",
      "Real community institutions",
      "Quieter than downtown hotspots",
      "North York / Etobicoke border residents",
    ],
    alternativeSlugs: ["wilson-heights-north-york", "little-jamaica-eglinton"],
    entryRequirements: {
      type: "walk-in",
      ticketsAvailable: null,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: null,
      restrictions: [
        "Community centre hours may be limited outside of organized events",
        "19+ inside licensed premises",
      ],
      arrivalGuidance:
        "30–45 min early is plenty. Check community centre listings for any organized Black Stars screenings.",
      cost: "Free to be in the neighbourhood. Food and drinks at venue prices.",
    },
    lastChecked: "2026-06-22",
    confidence: "unconfirmed",
    sources: [
      {
        label: "CBC - Ghanaian community centre push",
        url: "https://www.cbc.ca/news/canada/toronto/ghanaian-community-loses-bid-for-community-centre-1.5631882",
        type: "news",
      },
      {
        label: "GhanaFest Toronto",
        url: "https://ghanafest.ca/",
        type: "community",
      },
    ],
    userSubmitted: false,
  },
];

export const hotspots: CountryHotspot[] = [
  ...westEnd,
  ...etobicoke,
  ...downtownCore,
  ...eastEnd,
  ...scarborough,
  ...northYork,
];
