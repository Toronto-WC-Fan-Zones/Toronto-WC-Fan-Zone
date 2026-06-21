# AGENTS.md

## Project overview

This is a Toronto World Cup watch guide web app.

The product helps users decide where to watch games in Toronto by comparing:
- Official fan zones
- Country fan hotspots
- Nearby area guides
- Entry requirements
- Reservation/ticket rules
- Walk-in policies
- Expected crowd risk
- Arrival-time guidance
- Restrictions
- Official source links
- Last-checked timestamps

The app must not overpromise real-time accuracy. It is a decision guide, not a guaranteed live operations tracker.

## Core product principle

The main user question is:

“Can I actually get in, what should I expect, and where should I go instead if this place is not ideal?”

Prioritize clarity, trust, and usefulness over complexity.

## V1 scope

Build V1 as a static Next.js app.

V1 includes:
- Homepage decision dashboard
- Official fan zone cards
- Country fan hotspot cards
- Area guide cards
- Detail pages for each official fan zone
- Detail pages for country hotspots
- Detail pages for nearby areas
- Search/filter UI
- Submit-a-spot form link
- Last-checked labels
- Source/confidence labels

V1 does not include:
- Real-time capacity tracking
- Automated emergency/cancellation alerts
- User accounts
- Database
- Admin dashboard
- Push notifications
- Exact address storage
- Claims that screening status is guaranteed live

## Tech stack

Use:
- Next.js App Router
- TypeScript
- CSS Modules
- Static local data files
- Vercel-friendly structure

Avoid:
- Tailwind unless explicitly requested
- Custom backend for V1
- Supabase until V2
- Scraping/automation until the static app works

## Country hotspots

Country hotspots represent **neighbourhoods and community gathering areas** where fans of a specific country naturally congregate during World Cup matches. They are NOT individual bars, pubs, or restaurants.

Good examples:
- Little Portugal / Dundas West (Portugal)
- Little Italy / College Street (Italy)
- Greektown / The Danforth (Greece)

Bad examples (do not add these types):
- "The Crown & Anchor Pub"
- "Sports Bar XYZ"
- "Liberty Village Bars"
- Any entry where the primary draw is a specific licensed venue

When adding or editing country hotspots:
- Focus on the **neighbourhood**, not a specific venue or business
- `venueType` must be `"outdoor"`, `"community"`, or `"mixed"` — never `"bar"` or `"restaurant"`
- Describe the atmosphere and the neighbourhood character (what makes fans gather there)
- Explain the cultural or community ties that draw that country's fans to this area
- If no genuine neighbourhood hub exists for a country, omit it — do not invent one

---

## Trust and data rules

Every location or spot should have:
- lastChecked
- source links where available
- confidence: official, manually_verified, user_submitted, or unconfirmed
- clear unknown states instead of fake certainty

For official downtown Toronto fan zones, note that free tickets may currently be unavailable, but additional general admission/free tickets sometimes drop day-of. The app should advise users to check the official ticket page the morning of the game and before leaving.

Never invent official rules. If unclear, write “unclear” and link the source.

## Build commands

Use the project’s package manager. Prefer:

- Install: npm install
- Dev: npm run dev
- Build: npm run build
- Lint: npm run lint

## Code style

- TypeScript strictness preferred
- Use clear named types for data models
- Keep components small and reusable
- Use CSS Modules colocated with components where reasonable
- Use semantic HTML
- Make mobile layouts first-class

## Verification

Before claiming a feature is done:
- Run the build
- Check responsive layout
- Check empty states
- Check filters/search
- Check detail page routing
- Check for fake placeholder content