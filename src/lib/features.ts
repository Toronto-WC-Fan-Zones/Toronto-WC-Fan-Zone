/**
 * Feature flags - set to false to hide a section from navigation and homepage
 * without deleting its pages or data.
 *
 * nearMe: The "Find Spots Near You" / Areas section.
 *   Flip to true when the section is ready to ship.
 *
 * submitSpot: The "Submit a Spot" form links and banners.
 *   Flip to true when submission workflow is ready.
 *
 * watchParties: The "Watch Parties & Events" section and /events pages.
 *   Flip to true when event data is ready to surface publicly.
 */
export const FEATURES = {
  nearMe: false,
  submitSpot: false,
  watchParties: false,
} as const;
