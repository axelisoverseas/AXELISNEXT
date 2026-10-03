import costIndex from '@/data/costIndex.json';

export const COST_META = costIndex.meta;
export const UG_ROWS = costIndex.ug;
export const PG_ROWS = costIndex.pg;

// The date the source sheet was last priced. Every figure on the site is
// stamped with it: fees move each intake, and an undated number is the way a
// cost page quietly becomes wrong.
export const COST_AS_OF = costIndex.meta.as_of;

export const COST_AS_OF_LABEL = new Date(`${COST_AS_OF}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

/** "41.8" -> "Rs 41.8 lakh". Written out rather than "L" so an answer engine
 *  reading the page aloud does not render it as a stray letter. */
export const lakh = (n) => `Rs ${n.toFixed(1)} lakh`;

/**
 * Every priced row for one country-details key, UG and PG together.
 * A country may hold more than one row -- Germany, the Netherlands, Spain and
 * Switzerland are each priced public and private, and collapsing those into a
 * single figure is the thing that makes a cost table untrue.
 */
export function rowsForCountry(key) {
  const names = costIndex.byCountryKey[key] || [];
  return names.map((country) => ({
    country,
    ug: UG_ROWS.find((r) => r.country === country) || null,
    pg: PG_ROWS.find((r) => r.country === country) || null,
  }));
}

/** Cheapest net PG figure across the whole sheet, for ordering the index. */
export const byNet = (rows) => [...rows].sort((a, b) => a.net_l - b.net_l);
