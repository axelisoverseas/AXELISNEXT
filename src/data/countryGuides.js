// Slug -> country-details.json key, plus the display names the guide pages
// and the sitemap share.
//
// `name` is the form that follows "Study in ...", so it carries the article
// where English needs one ("the UK", "the Czech Republic"). `short` is the
// bare label used in headings, chips and cross-links.
//
// All 29 entries are backed by a complete record in country-details.json and
// by rows in costIndex.json. The cost sheet also prices China, Lithuania and
// Taiwan; those three have no country-details record, so they appear on
// /cost-index only and deliberately have no guide page rather than a page
// built from invented prose.
export const GUIDES = {
  'study-in-uk': { key: 'united-kingdom', name: 'the UK', short: 'UK' },
  'study-in-usa': { key: 'united-states', name: 'the USA', short: 'USA' },
  'study-in-canada': { key: 'canada', name: 'Canada', short: 'Canada' },
  'study-in-australia': { key: 'australia', name: 'Australia', short: 'Australia' },
  'study-in-ireland': { key: 'ireland', name: 'Ireland', short: 'Ireland' },
  'study-in-germany': { key: 'germany', name: 'Germany', short: 'Germany' },
  'study-in-france': { key: 'france', name: 'France', short: 'France' },
  'study-in-finland': { key: 'finland', name: 'Finland', short: 'Finland' },
  'study-in-italy': { key: 'italy', name: 'Italy', short: 'Italy' },
  'study-in-austria': { key: 'austria', name: 'Austria', short: 'Austria' },
  'study-in-netherlands': { key: 'netherlands', name: 'the Netherlands', short: 'Netherlands' },
  'study-in-new-zealand': { key: 'new-zealand', name: 'New Zealand', short: 'New Zealand' },
  'study-in-spain': { key: 'spain', name: 'Spain', short: 'Spain' },
  'study-in-portugal': { key: 'portugal', name: 'Portugal', short: 'Portugal' },
  'study-in-poland': { key: 'poland', name: 'Poland', short: 'Poland' },
  'study-in-hungary': { key: 'hungary', name: 'Hungary', short: 'Hungary' },
  'study-in-czech-republic': { key: 'czech-republic', name: 'the Czech Republic', short: 'Czech Republic' },
  'study-in-belgium': { key: 'belgium', name: 'Belgium', short: 'Belgium' },
  'study-in-denmark': { key: 'denmark', name: 'Denmark', short: 'Denmark' },
  'study-in-sweden': { key: 'sweden', name: 'Sweden', short: 'Sweden' },
  'study-in-norway': { key: 'norway', name: 'Norway', short: 'Norway' },
  'study-in-switzerland': { key: 'switzerland', name: 'Switzerland', short: 'Switzerland' },
  'study-in-malta': { key: 'malta', name: 'Malta', short: 'Malta' },
  'study-in-cyprus': { key: 'cyprus', name: 'Cyprus', short: 'Cyprus' },
  'study-in-uae': { key: 'uae', name: 'the UAE', short: 'UAE' },
  'study-in-singapore': { key: 'singapore', name: 'Singapore', short: 'Singapore' },
  'study-in-malaysia': { key: 'malaysia', name: 'Malaysia', short: 'Malaysia' },
  'study-in-japan': { key: 'japan', name: 'Japan', short: 'Japan' },
  'study-in-south-korea': { key: 'south-korea', name: 'South Korea', short: 'South Korea' },
};

export const GUIDE_SLUGS = Object.keys(GUIDES);

// country-details key -> guide slug, so the cost index can link each priced
// row back to its guide (and leave the three unguided rows as plain text).
export const SLUG_BY_KEY = Object.fromEntries(
  GUIDE_SLUGS.map((slug) => [GUIDES[slug].key, slug])
);
