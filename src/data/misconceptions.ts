import type { MisconceptionFAQ } from "@/types";

export const misconceptions: MisconceptionFAQ[] = [
  {
    id: "reservation-guarantees-entry",
    question: "Does a reservation guarantee entry?",
    answer:
      "Not necessarily. At most fan zones and hotspots, a reservation reduces your wait time but entry is still subject to capacity and safety limits. If a venue reaches fire capacity, even reservation holders may be turned away. Always arrive early.",
    severity: "high",
  },
  {
    id: "free-tickets-available",
    question: "Are free tickets still available for official fan zones?",
    answer:
      "Tickets for some official fan zones like Nathan Phillips Square may be sold out in advance - but additional general admission tickets sometimes drop day-of or the morning of a game. Always check the official City of Toronto or FIFA ticketing page the morning of each game before you leave.",
    severity: "high",
  },
  {
    id: "walk-in-guaranteed",
    question: "Can I just show up without a ticket?",
    answer:
      "It depends on the venue. Some spots (bars, STACKT Market, street areas) are fully walk-in. Official fan zones like Nathan Phillips Square require a ticket. Walk-in availability at ticketed venues is unclear - some capacity may be held for walk-ups, but this is not guaranteed.",
    severity: "high",
  },
  {
    id: "walk-in-queue-guaranteed",
    question: "Does being in the walk-in queue mean I'll get in?",
    answer:
      "No. Walk-in queues are not guaranteed entry. Venues can stop admissions at any point when capacity is reached. If you're in line, you may be turned away. The earlier you arrive, the better your chances.",
    severity: "high",
  },
  {
    id: "app-is-live",
    question: "Is this app showing live availability?",
    answer:
      "No. This is a planning guide, not a live tracker. Information is manually researched and updated. We show the date each piece of information was last checked. Always verify directly with the venue or official sources before you leave.",
    severity: "medium",
  },
  {
    id: "what-is-unconfirmed",
    question: "What does 'unconfirmed' mean?",
    answer:
      "Unconfirmed spots are community-submitted and have not been independently verified by our team. They may be accurate, but treat them with extra skepticism. We recommend calling the venue directly or checking their social media before going.",
    severity: "medium",
  },
  {
    id: "how-current-is-info",
    question: "How current is this information?",
    answer:
      "Each location shows a 'last checked' date. We manually update the guide as new information becomes available. During the tournament, policies can change on short notice - always verify directly with official sources, especially for entry rules and ticket availability.",
    severity: "medium",
  },
];
