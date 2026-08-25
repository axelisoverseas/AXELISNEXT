// ============================================================================
// GOOGLE REVIEWS — Axelis Overseas, Bilaspur (Nehru Chowk branch)
// ============================================================================
//
// TODO — replace the reviews[] array below with the CURRENT reviews from the
// live Google Business Profile. Open the profile in a browser, copy each
// reviewer's name + star rating + review text + relative date, then paste
// them in. Update `rating` and `totalReviews` from the profile header.
//
// Google Business Profile:
//   Search: "Axelis Overseas Bilaspur" on Google Maps
//   Address: 1st floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, C.G. 495001
//
// The mapsUrl below is a stable Google Maps search deep link that always
// resolves to the live profile — safe to keep as-is even when reviews change.
// ============================================================================

export const googleReviewsMeta = {
  businessName: 'Axelis Overseas — Bilaspur',
  address: '1st Floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, Chhattisgarh 495001',
  rating: 4.9,          // <- update from live profile
  totalReviews: 87,     // <- update from live profile
  // Stable deep link — Google Maps resolves this to the actual place page.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Axelis+Overseas+Bilaspur',
  // Optional: if you have the actual place URL (starts with maps.app.goo.gl or
  // has a cid parameter), paste it here — the widget will prefer it over the
  // search fallback above.
  placeUrl: null,
};

// Each review: name, rating (1-5), relativeDate ("2 months ago"), text, avatarInitials.
// Set `verified: true` only for reviews confirmed live on the Google profile.
export const reviews = [
  {
    name: 'Awaiting Google sync',
    rating: 5,
    relativeDate: 'placeholder',
    text: 'Paste real Google reviews into src/data/googleReviews.js — this placeholder is intentionally obvious so it never ships to production without being replaced.',
    avatarInitials: 'AG',
    verified: false,
  },
];

// Convenience helper used by the widget to pick the best outbound URL.
export function getGoogleMapsHref() {
  return googleReviewsMeta.placeUrl || googleReviewsMeta.mapsUrl;
}
