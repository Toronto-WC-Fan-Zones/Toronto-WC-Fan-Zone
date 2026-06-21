import type { OfficialFanZone } from "@/types";

export const fanZones: OfficialFanZone[] = [
  {
    slug: "harbourfront-centre",
    name: "Harbourfront Centre",
    neighbourhood: "Waterfront",
    address: "235 Queens Quay W, Toronto",
    websiteLabel: "Canada Soccer House Toronto",
    shortDescription:
      "Canada Soccer's official fan destination by the waterfront. Large outdoor public screenings with activations, a floating futsal pitch, and festival atmosphere.",
    quickAnswerSummary:
      "Admission is free. Reservations are encouraged, but walk-ins are welcome. Reservation gives a preferred access window for the first hour after gates open. Canada games are busiest - arrive at least 1 hour early.",
    imageSrc:
      "https://nowtoronto.com/wp-content/uploads/2026/06/canada-soccer-house.png",
    crowdRisk: "high",
    capacity: 8000,
    isOutdoor: true,
    screeningConfirmed: true,
    customBadges: ["Reservation preferred", "Walk-ins allowed", "Busy for Canada games"],
    bestFor: [
      "Big outdoor crowd",
      "Festival vibe",
      "Groups of friends",
      "Good energy",
    ],
    notIdealFor: [
      "People arriving late",
      "Those wanting guaranteed seating",
      "Anyone who dislikes crowds",
    ],
    alternativeSlugs: ["nathan-phillips-square", "stackt-market"],
    arrivalTimes: [
      { gameType: "Normal group stage", timing: "45–90 min early" },
      { gameType: "Canada games", timing: "At least 1 hour early" },
      { gameType: "Knockout / Final", timing: "2–4 hours early" },
    ],
    veryBusyGames: [
      "Canada games",
      "Evening weekend matches",
      "Knockout rounds",
      "Final",
    ],
    lessBusyGames: [
      "Weekday afternoon games",
      "Smaller group stage matches",
    ],
    infoSections: [
      {
        icon: "📍",
        label: "Location & address",
        bullets: [
          "235 Queens Quay W, Toronto, ON M5J 1B4",
          "Harbourfront Centre - main waterfront site",
          "TTC: Queens Quay streetcar (509/510) to Rees St. stop",
          "Parking available at Harbourfront Centre garage",
        ],
      },
      {
        icon: "📅",
        label: "Reservation policy",
        bullets: [
          "Reservations encouraged - pre-register on the official Canada Soccer House site",
          "Preferred access window: first hour after gate opening",
          "Arrival more than one hour after opening is not guaranteed",
        ],
      },
      {
        icon: "👤",
        label: "Walk-in process",
        bullets: [
          "Walk-ins are welcome at any time",
          "Scan QR code at entry and complete a short check-in form",
          "If at capacity, a line forms outside - entry resumes as people leave",
        ],
      },
      {
        icon: "⏱",
        label: "Best arrival time",
        bullets: [
          "Canada games: arrive at least 1 hour early",
          "Peak match days may have temporary access restrictions",
          "General group stage: 45–90 min early is usually enough",
        ],
      },
      {
        icon: "🎯",
        label: "Activities & activations",
        bullets: [
          "Football-related challenges and prize activations on-site",
          "Floating futsal pitch at the waterfront - Canada's first",
          "Drop-in and online booking available for the futsal pitch",
        ],
      },
      {
        icon: "👜",
        label: "Bag & entry policy",
        bullets: [
          "Small clutch bags (max 4.5\" × 6.5\") and clear bags (max 12\" × 6\" × 12\") allowed",
          "Backpacks not permitted except approved medical or childcare needs",
          "No glass containers or metal bottles",
          "All bags subject to security inspection at entry",
        ],
      },
      {
        icon: "🕐",
        label: "Dates & hours",
        bullets: [
          "Open on select World Cup match days - see upcoming schedule below",
          "Hours vary by match day; check official site for any changes",
        ],
      },
    ],
    schedule: [
      { date: "Sat, June 20", hours: "11:00am → 10:30pm" },
      { date: "Tue, June 23", hours: "11:00am → 9:30pm" },
      { date: "Wed, June 24", hours: "12:00pm → 11:30pm" },
      { date: "Fri, June 26", hours: "1:00pm → 10:30pm" },
      { date: "Wed, July 1", hours: "11:00am → 11:00pm" },
      { date: "Thu, July 2", hours: "1:00pm → 10:00pm" },
    ],
    localFaqs: [
      {
        question: "Do walk-ins need a reservation?",
        answer: "No. Walk-ins are welcome. Reservations are encouraged for a preferred access window during the first hour after gates open.",
      },
      {
        question: "What happens if capacity is reached?",
        answer: "If at capacity, a line forms outside and entry resumes as people leave. This is most likely during Canada games.",
      },
      {
        question: "Does reservation guarantee entry all day?",
        answer: "No. It provides a preferred access window for the first hour after gates open only.",
      },
    ],
    usefulLinks: [
      {
        icon: "🌐",
        label: "Official event page",
        url: "https://harbourfrontcentre.com/event/ge-appliances-canada-soccer-house/",
      },
      {
        icon: "❓",
        label: "Canada Soccer House FAQ",
        url: "https://canadasoccerhouse.ca/en/toronto/faq",
      },
      {
        icon: "⚽",
        label: "Book floating futsal pitch",
        url: "https://www.sportchekharbourfrontfc.com/book",
      },
    ],
    nearbyAlternatives: [
      { slug: "nathan-phillips-square", distanceKm: 0.8, walkMinutes: 10 },
      { slug: "stackt-market", distanceKm: 1.1, walkMinutes: 14 },
    ],
    entryRequirements: {
      type: "free",
      ticketsAvailable: true,
      reservationGuaranteesEntry: false,
      dayOfDropAdvisory: false,
      officialTicketUrl:
        "https://canadasoccerhouse.ca/en/toronto",
      restrictions: [
        "Small clutch bags (max 4.5\" × 6.5\") or clear bags (max 12\" × 6\" × 12\") only",
        "No backpacks (except approved medical/childcare needs)",
        "No glass containers or metal bottles",
        "All bags subject to security inspection",
        "All ages welcome",
      ],
      arrivalGuidance:
        "Canada games: arrive at least 1 hour early. Normal group stage: 45–90 min early.",
      cost: "Free",
    },
    lastChecked: "2026-06-16",
    confidence: "official",
    sources: [
      {
        label: "Harbourfront Centre - Canada Soccer House",
        url: "https://harbourfrontcentre.com/event/ge-appliances-canada-soccer-house/",
        type: "official",
      },
      {
        label: "Canada Soccer House FAQ",
        url: "https://canadasoccerhouse.ca/en/toronto/faq",
        type: "official",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "nathan-phillips-square",
    name: "Nathan Phillips Square",
    neighbourhood: "Downtown Core",
    address: "100 Queen St W, Toronto, ON M5H 2N2",
    websiteLabel: "City of Toronto - Match Broadcasts",
    shortDescription:
      "Toronto's flagship outdoor fan zone in front of City Hall. Completely free - no tickets, no reservation. Select matches only. Visa mini-pitches on-site.",
    quickAnswerSummary:
      "Completely free - no tickets, no reservation needed. Just show up. Note: only select matches are broadcast here, not every game. Check the schedule before heading out. Two Visa mini-pitches on-site for pick-up soccer.",
    imageSrc: "/images/venues/nathan-phillips.jpg",
    crowdRisk: "high",
    capacity: 15000,
    isOutdoor: true,
    screeningConfirmed: true,
    customBadges: ["100% free", "No tickets", "Select matches only"],
    bestFor: [
      "Big outdoor crowd energy",
      "Festival atmosphere",
      "Groups of friends",
      "Canada games",
      "Pick-up soccer on mini-pitches",
    ],
    notIdealFor: [
      "Anyone wanting to watch every match - select games only",
      "Those wanting guaranteed seating",
      "Anyone who dislikes very large crowds",
    ],
    alternativeSlugs: ["harbourfront-centre", "stackt-market"],
    veryBusyGames: [
      "Canada games",
      "Knockout rounds",
      "Evening weekend games",
      "Final",
    ],
    lessBusyGames: [
      "Weekday afternoon group stage games",
      "Lower-profile matchups",
    ],
    infoSections: [
      {
        icon: "📍",
        label: "Location & address",
        bullets: [
          "100 Queen St W, Toronto, ON M5H 2N2 - in front of City Hall",
          "TTC: Osgoode station (Line 1) - direct access",
          "Queen streetcar (501) stops at the square",
          "No dedicated parking - use nearby lots or transit",
        ],
      },
      {
        icon: "🎟",
        label: "Entry - completely free",
        bullets: [
          "Free entry with no tickets, no reservations, and no sign-up required",
          "Walk up and join the crowd - no advance registration of any kind",
          "All ages welcome",
        ],
      },
      {
        icon: "📺",
        label: "What's broadcast here",
        bullets: [
          "Only select matches are broadcast - not every World Cup game",
          "The viewing schedule is subject to change",
          "Matches not listed on the official schedule will NOT be shown",
          "Always check the City of Toronto schedule before heading out",
        ],
      },
      {
        icon: "⚽",
        label: "Visa mini-pitches",
        bullets: [
          "Two 5-a-side Visa mini-pitches available in the square",
          "Drop-in and open to the public",
          "Great for warming up before a match or playing between games",
        ],
      },
      {
        icon: "🎯",
        label: "Activations & events",
        bullets: [
          "Activations and events vary by match day - some days feature extras",
          "Check the City of Toronto events page for specific day programming",
        ],
      },
    ],
    schedule: [
      { date: "Sat, June 21", hours: "Noon · 3pm · 6pm · 9pm" },
      { date: "Mon, June 22", hours: "1pm · 5pm · 8pm · 11pm" },
      { date: "Tue, June 23", hours: "1pm · 4pm · 7pm · 10pm" },
      { date: "Wed, June 24", hours: "3pm · 6pm · 9pm - Canada game" },
      { date: "Mon, June 29", hours: "4:30pm · 9pm - Round of 32" },
      { date: "Tue, June 30", hours: "1pm · 5pm · 9pm - Round of 32" },
      { date: "Wed, July 1", hours: "8pm - Round of 32" },
      { date: "Thu, July 2", hours: "3pm · 7pm · 11pm - Round of 32" },
      { date: "Sat, July 4", hours: "1pm - Round of 16" },
      { date: "Mon, July 6", hours: "3pm · 11pm - Round of 16" },
      { date: "Tue, July 7", hours: "Noon · 4pm - Round of 16" },
      { date: "Tue, July 14", hours: "3pm - Semi Finals" },
      { date: "Wed, July 15", hours: "3pm - Semi Finals" },
      { date: "Sat, July 18", hours: "5pm - Bronze Final" },
      { date: "Sun, July 19", hours: "3pm - Championship Final" },
    ],
    localFaqs: [
      {
        question: "Do I need a ticket or reservation?",
        answer: "No. Completely free - no ticket, no reservation, no sign-up. Just show up.",
      },
      {
        question: "Is every World Cup game shown here?",
        answer: "No. Only select matches are broadcast. Matches not on the official City of Toronto schedule will not be shown. Always check the schedule before going.",
      },
      {
        question: "What are the Visa mini-pitches?",
        answer: "Two 5-a-side soccer pitches set up in the square. Drop-in and open to the public during event days.",
      },
      {
        question: "What time do gates open?",
        answer: "The square is a public space so there are no formal gates. The broadcast screens activate around the scheduled match start times.",
      },
    ],
    usefulLinks: [
      {
        icon: "🌐",
        label: "Official match broadcast schedule",
        url: "https://www.toronto.ca/explore-enjoy/festivals-events/fifa-world-cup-26/match-broadcasts/",
      },
      {
        icon: "📍",
        label: "Get directions - 100 Queen St W",
        url: "https://maps.google.com/?q=100+Queen+St+W,+Toronto,+ON+M5H+2N2",
      },
    ],
    nearbyAlternatives: [
      { slug: "harbourfront-centre", distanceKm: 1.4, walkMinutes: 18 },
      { slug: "stackt-market", distanceKm: 1.8, walkMinutes: 22 },
    ],
    entryRequirements: {
      type: "free",
      ticketsAvailable: false,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl:
        "https://www.toronto.ca/explore-enjoy/festivals-events/fifa-world-cup-26/match-broadcasts/",
      restrictions: [
        "No ticket or reservation required",
        "Select matches only - check schedule",
        "All ages welcome",
      ],
      arrivalGuidance: null,
      cost: "Free - no ticket required",
    },
    lastChecked: "2026-06-20",
    confidence: "official",
    sources: [
      {
        label: "City of Toronto - Match Broadcasts at Nathan Phillips Square",
        url: "https://www.toronto.ca/explore-enjoy/festivals-events/fifa-world-cup-26/match-broadcasts/",
        type: "official",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "stackt-market",
    name: "adidas Home of Soccer at STACKT Market",
    neighbourhood: "King West / Bathurst",
    address: "28 Bathurst St, Toronto, ON M5V 0C6",
    websiteLabel: "adidas Home of Soccer Toronto",
    shortDescription:
      "adidas brings the official Home of Soccer to STACKT market. Free outdoor watch parties, athlete appearances, on-site activations, and an adidas retail pop-up - open daily June 11 to July 19.",
    quickAnswerSummary:
      "Free entry, no sign-up or reservation needed. First-come, first-served. Open daily from 11am (closed Mondays). Screening games rain or shine.",
    imageSrc: "/images/venues/stackt.jpg",
    crowdRisk: "medium",
    capacity: 3000,
    isOutdoor: true,
    screeningConfirmed: true,
    customBadges: ["Free entry", "Walk-in only", "Rain or shine"],
    bestFor: [
      "Easy walk-in access",
      "adidas activations",
      "Canada games",
      "After-work or weekend viewing",
    ],
    notIdealFor: [
      "Those wanting guaranteed seating",
      "Large groups during Canada games",
    ],
    alternativeSlugs: ["harbourfront-centre", "toronto-official-fan-festival"],
    arrivalTimes: [
      { gameType: "Canada games", timing: "60–90 min early" },
      { gameType: "Popular group stage", timing: "30–60 min early" },
      { gameType: "Regular group stage", timing: "Walk-in anytime" },
    ],
    veryBusyGames: ["Canada games (Jun 24 remaining)", "Knockout rounds"],
    lessBusyGames: ["Weekday afternoon matches", "Lower-profile group stage"],
    infoSections: [
      {
        icon: "📍",
        label: "Location & address",
        bullets: [
          "28 Bathurst St, Toronto, ON M5V 0C6",
          "At STACKT market - Bathurst St near King St W",
          "TTC: King streetcar (504) to Bathurst, or Bathurst streetcar (511)",
          "Bike parking available on-site; limited street parking nearby",
        ],
      },
      {
        icon: "🗓",
        label: "Dates & hours",
        bullets: [
          "Open daily June 11 – July 19, 2026",
          "Gates open at 11am daily",
          "Closed every Monday",
          "Screening games rain or shine",
        ],
      },
      {
        icon: "🎟",
        label: "Entry policy",
        bullets: [
          "Free to the public - no tickets, no registration required",
          "First-come, first-served",
          "No advance sign-up needed",
          "Walk up anytime - capacity limits may apply on busy days",
        ],
      },
      {
        icon: "🇨🇦",
        label: "Canada game dates",
        bullets: [
          "June 12 - Canada vs. TBD (past)",
          "June 18 - Canada vs. TBD (past)",
          "June 24 - Canada game",
        ],
      },
      {
        icon: "🎯",
        label: "Activations & experience",
        bullets: [
          "Official FIFA World Cup watch parties on outdoor screens",
          "Athlete appearances on select match days",
          "On-site activations and interactive experiences",
          "adidas retail pop-up store open throughout",
        ],
      },
    ],
    schedule: [
      { date: "Sat, June 21", hours: "11:00am onwards" },
      { date: "Tue, June 24", hours: "11:00am onwards - Canada game" },
      { date: "Wed, June 25", hours: "11:00am onwards" },
      { date: "Thu, June 26", hours: "11:00am onwards" },
      { date: "Fri, June 27", hours: "11:00am onwards" },
      { date: "Sat, June 28", hours: "11:00am onwards" },
      { date: "Sun, June 29", hours: "11:00am onwards" },
      { date: "Tue, July 1 – Sun, July 6", hours: "11:00am onwards (Round of 32)" },
      { date: "Tue, July 8 – Sun, July 13", hours: "11:00am onwards (Quarterfinals)" },
      { date: "Tue, July 15 – Sat, July 19", hours: "11:00am onwards (Semis & Final)" },
    ],
    localFaqs: [
      {
        question: "Do I need to register or sign up in advance?",
        answer: "No. Entry is free and walk-in only - no tickets, reservations, or registration required.",
      },
      {
        question: "Is it open if it rains?",
        answer: "Yes. STACKT market screens games rain or shine.",
      },
      {
        question: "Is it open every day?",
        answer: "Open daily June 11–July 19 at 11am. Closed every Monday.",
      },
      {
        question: "What is the adidas pop-up?",
        answer: "An adidas retail store is open on-site throughout the event. You can shop adidas World Cup gear while watching the matches.",
      },
    ],
    usefulLinks: [
      {
        icon: "🌐",
        label: "Official STACKT listing",
        url: "https://stacktmarket.com/directory/adidas-home-of-soccer-toronto-opening-june-11/",
      },
      {
        icon: "📍",
        label: "Get directions - 28 Bathurst St",
        url: "https://maps.google.com/?q=28+Bathurst+St,+Toronto,+ON+M5V+0C6",
      },
    ],
    nearbyAlternatives: [
      { slug: "harbourfront-centre", distanceKm: 1.1, walkMinutes: 14 },
      { slug: "toronto-official-fan-festival", distanceKm: 1.4, walkMinutes: 18 },
    ],
    entryRequirements: {
      type: "free",
      ticketsAvailable: false,
      reservationGuaranteesEntry: null,
      dayOfDropAdvisory: false,
      officialTicketUrl: "https://stacktmarket.com/directory/adidas-home-of-soccer-toronto-opening-june-11/",
      restrictions: [
        "No advance sign-up or ticket required",
        "First-come, first-served - capacity limits may apply",
        "Closed Mondays",
      ],
      arrivalGuidance: null,
      cost: "Free",
    },
    lastChecked: "2026-06-20",
    confidence: "official",
    sources: [
      {
        label: "STACKT market - adidas Home of Soccer Toronto",
        url: "https://stacktmarket.com/directory/adidas-home-of-soccer-toronto-opening-june-11/",
        type: "official",
      },
    ],
    userSubmitted: false,
  },
  {
    slug: "toronto-official-fan-festival",
    name: "FIFA Fan Festival Toronto",
    neighbourhood: "Fort York / The Bentway",
    address: "250 Fort York Blvd, Toronto, ON M5V 3K9",
    websiteLabel: "FIFA Fan Festival Toronto - Official Site",
    shortDescription:
      "The official FIFA Fan Festival at Fort York and The Bentway. Free general admission, but tickets must be obtained online in advance - no on-site box office. Live entertainment, 30+ food vendors, interactive experiences, and full match broadcasts.",
    quickAnswerSummary:
      "Free GA tickets are required but must be booked online at Ticketmaster before arriving - there is no on-site box office. Same-day tickets sometimes drop; check Ticketmaster and @fwc26toronto on X the morning of the game. Arrive early - lines build fast before kickoff. Premium paid tiers also available.",
    imageSrc: "/images/venues/exhibition-place.jpg",
    crowdRisk: "packed",
    capacity: 20000,
    isOutdoor: true,
    screeningConfirmed: true,
    customBadges: ["Free GA ticket required", "Book online only", "No on-site box office"],
    bestFor: [
      "Full festival atmosphere",
      "Live entertainment and music",
      "30+ food vendors",
      "Interactive experiences",
      "All ages",
    ],
    notIdealFor: [
      "Anyone without a pre-booked ticket",
      "Walk-up on the day without checking Ticketmaster first",
      "Quiet viewing - this is a full festival",
    ],
    alternativeSlugs: ["harbourfront-centre", "stackt-market"],
    arrivalTimes: [
      { gameType: "All games", timing: "Arrive well before gates open - lines build quickly" },
      { gameType: "Canada / big games", timing: "Arrive as early as possible" },
    ],
    veryBusyGames: [
      "Canada games",
      "Knockout / Semifinal",
      "Final",
      "Evening weekend matches",
    ],
    lessBusyGames: [
      "Weekday afternoon matches",
      "Smaller group stage games",
    ],
    infoSections: [
      {
        icon: "📍",
        label: "Location",
        bullets: [
          "Fort York National Historic Site and The Bentway",
          "250 Fort York Blvd, Toronto, ON M5V 3K9",
          "TTC: Bathurst streetcar (511) to Fort York Blvd",
          "King streetcar (504) to Bathurst, then walk south",
          "No large event parking - use TTC or bike",
        ],
      },
      {
        icon: "🎟",
        label: "Tickets and entry",
        bullets: [
          "General admission is FREE but a ticket is required",
          "Tickets only available online at Ticketmaster - no on-site box office",
          "Same-day GA tickets sometimes become available - check Ticketmaster and @fwc26toronto on X the morning of each game",
          "You must have your ticket before joining the lineup - no exceptions",
          "All ages welcome",
        ],
      },
      {
        icon: "⭐",
        label: "Premium experiences",
        bullets: [
          "Garden Pavilion - $100 + taxes (relaxed comfortable setting)",
          "Pitchside Terrace - $150 + taxes (elevated viewing area)",
          "Casamigos Clubhouse - $300 + taxes (most exclusive experience)",
          "Premium tickets available at torontofwc26.ca",
        ],
      },
      {
        icon: "⚠️",
        label: "Line and crowd reality",
        bullets: [
          "Lines start small when gates open, then grow fast before kickoff",
          "CBC reporters observed 100m+ lineups forming just before match start",
          "Arrive well before gates open - not at kickoff time",
          "Gates have opened approximately 2 hours before select matches",
        ],
      },
      {
        icon: "👜",
        label: "What to bring and leave at home",
        bullets: [
          "Leave large backpacks at home - not permitted",
          "Hard-sided water bottles not permitted",
          "Review the Know Before You Go guide on the official site before attending",
        ],
      },
      {
        icon: "🎯",
        label: "What is on",
        bullets: [
          "Full match broadcasts on large screens across all zones",
          "Live entertainment on the Main Stage (k-os, Wyclef Jean, AHI and more)",
          "30+ food vendors from around the world",
          "Destination Ontario mini-golf soccer pitch",
          "OLG foosball kick-to-win pitch",
          "OPG interactive power experience",
          "FIFA merchandise store on-site",
        ],
      },
      {
        icon: "🗓",
        label: "Dates",
        bullets: [
          "Open June 11 to July 19, 2026",
          "Operates on match broadcast days - check torontofwc26.ca/FIFAFanFestival/Schedule for the full schedule",
        ],
      },
    ],
    localFaqs: [
      {
        question: "Can I just show up without a ticket?",
        answer: "No. You must have a Ticketmaster ticket before joining the lineup. There is no on-site box office. Same-day free tickets sometimes become available - check Ticketmaster and @fwc26toronto on X the morning of the game before heading out.",
      },
      {
        question: "How early should I arrive?",
        answer: "Much earlier than you think. CBC reported lines stretching over 100 metres just minutes before kickoff. Arrive well before gates open, not at match time.",
      },
      {
        question: "Are premium tickets worth it?",
        answer: "Premium tiers (Garden Pavilion $100, Pitchside Terrace $150, Casamigos Clubhouse $300) guarantee entry and give access to elevated areas and exclusive lounges. If you want a guaranteed spot without the free-ticket scramble, they are worth considering.",
      },
      {
        question: "Is this the same as Nathan Phillips Square?",
        answer: "No. These are two separate events. Nathan Phillips Square is free with no ticket and run by the City of Toronto. The FIFA Fan Festival at Fort York is the official FIFA event with a ticketing requirement and a full festival experience.",
      },
    ],
    usefulLinks: [
      {
        icon: "🌐",
        label: "Official FIFA Fan Festival site",
        url: "https://torontofwc26.ca/FIFAFanFestival",
      },
      {
        icon: "🎟",
        label: "Get tickets on Ticketmaster",
        url: "https://www.ticketmaster.ca",
      },
      {
        icon: "📍",
        label: "Get directions - 250 Fort York Blvd",
        url: "https://maps.google.com/?q=250+Fort+York+Blvd,+Toronto,+ON+M5V+3K9",
      },
      {
        icon: "📱",
        label: "Join the WhatsApp fan channel for alerts",
        url: "https://torontofwc26.ca/FIFAFanFestival",
      },
    ],
    nearbyAlternatives: [
      { slug: "stackt-market", distanceKm: 0.9, walkMinutes: 11 },
      { slug: "harbourfront-centre", distanceKm: 1.8, walkMinutes: 22 },
    ],
    entryRequirements: {
      type: "free",
      ticketsAvailable: true,
      reservationGuaranteesEntry: true,
      dayOfDropAdvisory: true,
      officialTicketUrl: "https://www.ticketmaster.ca",
      restrictions: [
        "Free GA ticket required - must be obtained online before arriving",
        "No on-site box office",
        "No large backpacks",
        "No hard-sided water bottles",
        "Review Know Before You Go on the official site",
        "All ages welcome",
      ],
      arrivalGuidance:
        "Arrive well before gates open. Lines build fast - CBC observed 100m+ lineups before kickoff. Do not arrive at kickoff time.",
      cost: "Free GA (premium paid tiers from $100)",
    },
    lastChecked: "2026-06-20",
    confidence: "official",
    sources: [
      {
        label: "FIFA Fan Festival Toronto - Official Site",
        url: "https://torontofwc26.ca/FIFAFanFestival",
        type: "official",
      },
      {
        label: "City of Toronto - FIFA World Cup 2026",
        url: "https://www.toronto.ca/explore-enjoy/festivals-events/fifa-world-cup-26/",
        type: "official",
      },
      {
        label: "CBC - Celebrations, lineups, ticket struggles",
        url: "https://www.cbc.ca/news/canada/toronto/toronto-fifa-fan-fest-9.7240359",
        type: "news",
      },
    ],
    userSubmitted: false,
  },
];
