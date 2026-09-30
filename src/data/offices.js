// ============================================================================
// OFFICES. One source of truth for both physical locations.
// ============================================================================
//
// Why this file exists: the Bengaluru address was written three different ways
// in three places -- src/lib/seo.js (schema), src/data/siteData.js (site copy)
// and the FAQ prose further down that same file. Inconsistent name/address/phone
// across a site actively hurts local association, because the crawler cannot
// tell which string is the entity. The variant below is the one seo.js was
// already publishing as structured data, so it is treated as canonical here.
//
// NEEDS A HUMAN: confirm this against the Google Business Profile itself. One
// of the other variants carried "#80/3, Vijinapur Village", which this one does
// not. Whichever matches the Business Profile exactly is the correct one, and
// that is the one Google reconciles against.
//
// Rule inherited from src/lib/seo.js: add nothing that is not on the site, and
// never invent a value to fill a field. `geo`, `openingHours` and `sameAs` are
// nullable for exactly that reason -- an omitted property costs nothing, while
// a wrong one is a wrong fact published in machine-readable form.
// ============================================================================

export const OFFICES = [
  {
    slug: 'bengaluru',
    name: 'Axelis Overseas, Bengaluru',
    role: 'Corporate office',
    streetAddress: 'WorkFlo Ranka Junction, 3rd Floor, Old Madras Road, KR Puram Hobli',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560016',
    addressCountry: 'IN',

    // Unknown. Do NOT copy 12.9716/77.5946 from src/app/test-prep/layout.js --
    // that is the Bengaluru city centroid, roughly 13km from KR Puram, and it
    // is wrong there too. Read the real pair off the Business Profile.
    geo: null,

    // Published on /contact and in the FAQ copy, and only ever alongside this
    // office -- so it belongs to Bengaluru, not to both.
    openingHours: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      { days: ['Saturday'], opens: '10:00', closes: '16:00' },
    ],

    // NEEDS A HUMAN: the Business Profile URL for this office. Linking it via
    // sameAs is what ties this page to that profile as one entity. There is no
    // Places credential on this machine, so it cannot be looked up here.
    mapsUrl: null,

    // The four real owned photographs already shipping on the homepage.
    photos: [
      '/office/reception.jpg',
      '/office/meeting-room.jpg',
      '/office/boardroom.jpg',
      '/office/lounge.jpg',
    ],

    // Honest state of this profile as of Sep 2026. See src/data/googleReviews.js.
    reviewState: 'new',
  },
  {
    slug: 'bilaspur',
    name: 'Axelis Overseas, Bilaspur',
    role: 'Registered office',
    streetAddress: '1st Floor, Vrindavan Plaza, B-20, Nehru Chowk',
    addressLocality: 'Bilaspur',
    addressRegion: 'Chhattisgarh',
    postalCode: '495001',
    addressCountry: 'IN',

    // Read off the Business Profile place URL recorded in
    // src/data/googleReviews.js (@22.0868588,82.1429961), not estimated.
    geo: { latitude: 22.0868588, longitude: 82.1429961 },

    // Never published for this office. The hours on /contact are Bengaluru's.
    openingHours: null,

    mapsUrl:
      'https://www.google.com/maps/place/Axelis+Overseas+Education+Pvt+Ltd/@22.0868588,82.1429961,17z',

    photos: [],

    reviewState: 'established',
  },
];

export const OFFICE_SLUGS = OFFICES.map((o) => o.slug);

export const officeBySlug = (slug) => OFFICES.find((o) => o.slug === slug);

export const formatAddress = (o) =>
  `${o.streetAddress}, ${o.addressLocality}, ${o.addressRegion} ${o.postalCode}`;
