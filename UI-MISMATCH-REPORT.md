# UI Mismatch Report
> Compared against mockups in `/UI-mockups/66c55a9d-2e29-4b48-9021-a55f53f234a7.png` and `/UI-mockups/ChatGPT Image Jun 18, 2026, 01_05_13 AM (1).png`
> Generated: Jun 18, 2026

---

## 1. Layout Differences

- **Hero split layout missing.** Mockup has a left column (headline + search bar + filter pills) and a right column (full-bleed Toronto city/waterfront photo). Current implementation has the left column only; the right half is empty gradient.
- **Hero is too tall.** Computed height: `729px`. Mockup hero is visually ~480–520 px.
- **Homepage has duplicate sections.** DOM inspection found `h2` text "Official Fan Zones" and "Country Fan Hotspots" rendered twice each — both the compact row summary and the full card grid are being included simultaneously. The mockup shows compact rows on the homepage and full grids only on listing pages.
- **No tab navigation on fan zone detail page.** Mockup shows a horizontal tab bar: Overview / Entry & Rules / When to Arrive / Busy Games / Restrictions / Good to Know. Current detail page is a single long scroll.
- **No `Get Directions` button on detail hero.** Mockup shows address field + "Get Directions" CTA directly beneath the venue name.
- **No map section.** The "Find Spots Near You" section in the mockup includes an embedded map with pin markers. Current version is absent.

---

## 2. Spacing Differences

- **Section vertical spacing is over-uniform.** Every section uses the same top/bottom margin, flattening page rhythm. Mockup has deliberate variation: the hero bleeds tightly into the filter chips; the Quick Picks section is visually heavier (larger cards with photos); the compact list sections below use a tighter grid.
- **Hero internal spacing is excessive.** The trust bullet list and "Next Game" card are spread across ~400 px of vertical space. Mockup compresses these into a tight left column so the photo dominates.
- **Filter chips are spaced with no visual grouping.** Mockup separates the primary content-type chips (Fan Zones, Hotspots, Near Me) from filter-modifier chips (Free, Reservation, Walk-ins OK) with a subtle divider.
- **Card padding feels uniform and boxy.** Current `padding: 18px` is the same on all cards regardless of card size or content density.

---

## 3. Components That Are Too Cluttered

- **FanZoneCard** — Shows name, neighbourhood, all entry badges, arrival time text (full sentence), last checked, and source count. Mockup shows: thumbnail photo, name, 2–3 pill badges, arrival time as a short label (e.g. "Arrive 2–3h early"), and a "View details" link.
- **CountryHotspotCard** — Includes atmosphere description and full arrival sentence. Mockup omits both from the card; they appear on the detail page only.
- **AreaGuideCard** — Includes full description paragraph and arrival text. Mockup shows only the area name, a count ("4 venues"), and a crowd badge.
- **HomeDashboard** — As noted above, renders full card grids AND compact rows for the same content, doubling everything.

---

## 4. Components That Contain Too Much Text

- **FanZoneCard arrival text** — Full sentence like "Arrive 15–25 minutes early. Gates open 90 minutes before…". Should be truncated to one short label.
- **QuickPicks cards** — Show tagline before the venue name. Mockup shows venue name as the primary H3 and the tag label (e.g. "Best for Canada games") as a small pill above the name.
- **MisconceptionFAQ** — Accordion answers can be very long. Mockup keeps answers to 2–3 short sentences max.
- **SiteFooter** — Contains a full disclaimer paragraph inline. Mockup uses a subtle muted one-liner at the very bottom.

---

## 5. Sections That Do Not Match the Mockup Hierarchy

| Mockup order | Current order |
|---|---|
| Hero (headline + search + filters) | Hero (headline + trust bullets + next game) |
| Quick Picks (3 photo cards) | Filter chips |
| Official Fan Zones (compact rows) | Quick Picks (text cards, no photos) |
| Country Fan Hotspots (compact rows) | Full Fan Zone card grid |
| Find Spots Near You (map) | Full Hotspot card grid |
| Know a spot? (Submit CTA) | Full Area card grid |
| Trust footer | Map section (placeholder) |
| | FAQ accordion |
| | Trust footer |

Key structural issues:
- Search bar belongs inside the hero, not absent.
- Filter chips belong beneath the search bar in the hero, not as a separate section.
- The homepage should show **compact row previews** of fan zones and hotspots, not full card grids.
- "Find Spots Near You" (map section) is missing entirely.

---

## 6. Pages That Feel Too Similar

- **Homepage** and **Fan Zones listing page** — Both render `FanZoneCard` in a grid with the same filter chips. The homepage should be a curated discovery dashboard; the listing page should be a filterable directory.
- **Fan Zones listing** and **Country Hotspots listing** — Identical layout, identical filter bar, identical card structure. No visual differentiation signals which content type the user is browsing.
- **All three detail pages** (`/fan-zones/[slug]`, `/hotspots/[slug]`, `/areas/[slug]`) — Share the same layout structure with the same sidebar pattern. There is no visual identity for each content type.

---

## 7. Real Images — Critical Missing Element

**The DOM has zero `<img>` tags anywhere in the app (`imgCount: 0`).**

Photography is a core part of the mockup's information design — not just decoration. Every major UI section relies on photos:

| Location | Mockup | Current |
|---|---|---|
| Hero (right half) | Full-bleed Toronto waterfront / CN Tower photo | Empty gradient |
| Quick Picks cards | Full-bleed cover photo (stadium crowd, Kensington street, outdoor screen) | Plain white text card |
| Fan Zone list rows | Small square venue thumbnail | No thumbnail |
| Country Hotspot cards | Flag graphic + venue atmosphere photo | Emoji flag only |
| Fan Zone detail hero | Large dramatic venue photo (Harbourfront docks at dusk) | Pure navy block |
| Nearby Recommendations | Restaurant/bar interior photos | Section absent |

Without images:
- Cards read as data tables, not destinations
- The hero looks like a blank splash screen
- There is no atmosphere or emotional context for any venue
- The quick picks section loses its "curated picks" visual weight entirely

Photos can initially be static assets in `/public/images/` (sourced from official City of Toronto / FIFA fan zone pages) and referenced in the data files. This is a V1-compatible approach with no backend needed.

---

## 8. "AI-Generated" Feel — Specific Issues

### Emoji used as section icons
Current h2 texts include: `🏟 Official Fan Zones`, `🌍 Country Fan Hotspots`, `📍 Find Spots Near You`. Emoji-as-icon is the most recognisable signal of AI-generated UI. The mockup uses clean SVG icons or no icon at all.

**Fix:** Strip emoji from all headings. Replace with inline SVG icons or remove entirely.

### Filter chips have `border-radius: 0px`
Confirmed via computed style. Renders as flat rectangles. Mockup chips are fully pill-shaped.

**Fix:** Set `border-radius: 100px` in `FilterChips.module.css`.

### Status badges have `border-radius: 6px` instead of pill shape
Current: 6 px. Mockup: ~20 px full pill. Colours are also off — the mockup uses distinct, saturated colours per badge type (green = free, red = high crowd, amber = reservation, grey = walk-in).

**Fix:** Set `border-radius: 20px` (or `9999px`) in all badge module CSS files.

### Typography scale is too uniform
Every text block uses a mechanically derived scale with no intentional jumps:
- `h1`: 51.2 px / line-height 56.32 px — reasonable
- But section headers, card titles, body text, and metadata all follow the same proportional scale with no deliberate visual weight jumps

The mockup introduces sharp contrast: hero headline is large and loose; section labels are noticeably smaller, lighter, and tighter; card titles sit at medium weight; metadata (last checked, neighbourhood) is visibly de-emphasised at small size + muted colour. Without these jumps the page reads as one continuous text wall.

**Fix:** Introduce explicit type scale steps in `globals.css` — don't rely on a single `rem` ladder.

### Section vertical padding is over-uniform
Same top/bottom margin applied to every section. The mockup varies rhythm intentionally: hero is generous, filter chips are compact, Quick Picks is prominent, compact rows below are tight.

**Fix:** Give each distinct section type its own spacing class in `HomeDashboard.module.css`.

---

## 9. Exact Files Needing Changes

| File | Changes needed |
|---|---|
| `src/app/page.tsx` | Add search bar to hero; fix section order; remove full card grids from homepage |
| `src/app/page.module.css` | Reduce hero height to ~480 px; add right-column photo placeholder |
| `src/components/dashboard/HomeDashboard.tsx` | Remove emoji from h2s; remove duplicate card grid sections; reorder sections to match mockup |
| `src/components/dashboard/HomeDashboard.module.css` | Differentiate section vertical spacing |
| `src/components/dashboard/FilterChips.tsx` | Add active state; split into two visual groups |
| `src/components/dashboard/FilterChips.module.css` | Set `border-radius: 100px`; add active chip style |
| `src/components/dashboard/QuickPicks.tsx` | Add photo slot to card; swap name/tagline order |
| `src/components/dashboard/QuickPicks.module.css` | Add image container styles |
| `src/components/cards/FanZoneCard.tsx` | Add thumbnail; truncate arrival text to one label |
| `src/components/cards/FanZoneCard.module.css` | Add thumbnail slot styles |
| `src/components/cards/CountryHotspotCard.tsx` | Remove atmosphere + arrival text from card view |
| `src/components/cards/AreaGuideCard.tsx` | Show counts only; remove description and arrival text |
| `src/components/ui/Badge.module.css` | Set `border-radius: 9999px` |
| `src/components/ui/CrowdRiskBadge.module.css` | Set `border-radius: 9999px`; update colours |
| `src/components/ui/EntryTypeBadge.module.css` | Set `border-radius: 9999px`; update colours |
| `src/components/layout/SiteHeader.tsx` | Add Games + FAQ nav links |
| `src/app/globals.css` | Sharpen type scale; add explicit `--text-*` steps |
| `src/app/fan-zones/[slug]/page.tsx` | Add tab navigation; add Get Directions; add venue photo hero |
| `public/images/` | Add static venue photos (Harbourfront, Nathan Phillips, STACKT, etc.) |

---

## 10. Prioritized Fix List

| Priority | Fix | Affected file(s) |
|---|---|---|
| **P0** | Add venue/hero photos as static assets in `/public/images/` | `public/images/`, data files |
| **P0** | Add Toronto hero photo to right column of hero section | `page.module.css`, `page.tsx` |
| **P0** | Add cover photos to Quick Picks cards | `QuickPicks.tsx`, `QuickPicks.module.css` |
| **P0** | Strip emoji from all `h2` section headers | `HomeDashboard.tsx` |
| **P0** | Remove duplicate fan zone / hotspot card grid sections from homepage | `HomeDashboard.tsx` |
| **P1** | Make filter chips full pill shape + add active state | `FilterChips.module.css` |
| **P1** | Make all status badges full pill shape | `Badge.module.css`, `CrowdRiskBadge.module.css`, `EntryTypeBadge.module.css` |
| **P1** | Reduce hero height; compress trust bullets and next game card | `page.module.css` |
| **P1** | Add inline search bar to hero | `page.tsx` |
| **P2** | Add thumbnail images to Fan Zone list rows | `FanZoneCard.tsx`, `FanZoneCard.module.css` |
| **P2** | Add venue photo to Fan Zone detail page hero | `fan-zones/[slug]/page.tsx` |
| **P2** | Sharpen type scale — increase contrast between h1/h2/body/meta | `globals.css` |
| **P2** | Differentiate section vertical spacing rhythm | `HomeDashboard.module.css` |
| **P2** | Reorder homepage sections to match mockup | `HomeDashboard.tsx` |
| **P3** | Add tab navigation to fan zone detail page | `fan-zones/[slug]/page.tsx` |
| **P3** | Add `Get Directions` link to fan zone detail hero | `fan-zones/[slug]/page.tsx` |
| **P3** | Add Games + FAQ nav links to SiteHeader | `SiteHeader.tsx` |
| **P4** | CountryHotspotCard: remove atmosphere/arrival from card | `CountryHotspotCard.tsx` |
| **P4** | AreaGuideCard: show counts only, remove description text | `AreaGuideCard.tsx` |
| **P4** | FanZoneCard: truncate arrival text to one short label | `FanZoneCard.tsx` |
| **P4** | QuickPicks: swap card heading order (name first, tag label above as pill) | `QuickPicks.tsx` |
